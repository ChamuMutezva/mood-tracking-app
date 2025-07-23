import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export default function Home() {
    return (
        <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <header className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/assets/images/logo.svg"
                        alt="Next.js Logo"
                        width={120}
                        height={30}
                        priority
                    />
                    <span className="sr-only">Mood tracker app</span>
                </Link>
                <div className="relative">
                    <Menu>
                        
                        <MenuButton className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white">
                            <Avatar>
                                <AvatarImage src="/assets/images/avatar-lisa.jpg" />
                                <AvatarFallback className="text-foreground">
                                    Lisa
                                </AvatarFallback>
                            </Avatar>
                            <ChevronDownIcon className="size-4 fill-black" />
                        </MenuButton>

                        <MenuItems
                            transition
                            anchor={{ to: "bottom end", offset: 16 }}
                            className="w-11/12 sm:w-40  origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                        >
                            <MenuItem>
                                <button className="group flex flex-col items-start w-full  gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                                    <p className="text-preset-6 text-foreground">
                                        Lisa Maria
                                    </p>
                                    <span className="text-preset-7 text-muted-foreground">
                                        lisa@mail.com
                                    </span>
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
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
                                <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
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

                    </Menu>
                </div>
            </header>
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <section
                    className="welcome-section"
                    aria-labelledby="greeting-text"
                >
                    <p id="greeting-text">Hello, Lisa!</p>
                    <p className="greeting">How are you feeling today?</p>
                    <time dateTime="2025-04-16" className="current-date">
                        Wednesday, April 16th, 2025
                    </time>
                </section>

                <section aria-labelledby="mood-logging-heading">
                    <h2 id="mood-logging-heading">Log today&apos;s mood</h2>
                </section>

                <section aria-labelledby="trends-heading">
                    <h2 id="trends-heading">Mood and sleep trends</h2>
                </section>
            </main>
        </div>
    );
}
