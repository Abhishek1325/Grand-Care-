const addReminderButton = document.getElementById('addReminder');
const medicineNameInput = document.getElementById('medicineName');
const medicineTimeInput = document.getElementById('medicineTime');
const remindersList = document.getElementById('remindersList');

let reminders = [];

// Function to add a reminder
addReminderButton.addEventListener('click', () => {
    const medicineName = medicineNameInput.value;
    const medicineTime = medicineTimeInput.value;

    if (medicineName && medicineTime) {
        const reminder = {
            name: medicineName,
            time: medicineTime
        };
        reminders.push(reminder);
        displayReminders();
        medicineNameInput.value = '';
        medicineTimeInput.value = '';
    } else {
        alert('Please enter both medicine name and time.');
    }
});

// Function to display reminders
function displayReminders() {
    remindersList.innerHTML = '';
    reminders.forEach((reminder, index) => {
        remindersList.innerHTML += `<div>${reminder.name} at ${reminder.time} <button onclick="removeReminder(${index})">Remove</button></div>`;
    });
}

// Function to remove a reminder
function removeReminder(index) {
    reminders.splice(index, 1);
    displayReminders();
}

// Function to check reminders every minute
setInterval(() => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // Get current time in HH:MM format

    reminders.forEach(reminder => {
        if (reminder.time === currentTime) {
            // Trigger notification
            triggerNotification(reminder.name);
        }
    });
}, 60000); // Check every minute

// Function to trigger a notification
function triggerNotification(medicineName) {
    // Request permission for notifications
    if (Notification.permission === 'granted') {
        // Create a notification
        new Notification('Time to take your medicine!', {
            body: `Please take your medicine: ${medicineName}`,
            icon: 'medicine-icon.png' // Optional: Add an icon for the notification
        });
    } else if (Notification.permission !== 'denied') {
        // Ask for permission
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('Time to take your medicine!', {
                    body: `Please take your medicine: ${medicineName}`,
                    icon: 'medicine-icon.png'
                });
            }
        });
    }
}