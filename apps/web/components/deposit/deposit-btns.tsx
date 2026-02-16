'use client'

import { BanknoteArrowDown, ChartNoAxesCombined, Shuffle } from "lucide-react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "../ui/modal";
import { TopUpForm } from "./top-up-form";

export const DepositBtns = () => {
    const [isOpen, setOpen] = useState<boolean>(false)
    return (
        <div className="flex items-center md:gap-4 gap-1">
            <Button onClick={() => setOpen(true)} className="h-[40px] flex-1" variant="secondary">
                + <p className="md:flex hidden">Add funds</p>
            </Button>
            <Link className="flex-1" href="/bridge">
                <Button className="h-[40px] flex-1" variant="outline">
                    <Shuffle color="#c9c9c9"/>
                    <p className="md:flex hidden">Bridge</p>
                </Button>
            </Link>
            <Link className="flex-1" href="/withdraw">
                <Button className="h-[40px] flex-1" variant="outline">
                    <BanknoteArrowDown color="#c9c9c9"/>
                    <p className="md:flex hidden">Withdraw</p>
                </Button>
            </Link>
            <Link className="flex-1" href="/analytics">
                <Button className="h-[40px]" variant="outline">
                    <ChartNoAxesCombined color="#c9c9c9"/>
                    <p className="md:flex hidden">Analytics</p>
                </Button>
            </Link>

            {isOpen && (
                <Modal isOpen={isOpen} onClose={() => setOpen(false)} form={ <TopUpForm/> }/>
            )}
        </div>
    )
}