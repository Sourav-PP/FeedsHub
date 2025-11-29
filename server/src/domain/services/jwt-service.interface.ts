export interface IJwtService {
    generateAccessToken(userId: string, email: string): string;
    generateRefreshToken(userId: string, email: string): string;
    verifyAccessToken(token: string): { userId: string; email: string; exp: number } | null;
    verifyRefreshToken(token: string): { userId: string; email: string } | null;
}
