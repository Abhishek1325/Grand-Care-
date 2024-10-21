// script.js

document.getElementById('checkRemedyBtn').addEventListener('click', function() {
    const symptomInput = document.getElementById('symptomInput').value.toLowerCase();
    const remedyResult = document.getElementById('remedyResult');

    // Clear previous result
    remedyResult.style.display = 'none';
    remedyResult.innerHTML = '';

    if (!symptomInput) {
        alert('Please describe your problem.');
        return;
    }

    // Predefined dictionary of symptoms and home remedies
    const remedies = {
        "headache": "Try drinking ginger tea, applying peppermint oil to your temples, or relaxing in a dark room.",
        "cold": "Stay hydrated, use a saline nasal spray, and try drinking warm liquids like soup or herbal tea.",
        "sore throat": "Gargle with salt water, drink honey-lemon tea, or use a humidifier to soothe your throat.",
        "stomach pain": "Try drinking ginger tea, eating smaller meals, or using a heating pad on your stomach.",
        "cough": "Try honey with warm water, steam inhalation, or a turmeric milk mixture.",
        "fever": "Drink plenty of fluids, rest, and take a lukewarm bath to help cool down your body.",
        "throat pain": "drink lukewarm water with honey and blackpepper and take steam."
    };

    // Check for known symptoms and provide a remedy
    let remedyFound = false;
    for (const symptom in remedies) {
        if (symptomInput.includes(symptom)) {
            remedyResult.innerHTML = `<h3>Home Remedy for ${symptom.charAt(0).toUpperCase() + symptom.slice(1)}:</h3>
                                      <p>${remedies[symptom]}</p>`;
            remedyFound = true;
            remedyResult.style.display = 'block';
            break;
        }
    }

    // If no remedy found
    if (!remedyFound) {
        remedyResult.innerHTML = '<p>Sorry, we couldn\'t find a home remedy for your symptom. Please consult a healthcare provider.</p>';
        remedyResult.style.display = 'block';
    }
});