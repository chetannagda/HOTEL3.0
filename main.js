// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  setTimeout(() => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  }, 100);
});

document.addEventListener('mousedown', () => {
  cursor.style.width = '8px';
  cursor.style.height = '8px';
  cursorFollower.style.width = '30px';
  cursorFollower.style.height = '30px';
});

document.addEventListener('mouseup', () => {
  cursor.style.width = '10px';
  cursor.style.height = '10px';
  cursorFollower.style.width = '40px';
  cursorFollower.style.height = '40px';
});

// Loader
const loader = document.querySelector('.loader');
const progress = document.querySelector('.progress');

let loadProgress = 0;
const loadInterval = setInterval(() => {
  loadProgress += Math.floor(Math.random() * 10) + 1;
  if (loadProgress >= 100) {
    loadProgress = 100;
    clearInterval(loadInterval);
    
    setTimeout(() => {
      loader.classList.add('fade-out');
    }, 500);
  }
  progress.style.width = loadProgress + '%';
}, 200);

// Header Scroll Effect
const header = document.querySelector('.header');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
    backToTop.classList.add('active');
  } else {
    header.classList.remove('scrolled');
    backToTop.classList.remove('active');
  }
  
  // Scroll Animations
  revealElements();
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Hero Slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Initialize slider and autoplay
function initSlider() {
  showSlide(0);
  slideInterval = setInterval(nextSlide, 6000);
}

prevBtn.addEventListener('click', () => {
  clearInterval(slideInterval);
  prevSlide();
  slideInterval = setInterval(nextSlide, 6000);
});

nextBtn.addEventListener('click', () => {
  clearInterval(slideInterval);
  nextSlide();
  slideInterval = setInterval(nextSlide, 6000);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    clearInterval(slideInterval);
    showSlide(index);
    slideInterval = setInterval(nextSlide, 6000);
  });
});

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
let currentTestimonial = 0;
let testimonialInterval;

function showTestimonial(index) {
  testimonialSlides.forEach(slide => slide.classList.remove('active'));
  testimonialDots.forEach(dot => dot.classList.remove('active'));
  
  testimonialSlides[index].classList.add('active');
  testimonialDots[index].classList.add('active');
  currentTestimonial = index;
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
  showTestimonial(currentTestimonial);
}

// Initialize testimonial slider and autoplay
function initTestimonialSlider() {
  showTestimonial(0);
  testimonialInterval = setInterval(nextTestimonial, 5000);
}

testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    clearInterval(testimonialInterval);
    showTestimonial(index);
    testimonialInterval = setInterval(nextTestimonial, 5000);
  });
});

// Scroll Reveal Animation
function revealElements() {
  const revealTexts = document.querySelectorAll('.reveal-text');
  const revealImages = document.querySelectorAll('.reveal-image');
  const revealCards = document.querySelectorAll('.reveal-card');
  
  const windowHeight = window.innerHeight;
  const revealPoint = 150;
  
  revealTexts.forEach(element => {
    const revealTop = element.getBoundingClientRect().top;
    if (revealTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
  
  revealImages.forEach(element => {
    const revealTop = element.getBoundingClientRect().top;
    if (revealTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
  
  revealCards.forEach(element => {
    const revealTop = element.getBoundingClientRect().top;
    if (revealTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');

function setActiveNavLink() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNavLink);

// Form Submission
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const roomType = document.getElementById('room-type').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send this data to a server
    // For now, we'll just log it and show a success message
    console.log({
      name,
      email,
      phone,
      checkIn,
      checkOut,
      roomType,
      message
    });
    
    // Reset form
    bookingForm.reset();
    
    // Show success message (you could create a more sophisticated notification)
    alert('Thank you for your booking request! We will contact you shortly to confirm your reservation.');
  });
}

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initTestimonialSlider();
  setActiveNavLink();
  
  // Trigger reveal animations on initial load
  setTimeout(() => {
    revealElements();
  }, 1000);
});