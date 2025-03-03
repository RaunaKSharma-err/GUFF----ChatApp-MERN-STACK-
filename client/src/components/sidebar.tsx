import { Users } from "lucide-react";
import { UseChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import SidebarSkeleton from "./skeleton/sidebarSkeleton";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { selectedUser, isUserLoading, users, getUsers, setSelectedUser } =
    UseChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineUserOnly, setShowOnlineUserOnly] = useState(false);
  const filteredUser = showOnlineUserOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="h-full w-[25%] min-w-[47px] bg-base-300 rounded-l-lg">
      <div className="w-full h-[70px] flex flex-col mb-3 justify-center gap-3 pl-3">
        <div className="flex gap-1 mt-3 ml-2">
          <Users className="size-5 text-amber-200" />
          <p className="text-amber-200 font-medium hidden lg:block">Contacts</p>
        </div>
        <div className="flex gap-2 text-[12px] ">
          <input
            checked={showOnlineUserOnly}
            onChange={(e) => setShowOnlineUserOnly(e.target.checked)}
            type="checkbox"
            className="hidden lg:block checkbox checkbox-sm"
          />
          <p className="text-amber-200 hidden lg:block">
            Online only
            <span className="pl-2 text-[10px] text-slate-400">
              ( {onlineUsers.length} online )
            </span>
          </p>
        </div>
      </div>
      {isUserLoading ? (
        <div className=" w-full h-[87%]">
          <SidebarSkeleton />
        </div>
      ) : (
        <div className=" w-full h-[87%] overflow-auto scroll ">
          {filteredUser.map((user) => {
            return (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full mt-0.5 h-12 flex justify-between items-center cursor-pointer hover:bg-base-200 transition-colors 
                       relative mx-auto lg:mx-0 ${
                         selectedUser?._id === user._id
                           ? "bg-base-200 ring-1 ring-base-200"
                           : ""
                       }
                      `}
              >
                <img
                  src={user.profilePic || "/default.png"}
                  alt=""
                  className="size-9 mx-2 rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-2 left-8 size-2 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}
                <div className=" w-full text-left hidden lg:block min-w-0">
                  <p className="text-amber-200 text-[14px]">{user.fullName}</p>
                  <p className="text-[10px]">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
