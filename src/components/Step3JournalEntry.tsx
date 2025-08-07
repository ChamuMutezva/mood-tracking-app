"use client"

import type React from "react"

interface Step3JournalEntryProps {
  journalEntry: string
  onJournalChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBack: () => void
  onContinue: () => void
}

export default function Step3JournalEntry({
  journalEntry,
  onJournalChange,
  onBack,
  onContinue,
}: Readonly<Step3JournalEntryProps>) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-preset-5 text-foreground font-medium mb-4">Write about your day...</h4>
        <div className="space-y-2">
          <textarea
            value={journalEntry}
            onChange={onJournalChange}
            placeholder="Today I felt..."
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-preset-6 text-foreground placeholder:text-muted-foreground"
            maxLength={150}
          />
          <div className="flex justify-between items-center text-preset-8 text-muted-foreground">
            <span>Optional - Share what&apos;s on your mind</span>
            <span>{journalEntry.length}/150</span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-6 py-2 text-preset-6 text-muted-foreground border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          className="px-6 py-2 text-preset-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
