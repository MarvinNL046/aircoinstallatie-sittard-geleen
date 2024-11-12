import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Staycool Airconditioning | Professionele Airco Installatie Sittard-Geleen',
  description: 'Specialist in airconditioning installatie in Sittard-Geleen. Energiezuinige aircosystemen met warmtepompfunctie voor optimaal comfort. Bespaar op energiekosten met zonnepanelen. Vraag nu een gratis offerte aan!',
  keywords: [
    'airco Sittard-Geleen',
    'airconditioning Sittard-Geleen',
    'airco installatie',
    'airco onderhoud',
    'klimaatbeheersing',
    'Limburg',
    'Airco installatie Limburg',
    'Airconditioning Limburg',
    'Airco specialist Limburg',
    'Warmtepomp installatie Limburg',
    'Duurzame koeling Limburg',
    'Energiezuinige airco Limburg',
    'Split-unit airco Limburg',
    'Multi-split airco systemen Limburg',
    'Airco met warmtepompfunctie Limburg',
    'Airco met wifi-bediening Limburg',
    'Geluidsarme airco Limburg',
    'Airco met luchtzuivering Limburg',
    'Airco voor slaapkamer Limburg',
    'Airco voor kantoor Limburg',
    'Airco onderhoud contract Limburg',
    'Zonnepanelen airco combinatie',
    'Duurzame verwarming airco',
    'Energiebesparing airconditioning'
  ],
  openGraph: {
    title: 'Staycool Airconditioning | Professionele Airco Installatie',
    description: 'Specialist in airconditioning installatie in Sittard-Geleen. Energiezuinige aircosystemen met warmtepompfunctie voor optimaal comfort.',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://aircoinstallatie-sittard-geleen.nl',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1631545806609-35d4ae440431?auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'Staycool Airconditioning Installatie'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staycool Airconditioning | Airco Specialist Sittard-Geleen',
    description: 'Specialist in energiezuinige airconditioning installatie. Verwarmen & koelen met één systeem.',
    images: ['https://images.unsplash.com/photo-1631545806609-35d4ae440431?auto=format&fit=crop&q=80']
  },
  alternates: {
    canonical: 'https://aircoinstallatie-sittard-geleen.nl'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1d4ed8" />
        <link rel="canonical" href="https://aircoinstallatie-sittard-geleen.nl" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}