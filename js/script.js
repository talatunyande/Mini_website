// Typing effect for header
const text = "Welcome to Nyanab Ghana Limited";
let index = 0;
const h1 = document.querySelector('.hero-header h1');

function typeWriter() {
  if (index < text.length) {
    h1.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  }
}

// Start typing on page load
window.addEventListener('load', () => {
  h1.innerHTML = '';
  typeWriter();
});

// Modal functionality
const navModal = document.getElementById('navModal');
const pageModal = document.getElementById('pageModal');
const modalBody = document.getElementById('modal-body');
const navToggle = document.getElementById('navToggle');
const closeBtns = document.querySelectorAll('.close');

navToggle.onclick = function() {
  navModal.style.display = 'block';
  navToggle.classList.add('open');
}

closeBtns.forEach(btn => {
  btn.onclick = function() {
    navModal.style.display = 'none';
    pageModal.style.display = 'none';
    navToggle.classList.remove('open');
  }
});

window.onclick = function(event) {
  if (event.target == navModal) {
    navModal.style.display = 'none';
    navToggle.classList.remove('open');
  }
  if (event.target == pageModal) {
    pageModal.style.display = 'none';
  }
}

// Intersection Observer for animations
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(50px)';
  section.style.transition = 'opacity 0.6s, transform 0.6s';
  observer.observe(section);
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Nav links in modal to open page modal
document.querySelectorAll('.modal-nav a').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    navModal.style.display = 'none'; // Close nav modal
    navToggle.classList.remove('open');
    const url = this.getAttribute('href');
    fetch(url)
      .then(response => response.text())
      .then(data => {
        modalBody.innerHTML = data;
        pageModal.style.display = 'block';
      })
      .catch(error => {
        modalBody.innerHTML = '<p>Error loading page.</p>';
        pageModal.style.display = 'block';
      });
  });
});

// Contact form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    // Simple validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (name && email && subject && message) {
      alert('Message sent successfully! We will get back to you soon.');
      this.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });
}
