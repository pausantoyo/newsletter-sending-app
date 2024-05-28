/**
 * The function `unsubscribe` sends a PUT request to the API endpoint for unsubscribing a recipient
 * using the provided email, idType, idNewsletter, and idRecipient.
 */
import {API_BASE_URL} from "../config";


export const unsubscribe = async (email, idType, idNewsletter, idRecipient) => {
    const response = await fetch(`${API_BASE_URL}/recipient/${idRecipient}/unsubscribe`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, idType, idNewsletter, idRecipient }),
    });

    if (!response.ok) {
        throw new Error("Error during unsubscription");
    }

    return response.json();
};
