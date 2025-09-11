"use client";

import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuSeparator,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { logout } from "@/actions/logout";
import { Session } from "next-auth";
import { useEdgeStore } from "@/lib/edgestore";
import DialogProfile from "./DialogProfile";
import { updateUserProfilePicture } from "@/actions/update-user-profile";

interface HeaderProps {
    session: Session | null;
}

function Header({ session }: Readonly<HeaderProps>) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(
        session?.user?.image || "/assets/images/avatar-lisa.jpg"
    );
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { edgestore } = useEdgeStore();

    function showSettingsDialog() {
        setIsSettingsOpen(true);
    }

    function closeSettingsDialog() {
        setIsSettingsOpen(false);
    }

    function handleImageUpload() {
        fileInputRef.current?.click();
    }

    async function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];
        if (!file || !session?.user?.id) return;

        if (!file.type.startsWith("image/")) {
            setUploadError("Please select an image file (JPG, PNG, GIF)");
            return;
        }

        // validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setUploadError("File size must be less than 5MB");
        }

        setIsUploading(true);
        setUploadError(null);

        try {
            //Create a preview URL for immediate feedback
            const previewUrl = URL.createObjectURL(file);
            setProfileImage(previewUrl);

            // Upload to EdgeStore
            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                    console.log(`Upload progress: ${progress}%`);
                },
            });
            console.log("EdgeStore upload successful:", res.url);

            // update user profile in database
            const result = await updateUserProfilePicture(
                session.user.id,
                res.url
            );

            if (result.error) {
                throw new Error(result.error);
            }
        } catch (error) {
            console.log("Upload error:", error);
            setUploadError(
                error instanceof Error
                    ? error.message
                    : "Failed to upload image"
            );
            // Revert to previous image on error
            setProfileImage(
                session.user.image || "/assets/images/avatar-lisa.jpg"
            );
        } finally {
            setIsUploading(false);
        }
    }

    async function handleLogout() {
        setIsLoggingOut(true);
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
            setIsLoggingOut(false);
        }
    }

    return (
        <>
            <header className="flex items-center justify-between mt-8 mb-10 w-full">
                <Link
                    href="/"
                    className="flex items-center gap-2 rounded-[var(--radius-10)] 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transition-colors duration-200 cursor-pointer no-underline border-none "
                >
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
                                <MenuButton
                                    aria-label="Profile menu"
                                    aria-expanded={open}
                                    className="inline-flex items-center text-sm/6 font-semibold
                                     text-white shadow-inner shadow-white/10 rounded-[var(--radius-10)] 
                                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                      transition-colors duration-200 cursor-pointer no-underline border-none"
                                >
                                    <Avatar>
                                        <AvatarImage
                                            src={profileImage}
                                            alt={` ${session?.user?.name}'s profile`}
                                        />
                                        <AvatarFallback className="text-foreground">
                                            {session?.user?.name}
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
                                    <MenuItem as="div">
                                        <div className="group flex flex-col items-start w-full  gap-2 rounded-lg px-3 py-1.5">
                                            <p className="text-preset-6 text-foreground">
                                                {session?.user?.name}
                                            </p>
                                            <span className="text-preset-7 text-muted-foreground">
                                                {session?.user?.email}
                                            </span>
                                        </div>
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
                                            onClick={handleLogout}
                                            disabled={isLoggingOut}
                                            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-[hsl(var(--blue-200))]"
                                        >
                                            <Image
                                                width={16}
                                                height={16}
                                                src="/assets/images/icon-logout.svg"
                                                alt={""}
                                            />
                                            <span className="text-foreground">
                                                {isLoggingOut
                                                    ? "Logging out..."
                                                    : "Log Out"}
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
            <DialogProfile
                isOpen={isSettingsOpen}
                onClose={closeSettingsDialog}
                session={session}
                profileImage={profileImage}
                isUploading={isUploading}
                uploadError={uploadError}
                onImageUpload={handleImageUpload}
                onFileChange={handleFileChange}
                fileInputRef={fileInputRef}
            />
        </>
    );
}

export default Header;
