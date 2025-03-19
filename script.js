function validateForm() {
    let isValid = true;

    // Validate Name
    const name = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (!name.value.trim()) {
        nameError.textContent = "Name is required.";
        isValid = false;
    } else {
        nameError.textContent = "";
    }

    // Validate Phone
    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.value.trim())) {
        phoneError.textContent = "Enter a valid 10-digit phone number.";        
        isValid = false;
    } else {
        phoneError.textContent = "";
    }

    // Validate Email
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        emailError.textContent = "Enter a valid email address.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    // Validate Message
    const message = document.getElementById('message');
    const messageError = document.getElementById('message-error');
    if (!message.value.trim()) {
        messageError.textContent = "Message is required.";
        isValid = false;
    } else {
        messageError.textContent = "";
    }

    return isValid;
}


document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    hamburger.addEventListener("click", () => {
    const navPages = document.querySelector(".pages");
    navPages.classList.toggle("active");
    console.log("clicked");
    
    });
    const navItems = document.querySelectorAll("nav > ul.pages > li");
    navItems.forEach(item => {
    item.addEventListener("click", function(e) {
            if (window.innerWidth <= 792) {
                if (e.target.closest("a")) return;        
                const dropdown = this.querySelector(".dropdown");
                if (dropdown) {
                    e.preventDefault();
                    dropdown.classList.toggle("active");
                } else {
                    document.querySelector(".pages").classList.remove("active");
                }
            }
        });
    });

    const footerYear = document.querySelector(".footer-year");
    const currentYear = new Date().getFullYear();
    footerYear.textContent = currentYear;
    
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Send the form using EmailJS
        if (!validateForm()) {
            return;
        }
        emailjs.sendForm('service_jw6lrir', 'template_ruuf2vn', this)
            .then(() => {
                console.log('SUCCESS!');
                document.querySelector('.form-submitted-message').style.display = 'block';
                this.reset();
            }, (error) => {
                console.log('FAILED...', error);
                document.querySelector('.form-submitted-message').style.display = 'block';
                document.querySelector('.form-submitted-message').textContent = 'Failed to send message. Please try again later.';
                document.querySelector('.form-submitted-message').style.color = 'red';
            });


    });
});

// Initialize EmailJS
emailjs.init('sQPRHXd7F0QvLQNy6');