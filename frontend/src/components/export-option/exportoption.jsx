import React from "react";
import './exportoption.css'
const ExportOption = ({ icon, title, badge = "Zipped" }) => {
    return (
      <div className="export-option">
        <div className="export-option-info">
          <img src={icon} alt={title} />
          <span className="export-option-text">{title}</span>
        </div>
        <span className="zipped-badge">{badge}</span>
      </div>
    );
};

export default ExportOption;