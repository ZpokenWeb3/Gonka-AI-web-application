'use client'

import { Settings } from "lucide-react";
import { SettingsSection } from "../../components/settings/settings-section";
import { ABOUT_DATA, CHATSETTINGS_DATA, NOTIFICATIONS_DATA } from "../../types/contstants";
import { SectionTitle } from "../../components/ui/section-title";
import { useProfile } from "../../hooks/useProfile";
import { SettingsSkeleton } from "../../components/settings/settings-skeleton";
import { showCustomToast } from "../../components/ui/custom-toast";

export default function SettingsPage() {
    const { user, loading, updateUserProfile } = useProfile();

    const handleLowBalanceChange = async (enabled: boolean) => {
        try {
            await updateUserProfile({ lowBalanceAlert: enabled });
            if(enabled == true){
                showCustomToast('success', 'Low Balance Alert notifications enabled')
            } else {
                showCustomToast('success', 'Low Balance Alert notifications disabled')
            }
        } catch (error) {
            console.error('Failed to update low balance alert:', error);
        }
    };

    const handleDepositNotificationChange = async (enabled: boolean) => {
        try {
            await updateUserProfile({ depositNotifications: enabled });
            if(enabled == true){
                showCustomToast('success', 'Deposit notifications enabled')
            } else {
                showCustomToast('success', 'Deposit notifications disabled')
            }
        } catch (error) {
            console.error('Failed to update deposit notifications:', error);
        }
    };

  return (
      <div className={`flex flex-col gap-15 p-10 w-full h-screen`}>
        <div className="flex items-center gap-3">
            <Settings width={33} height={33} color="#ffffff"/>
            <h2 className="text-[28px] text-white font-semibold">Settings</h2>
        </div>
        
        
        <div className="flex flex-wrap gap-7">
            <div className="flex flex-col gap-3">
                <SectionTitle text="Chat Settings"/>
                {loading ? <SettingsSkeleton /> : <SettingsSection data={CHATSETTINGS_DATA(user)}/>}
            </div>
            <div className="flex flex-col gap-3">
                <SectionTitle text="Notifications"/>
                {loading ? <SettingsSkeleton /> : <SettingsSection data={NOTIFICATIONS_DATA(user, handleLowBalanceChange, handleDepositNotificationChange)}/>}
            </div>
            <div className="flex flex-col gap-3">
                <SectionTitle text="About"/>
                {loading ? <SettingsSkeleton /> : <SettingsSection data={ABOUT_DATA}/>}
            </div>
        </div>
    </div>
  );
}
