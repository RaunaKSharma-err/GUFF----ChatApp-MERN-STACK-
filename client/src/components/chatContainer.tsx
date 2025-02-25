import { useEffect } from "react";
import { UseChatStore } from "../store/useChatStore";
import { ChatHeader } from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageSkeleton from "./skeleton/messageSkeleton";
import "../App.css";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {
  const { isMessageLoading, selectedUser, getMessages, messages } =
    UseChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser?._id);
  }, [getMessages, selectedUser?._id]);

  if (isMessageLoading)
    return (
      <>
        <div className="w-full h-full flex flex-col bg-base-200 overflow-auto rounded-r-lg">
          <ChatHeader />
          <MessageSkeleton />
          <ChatInput />
        </div>
      </>
    );

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <ChatHeader />
        <div className="w-full h-[396px] bg-base-200 overflow-auto">
          {messages.map((v, i) => {
            return (
              <div
                key={i}
                className={`chat ${
                  v.senderId === authUser._id ? "chat-start" : "chat-end"
                }  p-3`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={
                        v.senderId === authUser._id
                          ? authUser.profilePic 
                          : selectedUser?.profilePic || "/default.png"
                      }
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {selectedUser?.fullName}
                  <time className="text-xs opacity-50">
                    {v.createdAt.split("T")[0]}
                  </time>
                </div>
                <div className="chat-bubble">
                  {v.image && (
                    <img
                      src={v.image}
                      alt="attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {v.text && <p>{v.text}</p>}
                </div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            );
          })}
        </div>
        <ChatInput />
      </div>
    </>
  );
};

export default ChatContainer;
