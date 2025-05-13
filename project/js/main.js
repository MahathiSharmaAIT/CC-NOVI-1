import AOS from 'aos';
import 'aos/dist/aos.css';

document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeServiceModals();
  initializeTeamSlider();
  
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true
  });
});

function initializeNavigation() {
  const header = document.getElementById('header');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        navMenu.classList.remove('active');
      }
    });
  });
  // Dropdown toggle for mobile
document.querySelectorAll('.nav-menu .dropdown > a').forEach(link => {
  link.addEventListener('click', function(e) {
    const parentLi = this.parentElement;
    if (window.innerWidth <= 768) {
      e.preventDefault();
      parentLi.classList.toggle('active');
    }
  });
});

}

function initializeServiceModals() {
  const serviceButtons = document.querySelectorAll('.service-learn-more');
  
  const serviceDetails = {
    'Collision Repair': {
      description: 'Our comprehensive collision repair service includes:',
      features: [
        'Free initial damage assessment',
        'Insurance claim assistance',
        'State-of-the-art repair equipment',
        'Factory-certified technicians',
        'Lifetime warranty on repairs',
        'Free rental car assistance'
      ]
    },
    'Auto Body Work': {
      description: 'Professional auto body services including:',
      features: [
        'Dent removal and repair',
        'Panel replacement',
        'Frame straightening',
        'Rust repair and prevention',
        'Custom body modifications',
        'Scratch removal'
      ]
    },
    'Paint Services': {
      description: 'Expert paint services featuring:',
      features: [
        'Computerized color matching',
        'Premium quality paints',
        'Clear coat protection',
        'Custom paint jobs',
        'Spot repair and blending',
        'Environmental-friendly products'
      ]
    }
  };

  serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const serviceCard = button.closest('.service-card');
      const title = serviceCard.querySelector('h3').textContent;
      const details = serviceDetails[title];

      // Create modal
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <button class="close-modal">&times;</button>
          <h3>${title}</h3>
          <p>${details.description}</p>
          <ul>
            ${details.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
          <a href="/estimate" class="btn btn-primary">Get Estimate</a>
        </div>
      `;

      document.body.appendChild(modal);
      
      // Show modal with animation
      setTimeout(() => modal.classList.add('active'), 10);

      // Close modal handlers
      const closeBtn = modal.querySelector('.close-modal');
      const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
      };

      closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
      });
    });
  });
}

// function initializeTeamSlider() {
//   const slider = document.querySelector('.team-slider');
//   if (!slider) return;

//   const slides = slider.querySelectorAll('.team-member');
//   if (!slides.length) return;

//   const prevBtn = document.querySelector('.team-nav.prev');
//   const nextBtn = document.querySelector('.team-nav.next');
  
//   if (!prevBtn || !nextBtn) return;
//   let currentSlide = 0;
//   const visibleSlides = Math.floor(slider.parentElement.offsetWidth / 240); // 220px card + 20px gap
//   const maxSlide = slides.length - visibleSlides;

//   function updateSlider() {
//     const slideWidth = 240; // width + margin
//     slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
//   }

//   prevBtn.addEventListener('click', () => {
//     currentSlide = Math.max(currentSlide - 1, 0);
//     updateSlider();
//   });

//   nextBtn.addEventListener('click', () => {
//     currentSlide = Math.min(currentSlide + 1, maxSlide);
//     updateSlider();
//   });

//   updateSlider();
// }

// function initializeTeamSlider() {
//   const slider = document.querySelector('.team-slider');
//   if (!slider) return;

//   const slides = Array.from(slider.querySelectorAll('.team-member'));
//   const prevBtn = document.querySelector('.team-nav.prev');
//   const nextBtn = document.querySelector('.team-nav.next');
//   const cardWidth = 260; // 240 + 20px gap
//   const visibleCount = 3;
//   let currentIndex = 0;

//   function updateSlider() {
//     slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
//   }

//   nextBtn.addEventListener('click', () => {
//     currentIndex = (currentIndex + 1) % slides.length;
//     updateSlider();
//   });

//   prevBtn.addEventListener('click', () => {
//     currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//     updateSlider();
//   });

//   updateSlider();
// }
// function initializeTeamSlider() {
//   const track = document.querySelector('.team-slider-track');
//   const slides = document.querySelectorAll('.team-member');
//   const nextBtn = document.querySelector('.team-nav.next');
//   const prevBtn = document.querySelector('.team-nav.prev');

//   let currentIndex = 0;
//   const visibleCards = 3;
//   const cardWidth = 280; // 260 + margin
//   const maxIndex = slides.length - visibleCards;
//   nextBtn.addEventListener('click', () => {
//     if (currentIndex < maxIndex) {
//       currentIndex++;
//       track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
//     }
//   });
  
//   prevBtn.addEventListener('click', () => {
//     if (currentIndex > 0) {
//       currentIndex--;
//       track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
//     }
//   });
// }
function initializeTeamSlider() {
  const track = document.querySelector('.team-slider-track');
  const slides = document.querySelectorAll('.team-member');
  const nextBtn = document.querySelector('.team-nav.next');
  const prevBtn = document.querySelector('.team-nav.prev');

  let currentIndex = 0;

  function getCardWidth() {
    return slides[0].offsetWidth + 20; // Adjust this if you have different margins
  }

  function getVisibleCards() {
    const containerWidth = document.querySelector('.team-slider-container').offsetWidth;
    return Math.floor(containerWidth / getCardWidth());
  }

  function getMaxIndex() {
    return slides.length - getVisibleCards();
  }

  function updateSlider() {
    const offset = currentIndex * getCardWidth();
    track.style.transform = `translateX(-${offset}px)`;
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < getMaxIndex()) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  window.addEventListener('resize', () => {
    // Reset position if resized to fewer visible cards
    if (currentIndex > getMaxIndex()) {
      currentIndex = getMaxIndex();
    }
    updateSlider();
  });

  updateSlider(); // initial render
}

