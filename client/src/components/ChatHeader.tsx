import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { UseChatStore } from "../store/useChatStore";

export const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = UseChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="bg-base-300 px-4 py-3 border-b border-base-300 flex justify-between rounded-r-lg">
      <div className="flex items-center gap-3">
        <img
          src={selectedUser?.profilePic || "/default.png"}
          alt=""
          className="size-12 mx-1 rounded-full"
        />
        <div>
          <h3 className="font-medium text-[clamp(0.6rem,1vw,2rem)]">
            {selectedUser?.fullName}
          </h3>
          <p className="text-[clamp(0.5rem,0.8vw,2rem)] text-base-content/70">
            {onlineUsers.includes(selectedUser?._id ?? "")
              ? "online"
              : "offline"}
          </p>
        </div>
      </div>
      <button className="btn" onClick={() => setSelectedUser(null)}>
        <X className="size-4" />
      </button>
    </div>
  );
};
