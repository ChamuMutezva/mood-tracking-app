"use server"

import { redirect } from "next/navigation"
import { registerUser } from "@/lib/auth"

export async function handleSignup(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Server-side validation
  const errors: Record<string, string> = {}

  if (!name || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long"
  }

  if (!email) {
    errors.email = "Email is required"
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Please enter a valid email address"
  }

  if (!password) {
    errors.password = "Password is required"
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long"
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password"
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match"
  }

  if (Object.keys(errors).length > 0) {
    const searchParams = new URLSearchParams()
    Object.entries(errors).forEach(([field, message]) => {
      searchParams.set(`error_${field}`, message)
    })
    // Preserve form data
    if (name) searchParams.set("name", name)
    if (email) searchParams.set("email", email)
    redirect(`/signup?${searchParams.toString()}`)
  }

  try {
    const user = await registerUser(name, email, password)
    console.log("User registered successfully:", user.email)

    // Redirect to login page with success message
    const searchParams = new URLSearchParams()
    searchParams.set("success", "Account created successfully! Please log in.")
    searchParams.set("email", email)
    redirect(`/login?${searchParams.toString()}`)
  } catch (error) {
    console.error("Registration error:", error)
    const searchParams = new URLSearchParams()

    if (error instanceof Error && error.message === "User already exists") {
      searchParams.set("error_email", "An account with this email already exists")
    } else {
      searchParams.set("error_auth", "An error occurred. Please try again.")
    }

    // Preserve form data
    if (name) searchParams.set("name", name)
    if (email) searchParams.set("email", email)
    redirect(`/signup?${searchParams.toString()}`)
  }
}
