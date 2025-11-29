import { validateRequest } from "../../../middleware/validate-request.middleware";
import { RegisterUserSchema } from "../schema/register-user.schema";

export const validateRegisterUser = validateRequest(RegisterUserSchema);
