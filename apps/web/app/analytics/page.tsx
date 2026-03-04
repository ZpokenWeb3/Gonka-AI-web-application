'use client'

import { ChartNoAxesCombined } from "lucide-react";
import { Button } from "../../components/ui/button";
import { SummarySection } from "../../components/analytics/summary-section";
import { UsageSection } from "../../components/analytics/usage-section";
import { RequestsSection } from "../../components/analytics/requests-section";
import {BackButton} from "../../components/ui/back-button";

export default function AnalyticsPage() {
    return (
        <div className={`flex flex-col md:gap-15 gap-7 md:p-10 p-5 w-full overflow-y-auto h-full`}>
            <BackButton/>
            <div className="flex items-center gap-3">
                <ChartNoAxesCombined width={33} height={33} color="#ffffff"/>
                <h2 className="text-[28px] text-white font-semibold">Analytics</h2>
            </div>
            <SummarySection/>
            <RequestsSection/>
            <UsageSection/>
            <div className="flex items-center md:gap-2 gap-1">
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