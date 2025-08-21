"use server"

import { redirect } from "next/navigation"
import { sql } from "@/lib/db"

export async function handleForgotPassword(formData: FormData) {
  const email = formData.get("email") as string

  const errors: Record<string, string> = {}

  if (!email) {
    errors.email = "Email is required"
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Please enter a valid email address"
  }

  if (Object.keys(errors).length > 0) {
    const searchParams = new URLSearchParams()
    Object.entries(errors).forEach(([field, message]) => {
      searchParams.set(`error_${field}`, message)
    })
    if (email) searchParams.set("email", email)
    redirect(`/forgot-password?${searchParams.toString()}`)
  }

  try {
    // Check if user exists in database
    const result = await sql`
      SELECT email FROM users WHERE email = ${email}
    `

    if (result.length === 0) {
      // Don't reveal if email exists or not for security
      const searchParams = new URLSearchParams()
      searchParams.set("success", "If an account with that email exists, we've sent password reset instructions.")
      redirect(`/forgot-password?${searchParams.toString()}`)
    }

    // TODO: In production, send actual password reset email here
    console.log("Password reset requested for:", email)

    const searchParams = new URLSearchParams()
    searchParams.set("success", "If an account with that email exists, we've sent password reset instructions.")
    redirect(`/forgot-password?${searchParams.toString()}`)
  } catch (error) {
    console.error("Forgot password error:", error)
    const searchParams = new URLSearchParams()
    searchParams.set("error_general", "An error occurred. Please try again.")
    if (email) searchParams.set("email", email)
    redirect(`/forgot-password?${searchParams.toString()}`)
  }
}
