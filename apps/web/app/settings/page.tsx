'use client'

import { useState } from "react";
import {LogOut, Settings} from "lucide-react";
import { SettingsSection } from "../../components/settings/settings-section";
import { ABOUT_DATA, CHATSETTINGS_DATA, NOTIFICATIONS_DATA } from "../../types/contstants";
import { SectionTitle } from "../../components/ui/section-title";
import { useProfile } from "../../hooks/useProfile";
import { SettingsSkeleton } from "../../components/settings/settings-skeleton";
import { showCustomToast } from "../../components/ui/custom-toast";
import { useModelSelection } from "../../hooks/useModelSelection";
import { Modal } from "../../components/ui/modal";
import { ModelForm } from "../../components/chat/model-form";
import {TemperatureForm} from "../../components/settings/temperature-form";
import {LogOutBtn} from "../../components/settings/log-out-btn";

export default function SettingsPage() {
    const { user, loading, updateUserProfile } = useProfile();
    const { showModelModal, loading: modelLoading, selectModel, setShowModelModal } = useModelSelection();
    const [showTemperatureModal, setShowTemperatureModal] = useState(false);

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
      <div className="flex flex-col lg:gap-15 gap-10 lg:p-10 md:p-6 p-4 w-full h-full overflow-y-auto">
          <div className="flex items-center gap-3">
              <Settings width={33} height={33} color="#ffffff"/>
              <h2 className="text-[28px] text-white font-semibold">Settings</h2>
          </div>

          <div className="flex md:flex-wrap flex-col w-full gap-7">
              <div className="flex flex-col md:w-auto w-full gap-3">
                  <SectionTitle text="Chat Settings"/>
                  {loading ? (
                      <SettingsSkeleton/>
                  ) : (
                      <SettingsSection
                          data={CHATSETTINGS_DATA(user).map((item, index) => {
                              if (index === 0) {
                                  return {
                                      ...item,
                                      onClick: () => setShowModelModal(true),
                                  };
                              }
                              if (index === 1) {
                                  return {
                                      ...item,
                                      onClick: () => setShowTemperatureModal(true),
                                  };
                              }
                              return item;
                          })}
                      />
                  )}
              </div>
              <div className="flex flex-col gap-3 ">
                  <SectionTitle text="Notifications"/>
                  {loading ? <SettingsSkeleton/> : <SettingsSection
                      data={NOTIFICATIONS_DATA(user, handleLowBalanceChange, handleDepositNotificationChange)}/>}
              </div>
              <div className="flex flex-col gap-3">
                  <SectionTitle text="About"/>
                  {loading ? <SettingsSkeleton/> : <SettingsSection data={ABOUT_DATA}/>}
              </div>
              <LogOutBtn/>
          </div>

          {showModelModal && (
              <Modal
                  isOpen={showModelModal}
                  onClose={() => setShowModelModal(false)}
                  form={<ModelForm onSelect={selectModel} disabled={modelLoading}/>}
              />
          )}
          {showTemperatureModal && (
              <Modal
                  isOpen={showTemperatureModal}
                  onClose={() => setShowTemperatureModal(false)}
                  form={(
                      <TemperatureForm
                          setShowTemperatureModal={setShowTemperatureModal}
                          temperature={user?.temperaure ?? 0.7}
                          onUpdateTemperature={async (newTemp: number) => {
                              await updateUserProfile({temperaure: newTemp});
                          }}
                      />
                  )}
              />
          )}
      </div>
  );
}
