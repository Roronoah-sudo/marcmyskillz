# Marc My Skillz - DJ Website

Website matching the Nick Spinelli template design.

## Pages
- **Home** - Full-screen hero, bio, booking cards
- **Events** - Event listings with date badges
- **Contact** - Booking form (Resend integration)

## Quick Start

### 1. Add Images
Add these to `/assets`:
- `hero-marc.png` ✓ (included)
- `wedding.jpg` - Wedding booking card
- `club.jpg` - Club booking card  
- `event.jpg` - Special event card
- `venue1.jpg`, `venue2.jpg`, `venue3.jpg` - Event listings

### 2. Set Up Resend for Contact Form

Since you're using Resend, you'll need a serverless function. Here's how:

**Option A: Vercel (Recommended)**

1. Deploy to Vercel
2. Create `/api/contact.js`:

```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const data = req.body;

    try {
        await resend.emails.send({
            from: 'Marc My Skillz <bookings@yourdomain.com>',
            to: 'your-email@example.com',
            subject: `New Booking: ${data.event_type} - ${data.first_name} ${data.last_name}`,
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

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
```

3. Add `RESEND_API_KEY` to Vercel environment variables

**Option B: Cloudflare Workers**

Create a Worker that handles the `/api/contact` endpoint with Resend.

### 3. Update Contact Email

In `contact.html`, update:
```html
<a href="mailto:bookings@marcmyskillz.com">bookings@marcmyskillz.com</a>
```

### 4. Update Events

Edit `events.html` with real upcoming events.

## Deploy

**GitHub Pages** - Won't work with Resend (no serverless functions)

**Vercel** - Recommended for Resend integration
1. Push to GitHub
2. Import to Vercel
3. Add RESEND_API_KEY env variable

**Netlify** - Use Netlify Functions for Resend

## Social Links

Already set to:
- Instagram: @marcmyskillz
- TikTok: @marcmyskillz
- SoundCloud: marcmyskillz
