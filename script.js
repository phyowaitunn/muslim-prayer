function getPrayerTimes() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`)
                .then(response => response.json())
                .then(data => {
                    const timings = data.data.timings;

                    document.getElementById("fajr").innerText = timings.Fajr;
                    document.getElementById("dhuhr").innerText = timings.Dhuhr;
                    document.getElementById("asr").innerText = timings.Asr;
                    document.getElementById("maghrib").innerText = timings.Maghrib;
                    document.getElementById("isha").innerText = timings.Isha;

                    document.getElementById("date").innerText = 
                        "Date: " + data.data.date.gregorian.date;

                    document.getElementById("location").innerText = 
                        "Your Location (Auto Detected)";
                })
                .catch(error => {
                    alert("Error fetching prayer times.");
                });

        });
    } else {
        alert("Geolocation not supported.");
    }
}

window.onload = getPrayerTimes;
