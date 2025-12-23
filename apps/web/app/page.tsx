'use client'

import {ChatWrapper} from "../components/chat/chat-wrapper";
import {Header} from "../components/header";
import {Main} from "../components/chat/main";
import { useChatStore } from "../store/useChatStore";


export default function Home() {
  const isActive = useChatStore((state) => state.isActive);

  return (
      <div className={`flex flex-col items-center w-full h-screen`}>
          
          {isActive ? (
            <ChatWrapper/>
          ) : (
            <Main/>
          )}
          
          
      </div>
  );
}
