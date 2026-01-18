import { Button } from "../ui/button"

export const AccountInfo = () => {
    return (
        <div className="flex items-center justify-between pb-7 border-b border-b-[#232330]">
            <div className="flex items-center gap-3">
                <div className="flex w-[70px] h-[70px] bg-gray-300 rounded-lg"/>
                <div className="flex flex-col">
                    <h4 className="text-xl font-semibold text-white">Anonymous User</h4>
                    <p className="text-md text-gray-600">0x1a2b3c4d5e6f7890abcdef1234567890abcdef12</p>
                </div>
            </div>
            <Button className="w-fit" variant="outline">Edit Profile</Button>
        </div>
    )
}