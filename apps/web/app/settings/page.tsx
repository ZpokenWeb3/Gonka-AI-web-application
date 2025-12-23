import { Settings } from "lucide-react";
import { SettingsSection } from "../../components/settings/settings-section";
import { ABOUT_DATA, CHATSETTINGS_DATA, NOTIFICATIONS_DATA } from "../../types/contstants";

export default function SettingsPage() {
  return (
      <div className={`flex flex-col gap-15 p-10 w-full h-screen`}>
        <div className="flex items-center gap-3">
            <Settings width={33} height={33} color="#ffffff"/>
            <h2 className="text-[28px] text-white font-semibold">Settings</h2>
        </div>
        <div className="flex flex-wrap gap-7">
            <div className="flex flex-col gap-3">
                <h5 className="text-[18px] text-[#707070]">Chat Settings</h5>
                <SettingsSection data={CHATSETTINGS_DATA}/>
            </div>
            <div className="flex flex-col gap-3">
                <h5 className="text-[18px] text-[#707070]">Notifications</h5>
                <SettingsSection data={NOTIFICATIONS_DATA}/>
            </div>
            <div className="flex flex-col gap-3">
                <h5 className="text-[18px] text-[#707070]">About</h5>
                <SettingsSection data={ABOUT_DATA}/>
            </div>
        </div>
      </div>
  );
}
