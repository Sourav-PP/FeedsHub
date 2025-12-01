import { JwtService } from "../services/jwt-service";
import { Bcrypt } from "../services/bcrypt";
import { CloudinaryStorage } from "../services/cloudinary.storage";

export const services = {
    jwtService: new JwtService(),
    bcrypt: new Bcrypt(),
    cloudinaryStorage: new CloudinaryStorage(),
};
