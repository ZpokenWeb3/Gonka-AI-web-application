'use client'

import { SectionTitle } from "../../components/ui/section-title";
import { DeveloperTop } from "../../components/developer/developer-top";
import { Button } from "../../components/ui/button";
import { UpgradeBlock } from "../../components/developer/upgrade-block";
import { APIBlock } from "../../components/developer/api-block";
import {
  BookMarked,
  ChartBarIncreasing,
  Frown,
  MessageCircleMore,
  TestTubeDiagonal,
} from "lucide-react";
import { useDeveloperApi } from "../../hooks/useDeveloperApi";
import { showCustomToast } from "../../components/ui/custom-toast";
import Link from "next/link";
import type { CreateApiKeyRequest } from "../../lib/developer-api";

export default function DeveloperPage() {
  const { apiKeys, loading, deleteApiKeyById, createNewApiKey } =
    useDeveloperApi();

  const handleDeleteKey = async (keyId: string) => {
    try {
      await deleteApiKeyById(keyId);
      showCustomToast("success", "API Key deleted successfully");
    } catch (error) {
      console.error("Failed to delete API key:", error);
    }
  };

  const handleCreateKey = async (payload: CreateApiKeyRequest) => {
    try {
      const result = await createNewApiKey(payload);
      return { fullKey: result.fullKey };
    } catch (error) {
      console.error("Failed to create API key:", error);
      throw error;
    }
  };

  return (
      <div className="flex flex-col md:gap-15 gap-7 md:p-10 p-5 w-full h-full overflow-y-auto">
        <DeveloperTop onCreateKey={handleCreateKey}/>
        <div className="flex flex-col gap-7">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-[18px] leading-4.5 text-white font-semibold">
              API Keys
            </h2>
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
            <div className="grid md:grid-cols-4 grid-cols-2 items-center w-full gap-3">
              <UpgradeBlock title="1,234" name="Requests" percent={12}/>
              <UpgradeBlock title="523K" name="Tokens" percent={8}/>
              <UpgradeBlock title="15.67" name="GNK Cost" percent={10}/>
              <UpgradeBlock title="1.8s" name="Avg Latency" percent={5}/>
            </div>
          </div>
          <div className="flex flex-col w-full gap-3">
            <SectionTitle text="Quick Links"/>
            <div className="flex items-center w-full gap-3">
              <Button className="md:w-[150px] sm:w-[110px] w-[50px]" variant="outline">
                <BookMarked width={10} height={10} color="#ffffff"/>
                <p className="md:flex hidden">API Docs</p>
              </Button>
              <Button className="md:w-[150px] sm:w-[120px] w-[50px]" variant="outline">
                <TestTubeDiagonal width={10} height={10}/>
                <p className="md:flex hidden">Playground</p>
              </Button>
              <Link href="/analytics">
                <Button className="md:w-[150px] sm:w-[105px] w-[50px]" variant="outline">
                  <ChartBarIncreasing width={10} height={10}/>
                  <p className="md:flex hidden">Analytics</p>
                </Button>
              </Link>
              <Button className="md:w-[150px] sm:w-[100px] w-[50px]" variant="outline">
                <MessageCircleMore width={10} height={10}/>
                <p className="md:flex hidden">Support</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
}
