"use client";
import { Button } from "@headlessui/react";

interface SleepOption {
    value: number;
    label: string;
    hours: string;
}

interface Step4SleepSelectionProps {
    sleepOptions: SleepOption[];
    selectedSleep: number | null;
    onSleepSelect: (sleepValue: number) => void;
    onBack: () => void;
    onSubmit: () => void;
    canContinue: boolean;
}

export default function Step4SleepSelection({
    sleepOptions,
    selectedSleep,
    onSleepSelect,
    onBack,
    onSubmit,
    canContinue,
}: Readonly<Step4SleepSelectionProps>) {
    return (
        <div className="space-y-6">
            <div>
                <h4 className="text-preset-5 text-foreground font-medium mb-4">
                    How many hours did you sleep?
                </h4>
                <div className="space-y-3">
                    {sleepOptions.map((sleep) => (
                        <label
                            key={sleep.value}
                            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                                selectedSleep === sleep.value
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    aria-label="hours slept"
                                    type="radio"
                                    name="sleep"
                                    value={sleep.value}
                                    checked={selectedSleep === sleep.value}
                                    onChange={() => onSleepSelect(sleep.value)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-preset-6 text-foreground font-medium">
                                    {sleep.label}
                                </span>
                            </div>
                            <div className="flex-shrink-0">
                                <span className="text-preset-7 text-muted-foreground">
                                    💤
                                </span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t border-gray-200">
                <Button
                    onClick={onBack}
                    className="px-6 py-2 text-preset-6 text-muted-foreground border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                    Back
                </Button>
                <Button
                    onClick={onSubmit}
                    disabled={!canContinue}
                    className="px-6 py-2 text-preset-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}
