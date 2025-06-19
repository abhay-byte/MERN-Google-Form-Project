// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/feedback-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Mongoose Schema
const feedbackSchema = new mongoose.Schema({
  studentName: { type: String, default: 'Anonymous' }, // default name
  email: { type: String, default: '' },
  subject: String,
  teacherName: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now }
});


const Feedback = mongoose.model('Feedback', feedbackSchema);

// Route to Submit Feedback
app.post('/submit-feedback', async (req, res) => {
  try {
    const data = req.body;

    // Set default name if blank
    if (!data.studentName || data.studentName.trim() === '') {
      data.studentName = 'Anonymous';
    }

    const feedback = new Feedback(data);
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// GET teacher-wise average rating
app.get('/feedback-report', async (req, res) => {
  try {
    const report = await Feedback.aggregate([
      {
        $group: {
          _id: "$teacherName",
          averageRating: { $avg: "$rating" },
          count: { $sum: 1 }
        }
      },
      { $sort: { averageRating: -1 } }
    ]);
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch report" });
  }
});


// Route to Get All Feedback (Admin View)
// Get all feedbacks with student info
app.get('/all-feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ submittedAt: -1 }); // latest first
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
