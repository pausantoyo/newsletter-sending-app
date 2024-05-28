import React, { useState } from "react";
import { createRecipient } from "../services/NewsletterService";

function AddRecipients() {
    const [recipientsInput, setRecipientsInput] = useState("");

    const handleRecipientsSubmit = async (e) => {
        e.preventDefault();
        try {
            await createRecipient(recipientsInput);
            alert("Recipients added successfully!");
        } catch (error) {
            alert("Error adding recipients: " + error.message);
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
