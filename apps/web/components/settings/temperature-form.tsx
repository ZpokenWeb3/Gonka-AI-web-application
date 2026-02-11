import { Slider } from "../ui/slider";
import { showCustomToast } from "../ui/custom-toast";
import { FC, useState, useEffect } from "react";

interface Props {
    setShowTemperatureModal: (showTemperature: boolean) => void;
    temperature: number;
    onUpdateTemperature: (newTemperature: number) => Promise<void>;
}

export const TemperatureForm:FC<Props> = ({ setShowTemperatureModal, temperature, onUpdateTemperature }) => {
    const [currentTemperature, setCurrentTemperature] = useState<number>(temperature);

    useEffect(() => {
        setCurrentTemperature(temperature);
    }, [temperature]);

    return (
        <div className="flex flex-col gap-4 w-[500px] bg-[#131316] p-6 rounded-[12px]">
            <div className="flex flex-col gap-1">
                <h3 className="text-[20px] font-semibold text-white">Adjust Temperature</h3>
                <p className="text-[13px] text-[#c9c9c9]">
                    Control how creative or deterministic the AI responses are.
                </p>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-[13px] text-[#c9c9c9]">Current value</span>
                <span className="text-[14px] text-white">
                    {currentTemperature.toFixed(2)}
                </span>
            </div>
            <Slider
                min={0}
                max={1}
                step={0.01}
                defaultValue={[currentTemperature]}
                onValueChange={(value: number[]) => {
                    const newTemp = value[0] ?? currentTemperature;
                    setCurrentTemperature(newTemp);
                }}
                onValueCommit={async (value: number[]) => {
                    const newTemp = value[0] ?? currentTemperature;
                    try {
                        await onUpdateTemperature(newTemp);
                        showCustomToast('success', `Temperature set to ${newTemp.toFixed(2)}`);
                        setShowTemperatureModal(false);
                    } catch (error) {
                        console.error('Failed to update temperature:', error);
                        showCustomToast('failed', 'Failed to update temperature');
                    }
                }}
            />
        </div>
    )
}