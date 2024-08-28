const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/video-progress', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// check connection
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// here we defined a schema and model for video progress
const progressSchema = new mongoose.Schema({
  videoId: Number,
  percentage: Number,
});

const Progress = mongoose.model('Progress', progressSchema);

// Routes
app.get('/api/progress', async (req, res) => {
  const progress = await Progress.find({});
  res.json(progress);
});

app.post('/api/progress', async (req, res) => {
  const { videoId, percentage } = req.body;
  const existingProgress = await Progress.findOne({ videoId });

  if (existingProgress) {
    existingProgress.percentage = percentage;
    await existingProgress.save();
  } else {
    const newProgress = new Progress({ videoId, percentage });
    await newProgress.save();
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
