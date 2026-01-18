import { FC } from "react"

interface SkeletonProps {
    className?: string
}


export const Skeleton: FC<SkeletonProps> = ({ className = "" }) => {
    return (
        <div 
            className={`animate-pulse bg-[#2A2A2E] rounded ${className}`}
        />
    )
}