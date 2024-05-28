/* The `NewsletterPage` imports necessary components and functions for 
creating a newsletter page. */

import React, { useState } from "react";
import AddRecipients from "../components/AddRecipients";
import UploadFile from "../components/UploadFile";
import NewsletterForm from "../components/NewsletterForm";
import { uploadRecipients } from "../services/NewsletterService";
import "../styles/NewsletterPage.css";
import Dashboard from '../components/Dashboard';
import { toast } from "react-toastify";

function NewsletterPage() {
    const [fileInput, setFileInput] = useState(null);

    /**
     * The function `handleFileUploadRecipients` sets the file input to the selected file for
     * recipients.
     */
    const handleFileUploadRecipients = (e) => {
        const file = e.target.files[0];
        setFileInput(file);
    };

    /**
     * The function `handleFileSubmitRecipients` handles the submission of a file 
     * for uploading recipients, displaying success or error messages using toast
     * notifications.
     */
    const handleFileSubmitRecipients = async (e) => {
        e.preventDefault();
        if (!fileInput) {
            toast.error("Please select a file to upload.");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("file", fileInput);
            await uploadRecipients(formData);
            toast.success("File uploaded successfully!");
        } catch (error) {
            toast.error("Error uploading file: " + error.message);
        }
    };

    const [showDashboard, setShowDashboard] = useState(false);

    const handleShowDashboard = () => {
        setShowDashboard(!showDashboard);
    };

    return (
        <div>
            <div className="header-container">
                <h1>Create Newsletter</h1>
                <button onClick={handleShowDashboard} className="show-dashboard-button">
                    {showDashboard ? 'Hide Dashboard' : 'Show Dashboard'}
                </button>
            </div>
            {showDashboard && <Dashboard />}
            <div className="main-container">
                <div>
                <AddRecipients />
                <UploadFile onFileUpload={handleFileUploadRecipients} onSubmit={handleFileSubmitRecipients} title="Upload Recipients File" types="Please upload a .txt file"/>
                </div>
                <NewsletterForm />
            </div>
        </div>
    );
}

export default NewsletterPage;
