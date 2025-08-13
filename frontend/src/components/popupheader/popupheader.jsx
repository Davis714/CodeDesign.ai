import React from "react";
import './popupheader.css'
const PopupHeader = ({ title, subtitle, onClose }) => {
    return (
      <div className="popup-header">
        <div>
          <div className="popup-title">{title}</div>
          <div className="popup-subtitle">{subtitle}</div>
        </div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    );
};

export default PopupHeader;