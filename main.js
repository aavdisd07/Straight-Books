import './style.css'

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // FAQ toggle functionality
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const icon = this.querySelector('.faq-icon');
      
      if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        icon.style.transform = 'rotate(45deg)';
      } else {
        answer.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
      }
    });
  });

  // Pricing calculator functionality
  const transactionSlider = document.getElementById('transaction-slider');
  const employeeSlider = document.getElementById('employee-slider');
  const vatCheckbox = document.getElementById('vat-checkbox');
  const payrollCheckbox = document.getElementById('payroll-checkbox');
  const taxReturnCheckbox = document.getElementById('tax-return-checkbox');

  function updatePricingCalculator() {
    if (!transactionSlider || !employeeSlider) return;
    
    const transactions = parseInt(transactionSlider.value);
    const employees = parseInt(employeeSlider.value);
    const needsVAT = vatCheckbox?.checked || false;
    const needsPayroll = payrollCheckbox?.checked || false;
    const needsTaxReturn = taxReturnCheckbox?.checked || false;

    let basePrice = 49; // Starter price
    let recommendedPlan = 'Starter';

    // Calculate based on transactions
    if (transactions > 100) {
      basePrice = 99;
      recommendedPlan = 'Standard';
    }
    if (transactions > 300) {
      basePrice = 149;
      recommendedPlan = 'Premium';
    }

    // Add services
    if (needsVAT && basePrice < 99) {
      basePrice = 99;
      recommendedPlan = 'Standard';
    }
    if (needsPayroll && employees > 0 && basePrice < 99) {
      basePrice = 99;
      recommendedPlan = 'Standard';
    }
    if (needsTaxReturn && basePrice < 149) {
      basePrice = 149;
      recommendedPlan = 'Premium';
    }

    // Update display
    document.getElementById('calculated-price').textContent = `£${basePrice}`;
    document.getElementById('recommended-plan').textContent = recommendedPlan;
    document.getElementById('transaction-value').textContent = transactions;
    document.getElementById('employee-value').textContent = employees;
  }

  // Add event listeners for calculator
  if (transactionSlider) transactionSlider.addEventListener('input', updatePricingCalculator);
  if (employeeSlider) employeeSlider.addEventListener('input', updatePricingCalculator);
  if (vatCheckbox) vatCheckbox.addEventListener('change', updatePricingCalculator);
  if (payrollCheckbox) payrollCheckbox.addEventListener('change', updatePricingCalculator);
  if (taxReturnCheckbox) taxReturnCheckbox.addEventListener('change', updatePricingCalculator);

  // Initialize calculator
  updatePricingCalculator();

  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Here you would typically send the form data to your backend
      alert('Thank you for your message! We\'ll get back to you within 24 hours.');
      contactForm.reset();
    });
  }
});

document.querySelector('#app').innerHTML = `
  <!-- Navigation -->
  <nav class="bg-white shadow-lg fixed w-full top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h1 class="text-xl lg:text-2xl font-bold text-blue-900">Straight Books</h1>
          </div>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4 lg:space-x-8">
            <a href="#home" class="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium transition-colors">Home</a>
            <a href="#about" class="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium transition-colors">About</a>
            <a href="#services" class="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium transition-colors">Services</a>
            <a href="#pricing" class="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium transition-colors">Pricing</a>
            <a href="#contact" class="bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors">Contact</a>
          </div>
        </div>
        
        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button id="mobile-menu-button" class="text-gray-700 hover:text-blue-900 focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile Navigation -->
    <div id="mobile-menu" class="md:hidden hidden bg-white border-t">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a href="#home" class="block px-3 py-2 text-gray-700 hover:text-blue-900 font-medium">Home</a>
        <a href="#about" class="block px-3 py-2 text-gray-700 hover:text-blue-900 font-medium">About</a>
        <a href="#services" class="block px-3 py-2 text-gray-700 hover:text-blue-900 font-medium">Services</a>
        <a href="#pricing" class="block px-3 py-2 text-gray-700 hover:text-blue-900 font-medium">Pricing</a>
        <a href="#contact" class="block px-3 py-2 bg-blue-900 text-white rounded-md font-medium">Contact</a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section id="home" class="relative pt-16 min-h-screen flex items-center justify-center text-white">
  <!-- Background Image -->
  <div class="absolute inset-0 bg-cover bg-center z-[-2]" style="background-image: url('https://sdmntpreastus.oaiusercontent.com/files/00000000-eaa4-61f9-9409-3cdd1b6878b0/raw?se=2025-07-04T08%3A27%3A40Z&sp=r&sv=2024-08-04&sr=b&scid=b37cc700-8f9c-5646-9f54-01f2014b9bfb&skoid=5cab1ff4-c20d-41dc-babb-df0c2cc21dd4&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-03T15%3A10%3A44Z&ske=2025-07-04T15%3A10%3A44Z&sks=b&skv=2024-08-04&sig=%2B/u4ec6DSnGJ6ikfL2jmEwqOn6f4DAM4m8PGVazTwBs%3D');"></div>

  <!-- Overlay -->
  <div class="absolute inset-0 bg-black bg-opacity-60 z-[-1]"></div>

  <!-- Main Content -->
  <div class="max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10 text-center">
    <h1 class="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
      International Expertise,<br>
      <span class="text-white">Straightforward Service</span>
    </h1>
    <p class="text-base sm:text-lg lg:text-xl text-green-300 mb-6 sm:mb-8 max-w-3xl mx-auto">
      Based in the UK · One Firm. One Focus · Tailored Accounting, Global Perspective<br class="hidden sm:block">
      From Startups to Large Scale Companies<br>
      <strong class="text-yellow-300">We keep your Books!</strong>
    </p>
    <a href="#contact" class="inline-block bg-blue-900 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-800 transform hover:scale-105 transition duration-200 shadow-md">
      Book Your Free Consultation Today
    </a>

    <!-- Trust Indicators -->
    <div class="mt-10 sm:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-200">
      <div class="flex items-center space-x-2">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>500+ Happy Clients</span>
      </div>
      <div class="flex items-center space-x-2">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        <span>HMRC Registered</span>
      </div>
      <div class="flex items-center space-x-2">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>24hr Response</span>
      </div>
    </div>

    <!-- Benefits -->
    <div class="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
      <div class="text-center">
        <div class="bg-green-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-xs sm:text-sm font-semibold">HMRC-registered</h3>
        <p class="text-[11px] sm:text-xs text-gray-200">UK-compliant</p>
      </div>
      <div class="text-center">
        <div class="bg-blue-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <h3 class="text-xs sm:text-sm font-semibold">Dedicated</h3>
        <p class="text-[11px] sm:text-xs text-gray-200">Account manager</p>
      </div>
      <div class="text-center">
        <div class="bg-purple-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
          </svg>
        </div>
        <h3 class="text-xs sm:text-sm font-semibold">Affordable</h3>
        <p class="text-[11px] sm:text-xs text-gray-200">Monthly plans</p>
      </div>
      <div class="text-center">
        <div class="bg-orange-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"></path>
          </svg>
        </div>
        <h3 class="text-xs sm:text-sm font-semibold">Real-time</h3>
        <p class="text-[11px] sm:text-xs text-gray-200">Support</p>
      </div>
    </div>
  </div>
</section>


  <!-- About Section -->
  <section id="about" class="py-12 lg:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 lg:mb-16">
       <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">About Us</h2>
<div class="max-w-4xl mx-auto">
  <p class="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8">
    Straight Books is run by a team of UK-qualified accountants and global professionals. 
    Our mission is to simplify accounting and deliver trustworthy, transparent, and accurate services to small businesses across borders.
  </p>
  <p class="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8">
    With experience across the UK, India, and Ireland, we combine deep local knowledge with international efficiency to provide seamless bookkeeping, tax filing, payroll, and financial reporting.
  </p>
  <div class="bg-blue-50 p-4 lg:p-6 rounded-lg">
    <p class="text-blue-900 font-semibold text-sm lg:text-base">
      Supervised for AML compliance and trusted by 500+ businesses globally.
    </p>
  </div>
</div>

      </div>
    </div>
  </section>

  <!-- Industry Solutions Section -->
  <section class="py-12 lg:py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 lg:mb-16">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Tailored Solutions for Your Industry</h2>
        <p class="text-base lg:text-lg text-gray-600">Tailored accounting services for your business type</p>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">E-commerce</h3>
          <p class="text-gray-600 text-sm">Multi-platform sales tracking, inventory management, and VAT compliance for online retailers.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Tech Startups</h3>
          <p class="text-gray-600 text-sm">R&D tax credits, share option schemes, and growth-focused financial planning.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Consulting</h3>
          <p class="text-gray-600 text-sm">Project-based income tracking, expense management, and IR35 compliance guidance.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Freelancers</h3>
          <p class="text-gray-600 text-sm">Self-assessment optimization, expense tracking, and personal tax planning.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Retail</h3>
          <p class="text-gray-600 text-sm">Point-of-sale integration, stock management, and seasonal cash flow planning.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Property</h3>
          <p class="text-gray-600 text-sm">Rental income management, capital gains planning, and property tax optimization.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-12 lg:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 lg:mb-16">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">What We Offer</h2>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Main Services -->
        <div>
          <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">Main Services</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div class="flex items-start space-x-3 lg:space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                <svg class="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 text-sm lg:text-base">Bookkeeping</h4>
                <p class="text-gray-600 text-xs lg:text-sm">Complete financial record management</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3 lg:space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="bg-green-100 p-2 rounded-lg flex-shrink-0">
                <svg class="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 text-sm lg:text-base">VAT Registration & Filing</h4>
                <p class="text-gray-600 text-xs lg:text-sm">Complete VAT compliance and submissions</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3 lg:space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                <svg class="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 text-sm lg:text-base">Corporation Tax Returns</h4>
                <p class="text-gray-600 text-xs lg:text-sm">Annual tax return preparation and filing</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3 lg:space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                <svg class="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 text-sm lg:text-base">Payroll (PAYE) Management</h4>
                <p class="text-gray-600 text-xs lg:text-sm">Complete payroll processing and compliance</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3 lg:space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="bg-red-100 p-2 rounded-lg flex-shrink-0">
                <svg class="w-5 h-5 lg:w-6 lg:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 text-sm lg:text-base">Self-Assessment Filing</h4>
                <p class="text-gray-600 text-xs lg:text-sm">For directors and freelancers</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3 lg:space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="bg-indigo-100 p-2 rounded-lg flex-shrink-0">
                <svg class="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 text-sm lg:text-base">Limited Company Formation & Compliance</h4>
                <p class="text-gray-600 text-xs lg:text-sm">Company setup and ongoing compliance</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Optional Add-Ons -->
        <div>
          <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">Optional Add-Ons</h3>
          <div class="space-y-4 lg:space-y-6">
            <div class="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
              <h4 class="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Registered UK Address</h4>
              <p class="text-gray-600 text-xs lg:text-sm">Professional business address for your company</p>
              <p class="text-blue-600 font-medium mt-2 text-xs lg:text-sm">From £15/month</p>
            </div>
            
            <div class="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
              <h4 class="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Virtual CFO Services</h4>
              <p class="text-gray-600 text-xs lg:text-sm">Strategic financial guidance and planning</p>
              <p class="text-blue-600 font-medium mt-2 text-xs lg:text-sm">From £200/month</p>
            </div>
            
            <div class="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
              <h4 class="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Business Bank Account Setup</h4>
              <p class="text-gray-600 text-xs lg:text-sm">Assistance with opening business banking</p>
              <p class="text-blue-600 font-medium mt-2 text-xs lg:text-sm">One-time £50 fee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Calculator Section -->
  <section class="py-12 lg:py-20 bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Calculate Your Monthly Cost</h2>
        <p class="text-base lg:text-lg text-gray-600">Get an instant estimate based on your business needs</p>
      </div>
      
      <div class="bg-white rounded-xl shadow-lg p-6 lg:p-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Calculator Inputs -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Monthly Transactions: <span id="transaction-value" class="text-blue-600">50</span></label>
              <input type="range" id="transaction-slider" min="10" max="500" value="50" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider">
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Number of Employees: <span id="employee-value" class="text-blue-600">0</span></label>
              <input type="range" id="employee-slider" min="0" max="20" value="0" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider">
            </div>
            
            <div class="space-y-3">
              <p class="text-sm font-semibold text-gray-700">Additional Services:</p>
              <label class="flex items-center space-x-3">
                <input type="checkbox" id="vat-checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                <span class="text-sm text-gray-700">VAT Registration & Filing</span>
              </label>
              <label class="flex items-center space-x-3">
                <input type="checkbox" id="payroll-checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                <span class="text-sm text-gray-700">Payroll Management</span>
              </label>
              <label class="flex items-center space-x-3">
                <input type="checkbox" id="tax-return-checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                <span class="text-sm text-gray-700">Corporation Tax Return</span>
              </label>
            </div>
          </div>
          
          <!-- Calculator Results -->
          <div class="bg-blue-50 rounded-lg p-6 text-center">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Your Estimated Monthly Cost</h3>
            <div class="text-4xl font-bold text-blue-900 mb-2">
              <span id="calculated-price">£49</span><span class="text-lg text-gray-600">/month</span>
            </div>
            <p class="text-sm text-gray-600 mb-4">Recommended Plan: <span id="recommended-plan" class="font-semibold text-blue-900">Starter</span></p>
            <a href="#contact" class="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
              Book Free Consultation
            </a>
            <p class="text-xs text-gray-500 mt-3">No setup fees • Cancel anytime • 48hr onboarding</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py-12 lg:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 lg:mb-16">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Clear Monthly Packages</h2>
        <p class="text-base lg:text-lg text-gray-600">Choose the plan that fits your business needs</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        <!-- Starter Plan -->
        <div class="bg-white border-2 border-gray-200 rounded-lg p-6 lg:p-8 hover:border-blue-300 transition-colors">
          <div class="text-center">
            <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Starter</h3>
            <div class="mb-6">
              <span class="text-3xl lg:text-4xl font-bold text-blue-900">£49</span>
              <span class="text-gray-600">/month</span>
            </div>
          </div>
          <ul class="space-y-3 lg:space-y-4 mb-8">
            <li class="flex items-center text-sm lg:text-base">
              <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Bookkeeping for up to 50 transactions/month
            </li>
            <li class="flex items-center text-sm lg:text-base">
              <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Monthly reports
            </li>
            <li class="flex items-center text-sm lg:text-base">
              <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Email support
            </li>
          </ul>
          <a href="#contact" class="block w-full bg-gray-100 text-gray-900 text-center py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm lg:text-base">
            Get Started
          </a>
        </div>
        
        <!-- Standard Plan -->
        <div class="bg-white border-2 border-blue-500 rounded-lg p-6 lg:p-8 relative transform scale-105">
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
          </div>
          <div class="text-center">
            <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Standard</h3>
            <div class="mb-6">
              <span class="text-3xl lg:text-4xl font-bold text-blue-900">£99</span>
              <span class="text-gray-600">/month</span>
            </div>
          </div>
          <ul class="space-y-3 lg:space-y-4 mb-8">
            <li class="flex items-center text-sm lg:text-base">
              <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Bookkeeping + VAT + Payroll (up to 5 employees)
            </li>
            <li class="flex items-center text-sm lg:text-base">
              <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Monthly consultation
            </li>
            <li class="flex items-center text-sm lg:text-base">
              <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              HMRC correspondence
            </li>
          </ul>
          <a href="#contact" class="block w-full bg-blue-900 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-sm lg:text-base">
            Get Started
          </a>
        </div>
        
        <!-- Premium Plan -->
        <div class="bg-white border-2 border-gray-200 rounded-lg p-6 lg:p-8 hover:border-blue-300 transition-colors">
          <div class="text-center">
            <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Premium</h3>
            <div class="mb-6">
              <span class="text-3xl lg:text-4xl font-bold text-blue-900">£149</span>
              <span class="text-gray-600">/month</span>
            </div>
          </div>
          <ul class="space-y-3 lg:space-y-4 mb-8">
            <li class="flex items-center text-sm lg:text-base">
              <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              All of Standard
            </li>
            <li class="flex items-center text-sm lg:text-base">
              <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Corporation Tax Return
            </li>
            <li class="flex items-center text-sm lg:text-base">
              <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Self-assessments for 2 directors
            </li>
            <li class="flex items-center text-sm lg:text-base">
              <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Priority support
            </li>
          </ul>
          <a href="#contact" class="block w-full bg-gray-100 text-gray-900 text-center py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm lg:text-base">
            Get Started
          </a>
        </div>
      </div>
      
      <div class="text-center mt-8 lg:mt-12">
  <p class="text-gray-600 text-sm lg:text-base">
    Need something tailored? <a href="#contact" class="text-blue-600 hover:underline">Contact us for a custom quote</a> based on your business complexity.
  </p>
</div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="py-12 lg:py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 lg:mb-16">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">What Our Clients Say</h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div class="bg-white p-6 lg:p-8 rounded-lg shadow-sm">
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
          <p class="text-gray-600 mb-4 italic text-sm lg:text-base">
            "They saved me hours every month and their pricing is fantastic! Perfect for my e-commerce business."
          </p>
          <p class="font-semibold text-gray-900 text-sm lg:text-base">Sarah, Online Shop Owner</p>
        </div>
        
        <div class="bg-white p-6 lg:p-8 rounded-lg shadow-sm">
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
          <p class="text-gray-600 mb-4 italic text-sm lg:text-base">
            "As a startup founder, I love that I can get HMRC compliance without big firm fees. Game changer!"
          </p>
          <p class="font-semibold text-gray-900 text-sm lg:text-base">James, Tech Entrepreneur</p>
        </div>
        
        <div class="bg-white p-6 lg:p-8 rounded-lg shadow-sm md:col-span-2 lg:col-span-1">
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
          <p class="text-gray-600 mb-4 italic text-sm lg:text-base">
            "Professional service at a fraction of the cost. My dedicated accountant knows my business inside out."
          </p>
          <p class="font-semibold text-gray-900 text-sm lg:text-base">Maria, Consultant</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="py-12 lg:py-20 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 lg:mb-16">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      </div>
      
      <div class="space-y-4 lg:space-y-6">
        <div class="border border-gray-200 rounded-lg">
          <button class="faq-question w-full px-4 lg:px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none">
            <span class="font-semibold text-gray-900 text-sm lg:text-base">Are you UK-compliant?</span>
            <span class="faq-icon text-2xl text-gray-400 transition-transform duration-200">+</span>
          </button>
          <div class="faq-answer hidden px-4 lg:px-6 pb-4">
            <p class="text-gray-600 text-sm lg:text-base">Yes. We're registered in the UK and supervised for anti-money laundering by the appropriate authority.</p>
          </div>
        </div>
        
        <div class="border border-gray-200 rounded-lg">
          <button class="faq-question w-full px-4 lg:px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none">
            <span class="font-semibold text-gray-900 text-sm lg:text-base">Are your accountants qualified?</span>
            <span class="faq-icon text-2xl text-gray-400 transition-transform duration-200">+</span>
          </button>
          <div class="faq-answer hidden px-4 lg:px-6 pb-4">
            <p class="text-gray-600 text-sm lg:text-base">Yes, UK-qualified accountants oversee all filings and sign-offs.</p>
          </div>
        </div>
        
        <div class="border border-gray-200 rounded-lg">
          <button class="faq-question w-full px-4 lg:px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none">
            <span class="font-semibold text-gray-900 text-sm lg:text-base">How secure is my data?</span>
            <span class="faq-icon text-2xl text-gray-400 transition-transform duration-200">+</span>
          </button>
          <div class="faq-answer hidden px-4 lg:px-6 pb-4">
            <p class="text-gray-600 text-sm lg:text-base">All data is stored in GDPR-compliant cloud platforms with encrypted access.</p>
          </div>
        </div>
        
        <div class="border border-gray-200 rounded-lg">
          <button class="faq-question w-full px-4 lg:px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none">
            <span class="font-semibold text-gray-900 text-sm lg:text-base">Do I get a dedicated accountant?</span>
            <span class="faq-icon text-2xl text-gray-400 transition-transform duration-200">+</span>
          </button>
          <div class="faq-answer hidden px-4 lg:px-6 pb-4">
            <p class="text-gray-600 text-sm lg:text-base">Yes. Each client is assigned a dedicated point of contact.</p>
          </div>
        </div>
        
        <div class="border border-gray-200 rounded-lg">
          <button class="faq-question w-full px-4 lg:px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none">
            <span class="font-semibold text-gray-900 text-sm lg:text-base">What accounting software do you use?</span>
            <span class="faq-icon text-2xl text-gray-400 transition-transform duration-200">+</span>
          </button>
          <div class="faq-answer hidden px-4 lg:px-6 pb-4">
            <p class="text-gray-600 text-sm lg:text-base">We work with all major platforms including Xero, QuickBooks, Sage, and FreeAgent. We'll recommend the best fit for your business.</p>
          </div>
        </div>
        
        <div class="border border-gray-200 rounded-lg">
          <button class="faq-question w-full px-4 lg:px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none">
            <span class="font-semibold text-gray-900 text-sm lg:text-base">How quickly can you get me set up?</span>
            <span class="faq-icon text-2xl text-gray-400 transition-transform duration-200">+</span>
          </button>
          <div class="faq-answer hidden px-4 lg:px-6 pb-4">
            <p class="text-gray-600 text-sm lg:text-base">Most clients are fully onboarded within 48 hours. We'll have your first month's books completed within a week.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-12 lg:py-20 bg-blue-900 text-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 lg:mb-16">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Let’s Keep Your Books Simple</h2>
        <p class="text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto">Ready to streamline your accounting? Get in touch with our team today and discover how we can help your business grow.</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Contact Information -->
        <div class="space-y-8">
          <div>
            <h3 class="text-xl lg:text-2xl font-bold mb-6 text-center lg:text-left">Get In Touch</h3>
            
            <!-- Contact Details Grid -->
            <div class="grid grid-cols-1 gap-4 lg:gap-6">
              <div class="bg-blue-800 rounded-xl p-4 lg:p-6 text-center lg:text-left hover:bg-blue-700 transition-colors">
                <div class="flex items-center justify-center lg:justify-start space-x-4">
                  <div class="bg-blue-700 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-base lg:text-lg mb-1">UK Office</h4>
                    <p class="text-blue-100 text-sm lg:text-base">123 Business Street<br>London, EC1A 1BB<br>United Kingdom</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-blue-800 rounded-xl p-4 lg:p-6 text-center lg:text-left hover:bg-blue-700 transition-colors">
                <div class="flex items-center justify-center lg:justify-start space-x-4">
                  <div class="bg-blue-700 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-base lg:text-lg mb-1">Phone</h4>
                    <p class="text-blue-100 text-sm lg:text-base">+44 20 1234 5678<br><span class="text-xs lg:text-sm">Mon-Fri 9AM-6PM GMT</span></p>
                  </div>
                </div>
              </div>
              
              <div class="bg-blue-800 rounded-xl p-4 lg:p-6 text-center lg:text-left hover:bg-blue-700 transition-colors">
                <div class="flex items-center justify-center lg:justify-start space-x-4">
                  <div class="bg-blue-700 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-base lg:text-lg mb-1">Email</h4>
                    <p class="text-blue-100 text-sm lg:text-base">Contact@straightbooks.co.uk<br><span class="text-xs lg:text-sm">We reply within 24 hours</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Business Hours -->
          <div class="bg-blue-800 rounded-xl p-4 lg:p-6">
            <h4 class="font-semibold text-base lg:text-lg mb-4 text-center lg:text-left">Business Hours</h4>
            <div class="space-y-2 text-xs lg:text-sm">
              <div class="flex justify-between">
                <span class="text-blue-100">Monday - Friday:</span>
                <span class="text-white font-medium">9:00 AM - 6:00 PM GMT</span>
              </div>
              <div class="flex justify-between">
                <span class="text-blue-100">Saturday:</span>
                <span class="text-white font-medium">10:00 AM - 2:00 PM GMT</span>
              </div>
              <div class="flex justify-between">
                <span class="text-blue-100">Sunday:</span>
                <span class="text-white font-medium">Closed</span>
              </div>
            </div>
          </div>
          <!-- Social Media Links -->
          <div class="text-center lg:text-left">
            <h4 class="font-semibold text-base lg:text-lg mb-4 lg:mb-6">Follow Us</h4>
            <div class="flex justify-center lg:justify-start space-x-4">
              <a href="https://www.linkedin.com/company/straightbooks" target="_blank" aria-label="LinkedIn" class="bg-blue-800 p-3 lg:p-4 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105">
                <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" class="bg-blue-800 p-3 lg:p-4 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105">
                <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="bg-blue-800 p-3 lg:p-4 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105">
                <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Contact Form -->
        <div class="bg-white rounded-2xl p-6 lg:p-8 text-gray-900">
          <h3 class="text-xl lg:text-2xl font-bold mb-6 text-center text-gray-900">Send Us a Message</h3>
          <form id="contact-form" class="space-y-4 lg:space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input type="text" id="name" name="name" required class="w-full px-3 lg:px-4 py-2 lg:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors text-sm lg:text-base">
              </div>
              
              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input type="email" id="email" name="email" required class="w-full px-3 lg:px-4 py-2 lg:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors text-sm lg:text-base">
              </div>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input type="tel" id="phone" name="phone" class="w-full px-3 lg:px-4 py-2 lg:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors text-sm lg:text-base">
              </div>
              
              <div>
                <label for="company" class="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                <input type="text" id="company" name="company" class="w-full px-3 lg:px-4 py-2 lg:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors text-sm lg:text-base">
              </div>
            </div>
            
            <div>
              <label for="service" class="block text-sm font-semibold text-gray-700 mb-2">Service Interest</label>
              <select id="service" name="service" class="w-full px-3 lg:px-4 py-2 lg:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors text-sm lg:text-base">
                <option value="">Select a service...</option>
                <option value="starter">Starter Package (£49/mo)</option>
                <option value="standard">Standard Package (£99/mo)</option>
                <option value="premium">Premium Package (£149/mo)</option>
                <option value="custom">Custom Solution</option>
                <option value="consultation">Free Consultation</option>
              </select>
            </div>
            
            <div>
              <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
              <textarea id="message" name="message" rows="4" required class="w-full px-3 lg:px-4 py-2 lg:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors resize-none text-sm lg:text-base" placeholder="Tell us about your business and accounting needs..."></textarea>
            </div>
            
            <div class="flex items-start space-x-3">
              <input type="checkbox" id="privacy" name="privacy" required class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0">
              <label for="privacy" class="text-xs lg:text-sm text-gray-600">
                I agree to the <a href="#" class="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a> and consent to being contacted about my inquiry. *
              </label>
            </div>
            
            <button type="submit" class="w-full bg-blue-900 text-white px-6 py-3 lg:py-4 rounded-lg font-semibold hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-[1.02] text-sm lg:text-base">
              Send Message & Book Consultation
             
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-8 lg:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
        <div class="col-span-1 md:col-span-2">
         <h3 class="text-xl lg:text-2xl font-bold mb-4">Straight Books</h3>
<p class="text-gray-300 mb-4 text-sm lg:text-base">
  International bookkeeping and tax solutions with a UK-based, AML-supervised team. 
  Tailored for small businesses and growing startups.
</p>
          <p class="text-xs lg:text-sm text-gray-400">
            © 2025 Straight Books. All rights reserved.
          </p>
        </div>
        
        <div>
          <h4 class="font-semibold mb-4 text-sm lg:text-base">Services</h4>
          <ul class="space-y-2 text-gray-300 text-xs lg:text-sm">
            <li><a href="#services" class="hover:text-white transition-colors">Bookkeeping</a></li>
            <li><a href="#services" class="hover:text-white transition-colors">VAT Filing</a></li>
            <li><a href="#services" class="hover:text-white transition-colors">Payroll</a></li>
            <li><a href="#services" class="hover:text-white transition-colors">Tax Returns</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold mb-4 text-sm lg:text-base">Company</h4>
          <ul class="space-y-2 text-gray-300 text-xs lg:text-sm">
            <li><a href="#about" class="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#pricing" class="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#contact" class="hover:text-white transition-colors">Contact</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
`
