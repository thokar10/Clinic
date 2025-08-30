// BMI Calculator (standalone)
(function () {
  const form = document.getElementById("bmiForm");
  const weightEl = document.getElementById("weight");
  const heightEl = document.getElementById("height");
  const unitEl = document.getElementById("heightUnit");
  const output = document.querySelector(".bmi-output");
  const errorEl = document.getElementById("formError");
  const marker = document.getElementById("bmiMarker");
  const resetBtn = document.getElementById("resetBtn");

  function toMeters(value, unit) {
    const v = parseFloat(value);
    if (Number.isNaN(v)) return NaN;
    return unit === "cm" ? v / 100 : v;
  }

  function categoryOf(bmi) {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  }

  // Map BMI 12–40 to 0–100% for marker position
  function posPercent(bmi) {
    const min = 12,
      max = 40;
    const clamped = Math.max(min, Math.min(max, bmi));
    return ((clamped - min) / (max - min)) * 100;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorEl.textContent = "";

    const w = parseFloat(weightEl.value);
    const h = toMeters(heightEl.value, unitEl.value);

    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
      errorEl.textContent = "Please enter a valid positive weight and height.";
      output.innerHTML =
        '<p class="lead">Enter your details and click <b>Calculate BMI</b>.</p>';
      marker.style.setProperty("--pos", "0%");
      return;
    }

    // Basic realism guardrails
    const hCm =
      unitEl.value === "cm"
        ? parseFloat(heightEl.value)
        : parseFloat(heightEl.value) * 100;
    if (w < 10 || w > 500 || hCm < 50 || hCm > 250) {
      errorEl.textContent =
        "Entered values look unrealistic. Please double-check.";
      return;
    }

    const bmi = w / (h * h);
    const val = Math.round(bmi * 10) / 10;
    const cat = categoryOf(val);
    const badgeClass = {
      Underweight: "under",
      Normal: "normal",
      Overweight: "over",
      Obese: "obese",
    }[cat];

    output.innerHTML = `
      <p class="lead">Your BMI is <b>${val}</b> — <span class="badge ${badgeClass}">${cat}</span></p>
      <p class="muted">BMI is a screening tool, not a diagnosis. Please consult a clinician for personalised advice.</p>
    `;

    const pos = posPercent(val);
    marker.style.setProperty("--pos", pos + "%");
    marker.style.left = `calc(${pos}%)`;
  });

  resetBtn.addEventListener("click", () => {
    errorEl.textContent = "";
    output.innerHTML =
      '<p class="lead">Enter your details and click <b>Calculate BMI</b>.</p>';
    marker.style.setProperty("--pos", "0%");
    marker.style.left = "0%";
  });
})();
