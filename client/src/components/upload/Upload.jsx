import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { useRef } from "react";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/upload");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    console.log(data)
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ setImg }) => {
  const ikUploadRef = useRef(null);
  // Add error handling and loading state improvements
  const onError = (err) => {
    console.log("Error", err);
    setImg(prev => ({ ...prev, isLoading: false, error: err.message }));
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
  };

  // Add a timeout for the upload
  const onUploadStart = (evt) => {
    const file = evt.target.files[0];
    
    // Add file size validation
    if (file && file.size > 5 * 1024 * 1024) {
      setImg(prev => ({ ...prev, error: "File size exceeds 5MB limit" }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        error: "",
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
    
    // Add upload timeout
    setTimeout(() => {
      if (setImg) {
        setImg(prev => {
          if (prev.isLoading) {
            return { ...prev, isLoading: false, error: "Upload timed out" };
          }
          return prev;
        });
      }
    }, 30000); // 30 second timeout
  };

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        onUploadProgress={(progress) => {
          console.log("Upload Progress:", progress);
          setImg(prev => ({ ...prev, uploadProgress: progress }));
        }}
        onUploadStart={onUploadStart}
        style={{ display: "none" }}
        ref={ikUploadRef}
      />
      {
        <label onClick={() => ikUploadRef.current.click()}>
          <img src="/attachment.png" alt="" />
        </label>
      }
    </IKContext>
  );
};

export default Upload;
