// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsletterPage from "./pages/NewsletterPage";
import UnsubscriptionPage from "./pages/UnsubscriptionPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={<NewsletterPage />}
                    />
                    <Route
                        path="/unsubscribe"
                        element={<UnsubscriptionPage />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
