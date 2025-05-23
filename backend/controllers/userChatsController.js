import UserChats from "../models/userChats.js";

// Get all user chats
export const getUserChats = async (req, res) => {
  try {
    const userId = req.auth.userId;
    console.log("UserID from Clerk:", userId);
    
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    
    const userChats = await UserChats.find({ userId });
    
    if (!userChats || userChats.length === 0) {
      return res.status(200).json([]); // Return empty array instead of error
    }
    
    res.status(200).json(userChats[0].chats);
  } catch (err) {
    console.error("Error in getUserChats:", err);
    res.status(500).json({ error: "Error fetching user chats", details: err.message });
  }
};


