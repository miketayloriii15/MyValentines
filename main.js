function updateDateTime() {
  const now = new Date();
  const dateOptions = { month: "long", day: "numeric", year: "numeric" };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formattedDate = now.toLocaleDateString("en-US", dateOptions);
  const formattedTime = now.toLocaleTimeString("en-US", timeOptions);

  document.getElementById("currentDate").innerHTML = `© ${formattedDate}`;
  document.getElementById("dateTime").innerHTML = ` ${formattedTime}`;
}

// Update time every second
setInterval(updateDateTime, 1000);

// Run function on load
updateDateTime();
