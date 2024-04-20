import mongoDb from "../../../helpers/db";

async function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid data!" });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = await mongoDb("events");
    const dbConnection = db.db();

    const result = await dbConnection
      .collection("comments")
      .insertOne(newComment);

    newComment.id = result.insertedId;

    res.status(201).json({ message: "Added comment", comment: newComment });

    db.close();
  }

  if (req.method === "GET") {
    const db = await mongoDb("events");
    const dbConnection = db.db();

    const documents = await dbConnection
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    const dummyData = [
      { id: "c1", name: "Max", text: "A first comment!" },
      { id: "c2", name: "Celine", text: "A second comment!" },
    ];

    res.status(200).json({ comments: documents });

    db.close();
  }
}

export default handler;
