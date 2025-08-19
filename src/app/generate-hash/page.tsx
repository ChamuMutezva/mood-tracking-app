"use client";

import { useState } from "react";
import bcrypt from "bcryptjs";
import { Field, Label, Input, Button } from "@headlessui/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function GenerateHashPage() {
    const [password, setPassword] = useState("");
    const [hash, setHash] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const generateHash = async () => {
        if (!password) return;

        setIsGenerating(true);
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            setHash(hashedPassword);
        } catch (error) {
            console.error("Error generating hash:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hash);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Password Hash Generator</CardTitle>
                    <CardDescription>
                        Generate a bcrypt hash for your test password
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Field>
                            <Label htmlFor="password">Test Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your test password"
                            />
                        </Field>
                    </div>

                    <Button
                        onClick={generateHash}
                        disabled={!password || isGenerating}
                        className="w-full"
                    >
                        {isGenerating ? "Generating..." : "Generate Hash"}
                    </Button>

                    {hash && (
                        <div className="space-y-2">
                            <Field>
                                <Label>Generated Hash:</Label>
                                <div className="p-3 bg-gray-100 rounded border text-sm font-mono break-all">
                                    {hash}
                                </div>
                                <Button onClick={copyToClipboard}>Copy Hash</Button>
                                <p className="text-sm text-gray-600">
                                    Copy this hash and update your database user
                                    record with it.
                                </p>
                            </Field>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
