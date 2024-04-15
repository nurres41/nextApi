import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid input. " });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://nurionurkurtulus:nuri4141@cluster0.tptu29r.mongodb.net/newsletter?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db();

    await db.collection("emails").insertOne({ email: userEmail });

    client.close()

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
