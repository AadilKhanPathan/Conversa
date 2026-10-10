import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function Users() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex min-w-0 items-center gap-3 bg-white p-2 w-2xs">
        <div className="">
          <Avatar className="h-12 w-12 border border-slate-200">
            <AvatarImage src="https://github.com/shadcn.png" alt="Aadil Khan" />
            <AvatarFallback className="bg-slate-100 text-slate-700">
              <User className="h-5 w-5" />
            </AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
        </div>

        <div className="flex flex-col gap-1 min-w-0 ">
          <h2 className="truncate font-semibold text-slate-900">Aadil Khan</h2>
          <p className="truncate text-xs text-emerald-600">new message</p>
        </div>
      </div>
    </div>
  );
}
