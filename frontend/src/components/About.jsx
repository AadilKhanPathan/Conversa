
"use client";

import {
  X,
  Info,
  Phone,
  Mail,
  CalendarDays,
  Users,
  Image as ImageIcon,
  ChevronRight,
  Ban,
  CircleUserRound,
} from "lucide-react";

export default function About({
  selectedUser,
  onClose,
  onSharedMedia,
  onBlockUser,
}) {
  if (!selectedUser) return null;

  const details = [
    {
      icon: Phone,
      label: "Phone",
      value: selectedUser.phone || "Not provided",
    },
    {
      icon: Mail,
      label: "Email",
      value: selectedUser.email || "Not provided",
    },
    {
      icon: CalendarDays,
      label: "Joined",
      value: selectedUser.createdAt
        ? new Date(selectedUser.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Date unavailable",
    },
    {
      icon: Users,
      label: "Status",
      value: selectedUser.isOnline ? "Online" : "Offline",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-title"
        className="flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
              <Info className="h-6 w-6 text-slate-800" />
            </div>

            <div>
              <h2
                id="about-title"
                className="text-lg font-semibold text-slate-900"
              >
                About
              </h2>
              <p className="text-sm text-slate-500">
                Learn more about this contact
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close about modal"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-5 py-6 sm:px-7">
          {/* Profile */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                {selectedUser.profilePic ? (
                  <img
                    src={selectedUser.profilePic}
                    alt={selectedUser.username || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <CircleUserRound className="h-12 w-12 text-slate-400" />
                )}
              </div>

              <span
                className={`absolute bottom-1 right-1 h-5 w-5 rounded-full border-[3px] border-white ${
                  selectedUser.isOnline ? "bg-emerald-500" : "bg-slate-400"
                }`}
              />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-xl font-semibold text-slate-900">
                {selectedUser.username || "Unknown user"}
              </h3>

              <p
                className={`mt-1 flex items-center gap-2 text-sm ${
                  selectedUser.isOnline
                    ? "text-emerald-600"
                    : "text-slate-500"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    selectedUser.isOnline
                      ? "bg-emerald-500"
                      : "bg-slate-400"
                  }`}
                />
                {selectedUser.isOnline ? "Online" : "Offline"}
              </p>

              <p className="mt-1 truncate text-sm text-slate-400">
                @{selectedUser.username || "user"}
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-6 text-sm leading-6 text-slate-600">
            {selectedUser.bio || "Hey there! I'm using Conversa. ✨"}
          </p>

          {/* Contact details */}
          <div className="my-6 border-y border-slate-200 py-2">
            {details.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-xl px-1 py-3"
              >
                <Icon className="h-6 w-6 shrink-0 text-slate-700" />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800">
                    {label}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-slate-400">
                    {value}
                  </p>
                </div>

                <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
              </div>
            ))}
          </div>

          {/* Shared media */}
          <button
            type="button"
            onClick={onSharedMedia}
            className="flex w-full items-center gap-4 rounded-xl px-1 py-3 text-left transition hover:bg-slate-50"
          >
            <ImageIcon className="h-6 w-6 text-slate-700" />

            <span className="flex-1 text-sm font-medium text-slate-800">
              Shared media
            </span>

            <ChevronRight className="h-5 w-5 text-slate-400" />
          </button>

          {/* Block user */}
          <button
            type="button"
            onClick={onBlockUser}
            className="mt-5 flex w-full items-center gap-3 rounded-xl bg-slate-100 px-4 py-4 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <Ban className="h-5 w-5" />
            Block user
          </button>
        </div>
      </section>
    </div>
  );
}
