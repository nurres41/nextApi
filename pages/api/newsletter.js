import mongoDb from "../../helpers/db";

async function insertDocument(document) {
  const db = await mongoDb('newsletter');
  const databaseConnetion = await db.db();

  return await databaseConnetion.collection("emails").insertOne(document);
}

async function handler(req, res) {
  
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid input. " });
      return;
    }

    await insertDocument({ email: userEmail })

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
