import {Button} from "../ui/button";
import Link from "next/link";
import {BanknoteArrowDown, ChartNoAxesCombined, Shuffle} from "lucide-react";

export const WithdrawalMethod = () => {
    return (
        <div className="flex items-center md:gap-4 gap-1">
            <Button className="h-[40px] flex-1" variant="outline">
                <BanknoteArrowDown color="#c9c9c9"/>
                <div className="flex items-center gap-1">
                    Direct<p className="md:flex hidden">Transfer</p>
                </div>
            </Button>
            <Link className="flex-1" href="/bridge">
                <Button className="h-[40px]" variant="outline">
                    <Shuffle color="#c9c9c9"/>
                    Bridge
                </Button>
            </Link>
            <Link className="flex-1" href="/analytics">
                <Button className="h-[40px]" variant="outline">
                    <ChartNoAxesCombined color="#c9c9c9"/>
                    Swap
                </Button>
            </Link>
        </div>
    )
}