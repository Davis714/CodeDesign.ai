import React, { useState, useEffect } from 'react';
import ExportPopup from './components/popup/popup';
import './App.css';


const App = () => {
  const [overlayActive, setOverlayActive] = useState(false);
  const [activeTab, setActiveTab] = useState('html');

  const openPopup = () => {
    setOverlayActive(true);
  };

  const closePopup = () => {
    setOverlayActive(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="main-container">
        <button className="export-button" onClick={openPopup}>EXPORT CODE</button>
      </div> 
      <ExportPopup 
        overlayActive={overlayActive}
        onClose={closePopup}
        activeTab={activeTab}
        onTabSwitch={setActiveTab}
      />
    </React.Fragment>
  );
};

export default App;
