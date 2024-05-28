import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function ConfirmationModal({ isOpen, onRequestClose, onConfirm, email, setEmail }) {
    const handleConfirm = () => {
        onConfirm(email);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirm Unsubscribe"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Confirm Unsubscription</h2>
            <p>Please enter your email to confirm:</p>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="modal-input"
            />
            <div className="modal-buttons">
                <button onClick={handleConfirm} className="confirm-button">Confirm</button>
                <button onClick={onRequestClose} className="cancel-button">Cancel</button>
            </div>
        </Modal>
    );
}

export default ConfirmationModal;
