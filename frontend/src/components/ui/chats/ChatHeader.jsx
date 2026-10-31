import Threedot from '@/components/Threedot'
import { Video } from 'lucide-react'
import { Phone } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarBadge, AvatarImage } from '../avatar'
import { User } from 'lucide-react'

export default function ChatHeader({selectedUser}) {
  return (
    <div>
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
            <Threedot />
          </div>
        </div>
    </div>
  )
}
