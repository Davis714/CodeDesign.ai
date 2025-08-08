function openPopup() {
    document.getElementById('overlay').classList.add('active');
}

function closePopup() {
    document.getElementById('overlay').classList.remove('active');
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName + '-content').classList.add('active');
    
    // Update download button text dynamically
    const downloadButton = document.getElementById('dynamicDownloadButton');
    if (tabName === 'html') {
        downloadButton.textContent = 'Download HTML CSS Project';
    } else if (tabName === 'nextjs') {
        downloadButton.textContent = 'Download Next JS Project';
    }
}

function toggleCheckbox(label) {
    const checkbox = label.querySelector('input[type="checkbox"]');
    const svg = label.querySelector('.checkbox-svg');
    checkbox.checked = !checkbox.checked;

    if (checkbox.checked) {
        svg.innerHTML = `
            <g clip-path="url(#clip0_1_100)">
                <path d="M15 3.33337H4.99998C4.07951 3.33337 3.33331 4.07957 3.33331 5.00004V15C3.33331 15.9205 4.07951 16.6667 4.99998 16.6667H15C15.9205 16.6667 16.6666 15.9205 16.6666 15V5.00004C16.6666 4.07957 15.9205 3.33337 15 3.33337Z" fill="#665DC0" stroke="#665DC0" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.0576 7.1875C14.1423 7.1875 14.222 7.2054 14.2969 7.24121C14.3717 7.27376 14.4368 7.31934 14.4922 7.37793C14.5508 7.43327 14.5964 7.49837 14.6289 7.57324C14.6647 7.64811 14.6826 7.72786 14.6826 7.8125C14.6826 7.98828 14.6224 8.13639 14.502 8.25684L9.3457 13.4131C9.22526 13.5335 9.07715 13.5938 8.90137 13.5938C8.72559 13.5938 8.57747 13.5335 8.45703 13.4131L5.48828 10.4443C5.36784 10.3239 5.30762 10.1758 5.30762 10C5.30762 9.91536 5.32389 9.83561 5.35645 9.76074C5.39225 9.68587 5.43783 9.62077 5.49316 9.56543C5.55176 9.50684 5.61849 9.46126 5.69336 9.42871C5.77148 9.3929 5.85124 9.375 5.93262 9.375C6.1084 9.375 6.25651 9.43522 6.37695 9.55566L8.90137 12.085L13.6133 7.36816C13.7337 7.24772 13.8818 7.1875 14.0576 7.1875Z" fill="white"/>
            </g>
        `;
    } else {
        svg.innerHTML = `
            <g clip-path="url(#clip0_1_95)">
                <path d="M15 3.33337H4.99998C4.07951 3.33337 3.33331 4.07957 3.33331 5.00004V15C3.33331 15.9205 4.07951 16.6667 4.99998 16.6667H15C15.9205 16.6667 16.6666 15.9205 16.6666 15V5.00004C16.6666 4.07957 15.9205 3.33337 15 3.33337Z" stroke="#AFAFAF" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
        `;
    }
}

function toggleCheckboxByLabel(event) {
    const checkboxItem = event.target.closest('.checkbox-item');
    const label = checkboxItem.querySelector('.custom-checkbox');
    toggleCheckbox(label);
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
});