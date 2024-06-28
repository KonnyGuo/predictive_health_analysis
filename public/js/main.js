document.addEventListener("DOMContentLoaded", function () {
  const patientForm = document.getElementById("patientForm");
  const resultDiv = document.getElementById("result");

  if (patientForm) {
    patientForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(patientForm);
      const patientData = Object.fromEntries(formData.entries());

      fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      })
        .then((response) => response.json())
        .then((data) => {
          resultDiv.textContent = "Patient added successfully";
          patientForm.reset();
        })
        .catch((error) => {
          resultDiv.textContent = "Error adding patient";
          console.error("Error:", error);
        });
    });
  }

  // const riskCells = document.querySelectorAll(".risk-cell");
  // riskCells.forEach((cell) => {
  //   const patientId = cell.dataset.patientId;
  //   fetch(`/api/predictions/${patientId}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       cell.textContent = `${(data.risk * 100).toFixed(2)}%`;
  //     })
  //     .catch((error) => {
  //       cell.textContent = "Error";
  //       console.error("Error:", error);
  //     });
  // });
});
