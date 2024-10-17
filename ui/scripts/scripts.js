document.addEventListener('DOMContentLoaded', function() {
  var inputs = document.querySelectorAll('.input-field input');
  var form = document.getElementById('registration-form');

  function detectContent() {
      if (this.value !== '') {
          this.style.backgroundColor = '#e9f0fe';
      } else {
          this.style.backgroundColor = 'white';
      }
  }
  
  function validateInput() {
      if (!this.checkValidity()) {
          this.classList.add('invalid');
      } else {
          this.classList.remove('invalid');
      }
  }

  function showPopup(message) {
    var popup = document.getElementById('error-popup');
    popup.textContent = message;
    popup.classList.add('show');
    setTimeout(function() {
        popup.classList.remove('show');
    }, 5000);
  }

  for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      input.addEventListener('keyup', detectContent, false);
  }

  inputs.forEach(function(input) {
      input.addEventListener('input', validateInput);
  });

  function markAsInvalid(field, message, showMessage = true) {
    document.querySelector(`#${field}`).classList.add('invalid');
    document.querySelector(`#error-${field}`).textContent = message;
    document.querySelector(`#error-${field}`).classList.add('show');
    showMessage ? showPopup(message) : null;
  }

  function markAsValid(field) {
    document.querySelector(`#${field}`).classList.remove('invalid');
    document.querySelector(`#error-${field}`).textContent = '';
    document.querySelector(`#error-${field}`).classList.remove('show');
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var isValid = true;
        
    // Validate email
    if (!email) {
      markAsInvalid('email', 'Email is required', false);
      isValid = false;
    } else {
      markAsValid('email');
    }

    // Validate password
    if (!password) {
      markAsInvalid('password', 'Password is required', false);
      isValid = false;
    } else {
      markAsValid('password');
    }

    if (!isValid) {
      showPopup('Please fill in the required fields');
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
            if (data.statusCode === 422) {
              markAsInvalid('email', 'Email already exists');
              showPopup('Email already exists')
            }

            if (data.email) {
                showPopup('User created successfully');
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
            }

            if (Array.isArray(data.message) && data.message.length > 0 && data.statusCode === 400) {
              data.message.forEach(message => {
                const errPass = text.search("password");
                const errEmail = text.search("email");

                if (errPass) {
                  markAsInvalid('password', message);
                }
                
                if (errEmail) {
                  markAsInvalid('email', message);
                }

                var p = document.createElement('p');
                p.textContent = message;
                popup.appendChild(p);
              });

              if (data.statusCode !== 400 || data.statusCode !== 422) {
                showPopup('An error occured');
                console.error('Error:', data);
              }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
  });
});
