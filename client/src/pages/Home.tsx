import axios from "axios";
import { MessageSquareQuote, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { UseChatStore } from "../store/useChatStore";
import SidebarSkeleton from "../components/skeleton/sidebarSkeleton";

type user = {
  firstName: string;
  lastName: string;
  image: string;
};

const Home = () => {
  const [user, setuser] = useState([]);
  const { selectedUser, isMessageLoading, isUserLoading, users } =
    UseChatStore();

  useEffect(() => {
    axios.get("https://dummyjson.com/users").then((res) => {
      setuser(res.data.users);
    });
  }, []);

  return (
    <>
      <div className="w-full h-full flex justify-center items-center ">
        <div className="w-[70vw] h-[80vh] mt-9 flex justify-between rounded-lg shadow-2xs bg-base-300">
          <div className="h-full w-[30%]">
            <div className="w-full h-[70px] flex flex-col  justify-center gap-3 pl-3">
              <div className="flex gap-1">
                <Users className="size-5 text-amber-200" />
                <p className="text-amber-200 text-[13px]">Contacts</p>
              </div>
              <div className="flex gap-2 text-[12px]">
                <input type="checkbox" />

                <p className="text-amber-200">
                  Show online only
                  <span className="pl-2 text-[10px] text-slate-400">
                    (0 online)
                  </span>
                </p>
              </div>
            </div>
            {!selectedUser ? (
              <div className=" w-full h-[87%]">
                <SidebarSkeleton />
              </div>
            ) : (
              <div className=" w-full h-[87%] overflow-auto scroll">
                {user.map((v: user, i) => {
                  return (
                    <div className="w-full mt-0.5 h-12 flex items-center cursor-pointer hover:bg-base-200/50">
                      <img src={v.image} alt="" className="size-8 mx-2" />
                      <div>
                        <p className="text-amber-200 text-[11px]">
                          {v.firstName} {v.lastName}
                        </p>
                        <p className="text-[8px]">Offline</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="h-full w-[100%] flex justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center">
              <MessageSquareQuote className="text-amber-200 animate-bounce" />
              <p className="font-bold text-amber-200">Welcome to GUFF!</p>
              <p className="text-amber-200 text-[10px]">
                Select a conversation from sidebar to start chatting
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
