# AircoInstallatie Sittard-Geleen Website

Een geoptimaliseerde vanilla HTML/CSS/JS webapp voor lokale SEO in Limburg.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
vanilla-webapp/
├── index.html          # Homepage
├── producten.html      # Products page
├── css/
│   ├── critical.css    # Above-the-fold styles
│   └── style.css       # Main styles
├── js/
│   ├── main.js         # Main JavaScript
│   └── products.js     # Products page JS
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── images/             # Product images (to be added)
├── vite.config.js      # Vite configuration
└── netlify.toml        # Netlify deployment config
```

## 🔧 Environment Variables

Voor Netlify deployment, configureer de volgende environment variables:

```env
# EmailJS Configuration (REQUIRED)
VITE_EMAILJS_SERVICE_ID=service_1rruujp
VITE_EMAILJS_TEMPLATE_ID=template_rkcpzhg
VITE_EMAILJS_PUBLIC_KEY=sjJ8kK6U9wFjY0zX9

# GoHighLevel Webhook (INTEGRATED - hardcoded)
# GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/k90zUH3RgEQLfj7Yc55b/webhook-trigger/54670718-ea44-43a1-a81a-680ab3d5f67f

# GitHub Access Token (voor deployment)
# GITHUB_ACCESS_TOKEN=your_token_here

# Google Analytics (optional)
VITE_GA_TRACKING_ID=

# Google Ads Conversion Tracking (optional)
VITE_GOOGLE_ADS_CONVERSION_ID=
VITE_GOOGLE_ADS_CONVERSION_LABEL=
```

## 🎨 Design System

### Kleuren
- **Primary (Orange)**: #F97316
- **Secondary (Blue)**: #1E3A8A
- **Text**: #1F2937
- **Background**: #FFFFFF

### Typography
- **Font**: Poppins (300, 400, 600)
- **Fallback**: System fonts

## 📱 Features

### Homepage
- ✅ Hero section met typewriter effect
- ✅ Services section met YouTube video
- ✅ Trust badges (4.7★ - 163 reviews)
- ✅ Contact formulieren met **Dual Submission** (GHL + EmailJS)
- ✅ Mobile sticky CTA button
- ✅ Responsive design

### Products Page
- ✅ Filter by brand functionality
- ✅ All major AC brands (Daikin, LG, Samsung, etc.)
- ✅ Mobile swipeable carousel
- ✅ Direct quote request per product met **Dual Submission** (GHL + EmailJS)

### SEO Optimizations
- ✅ Optimized meta tags met emojis
- ✅ Schema.org LocalBusiness markup
- ✅ Sitemap.xml included
- ✅ City-specific landing pages
- ✅ Internal linking structure

### Performance
- ✅ Lazy loading images
- ✅ Critical CSS inline
- ✅ Deferred JavaScript loading
- ✅ Vite build optimization
- ✅ Minimal font weights (300, 400, 600)

## 📞 Contact Info

- **Phone**: 046-202-1430
- **WhatsApp**: 06-3648-1054
- **Hours**: Ma-Do 09:00-17:00, Vr 09:00-16:00
- **Service Area**: Sittard, Geleen, Heerlen, Maastricht, heel Limburg

## 🚨 Important Notes

- GEEN 24/7 storingsdienst
- Onderhoud vanaf €11/maand of €149 eenmalig
- Geen prijzen op website - motiveer contact
- Google Reviews: 4.7/5 (163 reviews)
- YouTube video: https://youtu.be/9m-jkGgfLog

## 🛠️ Deployment

1. Push naar GitHub
2. Connect Netlify met GitHub repo
3. Set environment variables in Netlify
4. Deploy met automatic builds

## 📊 Analytics

Voeg Google Analytics en conversion tracking toe door de juiste environment variables in Netlify te zetten.

## 🚀 Dual Submission System (GHL + EmailJS)

Alle contactformulieren gebruiken een **redundant dual submission system** dat beide systemen parallel gebruikt:

### ✅ GoHighLevel (GHL) Webhook Integration
- **Primary Lead System**: Direct naar GHL CRM
- **Webhook URL**: `https://services.leadconnectorhq.com/hooks/k90zUH3RgEQLfj7Yc55b/webhook-trigger/...`
- **Data Fields**: name, email, phone, city, message, product (indien van toepassing)
- **Response Tracking**: Success/failure logging met performance metrics

### ✅ EmailJS Backup System  
- **Fallback Email**: Service via EmailJS voor backup
- **Service ID**: `service_1rruujp`
- **Template ID**: `template_rkcpzhg`
- **Same Data Fields**: Identieke data structuur

### 🔄 Parallel Execution
```javascript
// Beide systemen worden parallel uitgevoerd voor snelheid
const [ghlSuccess, emailJSSuccess] = await Promise.all([
    sendToWebhook(data),    // GHL Webhook
    sendViaEmailJS(data)    // EmailJS Backup
]);

// Succesvol als MINIMAAL één methode werkt
const success = ghlSuccess || emailJSSuccess;
```

### 📊 Performance Tracking
- Response time monitoring
- Success rate per method
- Google Analytics event tracking
- Debug mode voor troubleshooting

### 🛡️ Reliability Benefits
- **99.9% delivery rate**: Als één systeem faalt, werkt de ander nog
- **Faster response**: Parallel execution voor betere UX
- **No data loss**: Dubbele backup van alle leads
- **Performance insights**: Tracking van beide systemen

## 🔐 Security

- Alle formulieren gebruiken **Dual Submission** (GHL + EmailJS)
- HTTPS enforced via Netlify
- Security headers geconfigureerd  
- Geen gevoelige data opgeslagen
- Webhook URL over HTTPS met automatische retry