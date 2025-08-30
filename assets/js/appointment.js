// Frontend-only Appointment form: validate + show success alert
(() => {
  const form = document.getElementById("appointmentForm");
  const statusEl = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");
  const resetBtn = document.getElementById("resetBtn");
  const dateInput = document.getElementById("date");

  // --- Helpers ---
  const todayISO = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const setStatus = (msg, ok = false) => {
    statusEl.textContent = msg;
    statusEl.className = `form-status ${ok ? "ok" : "err"}`;
  };

  // set min selectable date = today
  dateInput.min = todayISO();

  function validate(data) {
    const name = data.get("name")?.trim();
    const email = data.get("email")?.trim();
    const phone = data.get("phone")?.trim();
    const date = data.get("date");
    const message = data.get("message")?.trim();

    if (!name || name.length < 2)
      return { ok: false, msg: "Please enter your full name.", el: form.name };
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return {
        ok: false,
        msg: "Please enter a valid email address.",
        el: form.email,
      };
    if (!phone || !/^[0-9+\-\s()]{7,20}$/.test(phone))
      return {
        ok: false,
        msg: "Please enter a valid phone number.",
        el: form.phone,
      };
    if (!date)
      return {
        ok: false,
        msg: "Please choose a preferred date.",
        el: form.date,
      };
    if (date < todayISO())
      return {
        ok: false,
        msg: "Please choose today or a future date.",
        el: form.date,
      };
    if (!message || message.length < 10)
      return {
        ok: false,
        msg: "Please provide a short message (at least 10 characters).",
        el: form.message,
      };

    return { ok: true, msg: "" };
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    setStatus("");
    const data = new FormData(form);

    const { ok, msg, el } = validate(data);
    if (!ok) {
      setStatus(msg, false);
      (el || form).focus();
      return;
    }

    // Simulate a quick processing feel
    submitBtn.disabled = true;
    setTimeout(() => {
      alert("Appointment request successful");
      setStatus(
        "Appointment request successful. We will contact you to confirm.",
        true
      );
      form.reset();
      dateInput.min = todayISO(); // keep min after reset
      submitBtn.disabled = false;
    }, 400);
  });

  resetBtn.addEventListener("click", () => setStatus(""));
})();
