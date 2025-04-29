import { useEffect, useRef, useState, useCallback } from "react";
import { flushSync } from "react-dom";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./newPrompt.css";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [partialAnswer, setPartialAnswer] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAnswerComplete, setIsAnswerComplete] = useState(false);
  const [inputValue, setInputValue] = useState(""); // New state to track input value
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: data?.history
      ? data.history
          .filter(({ role, parts }) => role && parts?.[0]?.text)
          .map(({ role, parts }) => ({
            role,
            parts: [{ text: parts[0].text }],
          }))
      : [],
    generationConfig: {},
  });

  const endRef = useRef(null);
  const formRef = useRef(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [answer]); // Scroll only when answer updates

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", data._id] }).then(() => {
        formRef.current.reset();
        setQuestion("");
        setAnswer(""); // Moved this reset to onSuccess of mutation
        setImg({ isLoading: false, error: "", dbData: {}, aiData: {} });
      });
    },
    onError: (err) => {
      console.error("Mutation error:", err);
    },
  });

  const add = useCallback(async (text, isInitial = false) => {
    if (!isInitial) setQuestion(text);

    const maxRetries = 3;
    const timeoutDuration = 5000;
    let attempt = 0;
    let accumulatedText = "";
    let timeoutReached = false;

    while (attempt < maxRetries) {
      try {
        const result = await chat.sendMessageStream(
          Object.entries(img.aiData).length ? [img.aiData, text] : [text]
        );

        for await (const chunk of result.stream) {
          const chunkText = await chunk.text();
          accumulatedText += chunkText;

          flushSync(() => {
            setPartialAnswer((prev) => prev + chunkText);
            console.log("Partial Answer Updated:", chunkText); // Debug log
          });
        }

        // Directly set accumulatedText to answer after loop completes
        flushSync(() => setAnswer(accumulatedText));
        setIsAnswerComplete(true);
        console.log("Answer Finalized:", accumulatedText); // Debug log

        // Moved mutation here to prevent premature answer reset
        mutation.mutate();
        return;
      } catch (err) {
        attempt++;
        console.error(`Error on attempt ${attempt}:`, err);
        if (err.message.includes("RECITATION")) {
          setAnswer("The AI response was filtered due to content restrictions. Please try rephrasing your question.");
          return;
        }
      }
    }

    if (attempt === maxRetries) {
      setAnswer((prev) => prev + "Sorry, the service is currently unavailable. Please try again later.");
      console.error("Max retry attempts reached.");
    }
  }, [chat, img, mutation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value.trim();
    if (!text) return;

    add(text, false);
    setInputValue(""); // Clear input value after submission
  };

  // Handle input change to track when text is entered
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current && data?.history?.length === 1) {
      add(data.history[0].parts[0].text, true);
      hasRun.current = true;
    }
  }, [data]);

  const renderAnswerWithCodeBlocks = (text) => {
    const codeRegex = /```([\s\S]*?)```/g;
    const parts = text.split(codeRegex);
    return parts.map((part, index) => (
      index % 2 === 1 ? (
        <div className="code-block" key={index}>
          <pre>{part}</pre>
          <button className="copy-button" onClick={() => handleCopy(part)}>Copy</button>
        </div>
      ) : (
        <span key={index} className="justified-text">{part}</span>
      )
    ));
  };

  return (
    <>
      {img.isLoading && <div className="loading-spinner">Uploading image...</div>}

      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}

      {question && <div className="message user justified-text">{question}</div>}

      {answer && <div className="message justified-text">{renderAnswerWithCodeBlocks(answer)}</div>}

      <div className="endChat" ref={endRef}></div>

      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input 
          type="text" 
          name="text" 
          placeholder="Ask anything..." 
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className={inputValue ? "active-send" : ""}>
          <img src="/arrow.png" alt="Send" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;