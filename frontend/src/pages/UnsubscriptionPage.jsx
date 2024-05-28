import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import UnsubscribeContent from "../components/UnsubscribeContent";
import ConfirmationModal from "../components/ConfirmationModal";
import "../styles/UnsubscriptionPage.css";
import { unsubscribe } from "../services/UnsubscriptionService";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function UnsubscriptionPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");

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

    const handleConfirmUnsubscribe = async () => {
        setIsModalOpen(false);
        try {
            await unsubscribe(email, idType, idNewsletter, idRecipient);
            alert("You have successfully unsubscribed.");
        } catch (error) {
            console.error("Error during unsubscription:", error);
            alert("There was an error. Please try again.");
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
