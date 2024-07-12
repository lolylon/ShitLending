function validateForm() {
    let isValid = true;
    const nameField = document.getElementById("name");
    const phoneField = document.getElementById("phone");
    const nameError = document.getElementById("nameError");
    const phoneError = document.getElementById("phoneError");
  

    nameError.textContent = "";
    phoneError.textContent = "";
  
    if (nameField.value.trim() === "") {
        nameError.textContent = "Proszę wpisać nazwę";
        isValid = false;
    }
  
    const phonePattern = /^[0-9+()-]{1,32}$/;
    if (!phonePattern.test(phoneField.value)) {
        phoneError.textContent = "Nieprawidłowy numer telefonu";
        isValid = false;
    }
  
    return isValid;
  }