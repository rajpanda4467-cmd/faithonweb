// Main Image Slider Functionality
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  
  if (!slides || slides.length === 0) return;
  
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.remove("active");
  }
  
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex - 1].style.display = "block";
  slides[slideIndex - 1].classList.add("active");
  if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
}

// Auto-advance slides every 5 seconds
let slideInterval = setInterval(() => {
  plusSlides(1);
}, 5000);

// Pause auto-advance on hover
const slider = document.querySelector('.slider');
if (slider) {
  slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
      plusSlides(1);
    }, 5000);
  });
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const headerNav = document.getElementById('headerNav');

if (menuToggle && headerNav) {
  menuToggle.addEventListener('click', () => {
    headerNav.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = headerNav.classList.contains('active') ? 'hidden' : '';
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
  link.addEventListener('click', () => {
    if (headerNav.classList.contains('active')) {
      headerNav.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// Dropdown toggle functionality for mobile
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      e.stopPropagation();
      
      const dropdownMenu = toggle.nextElementSibling;
      const isActive = dropdownMenu.classList.contains('active');
      
      // Close all other dropdowns
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu !== dropdownMenu) {
          menu.classList.remove('active');
        }
      });
      
      // Toggle current dropdown
      dropdownMenu.classList.toggle('active');
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('active');
      });
    }
  }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;
    
    if (name && email && message) {
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="loading"></span> Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.backgroundColor = 'var(--success)';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
          contactForm.reset();
        }, 2000);
      }, 1500);
    } else {
      alert('Please fill in all fields.');
    }
  });
}

// Donation Modal
const donateLink = document.getElementById('donateLink');
const donateLinkFooter = document.getElementById('donateLinkFooter');
const donationModal = document.getElementById('donationModal');
const closeModal = document.getElementById('closeModal');
const payNowBtn = document.getElementById('payNowBtn');
const panField = document.getElementById('panField');

// Payment Modal
const paymentModal = document.getElementById('paymentModal');
const closePaymentModal = document.getElementById('closePaymentModal');
const backToDonation = document.getElementById('backToDonation');

// Store donation form data
let donationFormData = {};

// Open Donation Modal
function openDonationModal(e) {
  if (e) e.preventDefault();
  donationModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

if (donateLink) {
  donateLink.addEventListener('click', openDonationModal);
}

if (donateLinkFooter) {
  donateLinkFooter.addEventListener('click', openDonationModal);
}

// Close Donation Modal
if (closeModal) {
  closeModal.addEventListener('click', () => {
    donationModal.style.display = 'none';
    document.body.style.overflow = '';
    // Clear stored data when closing with X
    donationFormData = {};
    document.getElementById('donationForm').reset();
  });
}

// Toggle PAN field
if (document.getElementById('itrYes')) {
  document.getElementById('itrYes').addEventListener('change', () => {
    panField.style.display = 'block';
  });
}

if (document.getElementById('itrNo')) {
  document.getElementById('itrNo').addEventListener('change', () => {
    panField.style.display = 'none';
  });
}

// Save donation form data
function saveDonationFormData() {
  donationFormData = {
    donorName: document.getElementById('donorName').value,
    donorEmail: document.getElementById('donorEmail').value,
    donorMessage: document.getElementById('donorMessage').value,
    itr: document.querySelector('input[name="itr"]:checked').value,
    donorPAN: document.getElementById('donorPAN').value
  };
}

// Restore donation form data
function restoreDonationFormData() {
  if (donationFormData.donorName) {
    document.getElementById('donorName').value = donationFormData.donorName;
    document.getElementById('donorEmail').value = donationFormData.donorEmail;
    document.getElementById('donorMessage').value = donationFormData.donorMessage;
    
    // Set ITR radio button
    document.getElementById(donationFormData.itr === 'yes' ? 'itrYes' : 'itrNo').checked = true;
    
    // Show/hide PAN field based on ITR selection
    if (donationFormData.itr === 'yes') {
      panField.style.display = 'block';
      document.getElementById('donorPAN').value = donationFormData.donorPAN;
    } else {
      panField.style.display = 'none';
    }
  }
}

// Go to Payment Modal
if (payNowBtn) {
  payNowBtn.addEventListener('click', () => {
    const donorName = document.getElementById('donorName').value;
    const donorEmail = document.getElementById('donorEmail').value;
    
    if (!donorName || !donorEmail) {
      alert('Please fill in your name and email before proceeding.');
      return;
    }
    
    // Save form data before moving to payment
    saveDonationFormData();
    
    donationModal.style.display = 'none';
    paymentModal.style.display = 'flex';
  });
}

// Back to Donation Modal
if (backToDonation) {
  backToDonation.addEventListener('click', () => {
    paymentModal.style.display = 'none';
    donationModal.style.display = 'flex';
  });
}

// Close Payment Modal and clear data
if (closePaymentModal) {
  closePaymentModal.addEventListener('click', () => {
    paymentModal.style.display = 'none';
    document.body.style.overflow = '';
    // Clear stored data when closing with X
    donationFormData = {};
    document.getElementById('donationForm').reset();
    document.getElementById('paymentForm').reset();
  });
}

// Handle Final Submit
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const amount = document.getElementById('amount').value;
    const txnNumber = document.getElementById('txnNumber').value;
    const txnDate = document.getElementById('txnDate').value;
    
    if (!amount || !txnNumber || !txnDate) {
      alert('Please fill in all payment details.');
      return;
    }
    
    // Show loading state
    const submitBtn = paymentForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      paymentModal.style.display = 'none';
      document.body.style.overflow = '';
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.innerHTML = '✅ Thank you for your donation! We have received your details.';
      document.body.appendChild(successMsg);
      
      setTimeout(() => {
        successMsg.remove();
      }, 5000);
      
      // Clear all forms and data
      paymentForm.reset();
      document.getElementById('donationForm').reset();
      donationFormData = {};
    }, 1500);
  });
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === donationModal) {
    donationModal.style.display = 'none';
    document.body.style.overflow = '';
    // Clear stored data when closing by clicking outside
    donationFormData = {};
    document.getElementById('donationForm').reset();
  }
  if (e.target === paymentModal) {
    paymentModal.style.display = 'none';
    document.body.style.overflow = '';
    // Clear stored data when closing by clicking outside
    donationFormData = {};
    document.getElementById('donationForm').reset();
    document.getElementById('paymentForm').reset();
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (headerNav && headerNav.classList.contains('active')) {
        headerNav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
});

// Subscribe Form Submission
const subscribeForm = document.getElementById('subscribeForm');
const subscribeResponse = document.getElementById('subscribe-response');

if (subscribeForm) {
  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('subscribeEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && emailRegex.test(email)) {
      // Show loading state
      const submitBtn = subscribeForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="loading"></span> Subscribing...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        subscribeResponse.textContent = '✅ Thank you for subscribing!';
        subscribeResponse.style.color = 'white';
        subscribeForm.reset();
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          subscribeResponse.textContent = '';
        }, 3000);
      }, 1000);
    } else {
      subscribeResponse.textContent = '⚠️ Please enter a valid email.';
      subscribeResponse.style.color = '#ffcc00';
    }
  });
}

// =====================
// Logo resizing with scroll
// =====================
const mainLogo = document.getElementById('mainLogo');

function updateLogoSize() {
  if (!mainLogo) return;

  const isVolunteerPage = window.location.pathname.includes("volunteer.html");

  if (isVolunteerPage) {
    // Force Stage 3 only on volunteer.html
    mainLogo.style.width = "110px";
    mainLogo.style.top = "0px";
    mainLogo.style.left = "-20px";
    mainLogo.style.filter = "drop-shadow(0px 2px 6px rgba(0,0,0,0.15))";
    document.querySelector('header').classList.add('scrolled');
    return; // exit so stage 1 & 2 never run
  }

  // ---------- Normal 3-stage transitions for index.html ----------
  if (window.innerWidth > 768) {
    const scrollPosition = window.scrollY;
    const stage1 = window.innerHeight * 0.4; // 40%
    const stage2 = window.innerHeight * 0.8; // 80%

    if (scrollPosition > stage2) {
      // Stage 3 - Extra small logo inside header
      mainLogo.style.width = "110px";
      mainLogo.style.top = "0px";
      mainLogo.style.left = "-20px";
      mainLogo.style.filter = "drop-shadow(0px 2px 6px rgba(0,0,0,0.15))";
      document.querySelector('header').classList.add('scrolled');
    } else if (scrollPosition > stage1) {
      // Stage 2 - Medium small logo
      mainLogo.style.width = "180px";
      mainLogo.style.top = "10px";
      mainLogo.style.left = "-30px";
      mainLogo.style.filter = "drop-shadow(0px 4px 10px rgba(0,0,0,0.2))";
      document.querySelector('header').classList.add('scrolled');
    } else {
      // Stage 1 - Large logo
      mainLogo.style.width = "300px";
      mainLogo.style.top = "15px";
      mainLogo.style.left = "-30px";
      mainLogo.style.filter = "drop-shadow(0px 12px 24px rgba(0,0,0,0.4))";
      document.querySelector('header').classList.remove('scrolled');
    }
  } else {
    // Mobile: fixed small logo
    mainLogo.style.width = "140px";
    mainLogo.style.transform = "none";
    mainLogo.style.filter = "none";
    document.querySelector('header').classList.add('scrolled');
  }
}

window.addEventListener('load', updateLogoSize);
window.addEventListener('scroll', updateLogoSize);
window.addEventListener('resize', updateLogoSize);

// Fix for initial logo positioning
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(updateLogoSize, 100);
});


// ======================
// Projects Auto Slide Down
// ======================
const projectsSlider = document.querySelector('.projects-slider');
if (projectsSlider) {
  const items = projectsSlider.querySelectorAll('.project-item');
  let index = 0;

  // Show only one at a time
  items.forEach((item, i) => {
    if (i !== 0) item.style.display = 'none';
  });

  setInterval(() => {
    items[index].style.display = 'none'; // hide current
    index = (index + 1) % items.length; // next index
    items[index].style.display = 'block'; // show next
  }, 5000); // 5s interval
}

// ======================
// YouTube Video Switch with Arrows
// ======================
const ytPlayer = document.getElementById('videoPlayer');
const videoDescription = document.getElementById('videoDescription');
const prevBtn = document.getElementById('prevVideo');
const nextBtn = document.getElementById('nextVideo');

const videoSources = [
  { src: "https://www.youtube.com/embed/dQw4w9WgXcQ?mute=1", desc: "Inspiring talk about rural development and social progress. This video showcases our community engagement approach and the positive changes we've implemented together with local residents." },
  { src: "https://www.youtube.com/embed/3JZ_D3ELwOQ?mute=1", desc: "Educational initiatives that empower youth through modern tools. Our programs focus on digital literacy, vocational training, and life skills development for underprivileged communities." },
  { src: "https://www.youtube.com/embed/L_jWHffIx5E?mute=1", desc: "Healthcare and awareness programs transforming local communities. We provide medical camps, health education, and preventive care services to improve overall well-being." }
];

let currentIndex = 0;

// Load current video
function loadVideo(index) {
  ytPlayer.src = videoSources[index].src;
  videoDescription.textContent = videoSources[index].desc;
}

// Previous video
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + videoSources.length) % videoSources.length;
    loadVideo(currentIndex);
  });
}

// Next video
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % videoSources.length;
    loadVideo(currentIndex);
  });
}

// ======================
// Partners Slider - FIXED VERSION
// ======================
function initPartnersSlider() {
  const track = document.getElementById('partnersTrack');
  const dotsContainer = document.getElementById('partnersDots');
  const prevBtn = document.querySelector('.partners-prev');
  const nextBtn = document.querySelector('.partners-next');
  
  if (!track) return;
  
  const slides = track.querySelectorAll('.partner-slide');
  if (slides.length === 0) return;
  
  // Only initialize slider on mobile
  if (window.innerWidth > 768) {
    // Desktop view - use grid layout (no slider needed)
    track.style.transform = 'translateX(0)';
    if (dotsContainer) dotsContainer.style.display = 'none';
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    return;
  }
  
  // Mobile slider initialization
  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoPlayInterval;
  
  // Initialize track for sliding
  track.style.display = 'flex';
  track.style.transform = 'translateX(0)';
  
  // Create dots if they don't exist
  if (dotsContainer && dotsContainer.children.length === 0) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.className = 'partners-dot';
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  
  // Show navigation buttons on mobile
  if (prevBtn) prevBtn.style.display = 'flex';
  if (nextBtn) nextBtn.style.display = 'flex';
  if (dotsContainer) dotsContainer.style.display = 'flex';
  
  // Update slider position
  function updateSlider() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.partners-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }
  }
  
  // Go to specific slide
  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    updateSlider();
  }
  
  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }
  
  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }
  
  // Auto-play functionality
  function startAutoPlay() {
    stopAutoPlay(); // Clear any existing interval
    autoPlayInterval = setInterval(() => {
      nextSlide();
    }, 4000);
  }
  
  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }
  
  // Event listeners for buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
  }
  
  // Pause auto-play on hover
  track.addEventListener('mouseenter', stopAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);
  
  // Start auto-play
  startAutoPlay();
  
  // Handle window resize
  function handleResize() {
    if (window.innerWidth > 768) {
      // Desktop - reset to grid layout
      stopAutoPlay();
      track.style.display = 'grid';
      track.style.transform = 'none';
      if (dotsContainer) dotsContainer.style.display = 'none';
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    } else {
      // Mobile - slider layout
      track.style.display = 'flex';
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      if (dotsContainer) dotsContainer.style.display = 'flex';
      if (prevBtn) prevBtn.style.display = 'flex';
      if (nextBtn) nextBtn.style.display = 'flex';
      startAutoPlay();
    }
  }
  
  // Listen for resize events
  window.addEventListener('resize', handleResize);
  
  // Initial call to set correct layout
  handleResize();
}

// Initialize partners slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initPartnersSlider();
});

// Reinitialize partners slider on window resize
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initPartnersSlider, 250);
});


// Volunteer Form Submission-- Volunteer index
// Volunteer Form Submission
// Volunteer form validation
// Volunteer form validation
document.addEventListener("DOMContentLoaded", () => {
  const volunteerForm = document.getElementById("volunteerForm");
  if (volunteerForm) {
    volunteerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let valid = true;
      // Only check required inputs
      const requiredInputs = volunteerForm.querySelectorAll("input[required], select[required], textarea[required]");

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = "red";
          valid = false;
        } else {
          input.style.borderColor = "#ccc";
        }
      });

      if (valid) {
        alert("✅ Thank you! Your volunteer application has been submitted.");
        volunteerForm.reset();
      } else {
        alert("⚠️ Please fill in all required fields.");
      }
    });
  }
});
