
import "./chatPage.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { FaStop, FaVolumeUp, FaCopy } from "react-icons/fa";
import { MdOutlineMoreHoriz } from 'react-icons/md';
import remarkGfm from 'remark-gfm';

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // States for chat functionality
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  // Delete chat mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard`);
    },
    onError: (err) => {
      console.log("Error:", err);
    },
  });

  const chatEndRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Chat menu handlers
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedChatId(null);
  };

  const handleDelete = () => {
    deleteMutation.mutate(selectedChatId);
    handleMenuClose();
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  // Function to handle text-to-speech
  const handleSpeak = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Only showing the relevant part to modify
  const renderMessage = (message) => {
    if (!message.parts || !message.parts[0]?.text) return null;
  
    const renderTextWithCodeBlocks = (text) => {
      const codeRegex = /```([\s\S]*?)```/g;
      const parts = text.split(codeRegex);
      
      return parts.map((part, index) => (
        index % 2 === 1 ? (
          <div className="code-block" key={index}>
            <pre>{part}</pre>
            <button className="copy-button" onClick={() => navigator.clipboard.writeText(part)}>Copy</button>
          </div>
        ) : (
          <ReactMarkdown 
            key={index} 
            className="message-content justified-text"
            remarkPlugins={[remarkGfm]} // Enable GitHub Flavored Markdown which includes tables
            components={{
              // Custom component for table to add responsive container
              table: ({node, ...props}) => (
                <div className="table-container">
                  <div className="table-content">
                    <table {...props} />
                  </div>
                </div>
              ),
              // Style table headers
              th: ({node, ...props}) => <th {...props} />,
              // Style table cells
              td: ({node, ...props}) => <td {...props} />
            }}
          >
            {part} 
          </ReactMarkdown>
        )
      ));
    };
  
    const handleCopy = () => {
      navigator.clipboard.writeText(message.parts[0].text);
      alert("Message copied to clipboard!");
    };
  
    return (
      <div className={message.role === "user" ? "message user chat-message" : "message chat-message"}>
      {message.role !== "user" && (
        <img className="message-logo" src="/logo.png" alt="Logo" />
      )}
        {renderTextWithCodeBlocks(message.parts[0].text)}

        <div className="message-icons">
          <div className="speak-icon"
           onClick={() => handleSpeak(message.parts[0].text)}
           aria-label="Speak message">
            {!isSpeaking ? (
              <FaVolumeUp style={{ marginRight: '2px' }} />
            ) : (
              <FaStop style={{ marginRight: '5px' }} onClick={handleStop} />
            )}
          </div>
          <div className="copy-icon" onClick={handleCopy}>
            <FaCopy style={{ marginLeft: '2px' }} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending ? (
            "Loading..."
          ) : error ? (
            "Something went wrong!"
          ) : (
            <>
              {data.history?.map((message, index) => (
                <React.Fragment key={index}>
                  {renderMessage(message)}
                </React.Fragment>
              ))}
              <NewPrompt data={data} />
              <div ref={chatEndRef}></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;





