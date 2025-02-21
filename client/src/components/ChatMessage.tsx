import { Send } from "lucide-react";

const ChatInput = () => {
  return (
    <div className="p-4 border-t border-base-300 bg-base-100">
      <div className="flex gap-2">
        <input
          type="text"
          className="input input-bordered flex-1 text-sm h-10"
          placeholder="Type a message..."
          // value=""
        />
        <button className="btn btn-primary h-10 min-h-0">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};
export default ChatInput;
