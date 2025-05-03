import ImageKit from "imagekit";
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Check if environment variables are available
if (!process.env.IMAGE_KIT_ENDPOINT || !process.env.IMAGE_KIT_PUBLIC_KEY || !process.env.IMAGE_KIT_PRIVATE_KEY) {
  console.error("ImageKit environment variables are missing!");
  console.log("Available env variables:", {
    endpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY ? "Set but not shown" : "Not set"
  });
}

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});
  
export default imagekit;