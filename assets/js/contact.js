// Frontend-only contact form: validate + show success alert
(() => {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");
  const resetBtn = document.getElementById("resetBtn");

  const setStatus = (msg, ok = false) => {
    statusEl.textContent = msg;
    statusEl.className = `form-status ${ok ? "ok" : "err"}`;
  };

  function validate(data) {
    const name = data.get("name")?.trim();
    const email = data.get("email")?.trim();
    const phone = data.get("phone")?.trim();
    const subject = data.get("subject")?.trim();
    const message = data.get("message")?.trim();

    if (!name || name.length < 2)
      return { ok: false, msg: "Please enter your full name.", el: "name" };
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return {
        ok: false,
        msg: "Please enter a valid email address.",
        el: "email",
      };
    if (!phone || !/^[0-9+\-\s()]{7,20}$/.test(phone))
      return {
        ok: false,
        msg: "Please enter a valid phone number.",
        el: "phone",
      };
    if (!message || message.length < 10)
      return {
        ok: false,
        msg: "Please provide a short message (at least 10 characters).",
        el: "message",
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
      form.elements[el]?.focus();
      return;
    }

    submitBtn.disabled = true;
    setTimeout(() => {
      alert("Message sent successfully");
      setStatus(
        "Message sent successfully. We will get back to you soon.",
        true
      );
      form.reset();
      submitBtn.disabled = false;
    }, 400);
  });

  resetBtn.addEventListener("click", () => setStatus(""));
})();
