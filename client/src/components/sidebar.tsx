import { Users } from "lucide-react";
import { UseChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import SidebarSkeleton from "./skeleton/sidebarSkeleton";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { selectedUser, isUserLoading, users, getUsers, setSelectedUser } =
    UseChatStore();
  const { onlineUsers } = useAuthStore();
  console.log(users);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="h-full w-[25%] min-w-[47px] bg-base-200 rounded-l-lg">
      <div className="w-full h-[70px] flex flex-col  justify-center gap-3 pl-3">
        <div className="flex gap-1">
          <Users className="size-5 text-amber-200" />
          <p className="text-amber-200 text-[13px] hidden lg:block">Contacts</p>
        </div>
        <div className="flex gap-2 text-[12px] ">
          <input type="checkbox" className="hidden lg:block" />
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
          {users.map((user) => {
            return (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full mt-0.5 h-12 flex justify-between items-center cursor-pointer hover:bg-base-300 transition-colors 
                       relative mx-auto lg:mx-0 ${
                         selectedUser?._id === user._id
                           ? "bg-base-300 ring-1 ring-base-300"
                           : ""
                       }
                      `}
              >
                <img
                  src={user.profilePic || "/default.png"}
                  alt=""
                  className="size-8 mx-2"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-2 left-8 size-2 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}
                <div className=" w-full text-left hidden lg:block min-w-0">
                  <p className="text-amber-200 text-[11px]">{user.fullName}</p>
                  <p className="text-[8px]">
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
