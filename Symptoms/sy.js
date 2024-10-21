const resultDiv = document.getElementById('result');

document.getElementById('symptom-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get selected symptoms
    const symptom1 = document.getElementById('symptom1').value;
    const symptom2 = document.getElementById('symptom2').value;
    const symptom3 = document.getElementById('symptom3').value;

    // An object to map symptoms to possible conditions
    const conditions = {
        fever: ['Flu', 'COVID-19', 'Malaria'],
        cough: ['Common Cold', 'Bronchitis', 'COVID-19'],
        headache: ['Migraine', 'Stress', 'Dehydration'],
        fatigue: ['Anemia', 'Chronic Fatigue Syndrome', 'COVID-19']
    };

    let possibleConditions = [];

    // Check symptom 1
    if (symptom1 && conditions[symptom1]) {
        possibleConditions = possibleConditions.concat(conditions[symptom1]);
    }

    // Check symptom 2
    if (symptom2 && conditions[symptom2]) {
        possibleConditions = possibleConditions.concat(conditions[symptom2]);
    }

    // Check symptom 3
    if (symptom3 && conditions[symptom3]) {
        possibleConditions = possibleConditions.concat(conditions[symptom3]);
    }

    // Remove duplicates from the list of possible conditions
    possibleConditions = [...new Set(possibleConditions)];

    // Display the result
    if (possibleConditions.length > 0) {
        resultDiv.innerHTML = `<h3>Possible Conditions:</h3><ul>` +
            possibleConditions.map(condition => `<li>${condition}</li>`).join('') +
            `</ul>`;
    } else {
        resultDiv.innerHTML = `<h3>No conditions found based on your symptoms.</h3>`;
    }
});
