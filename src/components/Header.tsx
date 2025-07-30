"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuSeparator,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

function Header() {
    return (
        <header className="flex items-center justify-between mb-8">
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
                                anchor={{ to: "bottom end", offset: 16 }}
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
                                    <button
                                        type="button"
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
                                    </button>
                                </MenuItem>
                                <div className="my-1 h-px bg-white/5" />
                                <MenuItem>
                                    <button
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
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </div>
                    )}
                </Menu>
            </div>
        </header>
    );
}

export default Header;
