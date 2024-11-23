'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Naam is verplicht'),
  email: z.string().email('Ongeldig e-mailadres'),
  phone: z.string().min(10, 'Ongeldig telefoonnummer'),
  message: z.string().min(10, 'Bericht is te kort'),
});

type FormData = z.infer<typeof formSchema>;

type EmailJSTemplateParams = {
  [key: string]: unknown;
  from_name: string;
  from_email: string;
  to_name: string;
  phone: string;
  message: string;
};

const SERVICE_ID = 'service_1rruujp';
const TEMPLATE_ID = 'template_rkcpzhg';
const PUBLIC_KEY = 'sjJ8kK6U9wFjY0zX9';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

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
      const templateParams: EmailJSTemplateParams = {
        from_name: data.name,
        from_email: data.email,
        to_name: 'Staycool Airconditioning',
        phone: data.phone,
        message: data.message,
      };

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        toast({
          title: "Aanvraag verzonden!",
          description: "We nemen zo spoedig mogelijk contact met u op.",
        });
        reset();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
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
  );
}
