import { Settings } from "lucide-react";
import { SettingsSection } from "../../components/settings/settings-section";
import { ABOUT_DATA, CHATSETTINGS_DATA, NOTIFICATIONS_DATA } from "../../types/contstants";
import { SectionTitle } from "../../components/ui/section-title";

export default function SettingsPage() {
  return (
      <div className={`flex flex-col gap-15 p-10 w-full h-screen`}>
        <div className="flex items-center gap-3">
            <Settings width={33} height={33} color="#ffffff"/>
            <h2 className="text-[28px] text-white font-semibold">Settings</h2>
        </div>
        <div className="flex flex-wrap gap-7">
            <div className="flex flex-col gap-3">
                <SectionTitle text="Chat Settings"/>
                <SettingsSection data={CHATSETTINGS_DATA}/>
            </div>
            <div className="flex flex-col gap-3">
                <SectionTitle text="Notifications"/>
                <SettingsSection data={NOTIFICATIONS_DATA}/>
            </div>
            <div className="flex flex-col gap-3">
                <SectionTitle text="About"/>
                <SettingsSection data={ABOUT_DATA}/>
            </div>
        </div>
    </div>
  );
}
