// script.js
function updateClock() {
    const localTime = new Date();
    const utcTime = new Date(localTime.toUTCString());

    document.getElementById('local-time').textContent = localTime.toLocaleTimeString();
    document.getElementById('local-date').textContent = localTime.toLocaleDateString();

    document.getElementById('utc-time').textContent = utcTime.toLocaleTimeString();
    document.getElementById('utc-date').textContent = utcTime.toLocaleDateString();
}

setInterval(updateClock, 1000);
updateClock(); // Initial call to display the clock immediately

const timeZones = [
    { id: 'new-york', name: 'New York', offset: -5 },
    { id: 'london', name: 'London', offset: 0 },
    { id: 'tokyo', name: 'Tokyo', offset: 9 }
];

function updateClock() {
    const localTime = new Date();

    timeZones.forEach(zone => {
        const offsetTime = new Date(localTime.getTime() + zone.offset * 3600 * 1000);
        document.getElementById(`${zone.id}-time`).textContent = offsetTime.toLocaleTimeString();
        document.getElementById(`${zone.id}-date`).textContent = offsetTime.toLocaleDateString();
    });
}

setInterval(updateClock, 1000);
updateClock();