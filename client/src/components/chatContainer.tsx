import { useEffect } from "react";
import { UseChatStore } from "../store/useChatStore";
import { ChatHeader } from "./ChatHeader";
import ChatMessage from "./ChatMessage";

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
        chats
        <ChatMessage />
      </div>
      
    </>
  );
};

export default ChatContainer;
