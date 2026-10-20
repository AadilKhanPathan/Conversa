
"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MoreVertical,
  UserRound,
  Images,
  Palette,
  UsersRound,
  Check,
  ImagePlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ChangeWallpaper from "./Wallpaper";

const wallpapers = [
  { name: "Default", src: "/bg.jpg" },
  { name: "Mountains", src: "/wallpaper-mountains.jpg" },
  { name: "Sky", src: "/wallpaper-sky.jpg" },
];

export default function ThreeDot2({ onProfile, onMedia, onTeam, onWallpaperChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("/bg.jpg");

  const handleApply = () => {
    onWallpaperChange?.(selected);
    setOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              aria-label="More options"
              className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
          }
        />

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-64 rounded- border border-slate-200/80 bg-white p-2 shadow-xl shadow-slate-900/10"
        >
         
          <DropdownMenuItem
            onClick={onProfile}
            className="gap-3 rounded-xl px-3 py-2.5 focus:bg-slate-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl ">
              <UserRound className="h-4 w-4" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-medium text-slate-800">Profile</span>
           
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onMedia}
            className="gap-3 rounded-xl px-3 py-2.5 focus:bg-slate-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl ">
              <Images className="h-4 w-4" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-medium text-slate-800">
                Shared media
              </span>
              
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-0 bg-slate-200" />

          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="gap-3 rounded-xl px-3 py-2.5 focus:bg-blue-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl ">
              <Palette className="h-4 w-4" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-medium text-slate-800">
                Change wallpaper
              </span>
              
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-0 bg-slate-200" />

          <DropdownMenuItem
            onClick={onTeam}
            className="gap-3 rounded-xl px-3 py-2.5 focus:bg-slate-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl ">
              <UsersRound className="h-4 w-4" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-medium text-slate-800">New team</span>
              
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
        
        {open && <ChangeWallpaper />}
        
     
    </>
  );
}
