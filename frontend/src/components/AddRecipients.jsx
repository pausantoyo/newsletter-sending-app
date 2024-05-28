/**
 * The `AddRecipients` function in a React component that allows users to add recipient emails and
 * handles the submission using a service function and displays toast notifications for success or
 * error.
 */
import React, { useState } from "react";
import { createRecipient } from "../services/NewsletterService";
import { toast } from "react-toastify";

function AddRecipients() {
    const [recipientsInput, setRecipientsInput] = useState("");

    /**
     * The function `handleRecipientsSubmit` handles form submission
     * to create recipients and displays success or error messages using toast notifications.
     */
    const handleRecipientsSubmit = async (e) => {
        e.preventDefault();
        try {
            await createRecipient(recipientsInput);
            toast.success("Recipients added successfully!");
        } catch (error) {
            toast.error("Error adding recipients: " + error.message);
        }
    };

    return (
        <div className="container">
            <h2>Add Recipients</h2>
            <form onSubmit={handleRecipientsSubmit}>
                <input
                    type="email"
                    value={recipientsInput}
                    onChange={(e) => setRecipientsInput(e.target.value)}
                    placeholder="Enter recipient email"
                    required
                />
                <button type="submit">Add Recipients</button>
            </form>
        </div>
    );
}

export default AddRecipients;
