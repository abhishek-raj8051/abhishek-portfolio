// sendmail_simple.js
// Sends only mobile and email fields using EmailJS

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.quick-contact-form');
    if (!form) return;
    emailjs.init('viIk_M6a6qcGsERELl9yj');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        emailjs.sendForm('service_ct0c21s', 'template_pvi4i8x', form)
            .then(function() {
                alert('Message sent successfully!');
                form.reset();
            }, function(error) {
                alert('Failed to send message. Please try again later.');
                // Show error details for debugging
                if (error && error.text) {
                    alert('Error: ' + error.text);
                }
                console.error('EmailJS error:', error);
            });
    });
});
