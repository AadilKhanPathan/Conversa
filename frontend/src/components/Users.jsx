"use client";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import api from "@/lib/axios";
import axios from "axios";
import { Search } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ThreeDot2 from "./ThreeDot2";

export default function Users({ onSelectUser, selectedUserId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await api.get("/message/contacts");
        // const res = await axios.get("http://localhost:2000/api/message/contacts");
        console.log(res.data);
        setUsers(res.data.users);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    }
    getUsers();
  }, []);

  console.log(users);
  return (
    <div className="contact-page flex flex-col justify-center ">
      {/* Header */}
      <div className="w-full border-r-0 border-slate-200">
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Conversa<span className="text-blue-400 text-3xl">.</span>
          </span>

          <div
            className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="More options"
          >
            <ThreeDot2 />
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
            <Search size={18} className="shrink-0 text-slate-400" />

            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => onSelectUser(user)}
          className="group flex min-w-0 w-2xs cursor-pointer items-center gap-3 rounded-xl p-2 pl-5
      transition-all duration-200 hover:bg-blue-400/10
      active:scale-[0.98]"
        >
          <div>
            <Avatar className="h-12 w-12 border border-slate-200 transition-transform duration-200 group-hover:scale-105">
              <AvatarImage src={user.profilePic} alt={user.username} />
              <AvatarFallback className="bg-slate-100 text-slate-700">
                <User className="h-5 w-5" />
              </AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <h2 className="truncate font-semibold text-slate-900 transition-colors duration-200 group-hover:text-blue-700">
              {user.username}
            </h2>
            <p className="truncate text-xs text-emerald-600">New message</p>
          </div>
        </div>
      ))}
    </div>
  );
}
