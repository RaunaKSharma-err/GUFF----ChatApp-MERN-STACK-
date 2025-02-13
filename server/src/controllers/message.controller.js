import User from "../models/user.model.js";
import Messages from "../models/message.model.js";
import { v2 as cloudinary } from "cloudinary";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in getUsersForSidebar controller: " + error.message);
    res.status(501).json({ message: "internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: UserToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Messages.find({
      $or: [
        { senderId: myId, receiverId: UserToChatId },
        { senderId: UserToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: " + error.message);
    res.status(501).json({ message: "internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessages controller: " + error.message);
    res.status(501).json({ message: "internal server error" });
  }
};
