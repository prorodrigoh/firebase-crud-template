import { Router } from "express"
import { 
    addTemplateDoc, 
    getAllTemplateDocs, 
    getTemplateById,
    updateTemplateDoc,
    deleteTemplateDoc,
    eraseTemplateDoc
} from "../services/template.services.js";

export const templateRoutes = Router();

// - API ENDPOINTS - API ROUTES

templateRoutes.post('/', addTemplateDoc);

templateRoutes.get('/', getAllTemplateDocs);

templateRoutes.get('/:templateDocId', getTemplateById);

templateRoutes.patch('/:templateDocId', updateTemplateDoc);

templateRoutes.delete('/:templateDocId', deleteTemplateDoc);

templateRoutes.delete('/erase/:templateDocId', eraseTemplateDoc);
