'use client'

import {Button} from "../ui/button";
import {CircleQuestionMark, HatGlasses, KeyRound, Plus} from "lucide-react";
import {ChatList} from "./chat-list";
import {Logo} from "../ui/logo";
import { useCreateChat } from "../../hooks/useChats";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Navbar = () => {
    const createChatMutation = useCreateChat();
    const router = useRouter();

    const handleCreateChat = () => {
        createChatMutation.mutate(undefined, {
            onSuccess: (response) => {
                router.push(`/chat/${response.data.id}`);
            },
        });
    };

    return (
        <div className="md:flex hidden flex-col w-[320px] bg-[#0f0f0f] border-r border-[#232330]">
            <Link href="/">
                <div className="flex items-center gap-3 px-4 pt-4 pb-2">
                    <Logo/>
                    <div className="flex flex-col">
                        <h2 className="text-xl text-[#E0E4EB] font-semibold">GONka</h2>
                        <p className="text-xs text-[#a7a7b8]">
                            Decentralized AI access</p>
                    </div>
                </div>
            </Link>
            <div className="flex flex-col gap-5 p-4">
                <Button onClick={handleCreateChat} variant="secondary" disabled={createChatMutation.isPending}>
                    <Plus width={15} height={15} color="#ffffff"/>
                    {createChatMutation.isPending ? "Creating..." : "New Chat"}
                </Button>
            </div>
            <ChatList/>
            <div className="flex flex-col gap-3">
                <div className="flex px-2 gap-3">
                    <Link className="w-[55%]" href="/developer-api">
                        <Button variant="default">
                            <KeyRound width={16} height={16} color="#3F434D"/>
                            Developer API
                        </Button>
                    </Link>
                    <Link
                        href="https://gonka.ai/introduction/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[100%]"
                        >
                        <Button variant="default" className="w-[100%]">
                            <CircleQuestionMark width={16} height={16} color="#3F434D" />
                            Help
                        </Button>
                    </Link>
                </div>
                <div className="px-2">
                    <Link href="/turing-twist">
                        <Button variant="secondary" className="flex items-center gap-2">
                            Turing Twist
                            <HatGlasses color="#ffffff"/>
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center p-4 gap-1.5 border-t border-[#232330]">
                    <p className="text-xs text-[#3F434D]">Dark-mode only • v1.0 prototype</p>
                </div>
            </div>
        </div>
    )
}
