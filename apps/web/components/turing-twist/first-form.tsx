import { Button } from "../ui/button";
import { Play } from "lucide-react";
import { FC, useState } from "react";
import { Timeblock } from "./timeblock";

interface Props {
    setPlay: (isPlay: boolean) => void;
}

export const FirstForm: FC<Props> = ({ setPlay }) => {
    const [isTime, setIsTime] = useState(false);

    return (
        <>
            <h3 className="text-[70px] text-white font-bold">Turing's Twist</h3>
            <div className="flex flex-col gap-5">
                <ul className="space-y-1 text-[15px] text-white list-decimal">
                    <span className="text-[18px] font-semibold pb-3">Game Rules:</span>
                    <li>Start the Game: Launch the game and wait for 5 seconds while the system connects you to a chat
                        partner.
                    </li>
                    <li>Match 1-on-1: After the wait, you will be paired with either a human or an AI.</li>
                    <li>Limited Messages: You have 5 messages to communicate with your partner.</li>
                    <li>Decision: After sending and receiving 5 messages, you must decide whether your partner is a
                        human or
                        an AI.
                    </li>
                    <li>Winning: Correctly identify your partner to win the round.</li>
                </ul>

                <ul className="space-y-1 text-[15px] text-white list-disc">
                    <span className="text-[18px] font-semibold pb-3">Tips:</span>
                    <li>Ask questions that reveal creativity, emotions, or personal experience.
                    </li>
                    <li>Look for unnatural responses or overly formal patterns that may indicate AI.</li>
                    <li>Be concise and strategic — you only have 5 messages!</li>
                </ul>
            </div>

            <Button
                onClick={() => setIsTime(true)}
                className="w-[200px] h-[60px] text-[25px]"
                variant="secondary"
            >
                Play
                <Play width={32} height={32} color="#ffffff" />
            </Button>

            {isTime && (
                <Timeblock
                    duration={15}
                    onFinish={() => setPlay(true)}
                />
            )}
        </>
    );
};

