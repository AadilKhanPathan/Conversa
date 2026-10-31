import { Send, CircleX, Image } from "lucide-react";

export default function MessageInput({
  input,
  setInput,
  send,
  fileInputRef,
  handleImages,
}) {
  return (
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
  );
}
