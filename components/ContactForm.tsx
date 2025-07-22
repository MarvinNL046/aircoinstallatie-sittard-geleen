'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { sendEmail, trackFormSubmission, trackPixelFormSubmission } from '@/lib/email';

const formSchema = z.object({
  name: z.string().min(2, 'Naam is verplicht'),
  email: z.string().email('Ongeldig e-mailadres'),
  phone: z.string().min(10, 'Ongeldig telefoonnummer'),
  city: z.string().optional(),
  message: z.string().min(10, 'Bericht is te kort'),
});

type FormData = z.infer<typeof formSchema>;


interface ContactFormProps {
  title?: string;
  subtitle?: string;
  showCityField?: boolean;
  redirectUrl?: string;
  formType?: string;
}

export default function ContactForm({ 
  title = "Contact opnemen",
  subtitle = "Vul het formulier in en wij nemen binnen 24 uur contact met u op.",
  showCityField = false,
  redirectUrl = "/bedankt",
  formType = "contact_form"
}: ContactFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      await sendEmail({
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        message: data.message,
      }, formType);

      // Track successful submission
      trackFormSubmission(formType, true);
      trackPixelFormSubmission(formType, true);

      toast({
        title: "Aanvraag verzonden!",
        description: "We nemen zo spoedig mogelijk contact met u op.",
      });
      reset();
      
      // Redirect after delay if specified
      if (redirectUrl && redirectUrl !== '/bedankt') {
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Track failed submission
      trackFormSubmission(formType, false);
      trackPixelFormSubmission(formType, false);
      
      toast({
        title: "Er is iets misgegaan",
        description: "Probeer het later opnieuw of neem telefonisch contact op.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>}
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          placeholder="Uw naam"
          {...register('name')}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input
          type="email"
          placeholder="E-mailadres"
          {...register('email')}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          type="tel"
          placeholder="Telefoonnummer"
          {...register('phone')}
          className={errors.phone ? 'border-red-500' : ''}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {showCityField && (
        <div>
          <Input
            placeholder="Woonplaats"
            {...register('city')}
            className={errors.city ? 'border-red-500' : ''}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
      )}

      <div>
        <Textarea
          placeholder="Uw bericht"
          {...register('message')}
          className={errors.message ? 'border-red-500' : ''}
          rows={4}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Verzenden...' : 'Verstuur Aanvraag'}
      </Button>
    </form>
    </div>
  );
}
