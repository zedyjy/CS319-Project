const userTypeRadios = document.querySelectorAll('input[name="userType"]');

userTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            userTypeRadios.forEach(otherRadio => {
                if (otherRadio !== radio) {
                    otherRadio.disabled = true;
                } else {
                    otherRadio.disabled = false;
                }
            });
        }
    });
});
