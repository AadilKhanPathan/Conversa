"use client";

import { Card } from "@/components/ui/card";
import { User, CheckCheck, Phone, Video, Image, Send } from "lucide-react";

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";

import { Message, MessageAvatar, MessageContent } from "@/components/ui/message";

// import ThreeDot from "@/app/components/Threedot";
import { useAuth } from "@/Context/AuthContext";
import Users from "@/components/Users";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Threedot from "@/components/Threedot";

export default function MessageComp() {
  const { authUser, socket } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  // send message
  const [input, setInput] = useState({
    text: "",
    images: [],
  });

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setInput((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const send = async (e) => {
    e.preventDefault();

    if (!selectedUser || !input.text.trim()) return;

    try {
      setLoading(true);

      const { data } = await api.post(`/message/send/${selectedUser._id}`, {
        text: input.text,
      });

      if (data.success) {
        setMessages((prev) => [...prev, data.newMessage]);

        setInput((prev) => ({
          ...prev,
          text: "",
        }));
      }
    } catch (error) {
      console.error(error);
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
    console.log(socket
      
    )
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
  <div className="flex h-dvh w-full justify-center bg-slate-100 p-0 sm:p-6">
    <div className="hidden w-sm border-black bg-white rounded-none lg:w-2xs">
      <Users
        onSelectUser={setSelectedUser}
        selectedUserId={selectedUser?._id}
      />
    </div>

    <Card className="flex h-full w-full max-w-xl flex-col overflow-hidden rounded-none border-0 bg-[url('/bg.jpg')] bg-cover bg-center p-0 sm:border-2 sm:border-black">
      {/* Contact Header */}
      <div className="flex items-center justify-between border-b bg-white px-3 py-2 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Avatar className="h-10 w-10 border border-slate-200 sm:h-12 sm:w-12">
            <AvatarImage
              src={selectedUser?.profilePic}
              alt={selectedUser?.username || "User"}
            />
            <AvatarFallback className="bg-slate-100 text-slate-700">
              <User className="h-5 w-5" />
            </AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>

          <div className="flex flex-col min-w-0">
            <h2 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
              {selectedUser ? selectedUser?.username : "You"}
            </h2>
            <p className="truncate text-xs text-emerald-600">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-2">
          <button
            type="button"
            aria-label="Voice call"
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            type="button"
            aria-label="Video call"
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Video className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* three dots */}
          <Threedot />
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-transparent px-3 py-4 sm:gap-6 sm:px-6 scrollbar-none">
        <div className="flex justify-center">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-400 shadow-sm ring-1 ring-slate-200/70">
            Today
          </span>
        </div>

        {/* Messages list */}
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
                    {message.text}
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          );
        })}
      </div>

      {/* Input Section */}
      <div className="bg-white/80 p-2 backdrop-blur-sm sm:bg-transparent sm:p-0">
        <form
          onSubmit={send}
          className="mx-1 my-1 flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm transition focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-100 sm:mx-3 sm:mb-2 sm:p-2"
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
            className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:px-3 sm:py-2"
          />

          <button
            type="button"
            aria-label="Attach image"
            className="shrink-0 rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:p-2.5"
          >
            <Image alt="" className="h-5 w-5" />
          </button>

          <button
            type="submit"
            aria-label="Send message"
            className="shrink-0 rounded-xl bg-slate-900 p-2 text-white transition hover:bg-slate-700 active:scale-95 sm:p-2.5"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>

      {/* Bottom Hint */}
      <div className="border-t border-slate-100 bg-white px-4 py-2 text-center sm:py-3">
        <p className="text-[10px] text-slate-400 sm:text-xs">
          Messages are end-to-end in your conversation
        </p>
      </div>
    </Card>
  </div>
);}