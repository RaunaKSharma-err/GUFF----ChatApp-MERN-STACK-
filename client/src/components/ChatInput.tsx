import { Image, Send, X } from "lucide-react";
import { UseChatStore } from "../store/useChatStore";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const ChatInput = () => {
  const [text, settext] = useState("");
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { sendMessages } = UseChatStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessages({
        text: text.trim(),
        image: imagePreview,
        createdAt: "",
        senderId: "",
      });

      settext("");
      setImagePreview(undefined);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Failed to send message :", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <>
      {imagePreview && (
        <div className="relative bg-base-200">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
          />
          <button
            onClick={removeImage}
            className="absolute -top-1.5 left-[68px] w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
            type="button"
          >
            <X className="size-3 cursor-pointer" />
          </button>
        </div>
      )}
      <div className="p-4 border-t border-base-300 bg-base-300 rounded-r-lg">
        <form className="flex-1 items-center" onSubmit={handleSendMessage}>
          <div className="flex gap-2">
            <input
              type="text"
              className="input input-bordered flex-1 text-sm h-10"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => settext(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              placeholder="Type a message..."
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button
              className="btn btn-circle"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image className="size-6 rounded-full" />
            </button>
            <button
              type="submit"
              className="btn btn-primary h-10 min-h-0"
              disabled={!text.trim() && !imagePreview}
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ChatInput;
