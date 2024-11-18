import React from "react";
import "./Loader.css";

const Loader = () => {
    return (
        <div className="spinner-container">
            <div className="spinner">
                <img
                    src="https://quicksell.co/assets/logo/logo.png"
                    alt="Logo"
                    className="spinner-logo"
                />
            </div>
        </div>
    );
};

export default Loader;
