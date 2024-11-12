export default function Schema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Staycool Airconditioning',
    description: 'Specialist in energiezuinige airconditioning installatie in Sittard-Geleen. Verwarmen & koelen met één systeem, ideaal in combinatie met zonnepanelen.',
    image: 'https://images.unsplash.com/photo-1631545806609-35d4ae440431?auto=format&fit=crop&q=80',
    '@id': 'https://aircoinstallatie-sittard-geleen.nl',
    url: 'https://aircoinstallatie-sittard-geleen.nl',
    telephone: '0636481054',
    email: 'info@staycoolairco.nl',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sittard-Geleen',
      addressRegion: 'Limburg',
      addressCountry: 'NL'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.9982,
      longitude: 5.8303
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '08:00',
        closes: '17:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00'
      }
    ],
    priceRange: '€€',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 50.9982,
        longitude: 5.8303
      },
      geoRadius: '30000'
    },
    sameAs: [
      'https://www.facebook.com/staycoolairco',
      'https://www.instagram.com/staycoolairco'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Airconditioning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Airco Installatie',
            description: 'Professionele installatie van energiezuinige airconditioningsystemen'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Warmtepomp Functie',
            description: 'Efficiënt verwarmen in de winter met warmtepompfunctie'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Onderhoud & Service',
            description: 'Regelmatig onderhoud en service voor optimale prestaties'
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}