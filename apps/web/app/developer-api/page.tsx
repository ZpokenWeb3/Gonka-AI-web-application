import { SettingsSection } from "../../components/settings/settings-section";
import { ABOUT_DATA, CHATSETTINGS_DATA, NOTIFICATIONS_DATA } from "../../types/contstants";
import { SectionTitle } from "../../components/ui/section-title";
import { DeveloperTop } from "../../components/developer/developer-top";
import { Button } from "../../components/ui/button";
import { UpgradeBlock } from "../../components/developer/upgrade-block";
import { APIBlock } from "../../components/developer/api-block";
import { BookMarked, ChartBarIncreasing, MessageCircleMore, TestTubeDiagonal } from "lucide-react";

export default function DeveloperPage() {
  return (
      <div className={`flex flex-col gap-15 p-10 w-full h-screen`}>
        <DeveloperTop/>
        <div className="flex flex-col gap-7">
           <APIBlock/>
            <div className="flex flex-col gap-3">
                <SectionTitle text="Usage This Month"/>
                <div className="flex items-center w-full gap-3">
                    <UpgradeBlock title="1,234" name="Requests" percent={12}/>
                    <UpgradeBlock title="523K" name="Tokens" percent={8}/>
                    <UpgradeBlock title="15.67" name="GNK Cost" percent={10}/>
                    <UpgradeBlock title="1.8s" name="Avg Latency" percent={5}/>
                </div>
            </div>
            <div className="flex flex-col w-full gap-3">
                <SectionTitle text="Quick Links"/>
                <div className="flex items-center w-full gap-3">
                    <Button className="w-[150px]" variant="outline">
                        <BookMarked width={10} height={10} color="#ffffff" />
                        API Docs
                    </Button>
                    <Button className="w-[150px]" variant="outline">
                        <TestTubeDiagonal width={10} height={10}/>
                        Playground
                    </Button>
                    <Button className="w-[150px]" variant="outline">
                        <ChartBarIncreasing width={10} height={10}/>
                        Analytics
                    </Button>
                    <Button className="w-[150px]" variant="outline">
                        <MessageCircleMore width={10} height={10}/>
                        Support
                    </Button>
                </div>
            </div>
        </div>
      </div>
  );
}
