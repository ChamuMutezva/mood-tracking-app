'use server';

import { sql } from '@vercel/postgres';

// Type guard to check if error has message property
function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export async function updateUserProfilePicture(userId: string, imageUrl: string) {
  try {
    // Try to update the user
    await sql`
      UPDATE users 
      SET image = ${imageUrl}
      WHERE id = ${userId}
    `;

    return { success: true };
  } catch (error: unknown) {
    // If the update fails because the column doesn't exist, add the column
    if (isErrorWithMessage(error) && error.message.includes('column "image" does not exist')) {
      try {
        // Add the image column
        await sql`ALTER TABLE users ADD COLUMN image TEXT`;
        
        // Try the update again
        await sql`
          UPDATE users 
          SET image = ${imageUrl}
          WHERE id = ${userId}
        `;
        
        return { success: true };
      } catch (secondError) {
        console.error('Failed to add image column:', secondError);
        return { error: 'Failed to update profile picture' };
      }
    }
    
    console.error('Database update error:', error);
    return { error: 'Failed to update profile picture' };
  }
}