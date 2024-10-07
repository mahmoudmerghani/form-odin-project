const form = document.getElementById("form");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password-confirm");

// The "touched" class ensures validation styles only appear after a user interacts with a field.
// It prevents invalid state indicators (e.g., :invalid) from being applied on page load or before interaction.

form.addEventListener("focusout", (e) => {
    if (e.target.tagName === "INPUT") {
        e.target.classList.add("touched");
        if (
            e.target === passwordConfirm ||
            (e.target === password && passwordConfirm.value !== "")
        ) {
            checkConfirmPassword();
            showErrorMessage(
                passwordConfirm,
                passwordConfirm.validationMessage
            );
        }

        showErrorMessage(e.target, e.target.validationMessage);
    }
});

form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
        form.querySelectorAll("input").forEach((input) => {
            input.classList.add("touched");
            showErrorMessage(input, input.validationMessage);
        });
        e.preventDefault();
    }
});

function showErrorMessage(inputElement, message) {
    const errorElement = inputElement
        .closest("div")
        .querySelector(".error-message");
    errorElement.textContent = message;
}

function checkConfirmPassword() {
    if (passwordConfirm.value !== "") {
        if (password.value !== passwordConfirm.value) {
            passwordConfirm.setCustomValidity("Passwords should be the same");
        } else {
            passwordConfirm.setCustomValidity("");
        }
    } else {
        passwordConfirm.setCustomValidity("Please fill out this field");
    }
}
