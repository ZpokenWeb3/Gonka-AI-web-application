import {Button} from "../ui/button";

export const AmountBlock = () => {
    return (
        <div className="flex flex-col gap-5 pb-5 border-b border-b-[#232328]">
            <div className="flex flex-col gap-2.5">
                <h5 className="text-md text-[#c9c9c9]">Amount</h5>
                <div className=" border border-[#232328] bg-[#09090B] p-3 rounded-sm">
                    <input placeholder="0.00"
                           className="text-sm text-[#c9c9c9] placeholder:text-[#c9c9c9] outline-none ring-0"
                           type="text"/>
                </div>
            </div>
            <div className="flex items-center md:gap-5 gap-1">
                <Button className="h-[32px] flex-1" variant="outline">
                    25%
                </Button>
                <Button className="h-[32px] flex-1" variant="outline">
                    50%
                </Button>
                <Button className="h-[32px] flex-1" variant="outline">
                    75%
                </Button>
                <Button className="h-[32px] flex-1" variant="outline">
                    100%
                </Button>
            </div>
        </div>
    )
}