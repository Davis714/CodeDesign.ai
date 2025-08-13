import './tabcontent.css'
const TabContent = ({ id, isActive, children }) => {
    return (
      <div id={id} className={`tab-content ${isActive ? 'active' : ''}`}>
        {children}
      </div>
    );
};

export default TabContent;