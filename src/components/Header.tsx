"use client";
import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
    Description,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuSeparator,
} from "@headlessui/react";
import {
    CameraIcon,
    ChevronDownIcon,
    XMarkIcon,
} from "@heroicons/react/16/solid";

function Header() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(
        "/assets/images/avatar-lisa.jpg"
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    function showSettingsDialog() {
        setIsSettingsOpen(true);
    }

    function closeSettingsDialog() {
        setIsSettingsOpen(false);
    }

    function handleImageUpload() {
        fileInputRef.current?.click();
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            // Create a preview URL for the selected image
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);

            // Here you would typically upload the file to your server
            console.log("Selected file:", file);
        }
    }

    return (
        <>
            <header className="flex items-center justify-between mb-8 w-full">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/assets/images/logo.svg"
                        alt=""
                        width={178}
                        height={40}
                        priority
                    />
                    <span className="sr-only">Mood tracker app</span>
                </Link>
                <div className="relative">
                    <Menu>
                        {({ open }) => (
                            <div>
                                <MenuButton className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white">
                                    <Avatar>
                                        <AvatarImage src="/assets/images/avatar-lisa.jpg" />
                                        <AvatarFallback className="text-foreground">
                                            Lisa
                                        </AvatarFallback>
                                    </Avatar>
                                    <ChevronDownIcon
                                        className={`size-4 fill-black transition-transform duration-200 ${
                                            open ? "rotate-180" : ""
                                        }`}
                                    />
                                </MenuButton>

                                <MenuItems
                                    transition
                                    anchor={{ to: "bottom end", offset: 0 }}
                                    className="w-11/12 sm:w-50  origin-top-right rounded-[var(--radius-8)] border border-white/5 bg-white p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                                >
                                    <MenuItem>
                                        <button className="group flex flex-col items-start w-full  gap-2 rounded-lg px-3 py-1.5 data-focus:bg-[hsl(var(--blue-200))]">
                                            <p className="text-preset-6 text-foreground">
                                                Lisa Maria
                                            </p>
                                            <span className="text-preset-7 text-muted-foreground">
                                                lisa@mail.com
                                            </span>
                                        </button>
                                    </MenuItem>
                                    <MenuSeparator className="my-1 h-px bg-[hsl(var(--blue-100))]" />
                                    <MenuItem>
                                        <Button
                                            type="button"
                                            onClick={showSettingsDialog}
                                            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-[hsl(var(--blue-200))]"
                                        >
                                            <Image
                                                width={16}
                                                height={16}
                                                src="/assets/images/icon-settings.svg"
                                                alt={""}
                                            />
                                            <span className="text-foreground">
                                                Settings
                                            </span>
                                        </Button>
                                    </MenuItem>
                                    <div className="my-1 h-px bg-white/5" />
                                    <MenuItem>
                                        <Button
                                            type="button"
                                            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-[hsl(var(--blue-200))]"
                                        >
                                            <Image
                                                width={16}
                                                height={16}
                                                src="/assets/images/icon-logout.svg"
                                                alt={""}
                                            />
                                            <span className="text-foreground">
                                                Logout
                                            </span>
                                        </Button>
                                    </MenuItem>
                                </MenuItems>
                            </div>
                        )}
                    </Menu>
                </div>
            </header>
            {/* Settings Dialog - Moved outside of Menu structure */}
            <Dialog
                open={isSettingsOpen}
                as="div"
                className="relative z-50 focus:outline-none"
                onClose={closeSettingsDialog}
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
                                    onClick={closeSettingsDialog}
                                    className="rounded-md p-1 hover:bg-gray-100 transition-colors"
                                >
                                    <XMarkIcon className="size-5 text-gray-500" />
                                </Button>
                            </div>

                            {/* Settings Content */}
                            <div className="space-y-6">
                                {/* Profile Section */}
                                <div>
                                    <Description className="text-preset-6-regular accent-foreground  mb-3">
                                        Personalise your account with your name
                                        and photo
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
                                                        Lisa
                                                    </AvatarFallback>
                                                </Avatar>
                                                <Button
                                                    onClick={handleImageUpload}
                                                    className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-colors"
                                                    title="Change profile picture"
                                                >
                                                    <CameraIcon className="size-4" />
                                                </Button>
                                            </div>
                                            <div className="text-center">
                                                <Button
                                                    onClick={handleImageUpload}
                                                    className="text-preset-7 text-blue-600 hover:text-blue-700 font-medium"
                                                >
                                                    Change profile picture
                                                </Button>
                                                <p className="text-preset-8 text-muted-foreground mt-1">
                                                    JPG, PNG or GIF (max. 5MB)
                                                </p>
                                            </div>
                                            {/* Hidden file input */}
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                aria-label="Upload profile picture"
                                            />
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
                                                defaultValue="Lisa Maria"
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
                                                defaultValue="lisa@mail.com"
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
                                                Share anonymous data for
                                                research
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Dialog Actions */}
                            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                                <Button
                                    onClick={closeSettingsDialog}
                                    className="flex-1 px-4 py-2 text-preset-6 text-muted-foreground border border-gray-300 rounded-[var(--radius-10)] hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={closeSettingsDialog}
                                    className="flex-1 px-4 py-2 text-preset-6 text-white bg-blue-600 rounded-[var(--radius-10)] hover:bg-blue-700 transition-colors"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default Header;
