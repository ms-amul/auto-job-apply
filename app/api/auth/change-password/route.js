import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import bcrypt from 'bcryptjs';

/**
 * Change Password API Route
 * 
 * 1. Verifies session
 * 2. Compares current password with stored hash
 * 3. Hashes new password
 * 4. Updates database
 */
export async function POST(request) {
    try {
        // 1. Verify authentication
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 },
            );
        }

        const body = await request.json();
        const { currentPassword, newPassword } = body;

        // Validate required fields
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { success: false, error: 'Current and new passwords are required' },
                { status: 400 },
            );
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                { success: false, error: 'New password must be at least 8 characters' },
                { status: 400 },
            );
        }

        const userId = session.user.id || session.user.candidate_id?.toString();
        const candidateId = parseInt(userId, 10);

        if (isNaN(candidateId)) {
            return NextResponse.json(
                { success: false, error: 'Invalid user ID' },
                { status: 400 },
            );
        }

        // 2. Fetch user to get current password hash
        const user = await prisma.auto_apply_cand.findUnique({
            where: { cand_id: candidateId },
            select: { password: true },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 },
            );
        }

        // 3. Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { success: false, error: 'Incorrect current password' },
                { status: 401 },
            );
        }

        // 4. Hash new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // 5. Update password in database
        await prisma.auto_apply_cand.update({
            where: { cand_id: candidateId },
            data: {
                password: hashedPassword,
                updated_at: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Password updated successfully',
        });

    } catch (error) {
        console.error('Change password error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to change password' },
            { status: 500 },
        );
    }
}
