/**
 * The UnsubscribeContent function renders a component with an image, a message,
 * and a button to unsubscribe.
 */
import React from "react";

function UnsubscribeContent({ onOpenModal }) {
    return (
        <div className="unsubscribe-content">
            <img src="/images/sad-credt-card.jpg" alt="Sad credit card" className="unsubscribe-image" />
            <h2>Are you sure you want to unsubscribe?</h2>
            <button onClick={onOpenModal} className="unsubscribe-button">Unsubscribe</button>
        </div>
    );
}

export default UnsubscribeContent;
