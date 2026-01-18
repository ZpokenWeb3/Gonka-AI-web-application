import { BanknoteArrowDown, ChartNoAxesCombined, Shuffle } from "lucide-react";
import { DepositCard } from "../../components/deposit/deposit-card";
import { Button } from "../../components/ui/button";
import { TransactionHistory } from "../../components/deposit/transaction-history";
import Link from "next/link";

export default function DepositPage() {
  return (
      <div className={`flex flex-col gap-7 p-10 w-full h-screen`}>
       <DepositCard/>
       <div className="flex items-center gap-4 ">
            <Button className="h-[40px] flex-1" variant="secondary">
                + Add funds
            </Button>
            <Button className="h-[40px] flex-1" variant="outline">
                <Shuffle color="#c9c9c9"/>
                Bridge
            </Button>
            <Button className="h-[40px] flex-1" variant="outline">
                <BanknoteArrowDown color="#c9c9c9"/>
                Withdraw
            </Button>
            <Link className="flex-1" href="/analytics">
                <Button className="h-[40px]" variant="outline">
                    <ChartNoAxesCombined color="#c9c9c9"/>
                    Analytics
                </Button>
            </Link>

       </div>
       <TransactionHistory/>
    </div>
  );
}
