const request = require('supertest');
const app = require('../App.js'); 
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { Faq } = require('../Models/Faq.schema.js');  

let mongoServer;
let faqId; // To store the valid FAQ ID for later tests

// Setup MongoDB in-memory server before tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

// Cleanup after all tests
afterAll(async () => {
  await Faq.deleteMany({}); 
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Server Basic Test', () => {
  it('should return a 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Not Found');  // Ensure message is returned
  });
});

describe('POST /api', () => {
  it('should save a FAQ and return success message', async () => {
    const faqData = {
      question: 'What is Node.js?', 
      answer: 'Node.js is a runtime for JavaScript.',
      username: 'testuser'
    };

    const res = await request(app)
      .post('/api')
      .send(faqData);

    expect(res.statusCode).toBe(201);  // Expected success status code
    expect(res.body.message).toBe('FAQ saved successfully');
    expect(res.body.faq.question).toBe(faqData.question);
    expect(res.body.faq.answer).toBe(faqData.answer);

    faqId = res.body.faq._id;  // Save the created FAQ ID
  });

  it('should return 400 if data is incomplete', async () => {
    const res = await request(app).post('/api').send({ question: 'Incomplete FAQ' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('All fields are required');  // Validation message for missing answer
  });
});

describe('PUT /admin/:id', () => {
  it('should update an existing FAQ', async () => {
    const updatedData = {
      question: 'What is Express?',
      answer: 'Express is a web framework for Node.js.'
    };

    const res = await request(app)
      .put(`/admin/${faqId}`)
      .send(updatedData);

    expect(res.statusCode).toBe(200); 
    expect(res.body.message).toBe('FAQ updated successfully');
    expect(res.body.faq.question).toBe(updatedData.question);
    expect(res.body.faq.answer).toBe(updatedData.answer);
  });

  it('should return 404 for an invalid FAQ ID during update', async () => {
    const invalidFaqId = new mongoose.Types.ObjectId();  // Generate a valid but non-existent ObjectId
    const res = await request(app)
      .put(`/admin/${invalidFaqId}`)
      .send({ question: 'Invalid FAQ', answer: 'No answer' });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('FAQ not found');
  });
});

describe('DELETE /admin/:id', () => {
  it('should delete an existing FAQ', async () => {
    const res = await request(app).delete(`/admin/${faqId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('FAQ deleted successfully');
  });

  it('should return 404 for an invalid FAQ ID during delete', async () => {
    const invalidFaqId = new mongoose.Types.ObjectId();  // Generate a valid but non-existent ObjectId
    const res = await request(app).delete(`/admin/${invalidFaqId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('FAQ not found');
  });
});
