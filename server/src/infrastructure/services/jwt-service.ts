import { IJwtService } from "../../domain/services/jwt-service.interface";
import { config } from "../../shared/config.constant";
import jwt, { SignOptions } from "jsonwebtoken";

export class JwtService implements IJwtService {
    private accessSecret: string;
    private refreshSecret: string;
    private accessExpireIn: string;
    private refreshExpireIn: string;

    constructor() {
        this.accessSecret = config.jwt.accessTokenSecret;
        this.refreshSecret = config.jwt.refreshTokenSecret;
        this.accessExpireIn = config.jwt.accessTokenExpiresIn;
        this.refreshExpireIn = config.jwt.refreshTokenExpiresIn;
    }

    generateAccessToken(userId: string, email: string): string {
        return jwt.sign({ userId, email }, this.accessSecret, { expiresIn: this.accessExpireIn } as SignOptions);
    }

    generateRefreshToken(userId: string, email: string): string {
        return jwt.sign({ userId, email }, this.refreshSecret, { expiresIn: this.refreshExpireIn } as SignOptions);
    }

    verifyAccessToken(token: string): { userId: string; email: string; exp: number } | null {
        try {
            return jwt.verify(token, this.accessSecret) as {
                userId: string;
                email: string;
                exp: number;
            };
        } catch (error) {
            return null;
        }
    }

    verifyRefreshToken(token: string): { userId: string; email: string } | null {
        try {
            return jwt.verify(token, this.refreshSecret) as {
                userId: string;
                email: string;
            };
        } catch (error) {
            return null;
        }
    }
}
