function getApiKey() {
    let key = localStorage.getItem('groq_api_key');
    if (!key) {
        key = prompt("Please enter your free Groq API Key:");
        if (key) {
            localStorage.setItem('groq_api_key', key.trim());
        }
    }
    return key;
}

async function callOpenAI(systemPrompt, userPrompt) {
    const apiKey = getApiKey();
    if (!apiKey) throw new Error("API key required.");

    // Uses Groq's free endpoint and Llama 3.3 model
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
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Groq API error.");
    }

    const data = await response.json();
    return data.choices[0].message.content;
}
