# 🧠 NeuroX AI — Full-Stack AI Chatbot with Multimodal Intelligence

![NeuroX AI Logo](/logo.png)

NeuroX AI is a modern AI chatbot application that leverages Google's Generative AI to provide intelligent conversational responses and image-based analysis. Built with a scalable MERN stack architecture and designed with a sleek, responsive UI, NeuroX AI is a feature-rich demonstration of real-world AI integration in web applications.

---

## ⚡ Features

- 🤖 **AI-Powered Chat** — Natural, dynamic conversations with Google's Generative AI
- 🖼️ **Image Recognition** — Upload images for AI-based understanding and feedback
- 🔐 **User Authentication** — Secure sign-up and login with Clerk
- 💬 **Chat History** — View and manage all past conversations
- 💻 **Code Block Support** — Clean formatting and copy functionality for code
- 📱 **Responsive UI** — Fully optimized for desktop and mobile devices
- ⚙️ **RESTful API** — Backend APIs for user data, image uploads, and chat interactions

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- TypeScript
- Tailwind CSS
- Material UI
- React Router
- TanStack Query (React Query)
- GSAP (Animations)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Clerk (Authentication)
- ImageKit (Image Hosting and Optimization)
- Google Generative AI API (Gemini)

---

## 📂 Project Structure

NeuroX-AI/
├── backend/
│   ├── models/
│   ├── routes/
│   └── index.js
└── client/
├── public/
└── src/
├── components/
├── layouts/
├── lib/
├── routes/
└── main.jsx

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or above)
- MongoDB instance (local or cloud)
- Clerk account (for auth)
- ImageKit account (for image handling)
- Google Generative AI API key

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/NeuroX-AI.git
cd NeuroX-AI

	2.	Install dependencies

# Backend
cd backend
npm install

# Frontend
cd ../client
npm install

	3.	Set up environment variables

Create .env files in both backend/ and client/ directories.

Backend .env

PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

Frontend .env

VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_IMAGE_KIT_ENDPOINT=your_imagekit_endpoint
VITE_GEMINI_API_KEY=your_google_generative_ai_key

	4.	Run development servers

# Start backend
cd backend
npm start

# Start frontend
cd ../client
npm run dev


⸻

📦 Deployment Ready
	•	Modular codebase for easy scaling
	•	Supports environment-specific builds
	•	Follows best practices in security and structure

⸻

📝 License

This project is licensed under the MIT License.

⸻

🧠 Acknowledgments
	•	Google Generative AI — Chat capabilities
	•	Clerk.dev — User authentication
	•	ImageKit.io — Image storage and optimization

⸻
