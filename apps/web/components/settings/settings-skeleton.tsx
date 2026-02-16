import { FC } from "react"
import { Skeleton } from "../ui/skeleton"

export const SettingsSkeleton: FC = () => {
    return (
        <div className="flex flex-col lg:w-[600px] w-full rounded-[15px] border border-[#232328]">
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="flex items-center justify-between p-4 border-b border-[#232328] first:rounded-t-[15px] last:rounded-b-[15px] last:border-b-0"
                >
                    <div className="flex gap-3 items-center">
                        <Skeleton className="w-5 h-5" />
                        <div className="flex flex-col gap-2">
                            <Skeleton className="w-32 h-4" />
                            <Skeleton className="w-24 h-3" />
                        </div>
                    </div>
                    <Skeleton className="w-11 h-6" />
                </div>
            ))}
        </div>
    )
}