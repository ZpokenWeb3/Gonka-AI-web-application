'use client';

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Steps } from "../../components/bridge/steps";
import { FirstStep } from "../../components/bridge/first-step";
import { SecondStep } from "../../components/bridge/second-step";
import { ThirdStep } from "../../components/bridge/third-step";
import { FourthStep } from "../../components/bridge/fourth-step";


const STEPS = [
    { label: "Enter Amount", component: FirstStep },
    { label: "Review Transaction", component: SecondStep },
    { label: "Confirm Bridge", component: ThirdStep },
    { label: "Completed", component: FourthStep },
] as const;

export default function BridgePage() {
    const [step, setStep] = useState<number>(1);

    const safeStep = Math.min(Math.max(step, 1), STEPS.length);

    const currentStepData = STEPS[safeStep - 1];
    if (!currentStepData) {
        throw new Error(`Invalid step index: ${safeStep - 1}`);
    }

    const CurrentStepComponent = currentStepData.component;
    const currentLabel = currentStepData.label;

    const handleNext = () => {
        setStep(prev => Math.min(prev + 1, STEPS.length));
    };

    const handleBack = () => {
        setStep(prev => Math.max(prev - 1, 1));
    };

    return (
        <div className="flex flex-col items-center md:gap-7 gap-5 md:p-10 p-5 w-full h-screen">
            <div className="flex flex-col items-center gap-5 sm:w-[400px] w-full bg-[#131316] p-5 rounded-md">
                <h4 className="text-white text-[20px] font-semibold">
                    Bridge from Ethereum
                </h4>

                <Steps
                    currentStep={safeStep}
                    totalSteps={STEPS.length}
                    label={currentLabel}
                />

                <CurrentStepComponent />

                <div className="flex w-full gap-2">
                    {safeStep > 1 && safeStep < STEPS.length && (
                        <Button
                            onClick={handleBack}
                            variant="outline"
                            className="flex-1"
                        >
                            Back
                        </Button>
                    )}

                    {safeStep < STEPS.length && (
                        <Button
                            onClick={handleNext}
                            variant="secondary"
                            className="flex-1"
                        >
                            Continue
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}