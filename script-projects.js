/* ========================================
   ADDITIONAL JAVASCRIPT FOR PROJECTS
   This file works WITH your existing script.js
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

  /* ===== Project Filter Functionality ===== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    // Add click event to all filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filterValue === 'all') {
            card.style.display = 'block';
            card.classList.add('show');
          } else {
            if (category.includes(filterValue)) {
              card.style.display = 'block';
              card.classList.add('show');
            } else {
              card.style.display = 'none';
              card.classList.remove('show');
            }
          }
        });
      });
    });
  }

  /* ===== Video Hover Play/Pause ===== */
  const projectVideos = document.querySelectorAll('.project-video');

  projectVideos.forEach(video => {
    const card = video.closest('.project-card');
    
    if (card) {
      card.addEventListener('mouseenter', () => {
        video.play().catch(error => {
          console.log('Video play failed:', error);
        });
      });
      
      card.addEventListener('mouseleave', () => {
        video.pause();
      });
    }
  });

  /* ===== Smooth Scroll for Project Links ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Only prevent default for internal links
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  /* ===== Project Card Animation on Scroll ===== */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all project cards
  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    projectObserver.observe(card);
  });

  /* ===== Skill Cards Animation ===== */
  const skillCategories = document.querySelectorAll('.skill-category');
  
  if (skillCategories.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    }, observerOptions);

    skillCategories.forEach(category => {
      category.style.opacity = '0';
      category.style.transform = 'translateY(30px)';
      category.style.transition = 'all 0.6s ease';
      skillObserver.observe(category);
    });
  }

  /* ===== Update Active Nav Link on Scroll ===== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar a');

  function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
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

  window.addEventListener('scroll', updateActiveNav);

  /* ===== Lazy Loading for Project Images ===== */
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  /* ===== Count Animation for Stats (if needed later) ===== */
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = Math.ceil(target);
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start);
      }
    }, 16);
  }

  // You can use this function later if you add counters
  window.animateCounter = animateCounter;

  console.log('✨ Projects & Skills JavaScript loaded successfully!');
});
