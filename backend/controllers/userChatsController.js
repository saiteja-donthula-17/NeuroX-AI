import UserChats from "../models/userChats.js";

// Get all user chats
export const getUserChats = async (req, res) => {
  const userId = req.auth.userId;
  console.log("UserID from Clerk:", userId); // Log userId
  try {
    const userChats = await UserChats.find({ userId });
    res.status(200).send(userChats[0].chats);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching userchats!");
  }
};