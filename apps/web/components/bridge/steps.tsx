interface StepsProps {
    currentStep: number;
    totalSteps: number;
    label: string;
}

export const Steps = ({ currentStep, totalSteps, label }: StepsProps) => {
    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-[13px] text-gray-300">
                Step {currentStep} of {totalSteps}: {label}
            </p>

            <div className="flex items-center w-full">
                {Array.from({ length: totalSteps }).map((_, index) => {
                    const step = index + 1;
                    const isActive = step <= currentStep;

                    return (
                        <div key={step} className="flex items-center flex-1 last:flex-none">
                            <div
                                className={`w-2 h-2 rounded-full ${
                                    isActive ? "bg-white" : "border border-white"
                                }`}
                            />

                            {step !== totalSteps && (
                                <div
                                    className={`flex-1 h-px mx-1 ${
                                        step < currentStep ? "bg-white" : "bg-gray-600"
                                    }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
