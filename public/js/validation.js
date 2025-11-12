document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const name = document.getElementById("name");
  const surname = document.getElementById("surname");
  const email = document.getElementById("email");
  const rentDate = document.getElementById("rent_date");

  const setError = (el, message) => {
    el.classList.add("is-invalid");
    el.classList.remove("is-valid");
    let feedback = el.parentElement.querySelector(".invalid-feedback");
    if (!feedback) {
      feedback = document.createElement("div");
      feedback.className = "invalid-feedback";
      el.parentElement.appendChild(feedback);
    }
    feedback.textContent = message;
  };

  const clearError = (el) => {
    el.classList.remove("is-invalid");
    el.classList.add("is-valid");
    const feedback = el.parentElement.querySelector(".invalid-feedback");
    if (feedback) feedback.textContent = "";
  };

  const validateRequired = (el, label) => {
    if (!el.value.trim()) {
      setError("el, ${label} es obligatorio");
      return false;
    }   
    clearError(el);
    return true;
  };

  const validateEmail = (el) => {
    const val = el.value.trim();
    if (!val) {
      setError(el, "Correo electrónico es obligatorio");
      return false;
    }

    //for email format
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(val)) {
      setError(el, "Formato de correo inválido");
      return false;
    }
    clearError(el);
    return true;
  };

  const validateDateNotPast = (el) => {
    const val = el.value;
    if (!val) {
      setError(el, "Fecha de renta es obligatoria");
      return false;
    }
    const picked = new Date(val);
    const today = new Date();
    // Normalize times to ignore time-of-day
    picked.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (picked < today) {
      setError(el, "La fecha no puede ser pasada");
      return false;
    }
    clearError(el);
    return true;
  };

  // Live validation on blur
  name.addEventListener("blur", () => validateRequired(name, "Nombre"));
  surname.addEventListener("blur", () =>
    validateRequired(surname, "Apellidos")
  );
  email.addEventListener("blur", () => validateEmail(email));
  rentDate.addEventListener("blur", () => validateDateNotPast(rentDate));

  // Form submit validation
  form.addEventListener("submit", (e) => {
    const okName = validateRequired(name, "Nombre");
    const okSurname = validateRequired(surname, "Apellidos");
    const okEmail = validateEmail(email);
    const okDate = validateDateNotPast(rentDate);

    //if one thing is wrong the form will not be submitted
    if (!(okName && okSurname && okEmail && okDate)) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
});
