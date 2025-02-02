import React, { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Container, Paper, TextField } from "@mui/material";
import axios from "axios";
import ReactQuill from "react-quill"; 
import "react-quill/dist/quill.snow.css"; 

const AdminPanel = () => {
    const [faqs, setFaqs] = useState([]);
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [question, setQuestion] = useState(""); // Store question text
    const [answer, setAnswer] = useState(""); // Store rich-text answer content (HTML)
    const [error, setError] = useState(null);
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false); // Control visibility of Admin Panel

    // Fetch FAQs from backend
    const loadFAQs = async () => {
        try {
            const response = await axios.get("http://localhost:8000/admin"); // Fetch from backend
            setFaqs(response.data);
        } catch (err) {
            setError("Error fetching FAQs.");
            console.error(err);
        }
    };

    useEffect(() => {
        if (isAdminPanelOpen) {
            loadFAQs(); // Load FAQs when the admin panel is open
        }
    }, [isAdminPanelOpen]);

    // Handle FAQ deletion
    const handleDeleteFAQ = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/admin/${id}`);
            loadFAQs(); // Refetch FAQs after deletion
        } catch (err) {
            setError("Error deleting FAQ.");
            console.error(err);
        }
    };

    // Handle FAQ editing
    const handleEditFAQ = async () => {
        try {
            const updatedFAQ = {
                question: question,
                answer: cleanHtml(answer) // Use rich-text content (HTML) from Quill
            };
            await axios.put(`http://localhost:8000/admin/${selectedFaq}`, updatedFAQ);
            loadFAQs(); // Refetch FAQs after updating
            setSelectedFaq(null);
            setQuestion("");
            setAnswer(""); 
        } catch (err) {
            setError("Error updating FAQ.");
            console.error(err);
        }
    };

    const cleanHtml = (html) => {
        return html.replace(/<p>/g, "").replace(/<\/p>/g, "").trim();
    };

    return (
        <div>
            {/* Admin link to toggle visibility */}
            <Typography variant="h5" style={{ cursor: "pointer", color: "#3f51b5" }} onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)}>
                {isAdminPanelOpen ? "Close Admin Panel" : "Open Admin Panel"}
            </Typography>

            {/* Render Admin Panel if open */}
            {isAdminPanelOpen && (
                <Container component={Paper} style={{ padding: "20px", marginTop: "20px", backgroundColor: "#f5f5f5" }}>
                    <Typography variant="h4" style={{ marginBottom: "20px", color: "#3f51b5" }}>
                        Admin Panel
                    </Typography>

                    {error && <Typography color="error">{error}</Typography>}

                    <Table style={{ marginTop: "20px" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Question</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {faqs.length > 0 ? (
                                faqs.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell>{item.username}</TableCell>
                                        <TableCell>{item.question}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" color="primary" onClick={() => {
                                                setSelectedFaq(item._id);
                                                setQuestion(item.question);
                                                setAnswer(item.answer); // Set Quill content for editing
                                            }}>
                                                Edit
                                            </Button>
                                            <Button variant="outlined" color="secondary" onClick={() => handleDeleteFAQ(item._id)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No FAQs available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {selectedFaq && (
                        <div style={{ marginTop: "20px" }}>
                            <Typography variant="h6">Edit FAQ</Typography>
                            <TextField
                                label="Question"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)} // Update question
                            />
                            <ReactQuill 
                                value={answer} 
                                onChange={setAnswer} // Ensure Quill editor content is updated in state
                                modules={{
                                    toolbar: [
                                        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                        ['bold', 'italic', 'underline', 'strike'],
                                        [{ 'align': [] }],
                                        ['link', 'image']
                                    ]
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleEditFAQ} // Update FAQ with question and rich-text answer
                                style={{ marginTop: "10px" }}
                            >
                                Update FAQ
                            </Button>
                        </div>
                    )}
                </Container>
            )}
        </div>
    );
};

export default AdminPanel;
