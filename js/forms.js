// Form validation and submission

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };

      // Basic validation
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill in all required fields.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // TODO: Replace this with actual form submission
      // Options:
      // 1. Use a service like Formspree, Netlify Forms, or EmailJS
      // 2. Send to your own backend API
      // 3. Use a serverless function (AWS Lambda, Netlify Functions, etc.)

      console.log('Form submitted:', formData);

      // Simulate successful submission
      setTimeout(function() {
        // Hide form
        contactForm.style.display = 'none';

        // Show success message
        if (successMessage) {
          successMessage.style.display = 'block';
        }

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Reset form after delay
        setTimeout(function() {
          contactForm.reset();
          contactForm.style.display = 'block';
          if (successMessage) {
            successMessage.style.display = 'none';
          }
        }, 5000);
      }, 500);
    });

    // Real-time validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
          this.classList.add('form-input--error');
        } else {
          this.classList.remove('form-input--error');
        }
      });
    }
  }
});
