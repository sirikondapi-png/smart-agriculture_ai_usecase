document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");

    form.addEventListener("submit", function (e) {
        // Prevent form submission until validated
        e.preventDefault();

        // Clear existing errors and invalid highlighting
        clearErrors();

        let isValid = true;

        // 1. Validate Farmer Name
        const nameInput = document.getElementById("name");
        if (nameInput.value.trim() === "") {
            showError(nameInput, "nameError", "Farmer Name is required.");
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(nameInput.value.trim())) {
            showError(nameInput, "nameError", "Name should only contain alphabets and spaces.");
            isValid = false;
        }

        // 2. Validate Mobile Number (10 digits starting with 6-9)
        const mobileInput = document.getElementById("mobile");
        const mobileRegex = /^[6-9]\d{9}$/;
        if (mobileInput.value.trim() === "") {
            showError(mobileInput, "mobileError", "Mobile number is required.");
            isValid = false;
        } else if (!mobileRegex.test(mobileInput.value.trim())) {
            showError(mobileInput, "mobileError", "Enter a valid 10-digit Indian mobile number.");
            isValid = false;
        }

        // 3. Validate Email Address
        const emailInput = document.getElementById("email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === "") {
            showError(emailInput, "emailError", "Email address is required.");
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, "emailError", "Enter a valid email address.");
            isValid = false;
        }

        // 4. Validate Village
        const villageInput = document.getElementById("village");
        if (villageInput.value.trim() === "") {
            showError(villageInput, "villageError", "Village name is required.");
            isValid = false;
        }

        // 5. Validate Plot ID
        const plotInput = document.getElementById("plot");
        if (plotInput.value.trim() === "") {
            showError(plotInput, "plotError", "Plot ID is required.");
            isValid = false;
        } else if (isNaN(plotInput.value) || Number(plotInput.value) <= 0) {
            showError(plotInput, "plotError", "Plot ID must be a positive number.");
            isValid = false;
        }

        // 6. Validate Crop Stage Selection
        const cropStageInput = document.getElementById("crop_stage");
        if (cropStageInput.value === "") {
            showError(cropStageInput, "cropStageError", "Please select a crop stage.");
            isValid = false;
        }

        // 7. Validate Soil Type Selection
        const soilTypeInput = document.getElementById("soil_type");
        if (soilTypeInput.value === "") {
            showError(soilTypeInput, "soilTypeError", "Please select a soil type.");
            isValid = false;
        }

        // 8. Validate Soil Moisture Percentage (0% to 100%)
        const moistureInput = document.getElementById("soil_moisture");
        const moistureVal = parseFloat(moistureInput.value);
        if (moistureInput.value.trim() === "") {
            showError(moistureInput, "moistureError", "Soil moisture percentage is required.");
            isValid = false;
        } else if (isNaN(moistureVal) || moistureVal < 0 || moistureVal > 100) {
            showError(moistureInput, "moistureError", "Moisture percentage must be between 0 and 100.");
            isValid = false;
        }

        // 9. Validate Irrigation Method Selection
        const irrigationInput = document.getElementById("irrigation");
        if (irrigationInput.value === "") {
            showError(irrigationInput, "irrigationError", "Please select an irrigation method.");
            isValid = false;
        }

        // 10. OPTIONAL: Validate Farm Photo Upload (only checks IF a file is chosen)
        const photoInput = document.getElementById("farm_photo");
        if (photoInput.files.length > 0) {
            const file = photoInput.files[0];
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
            const maxSizeInMB = 5;

            if (!allowedTypes.includes(file.type)) {
                showError(photoInput, "photoError", "Only JPG, JPEG, or PNG images are allowed.");
                isValid = false;
            } else if (file.size > maxSizeInMB * 1024 * 1024) {
                showError(photoInput, "photoError", `File size must be under ${maxSizeInMB}MB.`);
                isValid = false;
            }
        }

        // 11. Validate Registration Date
        const dateInput = document.getElementById("reg_date");
        if (dateInput.value === "") {
            showError(dateInput, "dateError", "Registration date is required.");
            isValid = false;
        }

        // Final Submission Action
        if (isValid) {
            alert("Registration Submitted Successfully!");
            form.reset(); // Clear form fields upon successful validation
        }
    });

    // Helper Function to display errors and highlight input fields
    function showError(inputElement, errorElementId, message) {
        inputElement.classList.add("invalid-field");
        const errorSpan = document.getElementById(errorElementId);
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }

    // Helper Function to clear previous error messages and styles
    function clearErrors() {
        const invalidFields = document.querySelectorAll(".invalid-field");
        invalidFields.forEach(function (field) {
            field.classList.remove("invalid-field");
        });

        const errorSpans = document.querySelectorAll(".error-msg");
        errorSpans.forEach(function (span) {
            span.textContent = "";
        });
    }
});
