document.addEventListener('DOMContentLoaded', () => {
    showSection('dashboard');
    loadLeaves();
});

function showSection(sectionId) {
    
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

function applyLeave(event) {
    event.preventDefault();

    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const reason = document.getElementById('reason').value;

    const reasonError = document.getElementById('reason-error');
    if (!reason) {
        reasonError.innerText = "Reason is mandatory";
        reasonError.style.display = "block";
        reasonError.style.color = "red";
        document.getElementById('reason').style.borderColor = "red";
    } else {
        reasonError.innerText = "";
        reasonError.style.display = "none";
        document.getElementById('reason').style.borderColor = "";
    }



    if (startDate && endDate && reason) {
        const leaves = document.getElementById('leaves');
        const leaveItemHTML = `<li>From: ${startDate} To ${endDate} - ${reason}</li>`;
        leaves.insertAdjacentHTML('beforeend', leaveItemHTML);
       
        
        document.getElementById('leaveForm').reset();
        alert('Leave applied successfully!');
    } else {
        alert('Please fill out all fields.');
    }
    saveLeave(startDate, endDate, reason)
}
function saveLeave(startDate, endDate, reason) {
    let leaves = JSON.parse(localStorage.getItem('leaves')) || [];
    leaves.push({ startDate, endDate, reason });
    localStorage.setItem('leaves', JSON.stringify(leaves));
    
}


function loadLeaves() {
    const leaves = JSON.parse(localStorage.getItem('leaves')) || [];
    const leavesList = document.getElementById('leaves');
    leavesList.innerHTML = "";
    leaves.forEach(leave => {
        const leaveItemHTML = `<li>From: ${leave.startDate} To ${leave.endDate} - ${leave.reason}</li>`;
        leavesList.insertAdjacentHTML('beforeend', leaveItemHTML);
    });
}
document.getElementById('leaveForm').addEventListener('submit', applyLeave);

