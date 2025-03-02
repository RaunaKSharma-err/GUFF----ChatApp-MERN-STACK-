import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import { io, Socket } from "socket.io-client";
const BASE_URL = "http://localhost:5000";

type User = {
  _id: string;
  fullName: string;
  profilePic?: string;
  isOnline?: boolean;
};

type authStore = {
  authUser: any;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingUp: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: object) => Promise<void>;
  login: (data: object) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: string) => Promise<void>;
  onlineUsers: string[];
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
};
export const useAuthStore = create<authStore>((set, get) => ({
  authUser: User || null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingUp: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
      if (response.data) {
        get().connectSocket();
      }
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingUp: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      console.log("Error in signup", error);
      toast.error("Account creation Failed!");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      console.log("Error in login", error);
      toast.error("Account doestn't exists!");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      console.log("Error in logout", error);
      toast.error("Logout problem");
    }
  },

  updateProfile: async (data: string) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", {
        profilePic: data,
      });
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error("failed to upload profile picture!");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;
    const sockets = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket?.connect();
    set({ socket: sockets });

    sockets?.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
