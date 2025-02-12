document.addEventListener("DOMContentLoaded", function () {
  const couponFile = "/assets/files/loveVouchers.xlsx"; // Ensure file exists in this path

  document
    .getElementById("generateCoupon")
    .addEventListener("click", function () {
      fetch(couponFile) // Load the Excel file
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
              let coupons = XLSX.utils
                .sheet_to_json(sheet, { header: 1 })
                .flat();

              // Filter out empty values
              coupons = coupons.filter(
                (coupon) => coupon && coupon.trim() !== ""
              );

              if (coupons.length > 0) {
                let randomCoupon =
                  coupons[Math.floor(Math.random() * coupons.length)];
                document.getElementById(
                  "couponText"
                ).textContent = `💝 ${randomCoupon} 💝`;
              } else {
                document.getElementById("couponText").textContent =
                  "Oops! No coupons found.";
              }
            } catch (error) {
              console.error("Error processing Excel file:", error);
              document.getElementById("couponText").textContent =
                "Error reading coupons. Please check file format.";
            }
          };
          reader.readAsArrayBuffer(blob);
        })
        .catch((error) => {
          console.error("Error loading coupons:", error);
          document.getElementById("couponText").textContent =
            "Error loading coupons. Please try again.";
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
