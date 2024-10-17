var inputs = document.querySelectorAll('.input-field input');

function detectContent() {
    if (this.value !== '') {
        this.style.backgroundColor = '#e9f0fe';
    } else {
        this.style.backgroundColor = 'white';
    }
}

for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    input.addEventListener('keyup', detectContent, false);
}

function validateInput() {
    if (!this.checkValidity()) {
        this.classList.add('invalid');
    } else {
        this.classList.remove('invalid');
    }
}

inputs.forEach(function(input) {
    input.addEventListener('input', validateInput);
});