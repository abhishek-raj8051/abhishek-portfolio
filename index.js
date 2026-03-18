function animateSkillBarsAndColors() {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;
    const bars = document.querySelectorAll('.skills-content .bar');
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const sectionBottom = skillsSection.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight && sectionBottom > 0) {
        bars.forEach(bar => {
            const percentText = bar.parentElement.querySelector('h3 span');
            if (!percentText) return;
            const percent = parseInt(percentText.textContent);
            let color = '#00bfff';
            let emoji = '😃';
            if (percent <= 30) { color = '#ff4d4d'; emoji = '😢'; }
            else if (percent <= 80) { color = '#7fff7f'; emoji = '🙂'; }
            else { color = '#00bfff'; emoji = '😃'; }
            const barSpan = bar.querySelector('span');
            barSpan.style.setProperty('--bar-color', color);
            // Set emoji dynamically
            const barEmoji = bar.querySelector('.bar-emoji');
            if (barEmoji) barEmoji.textContent = emoji;
            barSpan.style.transition = 'none';
            barSpan.style.width = '0';
            void barSpan.offsetWidth;
            barSpan.style.transition = 'width 1.5s cubic-bezier(.25,.8,.25,1), box-shadow 0.5s';
            barSpan.style.width = percent + '%';
        });
    } else {
        bars.forEach(bar => {
            const barSpan = bar.querySelector('span');
            barSpan.style.transition = 'none';
            barSpan.style.width = '0';
        });
    }
}
window.addEventListener('scroll', animateSkillBarsAndColors);
window.addEventListener('load', animateSkillBarsAndColors);

window.addEventListener('scroll', function() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;
    if (window.scrollY > 200) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});
scrollTopBtn && scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', function() {
    
    const logo = document.querySelector('.logo');
    if (logo) {
        if (window.scrollY > 50) {
            logo.style.opacity = '1';
            logo.style.color = '#00bfff'; 
            logo.style.transition = 'color 0.5s';
        } else {
            logo.style.opacity = '1';
            logo.style.color = '';
        }
    }
    const homeContent = document.querySelector('.home-content');
    if (!homeContent) return;
    const children = Array.from(homeContent.children);
    const welcomeMsg = document.getElementById('welcomeMsg');
    let hideCount = 0;
    children.forEach(child => {
        if (child.classList.contains('btn-box')) return;
        if (child.classList.contains('welcome-animate')) return;
        if (window.scrollY > 50) {
            child.style.opacity = '0';
            child.style.pointerEvents = 'none';
            child.style.transition = 'opacity 0.5s';
            hideCount++;
        } else {
            child.style.opacity = '1';
            child.style.pointerEvents = 'auto';
        }
    });
    if (welcomeMsg) {
        if (window.scrollY > 50 && hideCount > 0) {
            welcomeMsg.style.display = 'block';
            welcomeMsg.style.opacity = '1';
            welcomeMsg.style.transition = 'opacity 0.5s';
        } else {
            welcomeMsg.style.display = 'none';
            welcomeMsg.style.opacity = '0';
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var readMoreBtn = document.getElementById('readMoreBtn');
    var educationSection = document.getElementById('education');
    if (readMoreBtn && educationSection) {
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            educationSection.classList.add('show');
            educationSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    // Auto-hide My Journey when user scrolls below it
    window.addEventListener('scroll', function() {
        if (!educationSection.classList.contains('show')) return;
        var rect = educationSection.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
            educationSection.classList.remove('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const servicesRow = document.querySelector('.services-row');
    const serviceBoxes = document.querySelectorAll('.service-box');
    let activeBox = null;
    if (servicesRow && serviceBoxes.length) {
        // Improved hover logic: always show the hovered box, hide others, reset on mouseleave
        let hoverTimeout = null;
        serviceBoxes.forEach(box => {
            box.addEventListener('mouseenter', function() {
                if (!activeBox) {
                    serviceBoxes.forEach(b => {
                        if (b !== box) {
                            b.classList.add('hide');
                        } else {
                            b.classList.remove('hide');
                        }
                    });
                }
            });
            box.addEventListener('mouseleave', function() {
                if (!activeBox) {
                    // Use a short timeout to allow mouseenter on another box to fire first
                    clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(() => {
                        // If mouse is not over any service-box, show all
                        if (!Array.from(serviceBoxes).some(b => b.matches(':hover'))) {
                            serviceBoxes.forEach(b => b.classList.remove('hide'));
                        }
                    }, 30);
                }
            });
        });
        // Click logic
        serviceBoxes.forEach(box => {
            box.addEventListener('click', function(e) {
                e.stopPropagation();
                if (activeBox === box) {
                    activeBox = null;
                    serviceBoxes.forEach(b => b.classList.remove('hide'));
                } else {
                    activeBox = box;
                    serviceBoxes.forEach(b => {
                        if (b !== box) {
                            b.classList.add('hide');
                        } else {
                            b.classList.remove('hide');
                        }
                    });
                }
            });
        });
        // Click outside to reset
        document.addEventListener('click', function(e) {
            if (!servicesRow.contains(e.target)) {
                activeBox = null;
                serviceBoxes.forEach(box => box.classList.remove('hide'));
            }
        });
    }
});

// Block common inspect shortcuts
document.addEventListener("keydown", function(e){
  if (e.key === "F12") e.preventDefault();
  if (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key.toUpperCase())) e.preventDefault();
  if (e.ctrlKey && e.key.toUpperCase() === "U") e.preventDefault();
});
// Detect DevTools and block page
(function () {
  const threshold = 200;
  setInterval(function () {
    if (
      window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold
    ) {
      document.body.innerHTML =
        "<h1 style='color:white;background:black;height:100vh;display:flex;align-items:center;justify-content:center'>Access Denied</h1>";
    }
  }, 1000);
})();
