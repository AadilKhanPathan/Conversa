"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/Context/AuthContext";
import { Card } from "./ui/card";
import Users from "./Users";

import ChatHeader from "./ui/chats/ChatHeader";
import MessageList from "./ui/chats/MessageList";
import MessageInput from "./ui/chats/MessageInput";

export default function MessageComp() {
  const { authUser, socket } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const fileInputRef = useRef(null);

  // send message
  const [input, setInput] = useState({
    text: "",
    images: [],
  });

  const handleImages = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      console.error("Please select an image");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      console.error("Image must be smaller than 5 MB");
      e.target.value = "";
      return;
    }

    setInput((prev) => ({
      ...prev,
      images: [file],
    }));

    e.target.value = "";
  };

  const send = async (e) => {
    e.preventDefault();

    if (!selectedUser || (!input.text.trim() && !input.images.length)) {
      return;
    }

    try {
      setLoading(true);

      let image = "";

      if (input.images[0]) {
        image = await new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);

          reader.readAsDataURL(input.images[0]);
        });
      }

      const { data } = await api.post(`/message/send/${selectedUser._id}`, {
        text: input.text.trim(),
        image,
      });

      if (data.success) {
        setMessages((prev) => [...prev, data.newMessage]);

        setInput({
          text: "",
          images: [],
        });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function getSelectedUser() {
      try {
        const { data } = await api.get(`/message/${selectedUser._id}`);

        console.log(data);
        console.log(data.messages);
        setMessages(data.messages);
      } catch (error) {
        console.log(error);
      }
    }

    getSelectedUser();
  }, [selectedUser]);

  useEffect(() => {
    if (!socket || !selectedUser) return;
    console.log(socket);
    const handleReceivedMessage = (newMessage) => {
      // Only add messages sent by the selected contact
      if (
        String(newMessage.senderId) === String(selectedUser._id) &&
        String(newMessage.receiverId) === String(authUser._id)
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("receivedMessage", handleReceivedMessage);

    return () => {
      socket.off("receivedMessage", handleReceivedMessage);
    };
  }, [socket, selectedUser, authUser]);

  console.log("Selected user from contacts: " + selectedUser?.username);

  return (
    <div className=" min-h-full w-full flex items-center justify-center bg-slate-100 p-3 sm:p-6 ">
      <div className="flex h-150 ">
        <div className={`border-2 w-sm lg:w-2xs bg-white rounded-l-xl`}>
          <Users
            onSelectUser={setSelectedUser}
            selectedUserId={selectedUser?._id}
          />
        </div>

        <Card className="hidden sm:flex h-full w-full min-w-3xl max-w-3xl flex-col overflow-hidden rounded-r-xl bg-[url('/bg.jpg')] bg-cover bg-center p-0 ">
          {/* Contact Header */}
          <ChatHeader selectedUser={selectedUser} />

          {/* Messages */}
          <MessageList messages={messages} />

          {/* input */}
          <MessageInput
            input={input}
            setInput={setInput}
            send={send}
            fileInputRef={fileInputRef}
            handleImages={handleImages}
          />
        </Card>

        {/* <About/> */}
      </div>
    </div>
  );
}
