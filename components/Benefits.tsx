'use client';

import { motion } from 'framer-motion';
import { Shield, Leaf, ThumbsUp, Timer, Sun, Snowflake } from 'lucide-react';
import { Card } from '@/components/ui/card';

const benefits = [
  {
    icon: Sun,
    title: 'Zomer & Winter Comfort',
    description: 'Koeling in de zomer én efficiënte verwarming in de winter',
  },
  {
    icon: Leaf,
    title: 'Energiebesparing',
    description: 'Optimaal gebruik van uw zonnepanelen, lagere terugleverkosten',
  },
  {
    icon: Shield,
    title: 'Gecertificeerd Installateur',
    description: 'Erkend en gecertificeerd voor professionele installaties',
  },
  {
    icon: Snowflake,
    title: 'Duurzame Oplossing',
    description: 'Milieuvriendelijk alternatief voor traditionele verwarming',
  },
];

export default function Benefits() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Maximaal Rendement uit Uw Investering</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bespaar op energiekosten en benut uw zonnepanelen optimaal
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <benefit.icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}