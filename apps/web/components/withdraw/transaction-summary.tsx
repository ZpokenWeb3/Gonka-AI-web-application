export const TransactionSummary = () => {
    return (
        <div className="flex flex-col gap-2.5 bg-[#09090B] p-4 rounded-md">
            <h5 className="text-md text-[#8c8c8c]">Transaction summary</h5>
            <div className="flex flex-col text-sm text-[#c9c9c9] pb-2.5 border-b border-b-[#232328] gap-1">
                <div className="flex items-center justify-between">
                    <p>Amount</p>
                    <p>0.00 GNK</p>
                </div>
                <div className="flex items-center justify-between">
                    <p>Network fee (estimated)</p>
                    <p>~0.25 GNK</p>
                </div>
                <div className="flex items-center justify-between">
                    <p>Processing time</p>
                    <p>~30 seconds</p>
                </div>
            </div>
            <div className="flex items-center justify-between font-medium text-white">
                <p>You'll receive</p>
                <p>~30 seconds</p>
            </div>
        </div>
    )
}