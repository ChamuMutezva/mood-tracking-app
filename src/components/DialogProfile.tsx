"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
    Description,
} from "@headlessui/react";
import { CameraIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Session } from "next-auth";

interface DialogProfileProps {
    isOpen: boolean;
    onClose: () => void;
    session: Session | null;
    profileImage: string;
    isUploading: boolean;
    uploadError: string | null;
    onImageUpload: () => void;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
}

function DialogProfile({
    isOpen,
    onClose,
    session,
    profileImage,
    isUploading,
    uploadError,
    onImageUpload,
    onFileChange,
    fileInputRef,
}: Readonly<DialogProfileProps>) {
    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-50 focus:outline-none"
            onClose={onClose}
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-foreground/70 backdrop-blur-sm"
                aria-hidden="true"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-[var(--radius-16)] bg-white p-6 shadow-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        {/* Dialog Header */}
                        <div className="flex items-center justify-between mb-4">
                            <DialogTitle
                                as="h2"
                                className="text-preset-3 text-foreground"
                            >
                                Update your profile
                            </DialogTitle>
                            <Button
                                onClick={onClose}
                                aria-label="close profile menu"
                                className="rounded-md p-1 hover:bg-gray-100 transition-colors"
                            >
                                <XMarkIcon className="size-5 text-gray-500" />
                            </Button>
                        </div>

                        {/* Settings Content */}
                        <div className="space-y-6">
                            {/* Profile Section */}
                            <div>
                                <Description className="text-preset-6-regular accent-foreground mb-3">
                                    Personalise your account with your name and
                                    photo
                                </Description>
                                <div className="space-y-4">
                                    {/* Profile Image Upload */}
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="relative">
                                            <Avatar className="w-20 h-20">
                                                <AvatarImage
                                                    src={
                                                        profileImage ||
                                                        "/placeholder.svg"
                                                    }
                                                />
                                                <AvatarFallback className="text-foreground text-xl">
                                                    {session?.user?.name}
                                                </AvatarFallback>
                                            </Avatar>
                                            <Button
                                                onClick={onImageUpload}
                                                aria-label="upload profile photo"
                                                className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-colors"
                                                title="Change profile picture"
                                            >
                                                <CameraIcon className="size-4" />
                                            </Button>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-preset-7 text-accent-foreground">
                                                Upload image
                                            </p>
                                            <p className="text-preset-8 text-muted-foreground mt-1">
                                                JPG, PNG or GIF (max. 5MB)
                                            </p>
                                        </div>
                                        {/* Hidden file input */}
                                        <label
                                            htmlFor="upload-image"
                                            className="sr-only"
                                        >
                                            Select and upload profile image
                                        </label>
                                        <input
                                            id="upload-image"
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={onFileChange}
                                            className="hidden"
                                        />
                                        {isUploading && (
                                            <p className="text-preset-8 text-blue-600">
                                                Uploading...
                                            </p>
                                        )}
                                        {uploadError && (
                                            <p className="text-preset-8 text-red-600">
                                                {uploadError}
                                            </p>
                                        )}
                                    </div>
                                    {/* Name and Email Fields */}
                                    <div>
                                        <label
                                            htmlFor="name-input"
                                            className="block text-preset-7 text-muted-foreground mb-1"
                                        >
                                            Name
                                        </label>
                                        <input
                                            id="name-input"
                                            type="text"
                                            disabled
                                            defaultValue={
                                                session?.user?.name || "lisa"
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-[var(--radius-10)] text-preset-6 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email-input"
                                            className="block text-preset-7 text-muted-foreground mb-1"
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="email-input"
                                            type="email"
                                            disabled
                                            defaultValue={
                                                session?.user?.email ||
                                                "lisa@mail.com"
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-[var(--radius-10)] text-preset-6 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Notifications Section */}
                            <div>
                                <h3 className="text-preset-5 text-foreground font-medium mb-3">
                                    Notifications
                                </h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="rounded"
                                        />
                                        <span className="text-preset-6 text-foreground">
                                            Daily mood reminders
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="rounded"
                                        />
                                        <span className="text-preset-6 text-foreground">
                                            Weekly mood reports
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            className="rounded"
                                        />
                                        <span className="text-preset-6 text-foreground">
                                            Sleep tracking reminders
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Privacy Section */}
                            <div>
                                <h3 className="text-preset-5 text-foreground font-medium mb-3">
                                    Privacy
                                </h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="rounded"
                                        />
                                        <span className="text-preset-6 text-foreground">
                                            Share anonymous data for research
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Dialog Actions */}
                        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                            <Button
                                onClick={onClose}
                                className="flex-1 px-4 py-2 text-preset-6 text-muted-foreground border border-gray-300 rounded-[var(--radius-10)] hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={onClose}
                                className="flex-1 px-4 py-2 text-preset-6 text-white bg-blue-600 rounded-[var(--radius-10)] hover:bg-blue-700 transition-colors"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

export default DialogProfile;
