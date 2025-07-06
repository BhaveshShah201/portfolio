(function () {
  "use strict";

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Intro type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  var contentWayPoint = function () {
    var i = 0;
    $('.animate-box').waypoint(function (direction) {
      if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {
        i++;
        $(this.element).addClass('item-animate');
        setTimeout(function () {
          $('body .animate-box.item-animate').each(function (k) {
            var el = $(this);
            setTimeout(function () {
              var effect = el.data('animate-effect');
              if (effect === 'fadeIn') {
                el.addClass('fadeIn animated-fast');
              } else if (effect === 'fadeInLeft') {
                el.addClass('fadeInLeft animated-fast');
              } else if (effect === 'fadeInRight') {
                el.addClass('fadeInRight animated-fast');
              } else {
                el.addClass('fadeInUp animated-fast');
              }
              el.removeClass('item-animate');
            }, k * 100, 'easeInOutExpo');
          });
        }, 50);
      }
    }, { offset: '85%' });
  };

  var pieChart = function () {
    $('.chart').easyPieChart({
      scaleColor: false,
      lineWidth: 4,
      lineCap: 'butt',
      barColor: '#0078ff',
      trackColor: "#f5f5f5",
      size: 160,
      animate: 1000
    });
  };

  var skillsWayPoint = function () {
    if ($('#skills').length > 0) {
      $('#skills').waypoint(function (direction) {

        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          setTimeout(pieChart, 400);
          $(this.element).addClass('animated');
        }
      }, { offset: '90%' });
    }
  };

  // Parallax
  var parallax = function () {
    $(window).stellar();
  };

  var fullHeight = function () {

    if (!isMobile.any()) {
      $('.js-fullheight').css('height', $(window).height());
      $(window).resize(function () {
        $('.js-fullheight').css('height', $(window).height());
      });
    }
  };

  // Loading page
  var loaderPage = function () {
    $(".main-loader").fadeOut("slow");
  };

  $(function () {
    contentWayPoint();
    loaderPage();
    fullHeight();
    parallax();
    // pieChart();
    skillsWayPoint();
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyB0OE8_k8SJauRqpzLxlu3ap4Qz2PKIY0g",
    authDomain: "portfolio-e8c11.firebaseapp.com",
    databaseURL: "https://portfolio-e8c11-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "portfolio-e8c11",
    storageBucket: "portfolio-e8c11.firebasestorage.app",
    messagingSenderId: "554522769500",
    appId: "1:554522769500:web:5ab0bf9190a3df4d4c8e99",
    measurementId: "G-LJZT8WX7EW"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Site Visit Counter
  document.addEventListener('DOMContentLoaded', function() {
    const counterElement = document.getElementById('hitCounter');
    const database = firebase.database();
    const counterRef = database.ref('visitorCount');
    
    async function updateCounter() {
        try {
            // Show loading state
            counterElement.textContent = '...';
            
            // Get the current count
            const snapshot = await counterRef.once('value');
            let count = snapshot.val() || 0;
            
            // Increment the count
            count++;
            
            // Update the count in Firebase
            await counterRef.set(count);
            
            // Update the display
            counterElement.textContent = count;
        } catch (error) {
            console.error('Error updating counter:', error);
            // Fallback to localStorage if Firebase fails
            let count = parseInt(localStorage.getItem('siteHits')) || 0;
            count++;
            localStorage.setItem('siteHits', count);
            counterElement.textContent = count;
        }
    }

    // Update counter when page loads
    updateCounter();
  });

  // Contact Form Handler
  document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.email-form');
    const loadingDiv = contactForm.querySelector('.loading');
    const errorDiv = contactForm.querySelector('.error-message');
    const successDiv = contactForm.querySelector('.sent-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            loadingDiv.style.display = 'block';
            errorDiv.style.display = 'none';
            successDiv.style.display = 'none';

            try {
                const database = firebase.database();
                // Get form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.querySelector('textarea[name="message"]').value,
                    timestamp: new Date().toISOString()
                };

                // Save message to Firebase
                const messagesRef = database.ref('messages');
                await messagesRef.push(formData);

                // Show success message
                successDiv.style.display = 'block';
                loadingDiv.style.display = 'none';
                
                // Reset form
                contactForm.reset();
            } catch (error) {
                console.error('Error sending message:', error);
                errorDiv.textContent = 'Failed to send message. Please try again.';
                errorDiv.style.display = 'block';
                loadingDiv.style.display = 'none';
            }
        });
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    const dragDiv = document.querySelector('.site-counter-fixed');
    let isDragging = false;
    let offsetX, offsetY;

    dragDiv.addEventListener('mousedown', function (e) {
      isDragging = true;
      dragDiv.style.transition = 'none';
      offsetX = e.clientX - dragDiv.getBoundingClientRect().left;
      offsetY = e.clientY - dragDiv.getBoundingClientRect().top;
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', function (e) {
      if (isDragging) {
        dragDiv.style.left = (e.clientX - offsetX) + 'px';
        dragDiv.style.top = (e.clientY - offsetY) + 'px';
        dragDiv.style.right = 'auto';
        dragDiv.style.bottom = 'auto';
        dragDiv.style.transform = 'none';
        dragDiv.style.position = 'fixed';
      }
    });

    document.addEventListener('mouseup', function () {
      isDragging = false;
      dragDiv.style.transition = '';
      document.body.style.userSelect = '';
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    const counterFixed = document.querySelector('.site-counter-fixed');
    const hideBtn = document.getElementById('hideCounterBtn');
    const showBtn = document.getElementById('showCounterBtn');

    if (hideBtn && showBtn && counterFixed) {
      hideBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        counterFixed.style.display = 'none';
        showBtn.style.display = 'inline-block';
      });

      showBtn.addEventListener('click', function () {
        counterFixed.style.display = '';
        showBtn.style.display = 'none';
      });
    }
  });

  // Blog Carousel: Responsive iframe height (optional, for dynamic content)
  function resizeBlogIframes() {
    var iframes = document.querySelectorAll('#blogCarousel iframe');
    iframes.forEach(function(iframe) {
      iframe.style.height = Math.max(iframe.offsetWidth * 1.1, 320) + 'px';
    });
  }
  window.addEventListener('resize', resizeBlogIframes);
  document.addEventListener('DOMContentLoaded', function() {
    resizeBlogIframes();
    // Initialize Bootstrap carousel if needed
    if (window.bootstrap && document.querySelector('#blogCarousel')) {
      var carouselEl = document.querySelector('#blogCarousel');
      if (!carouselEl.classList.contains('carousel')) {
        carouselEl.classList.add('carousel');
      }
      // Optionally, you can initialize via JS if not auto-init
      // new bootstrap.Carousel(carouselEl);
    }
  });

  // Blog Swiper initialization
  if (window.Swiper) {
    document.addEventListener('DOMContentLoaded', function() {
      var blogSwiper = new Swiper('#blogSwiper', {
        slidesPerView: 1,
        spaceBetween: 32,
        centeredSlides: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          900: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 1,
          }
        }
      });
    });
  }

  // Blog Iframe Carousel Controls and Auto-Rotate
  (function() {
    var track = document.querySelector('.blog-iframe-track');
    var leftBtn = document.getElementById('blogCarouselLeft');
    var rightBtn = document.getElementById('blogCarouselRight');
    var autoScrollInterval;
    var scrollAmount = 370; // px, slightly more than iframe width + gap

    function scrollLeft() {
      if (track) track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
    function scrollRight() {
      if (track) track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    function startAutoScroll() {
      stopAutoScroll();
      autoScrollInterval = setInterval(function() {
        if (track) {
          // If at end, scroll to start
          if (track.scrollLeft + track.offsetWidth >= track.scrollWidth - 10) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRight();
          }
        }
      }, 4000);
    }
    function stopAutoScroll() {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
    }
    if (leftBtn) leftBtn.addEventListener('click', scrollLeft);
    if (rightBtn) rightBtn.addEventListener('click', scrollRight);
    if (track) {
      track.addEventListener('mouseenter', stopAutoScroll);
      track.addEventListener('mouseleave', startAutoScroll);
      startAutoScroll();
    }
  })();

})()