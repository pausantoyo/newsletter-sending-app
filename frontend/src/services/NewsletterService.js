/**
 * Defines functions for creating recipients, uploading recipients and
 * newsletters, creating newsletters, and sending newsletters using an API base URL.
 */
import {API_BASE_URL} from "../config";

/**
 * The function `createRecipient` sends a POST request to a specified API endpoint to create a
 * recipient with the provided email address.
 */
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

/**
 * The function `uploadRecipients` uploads a file containing recipients to a specified
 * API endpoint and returns the response as JSON.
 */
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

/**
 * The function `uploadNewsletter`  uploads a file as part of a newsletter to a specified
 * API endpoint and returns the response as JSON.
 */
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

/**
 * The function `createNewsletter` sends a POST request to a specified API endpoint to create a
 * newsletter using the provided data.
 */
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


/**
 * The function `sendNewsletter` sends a newsletter using a POST request to a specific API endpoint and
 * returns the response in JSON format.
 */
const sendNewsletter = async (newsletter) => {
    try {
        const {idNewsletter} = newsletter;
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
