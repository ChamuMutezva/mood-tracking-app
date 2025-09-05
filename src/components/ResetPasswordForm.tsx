"use client";

import { KeyIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button, Label, Input, Field } from "@headlessui/react";
import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import { resetPassword } from "@/actions/reset-password";
import { useRouter } from "next/navigation";
import { ResetPasswordFormState } from "@/lib/types";

const initialState: ResetPasswordFormState = {
    errors: {},
    message: "",
    success: false,
};

export default function ResetPasswordForm({
    token,
}: Readonly<{ token: string }>) {
    const [state, formAction, isPending] = useActionState(
        resetPassword,
        initialState
    );
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            router.push("/login?reset=success");
        }
    }, [state.success, router]);

    return (
        <form action={formAction} className="max-w-[35rem] w-full">
            <div className="rounded-lg px-4 py-8">
                <h2 className={`mb-3 text-preset-1 leading-tight font-bold`}>
                    Reset Password
                </h2>

                <div className="w-full">
                    <input type="hidden" name="token" value={token} />

                    {/* NEW PASSWORD */}
                    <Field>
                        <Label
                            className="block mb-3 mt-5 text-xs text-[hsl(var(--grey-500))] font-bold"
                            htmlFor="password"
                        >
                            New Password
                        </Label>
                        <div className="relative">
                            <Input
                                className="peer block w-full rounded-md border border-gray-200 py-[12px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter new password"
                                aria-required="true"
                                minLength={6}
                                aria-describedby={
                                    state?.errors?.password
                                        ? "password-error"
                                        : undefined
                                }
                                aria-invalid={!!state?.errors?.password}
                                disabled={isPending}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-white peer-focus:text-gray-900" />
                        </div>
                        {state?.errors?.password && (
                            <p
                                id="password-error"
                                className="text-sm text-red-500"
                            >
                                {state.errors.password}
                            </p>
                        )}
                    </Field>

                    {/* CONFIRM PASSWORD */}
                    <Field>
                        <Label
                            className="block mb-3 mt-5 text-xs text-[hsl(var(--grey-500))] font-bold"
                            htmlFor="confirmPassword"
                        >
                            Confirm New Password
                        </Label>
                        <div className="relative">
                            <Input
                                className="peer block w-full rounded-md border border-gray-200 py-[12px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                aria-required="true"
                                minLength={6}
                                aria-describedby={
                                    state?.errors?.confirmPassword
                                        ? "confirm-password-error"
                                        : undefined
                                }
                                aria-invalid={!!state?.errors?.confirmPassword}
                                disabled={isPending}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-white peer-focus:text-gray-900" />
                        </div>
                        {state?.errors?.confirmPassword && (
                            <p
                                id="confirm-password-error"
                                className="text-sm text-red-500"
                            >
                                {state.errors.confirmPassword}
                            </p>
                        )}
                    </Field>
                </div>

                <ResetButton />

                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {state?.errors?.general && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">
                                {state.errors.general}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}

function ResetButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            className="mt-4 py-7 w-full flex justify-center items-center bg-[hsl(var(--grey-900))] dark:bg-[hsl(var(--grey-800))]
      border border-black dark:border-white text-sm font-bold dark:text-[hsl(var(--white))]"
            aria-disabled={pending}
        >
            {pending ? <span>Resetting...</span> : <span>Reset Password</span>}
            <ArrowRightIcon className="h-5 w-5 text-gray-50 dark:text-[hsl(var(--white))]" />
        </Button>
    );
}
