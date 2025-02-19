import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

type chatStore = {
  messages: string[];
  users: string[];
  selectedUser: string | null;
  isUserLoading: boolean;
  isMessageLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (data: number) => Promise<void>;
  setSelectedUser: (data: string) => void;
};

export const UseChatStore = create<chatStore>((set) => ({
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
      toast.error("Error in getting users");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId: number) => {
    set({ isMessageLoading: true });
    try {
      const response = await axiosInstance.get(`/message/${userId}`);
      set({ users: response.data });
    } catch (error) {
      console.log("Error in getting messages", error);
      toast.error("Error in getting messages");
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: (selectedUser: string) => {
    set({ selectedUser });
  },
}));
