// Custom JS extracted from index.html

document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp popup logic
    var waForm = document.getElementById('whatsappContactForm');
    var quickContactModal = document.getElementById('quickcontactModal');
    var closeBtn = document.getElementById('closeQuickContact');
    var navContact = document.querySelector('.navbar a[href="#quickcontact"]');
    // Open WhatsApp popup
    if (navContact && quickContactModal) {
        navContact.addEventListener('click', function(e) {
            e.preventDefault();
            quickContactModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    // Close WhatsApp popup
    if (closeBtn && quickContactModal) {
        closeBtn.addEventListener('click', function() {
            quickContactModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    if (quickContactModal) {
        quickContactModal.addEventListener('click', function(e) {
            if (e.target === quickContactModal) {
                quickContactModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    // WhatsApp send logic
    if (waForm) {
        waForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var phone = '919508417331';
            var url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent('Hi! I want to chat.');
            window.open(url, '_blank');
        });
    }

    // Service section contact form popup logic
    var openBtn = document.getElementById('openContactFormBtn');
    var formWrapper = document.getElementById('inlineContactFormWrapper');
    if (openBtn && formWrapper) {
        openBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (formWrapper.style.display === 'block') {
                formWrapper.style.display = 'none';
            } else {
                formWrapper.style.display = 'block';
            }
            // Service form: mobile view par body scroll/zoom lock na ho
            // document.body.style.overflow = '';
        });
        // Hide form only if close button is clicked
        var closeInlineContactForm = document.getElementById('closeInlineContactForm');
        if (closeInlineContactForm) {
            closeInlineContactForm.addEventListener('click', function(e) {
                formWrapper.style.display = 'none';                // Service form: mobile view par body scroll/zoom lock na ho
                // document.body.style.overflow = '';
            });
        }
    }

    // Scroll logic for contact form (if needed)
    var contactFormSection = document.getElementById('contactform');
    var servicesSection = document.getElementById('services');
    if (contactFormSection && servicesSection) {
        window.addEventListener('scroll', function() {
            var rect = servicesSection.getBoundingClientRect();
            var inView = rect.top < window.innerHeight && rect.bottom > 0;
            if (inView) {
                contactFormSection.style.display = 'block';
            } else {
                contactFormSection.style.display = 'none';
            }
        });
    }
});
