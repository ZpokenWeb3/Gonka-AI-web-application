import { useAccount } from "wagmi";
import { ChecklistItem } from "./checklist-item";

export const Checklist = () => {
  const { address, isConnected } = useAccount();

  console.log(isConnected)

  const walletConnected = isConnected;
  const hasFunds = false; 
  const sentFirstMessage = false; 
  const triedAnotherModel = false;



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
