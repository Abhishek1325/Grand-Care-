// script.js

document.getElementById('getLocationBtn').addEventListener('click', function() {
    const locationInfo = document.getElementById('locationInfo');
    const emergencyEmail = document.getElementById('emergencyEmail').value;

    if (!emergencyEmail) {
        alert('Please enter the emergency contact email.');
        return;
    }

    // Check if Geolocation is supported
    if (navigator.geolocation) {
        // Show a loading message while fetching the location
        locationInfo.style.display = 'block';
        locationInfo.innerHTML = '<p>Fetching location data...</p>';

        // Get the user's location
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // Success callback
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Display the location
                locationInfo.innerHTML = `
                    <h3>Your Location:</h3>
                    <p>Latitude: ${latitude}</p>
                    <p>Longitude: ${longitude}</p>
                    <p><a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank">View on Google Maps</a></p>
                `;

                // Send location details via EmailJS
                sendLocationByEmail(emergencyEmail, latitude, longitude);
            },
            function(error) {
                // Error callback
                let errorMessage = 'Unable to retrieve your location.';
                if (error.code === error.PERMISSION_DENIED) {
                    errorMessage = 'Permission denied. Please allow access to your location.';
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    errorMessage = 'Location information is unavailable.';
                } else if (error.code === error.TIMEOUT) {
                    errorMessage = 'The request to get your location timed out.';
                }

                locationInfo.innerHTML = `<p class="error">${errorMessage}</p>`;
            }
        );
    } else {
        // Geolocation is not supported
        locationInfo.style.display = 'block';
        locationInfo.innerHTML = '<p class="error">Geolocation is not supported by your browser.</p>';
    }
});

function sendLocationByEmail(email, latitude, longitude) {
    const templateParams = {
        to_email: email,
        latitude: latitude,
        longitude: longitude,
        map_link: `https://www.google.com/maps?q=${latitude},${longitude}` // Proper string encapsulation
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
           alert('Location sent successfully!');
        }, function(error) {
           alert('Failed to send location. Please try again.');
        });
}
