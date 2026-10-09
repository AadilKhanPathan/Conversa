import { io, userSocketMap } from "../../server.js";
import cloudinary from "../utils/cloudinary.js";
import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";

// get all messages for a selected user
export async function getMessages(req, res) {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user._id;

    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    });
    await messageModel.updateMany(
      {
        senderId: selectedUserId,
        receiverId: myId,
      },
      { seen: true },
    );

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//  api to mark messages as seen using message id
export async function markMessagesAsSeen(req, res) {
  try {
    const { id } = req.params;
    await messageModel.findByIdAndUpdate(id, { seen: true });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

// get all user except the logged in user
export async function getUserForSidebar(req, res) {
  try {
    const userId = req.user._id;
    // get the list of all the user except logged in user and don't include passwords
    const filteredUsers = await userModel
      .find({ _id: { $ne: userId } })
      .select("-password");

    // count number of unseen messages
    const unseenMessages = {};
    const promises = filteredUsers.map(async (user) => {
      const messages = await messageModel.find({
        senderID: user._id,
        receiverID: userId,
        seen: false,
      });
      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });
    await Promise.all(promises);

    res.json({
      success: true,
      users: filteredUsers,
      unseenMessages,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

// send message to selected user
export async function sendMessage(req, res) {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url; //store cloudinary url
    }

    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // emit the new message to the receiver's socket
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("sendMessage", newMessage);
    }
    res.json({
      success: true,
      newMessage,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
