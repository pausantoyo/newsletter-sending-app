import React, { useState } from "react";
import AddRecipients from "../components/AddRecipients";
import UploadFile from "../components/UploadFile";
import NewsletterForm from "../components/NewsletterForm";
import { uploadRecipients } from "../services/NewsletterService";
import "../styles/NewsletterPage.css";

function NewsletterPage() {
    const [fileInput, setFileInput] = useState(null);

    const handleFileUploadRecipients = (e) => {
        const file = e.target.files[0];
        setFileInput(file);
    };

    const handleFileSubmitRecipients = async (e) => {
        e.preventDefault();
        if (!fileInput) {
            alert("Please select a file to upload.");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("file", fileInput);
            await uploadRecipients(formData);
            alert("File uploaded successfully!");
        } catch (error) {
            alert("Error uploading file: " + error.message);
        }
    };

    return (
        <div>
            <h1>Create Newsletter</h1>
            <div className="main-container">
                <div>
                <AddRecipients />
                <UploadFile onFileUpload={handleFileUploadRecipients} onSubmit={handleFileSubmitRecipients} title="Upload Recipients File" />
                </div>
                <NewsletterForm />
            </div>
        </div>
    );
}

export default NewsletterPage;
