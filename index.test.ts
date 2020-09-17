import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

import { MongoMessageService } from "./index";

describe("mongo message service", () => {
  it(
    "inserts messages and retrieves them",
    async () => {
      const mongod = new MongoMemoryServer();
      const uri = await mongod.getUri();
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const service = new MongoMessageService(client);
      const message1 = { content: "hi", author: "john" };
      const message2 = { content: "hello", author: "tom" };
      await service.insert(message1);
      await service.insert(message2);
      const messages = await service.getAll();
      // expect(messages.length).toEqual(2);
      expect(messages).toContain(message1);
      expect(messages).toContain(message2);
    },
    5 * 60 * 1000
  );
});
