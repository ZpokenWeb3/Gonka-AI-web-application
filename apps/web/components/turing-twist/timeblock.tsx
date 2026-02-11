import { useState, useEffect } from "react";

interface TimeblockProps {
    duration?: number;
    onFinish: () => void;
}

export const Timeblock = ({ duration = 15, onFinish }: TimeblockProps) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (time >= duration) {
            onFinish();
            return;
        }

        const interval = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [time, duration, onFinish]);

    return (
        <div className="flex z-[100] items-center justify-center fixed inset-0 bg-black/50 backdrop-blur-sm">
            <div className="flex sm:items-center items-end justify-center relative h-full">
                <div className="flex flex-col gap-5 items-center p-4">
                    <p className="text-[20px] text-white mb-2">Waiting for players</p>
                    <div className="flex space-x-2 mb-2">
                        <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-0"></span>
                        <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></span>
                        <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></span>
                    </div>
                    <h4 className="text-white text-[22px]">{time}s</h4>
                </div>
            </div>
        </div>
    );
};
