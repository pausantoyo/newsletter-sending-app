// src/services/NewsletterService.js

import {API_BASE_URL} from "../config";

const createRecipient = async (recipients) => {
    try {
        const response = await fetch(`${API_BASE_URL}/recipient/createRecipient`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: recipients }),
        });
        if (!response.ok) {
            throw new Error("Error adding recipients.");
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

const uploadRecipients = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/recipient/uploadFile`, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error("Error uploading recipients.");
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

const uploadNewsletter = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/newsletter/uploadFile`, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error("Error uploading newsletter.");
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

const createNewsletter = async (newsletterData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/newsletter/createNewsletter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newsletterData),
        });
        if (!response.ok) {
            throw new Error("Error creating newsletter.");
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};


const sendNewsletter = async (newsletter) => {
    try {
        const {idNewsletter} = newsletter;
        console.log("estoy en la api", idNewsletter);
        const response = await fetch(`${API_BASE_URL}/newsletter/${idNewsletter}/send`, {
            method: "POST",
        });
        if (!response.ok) {
            throw new Error("Error sending newsletter.");
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

export {
    createRecipient,
    uploadRecipients,
    uploadNewsletter,
    createNewsletter,
    sendNewsletter
};
