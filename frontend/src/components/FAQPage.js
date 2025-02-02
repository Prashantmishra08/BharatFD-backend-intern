import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Container, Paper, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";

const FAQPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [selectedLang, setSelectedLang] = useState("en");
    const [error, setError] = useState(null);
    const [isFAQPageOpen, setIsFAQPageOpen] = useState(false); // Control visibility of FAQ page

    // Fetch FAQs from backend based on selected language
    useEffect(() => {
        const loadFAQs = async () => {
            console.log("Fetching FAQs for language:", selectedLang);  // Debugging line
            try {
                const response = await axios.get(`http://localhost:8000/api/faqs?lang=${selectedLang}`);
                setFaqs(response.data);
            } catch (err) {
                setError("Error fetching FAQs.");
                console.error(err);
            }
        };
        if (isFAQPageOpen) {
            loadFAQs();
        }
    }, [selectedLang, isFAQPageOpen]); // Trigger effect when selectedLang or isFAQPageOpen changes

    return (
        <div>
            {/* FAQ link to toggle visibility */}
            <Typography variant="h5" style={{ cursor: "pointer", color: "#3f51b5" }} onClick={() => setIsFAQPageOpen(!isFAQPageOpen)}>
                {isFAQPageOpen ? "Close FAQ Page" : "Open FAQ Page"}
            </Typography>

            {/* Render FAQ Page if open */}
            {isFAQPageOpen && (
                <Container component={Paper} style={{ padding: "20px", marginTop: "20px", backgroundColor: "#f5f5f5" }}>
                    <Typography variant="h4" style={{ marginBottom: "20px", color: "#3f51b5" }}>
                        FAQ Page
                    </Typography>

                    {error && <Typography color="error">{error}</Typography>}

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Language</InputLabel>
                        <Select
                            value={selectedLang}
                            onChange={(e) => setSelectedLang(e.target.value)}
                            label="Language"
                        >
                            <MenuItem value="en">English</MenuItem>
                            <MenuItem value="hi">Hindi</MenuItem>
                            <MenuItem value="bn">Bengali</MenuItem>
                            {/* Add more languages here */}
                        </Select>
                    </FormControl>

                    <Table style={{ marginTop: "20px" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Question</TableCell>
                                <TableCell>Answer</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {faqs.length > 0 ? (
                                faqs.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell>{item.username}</TableCell>
                                        <TableCell>{item.question}</TableCell>
                                        <TableCell>{item.answer}</TableCell>
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
                </Container>
            )}
        </div>
    );
};

export default FAQPage;
