'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, ThermometerSun, Euro } from 'lucide-react';

const features = [
  {
    icon: ThermometerSun,
    text: 'Verwarmen & Koelen in één systeem',
  },
  {
    icon: Zap,
    text: 'Energiezuinig & Duurzaam',
  },
  {
    icon: Euro,
    text: 'Bespaar op energiekosten',
  },
];

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-900/90 z-10"></div>
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1631545806609-35d4ae440431?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full mb-6">
              <span className="text-blue-200 font-medium">
                #1 Airco Specialist in Sittard-Geleen
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Slim Verwarmen & Koelen met{' '}
              <span className="text-blue-400">Staycool</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Bespaar op energiekosten met een moderne airco die zowel verwarmt als koelt. 
              Ideaal in combinatie met zonnepanelen voor maximaal rendement.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-6 rounded-full group"
              >
                Gratis Offerte Aanvragen
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={scrollToContact}
                className="bg-white/10 hover:bg-white/20 text-white border-white text-lg px-8 py-6 rounded-full"
              >
                Bereken uw Besparing
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3 bg-white/10 rounded-lg p-4"
                >
                  <feature.icon className="w-6 h-6 text-blue-300" />
                  <span className="text-blue-100 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1628744876497-eb30460be9f6?auto=format&fit=crop&q=80"
                alt="Moderne airconditioning"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}