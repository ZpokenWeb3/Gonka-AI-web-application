'use client';

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center gap-2 w-full md:text-[16px] text-[13px] text-[#707070] cursor-pointer"
    >
      <MoveLeft />
      Back
    </button>
  );
}