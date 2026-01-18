import { useState } from "react";
import { Button } from "../ui/button";
import { Copy, TriangleAlert } from "lucide-react";
import { showCustomToast } from "../ui/custom-toast";

interface Props {
  onClose: () => void;
  onCreateKey: (name: string) => Promise<{ fullKey: string }>;
}

export const CreationKeyForm: React.FC<Props> = ({ onClose, onCreateKey }) => {
  const [keyName, setKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [limitType, setLimitType] = useState<'unlimited' | 'limited'>('unlimited');
  const [monthlyLimit, setMonthlyLimit] = useState('');
  const [perDay, setPerDay] = useState('');
  const [perMinute, setPerMinute] = useState('');


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
      showCustomToast('success', 'API Key copied successfully')
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleClose = () => {
    setKeyName("");
    setCreatedKey(null);
    showCustomToast('success', 'API Key created successfully')
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

        <div className="flex flex-col gap-3 pb-4 border-b border-b-[#707070]">
          <div className="flex items-center gap-1.5">
            <TriangleAlert color="#ffdd00" width={15} height={15}/>
            <h5 className="text-sm text-white">IMPORTANT: Copy this key now! </h5> 
          </div>
          <p className="text-xs text-[#707070]">This is the only time you'll see the full key. <br/>    Store it securely - we cannot recover it.</p>
        </div>

        <div className="flex flex-col gap-3">
           <h5 className="text-sm text-white">QUICK START:</h5> 
           <div className="flex items-center gap-2 relative p-3 bg-[#1a1a1d] text-xs text-green-400 rounded-lg border border-[#232328]">
            ```bash <br/>                                               
              curl https://api.gonka.ai/v1/chat/completions \   <br/>       
              -H "Authorization: Bearer YOUR_KEY" \     <br/>             
              -H "Content-Type: application/json" \    <br/>               
              -d           <br/> 
            ```

            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(createdKey)}
              className="flex items-center absolute right-[10px] bottom-[10px] gap-2 w-fit flex-shrink-0"
            >
              <Copy width={14} height={14} />
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
                className="w-[50px] text-sm text-white outline-none"
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
                className="w-[50px] text-sm text-white outline-none"
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
              name="limit"
              checked={limitType === 'unlimited'}
              onChange={() => setLimitType('unlimited')}
              className="accent-[#6B26D9]"
            />
            Unlimited
          </label>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
            <input
              type="radio"
              name="limit"
              checked={limitType === 'limited'}
              onChange={() => setLimitType('limited')}
              className="accent-[#6B26D9]"
            />
            Set limit
            </label>

            {limitType === 'limited' && (
              <input
                type="number"
                min="0"
                placeholder="GNK"
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(e.target.value)}
                className="w-[80px] text-sm text-white outline-none bg-[#131316] border border-[#6B26D9] rounded-md px-3 py-1.5"
              />
            )}

            {limitType === 'limited' && (<p className="text-sm text-white">GNK</p>)}
          </div>
        </div>
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