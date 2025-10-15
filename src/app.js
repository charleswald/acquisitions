import express from 'express';

const app = express();

app.get('/', (req, res) => {
  console.info('Hello from Acquisitions!');
  res.status(200).send('Hello from Acquisitions!');
});
