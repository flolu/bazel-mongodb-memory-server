import { MongoClient } from "mongodb";

interface Message {
  content: string;
  author: string;
}

export class MongoMessageService {
  constructor(private client: MongoClient) {}

  async insert(message: Message) {
    const collection = await this.collection();
    await collection.insertOne(message);
  }

  async getAll() {
    const collection = await this.collection();
    return collection.find({}).toArray();
  }

  private async collection() {
    const db = await this.db();
    return db.collection<Message>("messages");
  }

  private async db() {
    if (!this.client.isConnected()) await this.client.connect();
    return this.client.db("test_db");
  }
}
