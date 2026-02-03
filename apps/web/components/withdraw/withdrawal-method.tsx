import {Button} from "../ui/button";
import Link from "next/link";
import {BanknoteArrowDown, ChartNoAxesCombined, Shuffle} from "lucide-react";

export const WithdrawalMethod = () => {
    return (
        <div className="flex items-center gap-4">
            <Button className="h-[40px] flex-1" variant="outline">
                <BanknoteArrowDown color="#c9c9c9"/>
                Direct Transfer
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