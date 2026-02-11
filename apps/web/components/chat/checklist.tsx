import { ChecklistItem } from "./checklist-item";
import {useChats} from "../../hooks/useChats";
import {useGonka} from "../../providers/gonka-provider";
import {hasModelCookie} from "../../lib/auth";

export const Checklist = () => {
    const { data: chatsData } = useChats();
    const { balance } = useGonka();
    const { address } = useGonka();

    console.log(address)

    const walletConnected = !!address;
    const hasFunds = balance > 0;
    const sentFirstMessage =
        !!chatsData?.data?.some((chat) => chat.messages && chat.messages.length > 0);
    const triedAnotherModel = hasModelCookie();

  return (
    <div className="flex flex-col gap-3 bg-[#151518] border border-[#232328] 2xl:p-4 p-3 2xl:rounded-[25px] rounded-[18px]">
      <h4 className="2xl:text-[22px] text-[21px] font-semibold text-white">
        Onboarding checklist
      </h4>

      <div className="flex flex-col space-y-2 2xl:text-[14px] text-[13px]">
        <ChecklistItem active={walletConnected} label="Connect Wallet" />
        <ChecklistItem active={hasFunds} label="Add funds" />
        <ChecklistItem active={sentFirstMessage} label="Send first message" />
        <ChecklistItem active={triedAnotherModel} label="Try another model" />
      </div>
    </div>
  );
};
