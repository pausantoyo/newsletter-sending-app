/**
 * The UnsubscriptionPage component handles the process of unsubscribing a user and
 * displaying a confirmation modal.
 */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import UnsubscribeContent from "../components/UnsubscribeContent";
import ConfirmationModal from "../components/ConfirmationModal";
import "../styles/UnsubscriptionPage.css";
import { unsubscribe } from "../services/UnsubscriptionService";
import { toast } from "react-toastify";

/**
 * The useQuery function returns a URLSearchParams object based on the current location's search
 * parameters.
 */
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function UnsubscriptionPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");

    /* Extracts query parameters from the
    current location's search parameters. */
    const query = useQuery();
    const idType = query.get("idType");
    const idNewsletter = query.get("idNewsletter");
    const idRecipient = query.get("idRecipient");

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    /**
     * The function `handleConfirmUnsubscribe` closes a modal, attempts to unsubscribe a user, and
     * displays a success message or an error message accordingly.
     */
    const handleConfirmUnsubscribe = async () => {
        setIsModalOpen(false);
        try {
            await unsubscribe(email, idType, idNewsletter, idRecipient);
            toast.success("You have successfully unsubscribed.");
        } catch (error) {
            console.error("Error during unsubscription:", error);
            toast.error("There was an error. Please try again.");
        }
    };

    return (
        <div className="unsubscribe-container">
            <UnsubscribeContent onOpenModal={handleOpenModal} />
            <ConfirmationModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                onConfirm={handleConfirmUnsubscribe}
                email={email}
                setEmail={setEmail}
            />
        </div>
    );
}

export default UnsubscriptionPage;
