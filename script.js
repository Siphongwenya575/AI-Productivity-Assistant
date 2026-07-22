// Universal API Handler using Groq
async function callAI(systemPrompt, userPrompt) {
    let apiKey = localStorage.getItem('groq_api_key');
    
    if (!apiKey) {
        apiKey = prompt("Please paste your Groq API Key (starts with gsk_):");
        if (apiKey) {
            localStorage.setItem('groq_api_key', apiKey.trim());
        } else {
            throw new Error("API Key is required to run the AI assistant.");
        }
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ]
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
            localStorage.removeItem('groq_api_key');
            throw new Error("Invalid API key. Click the button again to retry.");
        }
        throw new Error(errorData.error?.message || `Server Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// 1. Email Generator
async function generateEmail() {
    const input = document.getElementById('email-input').value.trim();
    const output = document.getElementById('email-output');

    if (!input) {
        alert('Please describe the email you want to write.');
        return;
    }

    output.classList.remove('hidden');
    output.style.display = 'block';
    output.textContent = "⏳ Generating email...";

    try {
        const reply = await callAI(
            "You are a professional email composer. Generate a complete, polished workplace email response based on the user request.",
            input
        );
        output.textContent = reply;
    } catch (err) {
        output.textContent = `❌ Error: ${err.message}`;
    }
}

// 2. Meeting Notes Summarizer
async function summarizeNotes() {
    const input = document.getElementById('notes-input').value.trim();
    const output = document.getElementById('notes-output');

    if (!input) {
        alert('Please paste meeting notes first.');
        return;
    }

    output.classList.remove('hidden');
    output.style.display = 'block';
    output.textContent = "⏳ Summarizing notes...";

    try {
        const reply = await callAI(
            "You are an executive summary assistant. Summarize meeting notes with key points, decisions made, and action items using bullet points.",
            input
        );
        output.textContent = reply;
    } catch (err) {
        output.textContent = `❌ Error: ${err.message}`;
    }
}

// 3. Task Planner
async function createSchedule() {
    const input = document.getElementById('tasks-input').value.trim();
    const output = document.getElementById('tasks-output');

    if (!input) {
        alert('Please enter your tasks.');
        return;
    }

    output.classList.remove('hidden');
    output.style.display = 'block';
    output.textContent = "⏳ Creating schedule...";

    try {
        const reply = await callAI(
            "You are a productivity expert. Organize the provided tasks into a structured daily schedule prioritized by urgency and importance.",
            input
        );
        output.textContent = reply;
    } catch (err) {
        output.textContent = `❌ Error: ${err.message}`;
    }
}

// 4. AI Chatbot
async function sendMessage() {
    const input = document.getElementById('chat-input').value.trim();
    const output = document.getElementById('chat-output');

    if (!input) {
        alert('Please type a question.');
        return;
    }

    output.classList.remove('hidden');
    output.style.display = 'block';
    output.textContent = "⏳ Thinking...";

    try {
        const reply = await callAI(
            "You are a helpful workplace AI assistant. Provide concise, accurate advice for workplace queries.",
            input
        );
        output.textContent = reply;
    } catch (err) {
        output.textContent = `❌ Error: ${err.message}`;
    }
}

// Helper Clear Functions
function clearElement(inputId, outputId) {
    document.getElementById(inputId).value = '';
    const output = document.getElementById(outputId);
    output.textContent = '';
    output.classList.add('hidden');
    output.style.display = 'none';
}

function clearEmail() { clearElement('email-input', 'email-output'); }
function clearNotes() { clearElement('notes-input', 'notes-output'); }
function clearTasks() { clearElement('tasks-input', 'tasks-output'); }
function clearChat()  { clearElement('chat-input', 'chat-output'); }
