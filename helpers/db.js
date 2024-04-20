import { MongoClient } from "mongodb";

async function mongoDb(database) {
    const client = await MongoClient.connect(
        `mongodb+srv://nurionurkurtulus:nuri4141@cluster0.tptu29r.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`
      );

      return client;
}

export default mongoDb;