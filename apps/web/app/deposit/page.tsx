import { DepositBtns } from "../../components/deposit/deposit-btns";
import { DepositCard } from "../../components/deposit/deposit-card";
import { TransactionHistory } from "../../components/deposit/transaction-history";

export default function DepositPage() {
  return (
      <div className={`flex flex-col md:gap-7 gap-5 md:p-10 p-5 overflow-y-auto h-full`}>
       <DepositCard/>
       <DepositBtns/>
       <TransactionHistory/>
    </div>
  );
}
