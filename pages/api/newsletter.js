import mongoDb from "../../helpers/db";

async function handler(req, res) {
  
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid input. " });
      return;
    }

    const db = await mongoDb('newsletter');
    const databaseConnetion = await db.db();

    await databaseConnetion.collection("emails").insertOne({ email: userEmail });

    db.close()

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
