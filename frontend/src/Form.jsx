import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [form, setForm] = useState({
    studentName: '',
    email: '',
    subject: '',
    teacherName: '',
    rating: '',
    comment: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit-feedback', form);
      setSubmitted(true);
      setForm({
        studentName: '',
        email: '',
        subject: '',
        teacherName: '',
        rating: '',
        comment: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Thank you!</h2>
            <p className="text-gray-600">Your feedback has been submitted successfully.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit Another Feedback
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Student Feedback Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">Subject</label>
                <input
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="e.g. Mathematics"
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Teacher's Name</label>
                <input
                  name="teacherName"
                  required
                  value={form.teacherName}
                  onChange={handleChange}
                  placeholder="e.g. Mr. Sharma"
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Rating (1 to 5)</label>
                <select
                  name="rating"
                  required
                  value={form.rating}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map((rate) => (
                    <option key={rate} value={rate}>{rate}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700">Comments</label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  placeholder="Write your feedback here..."
                  rows="4"
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700">Your Name (optional)</label>
                  <input
                    name="studentName"
                    value={form.studentName}
                    onChange={handleChange}
                    placeholder="Anonymous"
                    className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">Email (optional)</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Submit Feedback
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Form;
