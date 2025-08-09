"use client";
import { Button } from "@headlessui/react";

interface Step2FeelingsSelectionProps {
    feelingOptions: string[];
    selectedFeelings: string[];
    onFeelingToggle: (feeling: string) => void;
    onBack: () => void;
    onContinue: () => void;
    canContinue: boolean;
}

export default function Step2FeelingsSelection({
    feelingOptions,
    selectedFeelings,
    onFeelingToggle,
    onBack,
    onContinue,
    canContinue,
}: Readonly<Step2FeelingsSelectionProps>) {
    return (
        <div className="space-y-6">
            <div>
                <h4 className="text-preset-5 text-foreground font-medium mb-2">
                    How do you feel?
                </h4>
                <p className="text-preset-7 text-muted-foreground mb-4">
                    Select up to three tags ({selectedFeelings.length}/3
                    selected)
                </p>
                <div className="flex flex-wrap gap-3">
                    {feelingOptions.map((feeling) => {
                        const isSelected = selectedFeelings.includes(feeling);
                        const isDisabled =
                            !isSelected && selectedFeelings.length >= 3;

                        return (
                            <label
                                key={feeling}
                                className={`flex items-center gap-3 p-3 border rounded-[var(--radius-10)] cursor-pointer transition-colors ${
                                    isSelected
                                        ? "border-blue-500 bg-blue-50"
                                        : isDisabled
                                        ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    disabled={isDisabled}
                                    onChange={() => onFeelingToggle(feeling)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                                />
                                <span
                                    className={`text-preset-6-regular ${
                                        isDisabled
                                            ? "text-gray-400"
                                            : "text-foreground"
                                    }`}
                                >
                                    {feeling}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t border-gray-200">
                <Button
                    onClick={onBack}
                    className="px-6 py-2 text-preset-6 text-muted-foreground border
                     border-gray-300 rounded-[var(--radius-10)] hover:bg-gray-50 transition-colors"
                >
                    Back
                </Button>
                <Button
                    onClick={onContinue}
                    disabled={!canContinue}
                    className="px-6 py-2 text-preset-6 text-white bg-card-foreground rounded-[var(--radius-10)]
                     hover:bg-blue-700 data-focus:bg-secondary-foreground disabled:bg-gray-300
                      disabled:cursor-not-allowed transition-colors"
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}
