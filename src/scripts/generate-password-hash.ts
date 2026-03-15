import bcrypt from "bcryptjs";

// Change this to whatever password you want to use for testing
const testPassword = "test123";

async function generateHash() {
    try {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(testPassword, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Error generating hash:", error);
    }
}

await generateHash();
