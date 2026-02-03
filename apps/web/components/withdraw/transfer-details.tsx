import {AmountBlock} from "./amount-block";
import {TransactionSummary} from "./transaction-summary";
import {Button} from "../ui/button";

export const TransferDetails = () => {
    return (
        <div className="flex flex-col gap-5">
            <h4 className="text-xl font-semibold text-white">
                Transfer Details
            </h4>
            <div className="flex flex-col gap-5 bg-[#131316] border border-[#232328] p-5 rounded-md">
                <div className="flex flex-col gap-2.5">
                    <h5 className="text-md text-[#c9c9c9]">Recipient Address</h5>
                    <div className=" border border-[#232328] bg-[#09090B] p-3 rounded-sm">
                        <input placeholder="0x..."
                               className="text-sm text-[#c9c9c9] placeholder:text-[#c9c9c9] outline-none ring-0"
                               type="text"/>
                    </div>
                </div>
                <AmountBlock />
                <TransactionSummary/>
                <Button variant="secondary">Withdraw</Button>
            </div>

        </div>
    )
}