'use client'

import { KeyRound, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Modal } from "../ui/modal";
import { CreationKeyForm } from "./creation-key-form";
import type { CreateApiKeyRequest } from "../../lib/developer-api";

interface Props {
  onCreateKey: (payload: CreateApiKeyRequest) => Promise<{ fullKey: string }>;
}

export const DeveloperTop = ({ onCreateKey }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center md:gap-3 gap-1.5">
          <KeyRound width={33} height={33} color="#ffffff" />
          <h2 className="md:text-[28px] text-[24px] text-white font-semibold">Developer API</h2>
        </div>
        <p className="md:text-[16px] text-[13px] text-[#707070]">
          Integrate Gonka AI into your applications
        </p>
      </div>
      <Button
        onClick={() => setOpen(true)}
        className="md:w-[200px] w-[110px]"
        variant="secondary"
      >
        <Plus width={15} height={15} color="#ffffff" />
        Create Key
      </Button>

      {open && (
        <Modal
          isOpen={open}
          onClose={handleClose}
          form={<CreationKeyForm onClose={handleClose} onCreateKey={onCreateKey} />}
        />
      )}
    </div>
  );
}