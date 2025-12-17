import {ChatWrapper} from "../components/chat/chat-wrapper";
import {BottomSection} from "../components/chat/bottom-section";
import {Navbar} from "../components/navbar/navbar";


export default function Home() {
  return (
      <div className={`flex flex-row w-full h-screen`}>
          <Navbar/>
        <div className="flex flex-col w-full">
            <ChatWrapper/>
            <BottomSection/>
        </div>
      </div>
  );
}
