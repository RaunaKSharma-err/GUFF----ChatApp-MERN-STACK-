import { MessageSquareQuote } from "lucide-react";
import { UseChatStore } from "../store/useChatStore";
import ChatContainer from "../components/chatContainer";
import Sidebar from "../components/sidebar";

const Home = () => {
  const { selectedUser } = UseChatStore();

  return (
    <>
      <div className="w-full h-full flex justify-center items-center ">
        <div className="w-[100vw] h-[100vh] md:w-[70vw] md:h-[80vh] md:mt-9 mt-1 flex justify-between rounded-lg shadow-2xs bg-base-300">
          <Sidebar />
          <div className="h-full w-[100%] flex justify-center items-center rounded-r-lg">
            {selectedUser ? (
              <ChatContainer />
            ) : (
              <div className="flex flex-col gap-4 justify-center items-center">
                <MessageSquareQuote className="text-amber-200 animate-bounce" />
                <p className="font-bold text-amber-200">Welcome to GUFF!</p>
                <p className="text-amber-200 text-[clamp(0.5rem,1vw,2rem)]">
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
