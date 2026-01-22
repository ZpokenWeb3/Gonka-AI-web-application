import { DepositBtns } from "../../components/deposit/deposit-btns";
import { DepositCard } from "../../components/deposit/deposit-card";
import { TransactionHistory } from "../../components/deposit/transaction-history";

export default function DepositPage() {
  return (
      <div className={`flex flex-col gap-7 p-10 w-full h-screen`}>
       <DepositCard/>
       <DepositBtns/>
       <TransactionHistory/>
    </div>
  );
}
