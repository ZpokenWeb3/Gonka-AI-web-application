import {ChatWrapper} from "../components/chat/chat-wrapper";
import {BottomSection} from "../components/chat/bottom-section";
import {Header} from "../components/header";
import {Main} from "../components/chat/main";


export default function Home() {
  return (
      <div className={`flex flex-col w-full h-screen`}>
          <Header/>
          <ChatWrapper/>
          {/*<Main/>*/}
          <BottomSection/>
      </div>
  );
}
