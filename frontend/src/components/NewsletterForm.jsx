/**
 * The CreateNewsletterForm component handles the creation and sending of newsletters,
 * including file upload and form submission handling.
 */
import React, { useState } from "react";
import {
    uploadNewsletter,
    createNewsletter,
    sendNewsletter
} from "../services/NewsletterService";
import { toast } from "react-toastify";

function CreateNewsletterForm() {
    const [fileInput, setFileInput] = useState(null);
    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [typeInput, setTypeInput] = useState("");

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFileInput(file);
    };

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!fileInput) {
            toast.error("Please select a file to upload.");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("file", fileInput);
            const uploadResponse = await uploadNewsletter(formData);
            const filePath = uploadResponse.fileURL;

            const newsletterData = {
                title: titleInput,
                description: descriptionInput,
                idType: typeInput === "type1" ? 1 : typeInput === "type2" ? 2 : 3,
                fileURL: filePath,
            };
            const createNews = await createNewsletter(newsletterData);
            await sendNewsletter(createNews);
            toast.success("Newsletter sent successfully!");
        } catch (error) {
            toast.error("Error sending the newsletter: " + error.message);
        }
    };

    return (
        <div className="container">
            <h2>Create Newsletter</h2>
            <form onSubmit={handleNewsletterSubmit}>
                <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                    placeholder="Description"
                    required
                ></textarea>
                <select
                    value={typeInput}
                    onChange={(e) => setTypeInput(e.target.value)}
                    required
                >
                    <option value="">Select Type</option>
                    <option value="type1">Nuevos Lanzamientos</option>
                    <option value="type2">Noticias</option>
                    <option value="type3">Ofertas</option>
                </select>
                <div>
                    <h2>Upload File</h2>
                    <p>Please upload a .png or .pdf file</p>
                    <input
                        type="file"
                        onChange={handleFileUpload}
                    />
                </div>
                <button type="submit">Send Newsletter</button>
            </form>
        </div>
    );
}

export default CreateNewsletterForm;
