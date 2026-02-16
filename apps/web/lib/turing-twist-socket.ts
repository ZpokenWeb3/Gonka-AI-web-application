import { io, type Socket } from "socket.io-client";

let socketSingleton: Socket | null = null;

export function getTuringTwistSocket(): Socket {
  if (typeof window === "undefined") {
    throw new Error("Socket can only be used in the browser");
  }

  if (socketSingleton) return socketSingleton;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

  socketSingleton = io(baseUrl, {
    withCredentials: true,
    autoConnect: true,
  });

  return socketSingleton;
}

export function resetTuringTwistSocketForTests() {
  socketSingleton?.disconnect();
  socketSingleton = null;
}

