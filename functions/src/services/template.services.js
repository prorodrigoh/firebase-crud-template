import connectDb from '../gateway/template.gateway.js';

// CREATE

export const addTemplateDoc = async (req, res) => {
    // check req is valid
    if(!req.body || !req.body.name || !req.body.address){  // check if there is a body with data in the request parameter 
        res.status(401).send('Invalid request');           // or if the name in the body is filled or the address is filled
        return;
    }
    // connect to DB
    const db = connectDb();

    // // prepare the data in case of data validation
    const newTemplateDoc = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone || 555-555-5555,
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

export function getTemplateById(req, res){
    const { templateId } = req.params
    if(!templateId){
        res.status(401).send('Invalid request');
        return;
    }
    const db = connectDb();
    db.collection('templates').doc(templateId).get()
    try {
        doc => {
            let templateDoc = doc.data();
            templateDoc.id = doc.id;
            res.send(templateDoc)
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

// UPDATE

function validateUpdateParams (req){
    if(!req.params.restaurantId || !req.body){  // check if there is a body with data in the request parameter 
        return -1
    }
    return 0
}

export function updateTemplateDoc(req, res){
    const { templateId } = req.params
    // validate req params
    if(validateUpdateParams(req) < 0){
        res.status(401).send('Invalid request for restaurant: ' + templateId);
        return;
    }
    // connect to DB
    const db = connectDb();
    // update the data in the collection
    db.collection('templates').doc(templateId).update(req.body)
        try {
            // return success
            res.status(201).send('Template Updated ' + templateId)
        } catch (err){
            res.status(500).send(err)
        }
}

// DELETE

function validateDeleteParams (req){
    if(!req.params.restaurantId){  // check if there is a body with data in the request parameter 
        return -1
    }
    return 0
}

// HARD DELETE
export function deleteTemplateDoc(req, res){
    const { templateId } = req.params
    // validate req params
    if(validateDeleteParams(req) < 0){
        res.status(401).send('Invalid request for template: ' + templateId);
        return;
    }
    // connect to DB
    const db = connectDb();
    // hard delete data
    db.collection('templates').doc(templateId).delete()
    try{
        res.status(201).send('Template deleted: ' + templateId)
    } catch (err) {
        res.status(500).send(err)
    }
}

// SOFT DELETE
export function deleteTemplateDoc(req, res){
    const { templateId } = req.params
    // validate req params
    if(validateDeleteParams(req) < 0){
        res.status(401).send('Invalid request for template: ' + templateId);
        return;
    }
    // connect to DB
    const db = connectDb();
    // hard delete data
    db.collection('templates').doc(templateId).update({deletedAt: new Date()})
    try{
        res.status(201).send('Template deleted: ' + templateId)
    } catch (err) {
        res.status(500).send(err)
    }
}