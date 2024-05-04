import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
    "mongodb+srv://prameshbajra:Xjp1DxxXRf9li2au@dummycluster.htqg8xj.mongodb.net/?retryWrites=true&w=majority&appName=DummyCluster";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run(eventBody) {
    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        const db = client.db("mongodb");
        console.log("Database instance : ", db);
        const collection = db.collection("mongolambda");
        console.log("Collection instance : ", collection);
        const result = await collection.insertOne(eventBody);
        console.log("Result: ", result);
        console.log(`Document inserted with _id: ${result.insertedId}`);
    } catch (e) {
        console.error("Error: ", e);
    } finally {
        await client.close();
    }
}

export const handler = async (event) => {
    console.log("Mongo Client:> ", client);
    const eventBody = JSON.parse(event.body);
    const response = {
        statusCode: 200,
        body: eventBody,
    };
    await run(eventBody);
    return JSON.stringify(response);
}
