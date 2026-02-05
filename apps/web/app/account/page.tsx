'use client'

import { AccountInfo } from "../../components/account/account-info";
import { UsageStatistic } from "../../components/account/usage-statistic";
import { SettingsSection } from "../../components/settings/settings-section";
import { SettingsSkeleton } from "../../components/settings/settings-skeleton";
import { SectionTitle } from "../../components/ui/section-title";
import { useProfile } from "../../hooks/useProfile";
import { ACCOUNT_DATA, ACCOUNT_PREFERENCES_DATA} from "../../types/contstants";


export default function AccountPage() {
  const { user, loading } = useProfile();

  return (
    <div className={`flex flex-col gap-7 p-10 w-full h-screen overflow-y-auto`}>
       <AccountInfo/>
       <div className="flex flex-wrap gap-16">
            <div className="flex flex-col gap-3">
                <SectionTitle text="Wallet & Identity"/>
                {loading ? <SettingsSkeleton /> : <SettingsSection data={ACCOUNT_DATA(user)}/>}
            </div>
            <div className="flex flex-col gap-3">
                <SectionTitle text="Preferences"/>
                {loading ? <SettingsSkeleton /> : <SettingsSection data={ACCOUNT_PREFERENCES_DATA(user)}/>}
            </div>
       </div>
       <UsageStatistic/>
       <div className="flex flex-col gap-3">
            <SectionTitle text="Danger Zone"/>
            {loading ? <SettingsSkeleton /> : <SettingsSection data={ACCOUNT_DATA(user)}/>}
        </div>
    </div>
  );
}
