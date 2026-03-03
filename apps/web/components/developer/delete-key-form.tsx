import { Button } from "../ui/button"

interface Props {
    keyName: string
    onConfirm: () => void
    onCancel: () => void
}

export const DeleteKeyForm: React.FC<Props> = ({
                                                   keyName,
                                                   onConfirm,
                                                   onCancel
                                               }) => {
    return (
        <div className="flex flex-col items-center gap-4 w-[500px] bg-[#131316] p-5 rounded-[12px]">
            <p className="text-white text-[14px]">
                Are you sure that you want to delete "{keyName}" key?
            </p>

            <div className="flex items-center w-full gap-2">
                <Button
                    variant="destructive"
                    onClick={onConfirm}
                    className="w-1/2"
                >
                    Yes
                </Button>

                <Button
                    variant="secondary"
                    onClick={onCancel}
                    className="w-1/2"
                >
                    No
                </Button>
            </div>
        </div>
    )
}