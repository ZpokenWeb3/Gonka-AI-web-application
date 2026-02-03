import {WithdrawalMethod} from "../../components/withdraw/withdrawal-method";
import {TransferDetails} from "../../components/withdraw/transfer-details";
import {WithdrawCard} from "../../components/withdraw/withdraw-card";

export default function WithdrawPage() {
    return (
        <div className={`flex flex-col gap-7 p-10 w-full overflow-y-auto h-full`}>
            <WithdrawCard/>
            <WithdrawalMethod/>
            <TransferDetails/>
        </div>
    );
}
