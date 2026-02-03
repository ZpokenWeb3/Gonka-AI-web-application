export const WithdrawCard = () => {
    return (
        <div
            className="relative flex flex-col h-[300px] gap-7 w-full p-8 border border-[#232330] rounded-xl">
            <div className="
                absolute right-0 top-0 h-full w-[45%]
                bg-gradient-to-l from-[#6B26D9]/15 to-transparent
                pointer-events-none
            "/>

            <h5 className="text-lg text-[#c9c9c9]">Available to withdraw</h5>

            <div className="flex flex-col">
                <h3 className="text-[40px] font-semibold text-white">
                    125.45 <span className="text-xl text-[#c9c9c9]">GNK</span>
                </h3>
                <h6 className="text-xl text-[#c9c9c9]">≈ $25.09 USD</h6>
            </div>
        </div>
    )
}