import { useState } from 'react';
import PopupHeader from '../popupheader/popupheader';
import PopupBody from '../popupbody/popupbody';
import BRAND from '../../icons/BRAND.svg';
import HTML from '../../icons/HTML.svg';
import './popup.css';

const ExportPopup = ({ overlayActive, onClose, activeTab: propActiveTab, onTabSwitch }) => {
  const [activeTab, setActiveTab] = useState(propActiveTab || 'html');

  const handleTabSwitch = (tabName) => {
    setActiveTab(tabName);
    if (onTabSwitch) onTabSwitch(tabName);
  };

  const downloadButtonText =
    activeTab === 'html'
      ? 'Download HTML CSS Project'
      : 'Download Next JS Project';
      const [tabs, setTabs] = useState([
        {
          name: 'html',
          label: 'HTML & CSS',
          icon: HTML,
          title: 'Export as HTML & CSS',
          checkboxes: [
            { label: 'Include assets (images, styles, fonts, etc.)', checked: true },
            { label: 'Include custom code', checked: true },
          ],
        },
        {
          name: 'nextjs',
          label: 'Next JS',
          icon: BRAND,
          title: 'Export as Next JS Project',
          checkboxes: [
            { label: 'Use `app` directory (NextJS v13+)', checked: true },
            { label: 'Include assets locally (images, styles, fonts, etc.)', checked: true },
            { label: 'Include custom code', checked: true },
          ],
        },
      ]);
      
      const handleCheckBoxChange = (tabName, idx, newValue) => {
        setTabs((prev) =>
          prev.map((tab) =>
            tab.name === tabName
              ? {
                  ...tab,
                  checkboxes: tab.checkboxes.map((c, i) =>
                    i === idx ? { ...c, checked: newValue } : c
                  ),
                }
              : tab
          )
        );
      };
      
  return (
    <div
      className={`overlay ${overlayActive ? 'active' : ''}`}
      id="overlay"
      onClick={onClose}
    >
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <PopupHeader
          title="Code Export"
          subtitle="Manage how you download your website's code."
          onClose={onClose}
        />
        <PopupBody
          tabs={tabs}
          activeTab={activeTab}
          onTabSwitch={handleTabSwitch}
          onCheckboxChange={handleCheckBoxChange}
        />
        <button className="download-button" id="dynamicDownloadButton">
          {downloadButtonText}
        </button>
      </div>
    </div>
  );
};

export default ExportPopup;



