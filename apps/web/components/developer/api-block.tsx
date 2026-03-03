import { useState } from "react"
import { KeyRound } from "lucide-react"
import { Button } from "../ui/button"
import { DeleteKeyForm } from "./delete-key-form"
import {Modal} from "../ui/modal";

interface ApiKey {
    id: string;
    name: string;
    keyPrefix: string;
    createdAt: string;
    lastUsedAt: string | null;
    isActive: boolean;
}

interface Props {
    apiKey: ApiKey;
    onDelete: () => void;
}

export const APIBlock: React.FC<Props> = ({ apiKey, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false)

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleConfirmDelete = () => {
        onDelete()
        setIsOpen(false)
    }

    return (
        <>
            <div className="flex flex-col gap-3 w-full p-5 rounded-[15px] border border-[#232328]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <KeyRound width={18} height={18} color="#ffffff"/>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-[18px] leading-4.5 text-white font-semibold">
                                {apiKey.name}
                            </h2>
                            <p className="text-[11px] text-[#707070]">
                                {apiKey.keyPrefix}...
                            </p>
                        </div>
                    </div>

                    <div className={`flex items-center justify-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        apiKey.isActive
                            ? "bg-[#6B26D9] text-[#c8bade]"
                            : "bg-red-900 text-red-400"
                    }`}>
                        {apiKey.isActive ? "ACTIVE" : "INACTIVE"}
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <p className="text-[11px] text-[#707070]">
                        Created: {formatDate(apiKey.createdAt)}
                    </p>
                    {apiKey.lastUsedAt && (
                        <p className="text-[11px] text-[#707070]">
                            Last used: {formatDate(apiKey.lastUsedAt)}
                        </p>
                    )}
                    <p className="text-[11px] text-[#707070]">
                        Rate: 60 req/min
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        className="w-[54px] h-[26px] text-[12px]"
                        variant="outline"
                    >
                        Edit
                    </Button>

                    <Button
                        className="w-[65px] h-[26px] text-[#d94149] text-[12px]"
                        variant="outline"
                        onClick={() => setIsOpen(true)}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            {isOpen && (
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} form={<DeleteKeyForm
                    keyName={apiKey.name}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setIsOpen(false)}
                />}/>
            )}
        </>
    )
}