import { validateRequest } from "../../../middleware/validate-request.middleware";
import { CreateArticleSchema } from "../schema/create-article.schema";

export const validateCreateArticle = validateRequest(CreateArticleSchema);
