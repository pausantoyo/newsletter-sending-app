import React from "react";

function UploadFile({ onFileUpload, onSubmit, title }) {
    return (
        <div className="container">
            <h2>{title}</h2>
            <form onSubmit={onSubmit}>
                <input type="file" onChange={onFileUpload} />
                <button type="submit">Upload File</button>
            </form>
        </div>
    );
}

export default UploadFile;
