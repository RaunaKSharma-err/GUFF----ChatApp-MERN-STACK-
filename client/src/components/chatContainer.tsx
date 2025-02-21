import { useEffect } from "react";
import { UseChatStore } from "../store/useChatStore";
import { ChatHeader } from "./ChatHeader";
import ChatInput from "./ChatMessage";

const ChatContainer = () => {
  const { isMessageLoading, selectedUser, getMessages, messages } =
    UseChatStore();

  useEffect(() => {
    getMessages(selectedUser?._id);
  }, [getMessages, selectedUser?._id]);

  if (isMessageLoading) return <div>loading...</div>;

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <ChatHeader />
        <div className="w-full h-full">
          <div className="chat chat-start p-3">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              crush
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">I love you</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end p-3">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              you
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I !love you too</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>
        <ChatInput />
      </div>
    </>
  );
};

export default ChatContainer;
