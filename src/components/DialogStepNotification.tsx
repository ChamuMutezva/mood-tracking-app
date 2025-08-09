import { DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import React from "react";

interface DialogStepNotificationProps {
    currentStep: number;
    progressPercentage: number;
    closeDialog: () => void;
}

function DialogStepNotification({
    currentStep,
    progressPercentage,
    closeDialog,
}: Readonly<DialogStepNotificationProps>) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
                <DialogTitle
                    as="h3"
                    className="text-preset-2 text-foreground mb-3"
                >
                    Log your mood
                </DialogTitle>
                {/* Segmented Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-preset-7 text-muted-foreground">
                            Step {currentStep} of 4
                        </span>
                        <span className="text-preset-7 text-muted-foreground">
                            {Math.round(progressPercentage)}%
                        </span>
                    </div>
                    {/* Custom 4-segment progress bar */}
                    <div className="flex gap-1">
                        {[1, 2, 3, 4].map((step) => (
                            <div
                                key={step}
                                className={`flex-1 h-2 rounded-full transition-colors duration-300 ${
                                    step <= currentStep
                                        ? "bg-blue-600"
                                        : "bg-gray-200"
                                }`}
                            />
                        ))}
                    </div>
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
    );
}

export default DialogStepNotification;
