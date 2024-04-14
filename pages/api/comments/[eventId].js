
function handler(req, res) {
    const eventId = req.query.eventId;

    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({ message: 'Invalid data!'});
            return
        }
        console.log(name,email,text)

        const newComment = {
            id: new Date().toISOString(),
            email,
            name,
            text
        }
        console.log(newComment)
        res.status(201).json({ message: 'Added comment', comment: newComment})
    }

    if (req.method === 'GET') {
        const dummyData = [
            { id: 'c1', name: 'Max', text: 'A first comment!'},
            { id: 'c2', name: 'Celine', text: 'A second comment!'}
        ];

        res.status(200).json({ comments: dummyData })
    }
}

export default handler;