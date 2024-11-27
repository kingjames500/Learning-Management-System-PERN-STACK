import { Router } from "./../imports/imports.js";

import assigmentAIGeneration from "../controllers/openai.js";

const router = Router();

router.post("/openai", assigmentAIGeneration);

export default router;
