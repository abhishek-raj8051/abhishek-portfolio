    // Show a center animated success popup
    function showSuccessPopup(message) {
        var popup = document.createElement('div');
        popup.textContent = message;
        popup.className = 'success-popup-center';
        document.body.appendChild(popup);
        setTimeout(function() {
            popup.style.transition = 'opacity 0.5s';
            popup.style.opacity = '0';
            setTimeout(function() {
                document.body.removeChild(popup);
            }, 500);
        }, 1800);
    }
// sendmail.js
// Sends contact form data to a specified email using EmailJS (client-side, no backend required)
// You must sign up at https://www.emailjs.com/ and replace the placeholders below with your own service, template, and user IDs.


document.addEventListener('DOMContentLoaded', function() {
    // For service/contact form (class="contact-form")
    const serviceForm = document.querySelector('.contact-form');
    if (serviceForm) {
        emailjs.init('dMZfOQtaKl8qn8IBt');
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            emailjs.sendForm('service_ct0c21s', 'template_pvi4i8x', serviceForm)
                .then(function() {
                    showSuccessPopup('Message sent!');
                    serviceForm.reset();
                    // Service form close after submit (for both mobile and desktop)
                    var formWrapper = document.getElementById('inlineContactFormWrapper');
                    if (formWrapper) {
                        formWrapper.style.display = 'none';
                    }
                }, function(error) {
                    // No alert, just log error silently
                    console.error('EmailJS error:', error);
                });
        });
    }

    // For Hire Me form (id="hireMeForm")
    const hireMeForm = document.getElementById('hireMeForm');
    if (hireMeForm) {
        emailjs.init('dMZfOQtaKl8qn8IBt');
        hireMeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            emailjs.sendForm('service_ct0c21s', 'template_pvi4i8x', hireMeForm)
                .then(function() {
                    showSuccessPopup('Message sent!');
                    hireMeForm.reset();
                }, function(error) {
                    // No alert, just log error silently
                    console.error('EmailJS error:', error);
                });
        });
    }

});
