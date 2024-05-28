/**
 * The App function sets up routing for a newsletter page and an unsubscription page using React Router
 * in a React application.
 */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsletterPage from "./pages/NewsletterPage";
import UnsubscriptionPage from "./pages/UnsubscriptionPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;
