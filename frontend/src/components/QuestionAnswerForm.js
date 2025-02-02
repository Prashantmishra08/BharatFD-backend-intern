import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import axios from 'axios';

const QuestionAnswerForm = ({ refreshFAQs }) => {
    // State to store question and answer
    const [username, setUsername] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [responseMessage, setResponseMessage] = useState(''); // Store response message

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim() || !question.trim() || !answer.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        const faqData = {
            username: username,
            question: question,
            answer: answer
        };

        try {
            const response = await axios.post('http://localhost:8000/api', faqData);
            setSuccess(true);
            setError(null);
            setResponseMessage(response.data.message || 'FAQ posted successfully!'); // Use response message
            setUsername('');
            setQuestion('');
            setAnswer('');
            
            // Call the function to refresh FAQ list after posting the FAQ
            if (refreshFAQs) {
                refreshFAQs(); // Refresh FAQ list 
            }

        } catch (err) {
            setError('Error posting FAQ to the backend.');
            setResponseMessage(''); // Clear any success message if there's an error
            console.error('Backend error response:', err.response); // Log the detailed error
        }
    };

    return (
        <Container component={Paper} style={{ padding: '20px', marginTop: '20px', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h4" style={{ marginBottom: '20px', color: '#3f51b5' }}>Post a New FAQ</Typography>

            {/* Display error or success message */}
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{responseMessage}</Typography>} {/* Use response message here */}

            <form onSubmit={handleSubmit}>
               <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Question"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <TextField
                    label="Answer"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: '10px' }}
                >
                    Post FAQ
                </Button>
            </form>
        </Container>
    );
};

export default QuestionAnswerForm;
