'use server';

import { sql } from '@vercel/postgres';

export async function updateUserProfilePicture(userId: string, imageUrl: string) {
  try {
    // Try to update the user
    await sql`
      UPDATE users 
      SET image = ${imageUrl}
      WHERE id = ${userId}
    `;

    return { success: true };
  } catch (error: any) {
    // If the update fails because the column doesn't exist, add the column
    if (error.message.includes('column "image" does not exist')) {
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