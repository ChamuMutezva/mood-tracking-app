"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@headlessui/react";

interface Step3JournalEntryProps {
    journalEntry: string;
    onJournalChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBack: () => void;
    onContinue: () => void;
    onValidationChange: (isValid: boolean) => void;
}

export default function Step3JournalEntry({
    journalEntry,
    onJournalChange,
    onBack,
    onContinue,
    onValidationChange,
}: Readonly<Step3JournalEntryProps>) {
    const MIN_WORDS = 10;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isTouched, setIsTouched] = useState(false);

    const wordCount = journalEntry
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;

    useEffect(() => {
        let isValid = true;
        let message: string | null = null;

        if (journalEntry.trim() === "") {
            isValid = false;
            message =
                "Your journal entry cannot be empty. Please provide at least 10 words to capture the essence of your day and help you reflect on your mood.";
        } else if (wordCount < MIN_WORDS) {
            isValid = false;
            message = `Your journal entry needs to be more descriptive. Please provide at least ${MIN_WORDS} words (currently ${wordCount}) to capture the essence of your day and help you reflect on your mood.`;
        }

        setErrorMessage(message);
        onValidationChange(isValid); // Report validation status to parent
    }, [journalEntry, wordCount, onValidationChange]);

    const handleTextAreaChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setIsTouched(true);
        onJournalChange(event);
    };

    const handleContinueClick = () => {
        setIsTouched(true); // Ensure error message shows if user tries to continue with invalid input
        if (!errorMessage) {
            onContinue();
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-preset-5 text-foreground font-medium mb-4">
                    Write about your day...
                </h3>
                <div className="space-y-2">
                    <textarea
                        value={journalEntry}
                        onChange={handleTextAreaChange}
                        placeholder="Today I felt..."
                        className={`w-full h-32 px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 text-preset-6 text-foreground placeholder:text-muted-foreground ${
                            errorMessage && isTouched
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
                        }`}
                        maxLength={300}
                    />
                    <div className="flex justify-between items-center text-preset-8 text-muted-foreground">
                        <span>Minimum {MIN_WORDS} words required</span>
                        <span>
                            {wordCount}/100 words ({journalEntry.length}/300
                            characters)
                        </span>
                    </div>
                    {errorMessage && isTouched && (
                        <p className="text-red-500 text-preset-8 mt-2">
                            {errorMessage}
                        </p>
                    )}
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
                    onClick={handleContinueClick}
                    disabled={!!errorMessage} // Disable if there's an error message
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
