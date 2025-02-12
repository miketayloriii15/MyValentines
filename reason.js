document.addEventListener("DOMContentLoaded", function () {
  const reasonFile = "/assets/files/reasonsToBeMyValentine.xlsx"; // Ensure file exists in this path

  document
    .getElementById("generateReason")
    .addEventListener("click", function () {
      fetch(reasonFile)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.blob();
        })
        .then((blob) => {
          let reader = new FileReader();
          reader.onload = function (e) {
            try {
              let data = new Uint8Array(e.target.result);
              let workbook = XLSX.read(data, { type: "array" });
              let sheet = workbook.Sheets[workbook.SheetNames[0]];
              let reasons = XLSX.utils
                .sheet_to_json(sheet, { header: 1 })
                .flat();

              // Remove empty or undefined values
              reasons = reasons.filter(
                (reason) => reason && reason.trim() !== ""
              );

              if (reasons.length > 0) {
                let randomReason =
                  reasons[Math.floor(Math.random() * reasons.length)];
                document.getElementById(
                  "reasonText"
                ).textContent = `🥰 ${randomReason} 🥰`;
              } else {
                document.getElementById("reasonText").textContent =
                  "Oops! No reasons found.";
              }
            } catch (error) {
              console.error("Error processing Excel file:", error);
              document.getElementById("reasonText").textContent =
                "Error reading reasons. Please check file format.";
            }
          };
          reader.readAsArrayBuffer(blob);
        })
        .catch((error) => {
          console.error("Error loading reasons:", error);
          document.getElementById("reasonText").textContent =
            "Error loading reasons. Please try again.";
        });
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
