import { MessageSquareQuote } from "lucide-react";
import { UseChatStore } from "../store/useChatStore";
import ChatContainer from "../components/chatContainer";
import Sidebar from "../components/sidebar";

const Home = () => {
  const { selectedUser } = UseChatStore();

  return (
    <>
      <div className="w-full h-full flex justify-center items-center ">
        <div className="w-[70vw] h-[80vh] mt-9 flex justify-between rounded-lg shadow-2xs bg-base-300">
          <Sidebar />
          <div className="h-full w-[100%] flex justify-center items-center">
            {selectedUser ? (
              <ChatContainer />
            ) : (
              <div className="flex flex-col gap-4 justify-center items-center">
                <MessageSquareQuote className="text-amber-200 animate-bounce" />
                <p className="font-bold text-amber-200">Welcome to GUFF!</p>
                <p className="text-amber-200 text-[10px]">
                  Select a conversation from sidebar to start chatting
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
