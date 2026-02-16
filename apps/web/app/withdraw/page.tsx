import {WithdrawalMethod} from "../../components/withdraw/withdrawal-method";
import {TransferDetails} from "../../components/withdraw/transfer-details";
import {WithdrawCard} from "../../components/withdraw/withdraw-card";

export default function WithdrawPage() {
    return (
        <div className={`flex flex-col md:gap-7 gap-5 md:p-10 p-5 w-full overflow-y-auto h-full`}>
            <WithdrawCard/>
            <WithdrawalMethod/>
            <TransferDetails/>
        </div>
    );
}