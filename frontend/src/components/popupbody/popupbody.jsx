import TabButton from '../tabbutton/tabbutton';
import TabContent from '../tabcontent/tabcontent';
import ExportOption from '../export-option/exportoption';
import CustomCheckbox from '../checkbox/checkbox';
import './popupbody.css'

const PopupBody = ({ tabs, activeTab, onTabSwitch , onCheckboxChange}) => {
  return (
    <div className="popup-body">
      <div className="tab-container">
        {tabs.map((tab,idx) => (
          <TabButton
            key={tab.name}
            label={tab.label}
            isActive={activeTab === tab.name}
            onClick={() => onTabSwitch(tab.name)}
          />
        ))}
      </div>

      {tabs.map((tab) => (
        <TabContent
          key={tab.name}
          id={`${tab.name}-content`}
          isActive={activeTab === tab.name}
        >
          <ExportOption icon={tab.icon} title={tab.title} />
          <div className="checkbox-list">
            {tab.checkboxes.map((item, idx) => (
              <CustomCheckbox
                key={idx}
                checked={item.checked}
                label={item.label}
                onChange={(newValue) => onCheckboxChange(tab.name, idx, newValue)}
              />
            ))}
          </div>
        </TabContent>
      ))}
    </div>
  );
};

export default PopupBody;
