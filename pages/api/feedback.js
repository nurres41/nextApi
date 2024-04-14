import fs from 'fs' //file system
import path from 'path';

export function buildFeedbackPath() {
    return path.join(process.cwd(), 'data', 'feedback.json')  // file path defined
}

export function extractFeedback(filePath) {
    const fileData = fs.readFileSync(filePath) // data readed
    const data = JSON.parse(fileData) // data convert to object

    return data;
}

function handler(req, res) {
    if (req.method === 'POST'){
        const email = req.body.email;
        const feedback = req.body.text;

        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            text: feedback,
        }

        // store that in a database or in a file
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath)

        data.push(newFeedback) // new data added into the array
        fs.writeFileSync(filePath, JSON.stringify(data)) // new array added into the file

        res.status(201).json({ message: 'Success', feedback: newFeedback }) 
    } else {
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);

        res.status(200).json({ feedback: data})
    }
}

export default handler;