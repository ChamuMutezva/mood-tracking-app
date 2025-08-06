"use client";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

interface MoodOption {
    value: number;
    label: string;
    icon: string;
}

const moodOptions: MoodOption[] = [
    {
        value: 2,
        label: "Very Happy",
        icon: "/assets/images/icon-very-happy-color.svg",
    },
    { value: 1, label: "Happy", icon: "/assets/images/icon-happy-color.svg" },
    {
        value: 0,
        label: "Neutral",
        icon: "/assets/images/icon-neutral-color.svg",
    },
    { value: -1, label: "Sad", icon: "/assets/images/icon-sad-color.svg" },
    {
        value: -2,
        label: "Very Sad",
        icon: "/assets/images/icon-very-sad-color.svg",
    },
];

const feelingOptions = [
    "Joyful",
    "Down",
    "Anxious",
    "Calm",
    "Excited",
    "Frustrated",
    "Lonely",
    "Grateful",
    "Overwhelmed",
    "Motivated",
    "Irritable",
    "Peaceful",
    "Tired",
    "Hopeful",
    "Confident",
    "Stressed",
    "Content",
    "Disappointed",
    "Optimistic",
    "Restless",
];

export default function MoodLoggingDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
    const [journalEntry, setJournalEntry] = useState("");

    // Calculate progress percentage
    const progressPercentage = (currentStep / 4) * 100;

    function openDialog() {
        setIsOpen(true);
        setCurrentStep(1);
        setSelectedMood(null);
        setSelectedFeelings([]);
        setJournalEntry("");
    }

    function closeDialog() {
        setIsOpen(false);
        setCurrentStep(1);
        setSelectedMood(null);
        setSelectedFeelings([]);
        setJournalEntry("");
    }

    function handleContinue() {
        if (currentStep === 1 && selectedMood !== null) {
            setCurrentStep(2);
        } else if (currentStep === 2 && selectedFeelings.length > 0) {
            setCurrentStep(3);
        } else if (currentStep === 3) {
            setCurrentStep(4);
        } else if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    }

    function handleMoodSelect(moodValue: number) {
        setSelectedMood(moodValue);
    }

    function handleFeelingToggle(feeling: string) {
        setSelectedFeelings((prev) => {
            if (prev.includes(feeling)) {
                // Remove feeling if already selected
                return prev.filter((f) => f !== feeling);
            } else if (prev.length < 3) {
                // Add feeling if less than 3 selected
                return [...prev, feeling];
            }
            // Don't add if already at limit
            return prev;
        });
    }

    function handleJournalChange(
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) {
        const value = event.target.value;
        if (value.length <= 150) {
            setJournalEntry(value);
        }
    }

    function canContinue() {
        if (currentStep === 1) return selectedMood !== null;
        if (currentStep === 2) return selectedFeelings.length > 0;
        if (currentStep === 3) return true; // Journal entry is optional
        return true;
    }

    return (
        <>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={openDialog}
                className="bg-card-foreground text-preset-5 text-white px-[var(--spacing-400)] py-[var(--spacing-200)] rounded-[var(--radius-10)] font-semibold hover:bg-card-foreground/90 transition-colors duration-200"
            >
                Log today&apos;s mood
            </button>

            {/* Mood Logging Dialog */}
            <Dialog
                open={isOpen}
                as="div"
                className="relative z-50 focus:outline-none"
                onClose={closeDialog}
            >
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black/25 backdrop-blur-sm"
                    aria-hidden="true"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            {/* Dialog Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex-1">
                                    <DialogTitle
                                        as="h3"
                                        className="text-preset-4 text-foreground font-semibold mb-3"
                                    >
                                        Log your mood
                                    </DialogTitle>
                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-preset-7 text-muted-foreground">
                                                Step {currentStep} of 4
                                            </span>
                                            <span className="text-preset-7 text-muted-foreground">
                                                {Math.round(progressPercentage)}
                                                %
                                            </span>
                                        </div>
                                        <Progress
                                            value={progressPercentage}
                                            className="h-2"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    aria-label="Close"
                                    onClick={closeDialog}
                                    className="rounded-md p-1 hover:bg-gray-100 transition-colors ml-4"
                                >
                                    <XMarkIcon className="size-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Step 1: Mood Selection */}
                            {currentStep === 1 && (
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
                                                        selectedMood ===
                                                        mood.value
                                                            ? "border-blue-500 bg-blue-50"
                                                            : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="radio"
                                                            name="mood"
                                                            value={mood.value}
                                                            checked={
                                                                selectedMood ===
                                                                mood.value
                                                            }
                                                            onChange={() =>
                                                                handleMoodSelect(
                                                                    mood.value
                                                                )
                                                            }
                                                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                        />
                                                        <span className="text-preset-6 text-foreground font-medium">
                                                            {mood.label}
                                                        </span>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <Image
                                                            src={
                                                                mood.icon ||
                                                                "/placeholder.svg"
                                                            }
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
                                            onClick={handleContinue}
                                            disabled={!canContinue()}
                                            className="px-6 py-2 text-preset-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Feelings Selection */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-preset-5 text-foreground font-medium mb-2">
                                            How do you feel?
                                        </h4>
                                        <p className="text-preset-7 text-muted-foreground mb-4">
                                            Select up to three tags (
                                            {selectedFeelings.length}/3
                                            selected)
                                        </p>
                                        <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                                            {feelingOptions.map((feeling) => {
                                                const isSelected =
                                                    selectedFeelings.includes(
                                                        feeling
                                                    );
                                                const isDisabled =
                                                    !isSelected &&
                                                    selectedFeelings.length >=
                                                        3;

                                                return (
                                                    <label
                                                        key={feeling}
                                                        className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
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
                                                            disabled={
                                                                isDisabled
                                                            }
                                                            onChange={() =>
                                                                handleFeelingToggle(
                                                                    feeling
                                                                )
                                                            }
                                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                                                        />
                                                        <span
                                                            className={`text-preset-6 font-medium ${
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
                                        <button
                                            onClick={() => setCurrentStep(1)}
                                            className="px-6 py-2 text-preset-6 text-muted-foreground border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleContinue}
                                            disabled={!canContinue()}
                                            className="px-6 py-2 text-preset-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Journal Entry */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-preset-5 text-foreground font-medium mb-4">
                                            Write about your day...
                                        </h4>
                                        <div className="space-y-2">
                                            <textarea
                                                value={journalEntry}
                                                onChange={handleJournalChange}
                                                placeholder="Today I felt..."
                                                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-preset-6 text-foreground placeholder:text-muted-foreground"
                                                maxLength={150}
                                            />
                                            <div className="flex justify-between items-center text-preset-8 text-muted-foreground">
                                                <span>
                                                    Optional - Share what&apos;s on 
                                                    your mind
                                                </span>
                                                <span>
                                                    {journalEntry.length}/150
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div className="flex justify-between pt-4 border-t border-gray-200">
                                        <button
                                            onClick={() => setCurrentStep(2)}
                                            className="px-6 py-2 text-preset-6 text-muted-foreground border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleContinue}
                                            className="px-6 py-2 text-preset-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Placeholder for Step 4 */}
                            {currentStep === 4 && (
                                <div className="space-y-6">
                                    <div className="text-center py-12">
                                        <h4 className="text-preset-5 text-foreground font-medium">
                                            Step 4
                                        </h4>
                                        <p className="text-preset-6 text-muted-foreground mt-2">
                                            Coming next...
                                        </p>
                                    </div>
                                    <div className="flex justify-between pt-4 border-t border-gray-200">
                                        <button
                                            onClick={() => setCurrentStep(3)}
                                            className="px-6 py-2 text-preset-6 text-muted-foreground border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={closeDialog}
                                            className="px-6 py-2 text-preset-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            Finish
                                        </button>
                                    </div>
                                </div>
                            )}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
