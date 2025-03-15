// Predefined Time Zones (like vclock.com)
const predefinedTimeZones = [
    { name: "New York", timeZone: "America/New_York", offset: "-4:30" },
    { name: "Chicago, Illinois", timeZone: "America/Chicago", offset: "-5:30" },
    { name: "Denver, Colorado", timeZone: "America/Denver", offset: "-6:30" },
    { name: "Los Angeles, California", timeZone: "America/Los_Angeles", offset: "-7:30" },
    { name: "Phoenix, Arizona", timeZone: "America/Phoenix", offset: "-7:30" },
    { name: "Anchorage, Alaska", timeZone: "America/Anchorage", offset: "-8:30" },
    { name: "Honolulu, Hawaii", timeZone: "Pacific/Honolulu", offset: "-10:30" },
    { name: "Toronto, Canada", timeZone: "America/Toronto", offset: "-4:30" },
    { name: "London, United Kingdom", timeZone: "Europe/London", offset: "+1:00" },
    { name: "Sydney, Australia", timeZone: "Australia/Sydney", offset: "+10:00" },
    { name: "Manila, Philippines", timeZone: "Asia/Manila", offset: "+8:00" },
    { name: "Singapore, Singapore", timeZone: "Asia/Singapore", offset: "+8:00" },
    { name: "Tokyo, Japan", timeZone: "Asia/Tokyo", offset: "+9:00" },
    { name: "Beijing, China", timeZone: "Asia/Shanghai", offset: "+8:00" },
    { name: "Berlin, Germany", timeZone: "Europe/Berlin", offset: "+2:00" },
    { name: "Mexico City, Mexico", timeZone: "America/Mexico_City", offset: "-5:00" },
    { name: "Buenos Aires, Argentina", timeZone: "America/Argentina/Buenos_Aires", offset: "-3:00" },
    { name: "Dubai, United Arab Emirates", timeZone: "Asia/Dubai", offset: "+4:00" }
];

// Add predefined clocks to the World Clock section
const worldClocks = document.getElementById('world-clocks');

predefinedTimeZones.forEach(zone => {
    addClock(zone.name, zone.timeZone, zone.offset);
});

// Function to add a new clock
function addClock(name, timeZone, offset = "") {
    const clockDiv = document.createElement('div');
    clockDiv.className = 'clock';
    clockDiv.innerHTML = `
        <h3>${name}</h3>
        <div class="time">00:00:00</div>
        <div class="date">January 1, 2023</div>
        <div class="offset">${offset}</div>
    `;
    worldClocks.appendChild(clockDiv);

    // Update the clock every second
    setInterval(() => {
        const now = new Date();
        const timeString = new Date(now.toLocaleString('en-US', { timeZone })).toLocaleTimeString();
        const dateString = new Date(now.toLocaleString('en-US', { timeZone })).toLocaleDateString();
        clockDiv.querySelector('.time').textContent = timeString;
        clockDiv.querySelector('.date').textContent = dateString;
    }, 1000);
}

// List of countries and their time zones for the dropdown
const countries = [
    { name: "United States", timeZones: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "America/Phoenix", "America/Anchorage", "Pacific/Honolulu"] },
    { name: "United Kingdom", timeZones: ["Europe/London"] },
    { name: "Australia", timeZones: ["Australia/Sydney", "Australia/Melbourne", "Australia/Brisbane", "Australia/Adelaide", "Australia/Perth"] },
    { name: "India", timeZones: ["Asia/Kolkata"] },
    { name: "Japan", timeZones: ["Asia/Tokyo"] },
    { name: "Germany", timeZones: ["Europe/Berlin"] },
    { name: "France", timeZones: ["Europe/Paris"] },
    { name: "Canada", timeZones: ["America/Toronto", "America/Vancouver", "America/Edmonton", "America/Winnipeg"] },
    // Add more countries as needed
];

// Populate country dropdown
const countrySelect = document.getElementById('country-select');
const timezoneSelect = document.getElementById('timezone-select');

countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.name;
    option.textContent = country.name;
    countrySelect.appendChild(option);
});

// Update time zone dropdown based on selected country
countrySelect.addEventListener('change', () => {
    const selectedCountry = countries.find(c => c.name === countrySelect.value);
    timezoneSelect.innerHTML = '<option value="" disabled selected>Select Time Zone</option>';
    if (selectedCountry) {
        selectedCountry.timeZones.forEach(zone => {
            const option = document.createElement('option');
            option.value = zone;
            option.textContent = zone;
            timezoneSelect.appendChild(option);
        });
    }
});

// Add Time Zone
document.getElementById('add-timezone').addEventListener('click', () => {
    const timeZone = timezoneSelect.value;
    const customName = document.getElementById('custom-name').value || timezoneSelect.selectedOptions[0].text;

    if (!timeZone) {
        alert("Please select a time zone.");
        return;
    }

    addClock(customName, timeZone);
});

// Fix Stopwatch
let stopwatchInterval;
let stopwatchTime = 0;

document.getElementById('start-stopwatch').addEventListener('click', () => {
    const button = document.getElementById('start-stopwatch');
    if (button.textContent === 'Start') {
        button.textContent = 'Stop';
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            const hours = Math.floor(stopwatchTime / 3600);
            const minutes = Math.floor((stopwatchTime % 3600) / 60);
            const seconds = stopwatchTime % 60;
            document.getElementById('stopwatch').textContent =
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    } else {
        button.textContent = 'Start';
        clearInterval(stopwatchInterval);
    }
});

document.getElementById('reset-stopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    document.getElementById('stopwatch').textContent = '00:00:00';
    document.getElementById('start-stopwatch').textContent = 'Start';
});

// Fix Countdown
let countdownInterval;

document.getElementById('start-countdown').addEventListener('click', () => {
    const input = document.getElementById('countdown-input');
    const button = document.getElementById('start-countdown');
    if (button.textContent === 'Start') {
        const targetTime = new Date(input.value).getTime();
        if (isNaN(targetTime)) {
            alert("Please select a valid date and time.");
            return;
        }
        button.textContent = 'Stop';
        countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const timeLeft = targetTime - now;
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                button.textContent = 'Start';
                document.getElementById('countdown-display').textContent = '00:00:00';
                return;
            }
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            document.getElementById('countdown-display').textContent =
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    } else {
        button.textContent = 'Start';
        clearInterval(countdownInterval);
    }
});

document.getElementById('reset-countdown').addEventListener('click', () => {
    clearInterval(countdownInterval);
    document.getElementById('countdown-display').textContent = '00:00:00';
    document.getElementById('start-countdown').textContent = 'Start';
});
