'use client'

import { SectionTitle } from "../../components/ui/section-title";
import { DeveloperTop } from "../../components/developer/developer-top";
import { Button } from "../../components/ui/button";
import { UpgradeBlock } from "../../components/developer/upgrade-block";
import { APIBlock } from "../../components/developer/api-block";
import { BookMarked, ChartBarIncreasing, Frown, MessageCircleMore, TestTubeDiagonal } from "lucide-react";
import { useDeveloperApi } from "../../hooks/useDeveloperApi";

export default function DeveloperPage() {
  const { apiKeys, loading, deleteApiKeyById, createNewApiKey } = useDeveloperApi();

  const handleDeleteKey = async (keyId: string) => {
    try {
      await deleteApiKeyById(keyId);
    } catch (error) {
      console.error("Failed to delete API key:", error);
    }
  };

  const handleCreateKey = async (name: string) => {
    try {
      const result = await createNewApiKey(name);
      return { fullKey: result.fullKey };
    } catch (error) {
      console.error("Failed to create API key:", error);
      throw error;
    }
  };

  return (
      <div className={`flex flex-col gap-15 p-10 w-full h-screen`}>
        <DeveloperTop onCreateKey={handleCreateKey}/>
        <div className="flex flex-col gap-7">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-[18px] leading-4.5 text-white font-semibold">API Keys</h2>
          </div>

          {loading ? (
            <div className="text-center py-8 text-[#707070]">
              Loading API keys...
            </div>
          ) : apiKeys.length === 0 ? (
            <div className="text-center py-8 text-[#707070]">
              <p>No API keys found. Create your first key to get started.</p>
            </div>
          ) : (
            apiKeys.map((key) => (
              <APIBlock 
                key={key.id}
                apiKey={key}
                onDelete={() => handleDeleteKey(key.id)}
              />
            ))
          )}

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
