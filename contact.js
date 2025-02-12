document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("valentineForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form values
      const yourEmail = document.getElementById("yourEmail").value.trim();
      const recipientName = document
        .getElementById("recipientName")
        .value.trim();
      const recipientEmail = document
        .getElementById("recipientEmail")
        .value.trim();
      const valentineChoice = document.getElementById("valentineChoice").value;

      // Validation: Ensure all fields are filled
      if (!yourEmail || !recipientName || !recipientEmail) {
        alert("Please fill in all fields.");
        return;
      }

      // Email Subject
      const subject = `💌 Valentine's Invitation from ${yourEmail}!`;

      // Email Body (Properly formatted)
      const message = `
Hello ${recipientName}, 💖

You have a special invitation! 🎉

${yourEmail} wants to ask you an important question:
💌 *Will you be their Valentine?*  

💘 They selected: **${valentineChoice}**

💬 Reply to this email if you'd like to answer.

Happy Valentine's Day! 💝
      `;

      // Encode for mailto
      const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(message)}`;

      // Open the user's email client
      window.location.href = mailtoLink;
    });

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
    document.getElementById("dateTime").innerHTML = `${formattedTime}`;
  }

  // Update time every second
  setInterval(updateDateTime, 1000);

  // Run function on load
  updateDateTime();
});
