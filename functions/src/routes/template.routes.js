import { Routes } from "express"
import { 
    addTemplateDoc, 
    getAllTemplateDocs, 
    getTemplateById,
    updateTemplateDoc,
    deleteTemplateDoc
} from "./src/services/template.services.js";

export const templateRoutes = Routes();

// - API ENDPOINTS - API ROUTES

app.post('/', addTemplateDoc);
app.get('/', getAllTemplateDocs);
app.get('/:templateDocId', getTemplateById);
app.patch('/:templateDocId', updateTemplateDoc);
app.delete('/:templateDocId', deleteTemplateDoc);