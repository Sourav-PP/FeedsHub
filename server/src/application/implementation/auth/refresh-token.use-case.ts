import { HttpStatusCode } from "axios";
import { IJwtService } from "../../../domain/services/jwt-service.interface";
import { CustomError } from "../../../domain/utils/custom-error";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { IRefreshTokenUseCase } from "../../interface/auth/refresh-token-use-case.interface";

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  private _jwtService: IJwtService;

  constructor(jwtService: IJwtService) {
    this._jwtService = jwtService;
  }

  async execute(refreshToken: string): Promise<{ accessToken: string; }> {
      console.log('refreshToken triggered')
      const payload = this._jwtService.verifyRefreshToken(refreshToken);
      console.log(payload)
      if(!payload) {
        throw new CustomError(generalMessages.ERROR.INVALID_TOKEN, HttpStatusCode.Unauthorized)
      }
      const accessToken = this._jwtService.generateAccessToken(payload.userId, payload.email);
      return { accessToken };
  }
}