import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();
// Dynamic port assigned by cloud hosts
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Get connection string from cloud environment variable
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

const dbName = 'Locksy';

app.get('/', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const passwords = await collection.find({}).toArray();
    res.json(passwords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/', async (req, res) => {
  try {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    await collection.insertOne(password);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    await collection.deleteOne({ id });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log('MongoDB connected');

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}

startServer();
