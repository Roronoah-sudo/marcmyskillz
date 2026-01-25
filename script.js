/* ==========================================================================
   MARC MY SKILLZ - JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // Mobile Menu
    // ==========================================================================
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // ==========================================================================
    // Pre-select Event Type from URL
    // ==========================================================================
    const urlParams = new URLSearchParams(window.location.search);
    const eventType = urlParams.get('type');
    const eventTypeSelect = document.getElementById('event_type');
    
    if (eventType && eventTypeSelect) {
        const typeMap = {
            'wedding': 'Wedding',
            'club': 'Club / Nightlife',
            'event': 'Corporate Event'
        };
        
        if (typeMap[eventType]) {
            eventTypeSelect.value = typeMap[eventType];
        }
    }
    
    // ==========================================================================
    // Contact Form - Resend Integration
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.textContent = 'SENDING...';
            formStatus.textContent = '';
            formStatus.className = 'form-status';
            
            // Gather form data
            const formData = {
                event_date: document.getElementById('event_date').value,
                first_name: document.getElementById('first_name').value,
                last_name: document.getElementById('last_name').value,
                organization: document.getElementById('organization').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                price_range: document.getElementById('price_range').value,
                event_type: document.getElementById('event_type').value,
                notes: document.getElementById('notes').value
            };
            
            try {
                // ============================================================
                // RESEND API CALL
                // Replace '/api/contact' with your actual Resend API endpoint
                // You'll need to set up a serverless function or API route
                // ============================================================
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully! We\'ll be in touch soon.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                formStatus.textContent = 'Sorry, there was an error sending your message. Please try again or email us directly.';
                formStatus.className = 'form-status error';
            }
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    }
    
});


/* ==========================================================================
   RESEND API ROUTE EXAMPLE (for Next.js / Vercel)
   
   Create a file at /api/contact.js or /app/api/contact/route.js:
   
   ----------------------------------------------------------------------------
   
   // For Next.js App Router (/app/api/contact/route.js)
   
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   export async function POST(request) {
       const data = await request.json();
       
       try {
           await resend.emails.send({
               from: 'bookings@marcmyskillz.com',
               to: 'your-email@example.com',
               subject: `New Booking Request: ${data.event_type}`,
               html: `
                   <h2>New Booking Request</h2>
                   <p><strong>Event Date:</strong> ${data.event_date}</p>
                   <p><strong>Name:</strong> ${data.first_name} ${data.last_name}</p>
                   <p><strong>Organization:</strong> ${data.organization || 'N/A'}</p>
                   <p><strong>Email:</strong> ${data.email}</p>
                   <p><strong>Phone:</strong> ${data.phone}</p>
                   <p><strong>Price Range:</strong> ${data.price_range}</p>
                   <p><strong>Event Type:</strong> ${data.event_type}</p>
                   <p><strong>Notes:</strong> ${data.notes || 'None'}</p>
               `
           });
           
           return Response.json({ success: true });
       } catch (error) {
           return Response.json({ error: error.message }, { status: 500 });
       }
   }
   
   ========================================================================== */
