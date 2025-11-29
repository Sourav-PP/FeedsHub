import { JwtService } from "../services/jwt-service";
import { Bcrypt } from "../services/bcrypt";

export const services = {
  jwtService: new JwtService(),
  bcrypt: new Bcrypt(),
}