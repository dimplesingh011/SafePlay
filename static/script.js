document.addEventListener('DOMContentLoaded', () => {
    loadCoaches();
    loadCases();
});

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function switchView(role) {
    document.getElementById('btn-athlete').classList.toggle('active', role === 'athlete');
    document.getElementById('btn-reviewer').classList.toggle('active', role === 'reviewer');

    if (role === 'reviewer') {
        showScreen('screen-dashboard');
        showToast("Switched to IC Reviewer Panel Mode");
    } else {
        showScreen('screen-home');
        showToast("Switched to Athlete Portal View");
    }
}

function updateFileName(input) {
    if (input.files.length > 0) {
        document.getElementById('file-label-text').innerText = "Attached: " + input.files[0].name;
    }
}

function loadCoaches() {
    const sport = document.getElementById('sport-filter')?.value || 'all';
    fetch(`/api/coaches?sport=${sport}`)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('coach-list');
            list.innerHTML = data.map(c => `
                <div class="coach-card">
                    <div class="card-top">
                        <strong style="font-size:14px;">${c.name}</strong>
                        <span style="background:#dcfce7; color:#15803d; font-size:10px; padding:3px 8px; border-radius:6px; font-weight:700;">✔️ Verified</span>
                    </div>
                    <p style="font-size:12px; color:#64748b; margin-top:4px;"><strong>Sport:</strong> ${c.sport} | <strong>Location:</strong> ${c.location}</p>
                    <p style="font-size:11px; margin-top:2px;"><strong>Cert:</strong> ${c.certification}</p>
                    <p style="font-size:11px; color:#10b981; font-weight:600; margin-top:4px;">⚡ ${c.availability}</p>
                    <button class="btn-action" onclick="requestTransfer('${c.name}')">Initiate Safe Transfer</button>
                </div>
            `).join('');
        });
}

function filterCoaches() {
    loadCoaches();
}

function requestTransfer(coachName) {
    showToast(`Transfer request sent for ${coachName}`);
}

function loadCases() {
    fetch('/api/cases')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('cases-list');
            list.innerHTML = data.map(c => `
                <div class="case-card">
                    <div class="card-top">
                        <strong>Case ID: ${c.id}</strong>
                        <span class="status-tag ${c.status}">${c.status}</span>
                    </div>
                    <p style="font-size:13px; font-weight:700; margin-top:8px;">${c.category}</p>
                    <p style="font-size:11px; color:#64748b; margin-top:2px;">Investigator: ${c.investigator}</p>
                    
                    <div class="progress-track">
                        <div class="progress-fill" style="width: ${c.progress}%;"></div>
                    </div>

                    <button class="btn-action" onclick='openCaseModal(${JSON.stringify(c)})'>View Detailed Progress</button>
                </div>
            `).join('');
        });
}

function handleFormSubmit(event) {
    event.preventDefault();
    const category = document.getElementById('report-category').value;
    const details = document.getElementById('report-details').value;

    fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, details })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showToast(`Report ${data.case_id} Logged!`);
            document.getElementById('report-form').reset();
            document.getElementById('file-label-text').innerText = "Click to upload document, photo, or audio";
            loadCases();
            showScreen('screen-dashboard');
        }
    });
}

function openCaseModal(caseObj) {
    const modal = document.getElementById('case-modal');
    const modalContent = document.getElementById('modal-content');
    
    let timelineHTML = caseObj.timeline.map(t => `
        <div style="margin-bottom:10px; border-left: 2px solid ${t.status === 'done' ? '#10b981' : '#cbd5e1'}; padding-left:12px;">
            <strong style="font-size:12px; display:block;">${t.title}</strong>
            <span style="font-size:10px; color:#64748b;">${t.date}</span>
        </div>
    `).join('');

    modalContent.innerHTML = `
        <h3 style="font-size:16px;">Investigation Record</h3>
        <p style="font-size:11px; color:#64748b; margin-bottom:12px;">Case Reference: ${caseObj.id}</p>
        <p style="font-size:12px; margin-bottom:12px; line-height:1.4;"><strong>Details:</strong> ${caseObj.details}</p>
        <h4 style="font-size:12px; margin-bottom:10px; color:#1e293b;">Neutral Hearing Stages:</h4>
        ${timelineHTML}
    `;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('case-modal').style.display = 'none';
}