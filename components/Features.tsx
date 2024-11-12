'use client';

import { motion } from 'framer-motion';
import { Thermometer, Wind, Sun, Battery } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Slim Verwarmen & Koelen met Airconditioning
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ontdek hoe een moderne airco uw energiekosten verlaagt en comfort verhoogt
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <Sun className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Optimaal Gebruik van Zonnepanelen
                </h3>
                <p className="text-muted-foreground">
                  Verlaag uw terugleverkosten door zelf opgewekte energie direct te gebruiken voor verwarming en koeling. Ideaal in combinatie met zonnepanelen.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Battery className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Energiezuinige Verwarming
                </h3>
                <p className="text-muted-foreground">
                  Tot 4x efficiënter dan traditionele elektrische verwarming. Perfect voor het verwarmen in de winter en besparen op gaskosten.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Thermometer className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Jaar-rond Comfort
                </h3>
                <p className="text-muted-foreground">
                  Eén systeem voor alle seizoenen: aangename koeling in de zomer en efficiënte verwarming in de winter.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-lg overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1628744876497-eb30460be9f6?auto=format&fit=crop&q=80"
              alt="Moderne airconditioning installatie"
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}