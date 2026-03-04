import { useState } from "react";
import { Button } from "../ui/button";
import type { ApiKey, UpdateApiKeyRequest } from "../../lib/developer-api";

interface Props {
  apiKey: ApiKey;
  onClose: () => void;
  onUpdate: (payload: UpdateApiKeyRequest) => Promise<void>;
}

export const EditKeyForm: React.FC<Props> = ({ apiKey, onClose, onUpdate }) => {
  const [name, setName] = useState(apiKey.name);
  const [isActive, setIsActive] = useState(apiKey.isActive);
  const [perMinute, setPerMinute] = useState(
    apiKey.rateLimitPerMinute != null ? String(apiKey.rateLimitPerMinute) : ""
  );
  const [perDay, setPerDay] = useState(
    apiKey.rateLimitPerDay != null ? String(apiKey.rateLimitPerDay) : ""
  );
  const [limitType, setLimitType] = useState<"unlimited" | "limited">(
    apiKey.monthlySpendLimit != null ? "limited" : "unlimited"
  );
  const [monthlyLimit, setMonthlyLimit] = useState(
    apiKey.monthlySpendLimit != null ? String(apiKey.monthlySpendLimit) : ""
  );
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const rateLimitPerMinute =
      perMinute.trim() && !Number.isNaN(Number(perMinute))
        ? Number(perMinute)
        : undefined;

    const rateLimitPerDay =
      perDay.trim() && !Number.isNaN(Number(perDay))
        ? Number(perDay)
        : undefined;

    const monthlySpendLimit =
      limitType === "limited" &&
      monthlyLimit.trim() &&
      !Number.isNaN(Number(monthlyLimit))
        ? Number(monthlyLimit)
        : undefined;

    try {
      setLoading(true);
      await onUpdate({
        name: trimmedName,
        rateLimitPerMinute,
        rateLimitPerDay,
        monthlySpendLimit,
        isActive,
      });
      onClose();
    } catch (error) {
      console.error("Failed to update API key:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-[500px] bg-[#131316] p-5 rounded-[12px]">
      <h3 className="text-white text-lg font-semibold">Edit API Key</h3>

      <div className="flex flex-col gap-2">
        <label className="text-white text-sm" htmlFor="key-name">
          Key Name
        </label>
        <div className="flex items-center justify-between border border-[#6B26D9] py-2 px-3 rounded-[12px]">
          <input
            id="key-name"
            value={name}
            maxLength={20}
            onChange={(e) => setName(e.target.value.slice(0, 20))}
            placeholder="Enter key name"
            className="w-full text-sm text-white outline-none bg-transparent"
            disabled={loading}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id={`key-active-${apiKey.id}`}
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="accent-[#6B26D9]"
          disabled={loading}
        />
        <label
          htmlFor={`key-active-${apiKey.id}`}
          className="text-sm text-white cursor-pointer"
        >
          Active
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <h5 className="text-sm text-white">Rate Limits</h5>
          <div className="flex items-center gap-2 text-sm text-white">
            <div className="flex items-center justify-between gap-2 w-full p-3 bg-[#1a1a1d] rounded-md border border-[#232328]">
              Per Minute
              <input
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={perMinute}
                onChange={(e) => setPerMinute(e.target.value)}
                className="w-[50px] text-sm text-white outline-none bg-transparent"
                disabled={loading}
              />
            </div>
            <div className="flex items-center justify-between gap-2 w-full p-3 bg-[#1a1a1d] rounded-md border border-[#232328]">
              Per Day
              <input
                type="number"
                min="0"
                max="10000"
                placeholder="0"
                value={perDay}
                onChange={(e) => setPerDay(e.target.value)}
                className="w-[50px] text-sm text-white outline-none bg-transparent"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <h5 className="text-sm text-white">Monthly spend limit</h5>
          <div className="flex flex-col gap-3 p-3 bg-[#1a1a1d] rounded-md border border-[#232328]">
            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
              <input
                type="radio"
                name={`limit-${apiKey.id}`}
                checked={limitType === "unlimited"}
                onChange={() => setLimitType("unlimited")}
                className="accent-[#6B26D9]"
                disabled={loading}
              />
              Unlimited
            </label>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                <input
                  type="radio"
                  name={`limit-${apiKey.id}`}
                  checked={limitType === "limited"}
                  onChange={() => setLimitType("limited")}
                  className="accent-[#6B26D9]"
                  disabled={loading}
                />
                Set limit
              </label>

              {limitType === "limited" && (
                <input
                  type="number"
                  min="0"
                  placeholder="GNK"
                  value={monthlyLimit}
                  onChange={(e) => setMonthlyLimit(e.target.value)}
                  className="w-[80px] text-sm text-white outline-none bg-[#131316] border border-[#6B26D9] rounded-md px-3 py-1.5"
                  disabled={loading}
                />
              )}

              {limitType === "limited" && (
                <p className="text-sm text-white">GNK</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <Button
          variant="secondary"
          onClick={handleSave}
          disabled={!name.trim() || loading}
          className="flex-1"
        >
          {loading ? "Saving..." : "Save changes"}
        </Button>
        <Button
          variant="outline"
          onClick={onClose}
          disabled={loading}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

