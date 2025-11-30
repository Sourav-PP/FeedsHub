import { validateRequest } from "../../../middleware/validate-request.middleware";
import { LoginUserSchema } from "../schema/login-user.schema";

export const validateLoginUser = validateRequest(LoginUserSchema);
