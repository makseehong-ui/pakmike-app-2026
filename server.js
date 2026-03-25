import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Test API endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the Express backend!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
