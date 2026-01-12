import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

/**
 * Verify user credentials
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<object|null>} User object if valid, null otherwise
 */
export async function verifyCredentials(email, password) {
  try {
    // Find user by email
    const user = await prisma.auto_apply_cand.findUnique({
      where: { email },
      select: {
        cand_id: true,
        email: true,
        password: true,
        first_name: true,
        last_name: true,
      },
    });

    if (!user || !user.password) {
      return null;
    }

    // Verify password using bcrypt
    // Todo: Uncomment this when we have a secure way to store passwords
    const isValid = await bcrypt.compare(password, user.password);

    // const isValid = password === user.password;

    if (!isValid) {
      return null;
    }

    // Return user data without password
    return {
      id: user.cand_id.toString(),
      candidate_id: user.cand_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };
  } catch (error) {
    console.error('Error verifying credentials:', error);
    return null;
  }
}

/**
 * Get user by ID
 * @param {number} candidateId - Candidate ID
 * @returns {Promise<object|null>} User object if found, null otherwise
 */
export async function getUserById(candidateId) {
  try {
    const user = await prisma.auto_apply_cand.findUnique({
      where: { cand_id: candidateId },
      select: {
        cand_id: true,
        email: true,
        first_name: true,
        last_name: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.cand_id.toString(),
      candidate_id: user.cand_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
}

