import { useState } from "react";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";

interface Props {
  onClose: () => void;
  onCreateKey: (name: string) => Promise<{ fullKey: string }>;
}

export const CreationKeyForm: React.FC<Props> = ({ onClose, onCreateKey }) => {
  const [keyName, setKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateKey = async () => {
    if (!keyName.trim()) return;

    try {
      setLoading(true);
      const result = await onCreateKey(keyName);
      setCreatedKey(result.fullKey);
    } catch (error) {
      console.error("Failed to create API key:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleClose = () => {
    setKeyName("");
    setCreatedKey(null);
    onClose();
  };

  if (createdKey) {
    return (
      <div className="flex flex-col gap-4 w-[500px] bg-[#131316] p-5 rounded-[12px]">
        <div className="flex flex-col gap-2">
          <h3 className="text-white text-lg font-semibold">API Key Created Successfully!</h3>
          <p className="text-[#707070] text-sm">Please save this key securely. You won't be able to see it again.</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm">Your API Key:</label>
          <div className="flex items-center gap-2 p-3 bg-[#1a1a1d] rounded-lg border border-[#232328]">
            <code className="text-green-400 text-sm font-mono flex-1">{createdKey}</code>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(createdKey)}
              className="flex items-center gap-2 w-fit flex-shrink-0"
            >
              <Copy width={14} height={14} />
              Copy
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleClose} className="flex-1">
            I've saved the key
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-[500px] bg-[#131316] p-5 rounded-[12px]">
      <label className="text-white" htmlFor="Name">Key Name</label>
      <div className="flex items-center justify-between border border-[#6B26D9] py-2 px-3 rounded-[12px]">
        <input
          value={keyName}
          onChange={(e) => setKeyName(e.target.value)}
          placeholder="Enter key name"
          className="w-full text-sm text-white outline-none bg-transparent"
          onKeyPress={(e) => e.key === 'Enter' && handleCreateKey()}
          disabled={loading}
        />
      </div>
      <Button 
        variant="secondary" 
        onClick={handleCreateKey}
        disabled={!keyName.trim() || loading}
      >
        {loading ? "Creating..." : "Create new key"}
      </Button>
    </div>
  )
}