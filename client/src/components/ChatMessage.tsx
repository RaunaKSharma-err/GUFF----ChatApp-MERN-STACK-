import { Image, Send, X } from "lucide-react";
import { UseChatStore } from "../store/useChatStore";
import { useRef, useState } from "react";

const ChatInput = () => {
  const [text, settext] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessages } = UseChatStore();

  const handleImageChange = (e) => {};
  const removeImage = () => {};
  const handleSendMessage = async () => {};

  return (
    <>
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <div className="p-4 border-t border-base-300 bg-base-300 rounded-r-lg">
        <div className="flex gap-2">
          <input
            type="text"
            className="input input-bordered flex-1 text-sm h-10"
            placeholder="Type a message..."
            // value=""
          />
          <input
            type="image"
            className="input input-bordered flex-1 text-sm h-10"
            placeholder="Type a message..."
            ref={fileInputRef}
            // value=""
          />
          <button
            className="btn rounded-full "
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="size-5 rounded-full" />
          </button>
          <button className="btn btn-primary h-10 min-h-0">
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
};
export default ChatInput;
