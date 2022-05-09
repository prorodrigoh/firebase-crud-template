import connectDb from '../gateway/template.gateway.js';

// CREATE

export const addTemplateDoc = async (req, res) => {

    if(!req.body || !req.body.firstName || !req.body.email){
        res.status(401).send('Invalid request for creating Template Doc');
        return;
    }

    const db = connectDb();

    const newTemplateDoc = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone || "555-555-5555",
        zipCode: req.body.zipCode || '33160',
    }

    try {
        const doc = await db.collection('templates').add(newTemplateDoc);
        res.status(201).send('Template Created ' + doc.id )
    } catch (err) {
        res.status(500).send(err)
    }
}

// READ

export const getAllTemplateDocs = async (req, res) => {

    const db = connectDb();

    try {
        const snapshot = await db.collection('templates').get();
        const templatesArray = snapshot.docs.map( doc => {
            let templateDoc = doc.data();
            templateDoc.id = doc.id;
            return templateDoc
        })
        res.send(templatesArray);
    } catch (err) {
        res.status(500).send(err);
    }
}

export const getTemplateById = async (req, res) => {

    const { templateDocId } = req.params

    if(!templateDocId){
        res.status(401).send('Invalid request for get Template by ID');
        return;
    }

    const db = connectDb();

    try {
        const templateDoc = await db.collection('templates').where('__name__', '==' ,templateDocId).get();
        const templateData = templateDoc.docs.map((doc) => doc.data());
        res.send(templateData);
    } catch (err) {
        res.status(500).send(err);
    }
}


// UPDATE

function validateUpdateParams (req){
    if(!req.params.templateDocId || !req.body){
        return -1
    }
    return 0
}

export function updateTemplateDoc(req, res){
    const { templateDocId } = req.params

    if(validateUpdateParams(req) < 0){
        res.status(401).send('Invalid request for update: ' + templateDocId);
        return;
    }

    const db = connectDb();

    db.collection('templates').doc(templateDocId).update(req.body)
        try {

            res.status(201).send('Template Updated ' + templateDocId)
        } catch (err){
            res.status(500).send(err)
        }
}

// DELETE

// HARD DELETE
export function eraseTemplateDoc(req, res){
    const { templateDocId } = req.params
    // validate req params
    if(!templateDocId){
        res.status(401).send('Invalid request for erase: ' + templateDocId);
        return;
    }
    // connect to DB
    const db = connectDb();
    // hard delete data
    db.collection('templates').doc(templateDocId).delete()
    try{
        res.status(201).send('Template erased: ' + templateDocId)
    } catch (err) {
        res.status(500).send(err)
    }
}

// SOFT DELETE
export function deleteTemplateDoc(req, res){
    const { templateDocId } = req.params
    // validate req params
    if(!templateDocId){
        res.status(401).send('Invalid request for delete: ' + templateDocId);
        return;
    }
    // connect to DB
    const db = connectDb();
    // hard delete data
    db.collection('templates').doc(templateDocId).update({deletedAt: new Date()})
    try{
        res.status(201).send('Template deleted: ' + templateDocId)
    } catch (err) {
        res.status(500).send(err)
    }
}