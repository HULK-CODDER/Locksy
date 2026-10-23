const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const url = 'mongodb://localhost:27017';
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
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}

startServer();