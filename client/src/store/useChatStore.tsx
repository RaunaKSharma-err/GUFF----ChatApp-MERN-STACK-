import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

type message = {
  senderId: string;
  text: string;
  image: string | undefined;
  createdAt: string;
};

type User = {
  _id: string;
  fullName: string;
  profilePic?: string;
  isOnline?: boolean;
};

type chatStore = {
  messages: message[];
  users: User[];
  selectedUser: User | null;
  isUserLoading: boolean;
  isMessageLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (data: string | undefined) => Promise<void>;
  setSelectedUser: (data: User | null) => void;
  sendMessages: (messageData: message) => Promise<void>;
  subscribeToMessages: () => void;
  unSubscribeFromMessages: () => void;
};

export const UseChatStore = create<chatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const response = await axiosInstance.get("/message/users");
      set({ users: response.data });
    } catch (error) {
      console.log("Error in getting users", error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const response = await axiosInstance.get(`/message/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      console.log("Error in getting messages", error);
      toast.error("Error in getting messages");
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessages: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const response = await axiosInstance.post(
        `/message/send${selectedUser?._id}`,
        messageData
      );
      set({ messages: [...messages, response.data] });
    } catch (error) {
      console.log("Error in sending messages", error);
      toast.error("Error in sending messages");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket?.on("newMessages", (newMessage) => {
      if (newMessage.senderId != selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unSubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessages");
  },
  setSelectedUser: (selectedUser: User | null) => {
    set({ selectedUser: selectedUser });
  },
}));
