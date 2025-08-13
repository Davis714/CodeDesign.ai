import './tabbutton.css'
const TabButton = ({ label, isActive, onClick }) => {
    return (
      <button 
        className={`tab-button ${isActive ? 'active' : ''}`} 
        onClick={onClick}
      >
        {label}
      </button>
    );
};

export default TabButton;