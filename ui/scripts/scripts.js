document.addEventListener('DOMContentLoaded', function() {
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

  var form = document.getElementById('registration-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var isValid = true;

    // Validate email
    if (!email) {
        document.querySelector('#email').classList.add('invalid');
        document.querySelector('#error-email').classList.add('show');
        isValid = false;
    } else {
        document.querySelector('#email').classList.remove('invalid');
        document.querySelector('#error-email').classList.remove('show');
    }

    // Validate password
    if (!password) {
        document.querySelector('#password').classList.add('invalid');
        document.querySelector('#error-password').classList.add('show');
        isValid = false;
    } else {
        document.querySelector('#password').classList.remove('invalid');
        document.querySelector('#error-password').classList.remove('show');
    }

    if (isValid) {
        fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Handle success (e.g., show a success message, redirect, etc.)
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle error (e.g., show an error message)
        });
    }
  });
});
