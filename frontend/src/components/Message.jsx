"use client";

import { Card } from "./ui/card";
import { User, CheckCheck, Phone, Video, Image, Send } from "lucide-react";

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bubble, BubbleContent, BubbleGroup } from "./ui/bubble";

import { Message, MessageAvatar, MessageContent } from "./ui/message";

import ThreeDot from "./Threedot";
import { useAuth } from "@/Context/AuthContext";
import Users from "./Users";
import { useEffect, useRef, useState } from "react";
import api from "@/lib/axios";
import { CircleX } from "lucide-react";

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
      <div
        className={`border-2 w-sm lg:w-2xs bg-white rounded-l-xl`}
      >
        <Users
        
          onSelectUser={setSelectedUser}
          selectedUserId={selectedUser?._id}
        />
      </div>

      <Card className="hidden sm:flex h-full w-full min-w-3xl max-w-3xl flex-col overflow-hidden rounded-r-xl bg-[url('/bg.jpg')] bg-cover bg-center p-0 ">
        {/* Contact Header */}
        <div className="flex items-center justify-between border-b border-none bg-white px-4 py-2 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="">
              <Avatar className="h-12 w-12 border border-slate-200">
                <AvatarImage
                  src={`selectedUser?.profilePic`}
                  alt="Aadil Khan"
                />
                <AvatarFallback className="bg-slate-100 text-slate-700">
                  <User className="h-5 w-5" />
                </AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              </Avatar>
            </div>

            <div className="flex flex-col gap-1 min-w-0 ">
              <h2 className="truncate font-semibold text-slate-900">
                {selectedUser ? selectedUser?.username : "You"}
              </h2>
              <p className="truncate text-xs text-emerald-600">Online</p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              aria-label="Voice call"
              className="rounded-full p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <Phone className="h-5 w-5" />
            </button>
            <button
              aria-label="Video call"
              className="rounded-full p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <Video className="h-5 w-5" />
            </button>

            {/* three dots */}
            <ThreeDot />
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto bg-transparent px-3 py-6 sm:px-6 scrollbar-none">
          <div className="flex justify-center">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-400 shadow-sm ring-1 ring-slate-200/70">
              Today
            </span>
          </div>

          {/* Received Message */}
          {messages.map((message) => {
            const isSentByMe =
              String(message.senderId) === String(authUser._id);

            return (
              <Message
                key={message._id}
                align={isSentByMe ? "end" : "start"}
                className="items-end gap-2"
              >
                <MessageContent className="max-w-[85%] sm:max-w-[75%]">
                  <Bubble
                    variant={isSentByMe ? "default" : "muted"}
                    className={
                      isSentByMe
                        ? "rounded-2xl rounded-br-sm bg-slate-900 text-white"
                        : "rounded-2xl rounded-bl-sm bg-white"
                    }
                  >
                    <BubbleContent className="text-sm leading-6">
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Shared image"
                          className="mb-2 max-h-72 rounded-lg object-contain"
                          loading="lazy"
                        />
                      )}

                      {message.text && <p>{message.text}</p>}
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            );
          })}
        </div>

        <form
          onSubmit={send}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-100 mx-3 mt-0 mb-3"
        >
          <input
            type="text"
            name="message"
            value={input.text}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                text: e.target.value,
              }))
            }
            placeholder="Type a message..."
            className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />

          {input.images?.map((file, index) => (
            <div key={`${file.name}-${index}`} className="relative">
              
              <CircleX
                className="absolute -right-2 -top-2 cursor-pointer rounded-full bg-white text-red-500"
                size={20}
                onClick={() => {
                  setInput((prev) => ({
                    ...prev,
                    images: prev.images.filter((_, i) => i !== index),
                  }));
                }}
              />

              <img
                src={URL.createObjectURL(file)}
                alt="Image preview"
                className="h-20 w-20 rounded-lg object-cover"
              />
            </div>
          ))}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImages}
          />

          <button
            type="button"
            aria-label="Attach image"
            onClick={() => fileInputRef.current?.click()}
            className="shrink-0 rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Image alt="" className="h-5 w-5" />
          </button>
          <button
            type="submit"
            aria-label="Send message"
            className="shrink-0 rounded-full bg-slate-900 p-2.5 text-white transition hover:bg-slate-700 active:scale-95"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>

        
      </Card>
          
      {/* <About/> */}
      </div>
    </div>
  );
}
