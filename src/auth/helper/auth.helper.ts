import * as bcrypt from 'bcrypt';

export class AuthHelper {
    private static readonly SALT_ROUNDS = 10;

    public static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(AuthHelper.SALT_ROUNDS);
        return bcrypt.hash(password, salt);
    }

    public static async checkPassword(enteredPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(enteredPassword, hashedPassword);
    }
}