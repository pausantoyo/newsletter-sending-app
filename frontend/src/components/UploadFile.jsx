/**
 * The UploadFile function renders a file upload form with specified title and
 * accepted file types.
 */
import React from "react";

function UploadFile({ onFileUpload, onSubmit, title, types }) {
    return (
        <div className="container">
            <h2>{title}</h2>
            <p>{types}</p>
            <form onSubmit={onSubmit}>
                <input type="file" onChange={onFileUpload} />
                <button type="submit">Upload File</button>
            </form>
        </div>
    );
}

export default UploadFile;
