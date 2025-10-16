const notifyModal = document.getElementById("notifyModal");
const successModal = document.getElementById("successModal");
const notifyCloseBtn = document.querySelector(".notify-close");
const notifyButtons = document.querySelectorAll(".notify-btn");
const toolNameSpan = document.getElementById("toolName");
const notifyForm = document.getElementById("notifyForm");
const closeSuccessBtn = document.getElementById("closeSuccessBtn");

// Open notify modal
notifyButtons.forEach(button => {
    button.addEventListener("click", function() {
        const toolName = this.getAttribute("data-tool");
        toolNameSpan.textContent = toolName;
        notifyModal.style.display = "block";
        notifyForm.reset();
    });
});

// Close notify modal
notifyCloseBtn.onclick = () => notifyModal.style.display = "none";
window.onclick = (e) => {
    if (e.target === notifyModal) notifyModal.style.display = "none";
    if (e.target === successModal) successModal.style.display = "none";
};

// Handle form submission
notifyForm.onsubmit = (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const country = document.getElementById("country").value;
    const phone = document.getElementById("phone").value;
    const toolName = document.getElementById("toolName").textContent;
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("phone", phone);
    formData.append("toolName", toolName);
    
    // Fire-and-forget
    fetch("https://script.google.com/macros/s/AKfycbxiEC5xJ0UrxDmWpZsSUr47CCiXni937igZHVjNnKY-IuLrvy8P24mmqXJlu4_bl8Dk/exec?gid=0", {
        method: "POST",
        body: formData
    }).catch(console.warn);
    
    // Close notify modal and open success modal
    notifyModal.style.display = "none";
    successModal.style.display = "block";
};

// Close success modal
closeSuccessBtn.onclick = () => {
    successModal.style.display = "none";
    window.location.href = window.location.pathname;
};