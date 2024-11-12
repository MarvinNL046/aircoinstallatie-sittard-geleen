import { Thermometer, Wind, Leaf, Shield, ThumbsUp, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ContactForm from '@/components/ContactForm';
import Benefits from '@/components/Benefits';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Schema from '@/components/Schema';

export default function Home() {
  return (
    <>
      <Schema />
      <main className="min-h-screen">
        <Hero />
        <Benefits />
        <Features />
        <Testimonials />
        
        <section id="contact" className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Vraag een Gratis Offerte Aan
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <p>Staycool Airconditioning</p>
              <p>Tel: 06-36481054</p>
              <p>Email: info@staycoolairco.nl</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Service Gebied</h3>
              <p>Sittard-Geleen en omgeving</p>
              <p>Zuid-Limburg</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Openingstijden</h3>
              <p>Ma-Vr: 08:00 - 17:00</p>
              <p>Za: Op afspraak</p>
              <p>Zo: Gesloten</p>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} Staycool Airconditioning. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </>
  );
}