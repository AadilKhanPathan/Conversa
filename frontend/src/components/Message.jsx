import { Card } from "./ui/card";
import { User, CheckCheck, Phone, Video, MoreVertical } from "lucide-react";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";

import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";
import { Search } from "lucide-react";
import { Image } from "lucide-react";
import { Send } from "lucide-react";

export default function MessageComp() {
  return (
    <div className="flex h-full min-h-0 w-full items-center justify-center bg-slate-100 p-3 sm:p-6">
      <Card className="flex h-full min-h-125 max-h-212 w-full max-w-xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-[url('/bg.jpg')] bg-cover bg-center p-0  shadow-xl shadow-slate-200/60">
        {/* Contact Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="">
              <Avatar className="h-12 w-12 border border-slate-200">
                <AvatarImage src="/bg.jpg" alt="Aadil Khan" />
                <AvatarFallback className="bg-slate-100 text-slate-700">
                  <User className="h-5 w-5" />
                </AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              </Avatar>
            </div>

            <div className="min-w-0">
              <h2 className="truncate font-semibold text-slate-900">
                Aadil Khan
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
            <button
              aria-label="More options"
              className="rounded-full p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto bg-transparent px-3 py-6 sm:px-6">
          <div className="flex justify-center">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-400 shadow-sm ring-1 ring-slate-200/70">
              Today
            </span>
          </div>

          {/* Received Message */}
          <Message className="items-end gap-2">
            <MessageAvatar>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/03.png" alt="Sender" />
                <AvatarFallback className="bg-slate-200 text-xs text-slate-700">
                  R
                </AvatarFallback>
              </Avatar>
            </MessageAvatar>

            <MessageContent className="max-w-[85%] sm:max-w-[75%]">
              <p className="mb-1 ml-1 text-xs font-medium text-slate-500">
                Rahul
              </p>
              <Bubble
                variant="muted"
                className="rounded-2xl rounded-bl-sm bg-white shadow-sm ring-1 ring-slate-200/70"
              >
                <BubbleContent className="text-sm leading-6 text-slate-700">
                  Hey! The build failed during dependency installation.
                </BubbleContent>
              </Bubble>
              <span className="mt-1 ml-1 text-[10px] text-slate-400">
                10:30 AM
              </span>
            </MessageContent>
          </Message>

          {/* Sent Message */}
          <Message align="end" className="items-end gap-2">
            <MessageContent className="max-w-[85%] sm:max-w-[75%]">
              <Bubble className="rounded-2xl rounded-br-sm bg-slate-900 text-white shadow-md shadow-slate-900/10">
                <BubbleContent className="text-sm leading-6 text-white">
                  Can you share the exact error?
                </BubbleContent>
              </Bubble>
              <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-slate-400">
                10:31 AM
                <CheckCheck className="h-3.5 w-3.5 text-sky-500" />
              </div>
            </MessageContent>
          </Message>

          {/* Received Message Group */}
          <Message className="items-end gap-2">
            <MessageAvatar>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/03.png" alt="Sender" />
                <AvatarFallback className="bg-slate-200 text-xs text-slate-700">
                  R
                </AvatarFallback>
              </Avatar>
            </MessageAvatar>

            <MessageContent className="max-w-[85%] sm:max-w-[75%]">
              <BubbleGroup>
                <Bubble
                  variant="muted"
                  className="rounded-2xl rounded-bl-sm bg-white shadow-sm ring-1 ring-slate-200/70"
                >
                  <BubbleContent className="text-sm leading-6 text-slate-700">
                    Here&apos;s the error from the logs.
                  </BubbleContent>
                </Bubble>
                <Bubble
                  variant="muted"
                  className="rounded-2xl rounded-tl-md rounded-bl-sm bg-white shadow-sm ring-1 ring-slate-200/70"
                >
                  <BubbleContent className="text-sm leading-6 text-slate-700">
                    Something went wrong with the build. The libraries are not
                    installed correctly. Try running the build again.
                  </BubbleContent>
                </Bubble>
              </BubbleGroup>
              <span className="mt-1 ml-1 text-[10px] text-slate-400">
                10:32 AM
              </span>
            </MessageContent>
          </Message>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-100 mx-3 mt-0">
          <input
            type="text"
            name="message"
            placeholder="Type a message..."
            className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 outline-none"
          />

          <button
            type="button"
            aria-label="Attach image"
            className="shrink-0 rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Image className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Send message"
            className="shrink-0 rounded-xl bg-slate-900 p-2.5 text-white transition hover:bg-slate-700 active:scale-95"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        {/* Bottom Hint */}
        <div className="border-t border-slate-100 bg-white px-4 py-3 text-center">
          <p className="text-xs text-slate-400">
            Messages are end-to-end in your conversation
          </p>
        </div>
      </Card>
    </div>
  );
}
