'use client'

import {FirstForm} from "../../components/turing-twist/first-form";
import {ChatTuringForm} from "../../components/turing-twist/chat-turing-form";
import {useState} from "react";

export default function TuringTwistPage() {
    const [isPlay, setPlay] = useState(false);
    return (
        <div className={`flex flex-col items-center justify-center gap-15 p-10 w-full overflow-y-auto h-full`}>
            {!isPlay && (
                <FirstForm setPlay={setPlay}/>
            )}
            {isPlay && (
                <ChatTuringForm/>
            )}
        </div>
    );
}
