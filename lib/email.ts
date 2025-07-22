import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

// Webhook configuration
const WEBHOOK_URL = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL || "https://services.leadconnectorhq.com/hooks/k90zUH3RgEQLfj7Yc55b/webhook-trigger/54670718-ea44-43a1-a81a-680ab3d5f67f";

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_1rruujp';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_rkcpzhg';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'sjJ8kK6U9wFjY0zX9';

// Debug mode for troubleshooting
const DEBUG_MODE = false;

// Analytics configuration
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

// Email data interface
export interface EmailData {
  name: string;
  email: string;
  phone: string;
  city?: string;
  message: string;
}

// Send data to GoHighLevel webhook
const sendToWebhook = async (data: EmailData): Promise<boolean> => {
  try {
    const webhookData = {
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city || '',
        message: data.message
      }
    };

    if (DEBUG_MODE) {
      console.log('Sending to webhook:', webhookData);
    }

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(webhookData)
    });

    if (!response.ok) {
      if (DEBUG_MODE) {
        console.error('Webhook response not OK:', response.status, response.statusText);
      }
      return false;
    }
    
    if (DEBUG_MODE) {
      console.log('Webhook sent successfully');
    }
    
    return true;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Webhook error:', error);
    }
    return false;
  }
};

// Send via EmailJS
const sendViaEmailJS = async (data: EmailData): Promise<boolean> => {
  try {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      to_name: 'StayCool Airco',
      phone: data.phone,
      message: data.message,
      city: data.city || 'Niet opgegeven'
    };

    if (DEBUG_MODE) {
      console.log('Sending via EmailJS:', templateParams);
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      if (DEBUG_MODE) {
        console.log('EmailJS sent successfully');
      }
      return true;
    }
    
    return false;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('EmailJS error:', error);
    }
    return false;
  }
};

// Main send function that tries both methods
export const sendEmail = async (data: EmailData, formType: string = 'contact'): Promise<void> => {
  const startTime = Date.now();
  
  if (DEBUG_MODE) {
    console.log('📧 Starting dual submission:', data);
  }
  
  // Execute both submissions in parallel
  const [webhookSuccess, emailJSSuccess] = await Promise.all([
    sendToWebhook(data),
    sendViaEmailJS(data)
  ]);
  
  const responseTime = Date.now() - startTime;
  
  if (DEBUG_MODE) {
    console.log('Results - Webhook:', webhookSuccess, 'EmailJS:', emailJSSuccess);
    console.log('Response time:', responseTime, 'ms');
  }
  
  // Track webhook performance
  trackWebhookPerformance(webhookSuccess, responseTime);
  
  // Success if either method succeeds
  if (webhookSuccess || emailJSSuccess) {
    const methods = [];
    if (webhookSuccess) methods.push('GHL Webhook');
    if (emailJSSuccess) methods.push('EmailJS');
    
    if (DEBUG_MODE) {
      console.log(`✅ Form submitted successfully via: ${methods.join(' + ')}`);
    }
    return;
  }
  
  // Both methods failed
  throw new Error('Failed to send contact form data through any available method');
};

// Function for testing webhook only (useful for debugging)
export const sendToWebhookOnly = async (data: EmailData): Promise<void> => {
  const success = await sendToWebhook(data);
  if (!success) {
    throw new Error('Failed to send to webhook');
  }
};

// Analytics tracking helpers
export const trackFormSubmission = (formType: string, success: boolean) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'form_submission', {
      form_type: formType,
      success: success,
      send_to: GA_MEASUREMENT_ID
    });
  }
};

export const trackPixelFormSubmission = (formType: string, success: boolean) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      content_name: formType,
      status: success ? 'completed' : 'failed'
    });
  }
};

// Track webhook performance for monitoring
export const trackWebhookPerformance = (success: boolean, responseTime: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'webhook_performance', {
      success: success,
      response_time: responseTime,
      timestamp: Date.now()
    });
  }
};

// Get webhook URL based on form type (for future expansion)
export const getWebhookURL = (formType?: string) => {
  const webhookMap: Record<string, string> = {
    'contact': WEBHOOK_URL,
    'quote': WEBHOOK_URL,
    'service': WEBHOOK_URL
  };
  return webhookMap[formType || 'contact'] || WEBHOOK_URL;
};