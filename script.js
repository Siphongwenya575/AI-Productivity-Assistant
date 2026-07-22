function generateEmail() {
    const input = document.getElementById('email-input').value.trim();
    const output = document.getElementById('email-output');

    if (!input) {
        alert('Please enter a description for your email.');
        return;
    }

    output.classList.remove('hidden');
    output.textContent = "Generating email...";

    setTimeout(() => {
        output.textContent = `Subject: Regarding Your Request\n\nDear Team,\n\nI am writing to follow up on the recent updates: "${input}".\n\nPlease let me know if you require any further details.\n\nBest regards,\nProductivity Assistant`;
    }, 800);
}

function summarizeNotes() {
    const input = document.getElementById('notes-input').value.trim();
    const output = document.getElementById('notes-output');

    if (!input) {
        alert('Please paste meeting notes to summarize.');
        return;
    }

    output.classList.remove('hidden');
    output.textContent = "Summarizing notes...";

    setTimeout(() => {
        output.textContent = `📌 **Executive Summary**:\n- Key Topic: Overview of discussions.\n- Action Items extracted from: "${input.substring(0, 40)}..."\n- Status: Pending review by team leads.`;
    }, 800);
}

function createSchedule() {
    const input = document.getElementById('tasks-input').value.trim();
    const output = document.getElementById('tasks-output');

    if (!input) {
        alert('Please enter your tasks.');
        return;
    }

    output.classList.remove('hidden');
    output.textContent = "Building schedule...";

    setTimeout(() => {
        output.textContent = `📅 **Suggested Schedule**:\n09:00 AM - Priority Task: Focus on critical deliverables\n11:00 AM - Secondary Tasks: ${input}\n02:00 PM - Review & Follow-ups`;
    }, 800);
}

function sendMessage() {
    const input = document.getElementById('chat-input').value.trim();
    const output = document.getElementById('chat-output');

    if (!input) {
        alert('Please type a message.');
        return;
    }

    output.classList.remove('hidden');
    output.textContent = "Thinking...";

    setTimeout(() => {
        output.textContent = `🤖 **AI Response**:\nRegarding "${input}": As a workplace assistant, I recommend breaking this step into clear tasks and prioritizing high-impact items first.`;
    }, 800);
}
