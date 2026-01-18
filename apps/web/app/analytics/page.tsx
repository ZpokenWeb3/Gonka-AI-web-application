'use client'

import { ChartNoAxesCombined } from "lucide-react";
import { Button } from "../../components/ui/button";
import { SummarySection } from "../../components/analytics/summary-section";
import { UsageSection } from "../../components/analytics/usage-section";
import { RequestsSection } from "../../components/analytics/requests-section";

export default function AnalyticsPage() {

  return (
      <div className={`flex flex-col gap-15 p-10 w-full overflow-y-auto h-screen`}>
        <div className="flex items-center gap-3">
            <ChartNoAxesCombined width={33} height={33} color="#ffffff"/>
            <h2 className="text-[28px] text-white font-semibold">Analytics</h2>
        </div>
        <SummarySection/>
        <RequestsSection/>
        <UsageSection/>
        <div className="flex items-center gap-2">
            <Button className="w-fit" variant="outline">
                Export CSV
            </Button>
            <Button className="w-fit" variant="outline">
                View detailed logs
            </Button>
        </div>
    </div>
  );
}
