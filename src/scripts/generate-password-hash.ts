import bcrypt from "bcryptjs"

// Change this to whatever password you want to use for testing
const testPassword = "test123"

async function generateHash() {
  try {
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(testPassword, saltRounds)

    console.log("=== Password Hash Generator ===")
    console.log("Original password:", testPassword)
    console.log("Hashed password:", hashedPassword)
    console.log("\nCopy the hashed password above and update your database record.")
    console.log(
      "UPDATE users SET password_hash = '" + hashedPassword + "' WHERE email = 'lisa@mail.com';",
    )
  } catch (error) {
    console.error("Error generating hash:", error)
  }
}

generateHash()
