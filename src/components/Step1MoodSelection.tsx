"use client";

import Image from "next/image";

interface MoodOption {
    value: number;
    label: string;
    icon: string;
}

interface Step1MoodSelectionProps {
    moodOptions: MoodOption[];
    selectedMood: number | null;
    onMoodSelect: (moodValue: number) => void;
    onContinue: () => void;
    canContinue: boolean;
}

export default function Step1MoodSelection({
    moodOptions,
    selectedMood,
    onMoodSelect,
    onContinue,
    canContinue,
}: Readonly<Step1MoodSelectionProps>) {
    return (
        <div className="space-y-6">
            <div>
                <h4 className="text-preset-5 text-foreground font-medium mb-4">
                    How are you feeling right now?
                </h4>
                <div className="space-y-3">
                    {moodOptions.map((mood) => (
                        <label
                            key={mood.value}
                            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                                selectedMood === mood.value
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="mood"
                                    value={mood.value}
                                    checked={selectedMood === mood.value}
                                    onChange={() => onMoodSelect(mood.value)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-preset-6 text-foreground font-medium">
                                    {mood.label}
                                </span>
                            </div>
                            <div className="flex-shrink-0">
                                <Image
                                    src={mood.icon || "/placeholder.svg"}
                                    alt={mood.label}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8"
                                />
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                    onClick={onContinue}
                    disabled={!canContinue}
                    className="px-6 py-2 text-preset-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
