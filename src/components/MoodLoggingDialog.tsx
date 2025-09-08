"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogPanel, Button } from "@headlessui/react";
import DialogStepNotification from "./DialogStepNotification";
import Step1MoodSelection from "./Step1MoodSelection";
import Step2FeelingsSelection from "./Step2FeelingsSelection";
import Step3JournalEntry from "./Step3JournalEntry";
import Step4SleepSelection from "./Step4SleepSelection";
import TodaysMoodSummary from "./TodaysMoodSummary";
import { addMoodEntry } from "@/actions/mood";
import { MoodEntry } from "@/lib/types";
import { sleepOptions, MoodOption } from "@/lib/sleep-config";

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

interface MoodLoggingDialogProps {
    user: { id: number };
    todayEntry: MoodEntry | null;
    selectedQuote: string | null;
}

export default function MoodLoggingDialog({
    user,
    todayEntry,
    selectedQuote,
}: Readonly<MoodLoggingDialogProps>) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
    const [journalEntry, setJournalEntry] = useState("");
    const [selectedSleep, setSelectedSleep] = useState<number | null>(null);
    const [isJournalValid, setIsJournalValid] = useState(false);

    const [isLoading, setIsLoading] = useState(false); // New state for loading
    const [submissionError, setSubmissionError] = useState<string | null>(null); // New state for submission errors
    const [submittedEntryData, setSubmittedEntryData] =
        useState<MoodEntry | null>(null); // To display summary after submission
    // Calculate progress percentage
    const progressPercentage = (currentStep / 4) * 100;
    const [displayEntry, setDisplayEntry] = useState<MoodEntry | null>(null);

    // Sync displayEntry with props after component mounts
    useEffect(() => {
        setDisplayEntry(todayEntry);
    }, [todayEntry]);

    // Update displayEntry when a new entry is submitted
    useEffect(() => {
        if (submittedEntryData) {
            setDisplayEntry(submittedEntryData);
        }
    }, [submittedEntryData]);

    function openDialog() {
        setIsOpen(true);
        setCurrentStep(1);
        setSelectedMood(null);
        setSelectedFeelings([]);
        setJournalEntry("");
        setSelectedSleep(null);
        setIsJournalValid(false);
        setSubmissionError(null);
    }

    function closeDialog() {
        setIsOpen(false);
        setCurrentStep(1);
        setSelectedMood(null);
        setSelectedFeelings([]);
        setJournalEntry("");
        setSelectedSleep(null);
        setIsJournalValid(false);
        setSubmissionError(null);
    }

    function handleContinue() {
        if (currentStep === 1 && selectedMood !== null) {
            setCurrentStep(2);
        } else if (currentStep === 2 && selectedFeelings.length > 0) {
            setCurrentStep(3);
        } else if (currentStep === 3 && isJournalValid) {
            setCurrentStep(4);
        }
    }

    async function handleSubmit() {
        if (selectedMood === null || selectedSleep === null) {
            setSubmissionError("Please complete all required fields.");
            return;
        }

        const selectedSleepOption = sleepOptions.find(
            (option) => option.value === selectedSleep
        );
        const actualSleepHours =
            selectedSleepOption?.actualHours || selectedSleep;

        setIsLoading(true);
        setSubmissionError(null);

        const result = await addMoodEntry({
            userId: user.id,
            mood: selectedMood,
            sleepHours: actualSleepHours,
            feelings: selectedFeelings,
            journalEntry: journalEntry.trim() === "" ? null : journalEntry, // Send null if empty
        });

        setIsLoading(false);

        if (result.success && result.data) {
            setSubmittedEntryData(result.data); // Store the newly added data
            closeDialog();
        } else {
            setSubmissionError(
                result.error || "An unknown error occurred during submission."
            );
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

    function handleSleepSelect(sleepValue: number) {
        setSelectedSleep(sleepValue);
    }

    function handleJournalValidationChange(isValid: boolean) {
        setIsJournalValid(isValid);
    }

    function canContinue() {
        if (currentStep === 1) return selectedMood !== null;
        if (currentStep === 2) return selectedFeelings.length > 0;
        if (currentStep === 3) return true; // Journal entry is optional
        if (currentStep === 4) return selectedSleep !== null;
        return true;
    }

    const isEntryFromToday = (entry: MoodEntry | null): boolean => {
        if (!entry) return false;

        const entryDate = new Date(entry.created_at);
        const today = new Date();

        return (
            entryDate.getFullYear() === today.getFullYear() &&
            entryDate.getMonth() === today.getMonth() &&
            entryDate.getDate() === today.getDate()
        );
    };

    return (
        <>
            {isEntryFromToday(todayEntry) && displayEntry ? (
                <TodaysMoodSummary
                    entry={displayEntry}
                    selectedQuote={selectedQuote}
                />
            ) : (
                <Button
                    type="button"
                    onClick={openDialog}
                    className="bg-card-foreground text-preset-5 text-white px-[var(--spacing-400)] py-[var(--spacing-200)] 
                    rounded-[var(--radius-10)] font-semibold data-hover:bg-card-foreground/90 data-focus:outline-none data-focus:ring-2
                     data-focus:ring-blue-500 data-focus:ring-offset-2
                    transition-colors duration-200 hover:cursor-pointer"
                >
                    Log today&apos;s mood
                </Button>
            )}

            {/* Mood Logging Dialog */}
            <Dialog
                open={isOpen}
                as="div"
                className="relative z-50 focus:outline-none"
                onClose={closeDialog}
            >
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-foreground opacity-70 backdrop-blur-sm"
                    aria-hidden="true"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="dialog-panel w-full max-w-[37.5rem] rounded-[var(--radius-10)] p-6 shadow-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            {/* Dialog Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex-1">
                                    {/* Segmented Progress Bar */}
                                    <DialogStepNotification
                                        currentStep={currentStep}
                                        progressPercentage={progressPercentage}
                                        closeDialog={closeDialog}
                                    />
                                </div>
                            </div>

                            {/* Step 1: Mood Selection */}
                            {currentStep === 1 && (
                                <Step1MoodSelection
                                    moodOptions={moodOptions}
                                    selectedMood={selectedMood}
                                    onMoodSelect={handleMoodSelect}
                                    onContinue={handleContinue}
                                    canContinue={canContinue()}
                                />
                            )}
                            {/* Step 2: Feelings Selection */}
                            {currentStep === 2 && (
                                <Step2FeelingsSelection
                                    feelingOptions={feelingOptions}
                                    selectedFeelings={selectedFeelings}
                                    onFeelingToggle={handleFeelingToggle}
                                    onBack={() => setCurrentStep(1)}
                                    onContinue={handleContinue}
                                    canContinue={canContinue()}
                                />
                            )}

                            {/* Step 3: Journal Entry */}
                            {currentStep === 3 && (
                                <Step3JournalEntry
                                    journalEntry={journalEntry}
                                    onJournalChange={handleJournalChange}
                                    onBack={() => setCurrentStep(2)}
                                    onContinue={handleContinue}
                                    onValidationChange={
                                        handleJournalValidationChange
                                    }
                                />
                            )}

                            {/* Step 4: Sleep Hours Selection */}
                            {currentStep === 4 && (
                                <Step4SleepSelection
                                    sleepOptions={sleepOptions}
                                    selectedSleep={selectedSleep}
                                    onSleepSelect={handleSleepSelect}
                                    onBack={() => setCurrentStep(3)}
                                    onSubmit={handleSubmit}
                                    canContinue={canContinue()}
                                />
                            )}

                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-50 rounded-[var(--radius-10)]">
                                    <p className="text-preset-5 text-foreground">
                                        Submitting...
                                    </p>
                                </div>
                            )}

                            {submissionError && (
                                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-preset-7">
                                    {submissionError}
                                </div>
                            )}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
