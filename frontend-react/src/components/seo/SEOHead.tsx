import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  price?: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  propertyData?: {
    title: string;
    description: string;
    price: number;
    location: {
      address: string;
      city: string;
      state: string;
    };
    features: {
      bedrooms?: number;
      bathrooms?: number;
    };
    images: { url: string }[];
    type: string;
  };
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Solid Build Construction Limited Limited',
  description = 'Nigeria\'s premier luxury real estate platform. Find exclusive properties, apartments, and investment opportunities across Lagos, Abuja, and major cities.',
  keywords = ['real estate', 'property', 'Nigeria', 'Lagos', 'luxury homes', 'apartments', 'land for sale', 'investment'],
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  price,
  currency = 'NGN',
  availability = 'InStock',
  propertyData
}) => {
  const siteName = 'Solid Build Construction Limited Limited';
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;

  // Generate property schema
  const generatePropertySchema = () => {
    if (!propertyData) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      name: propertyData.title,
      description: propertyData.description,
      url: url,
      image: propertyData.images.map(img => img.url),
      offers: {
        '@type': 'Offer',
        price: propertyData.price,
        priceCurrency: 'NGN',
        availability: `https://schema.org/${availability}`
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: propertyData.location.address,
        addressLocality: propertyData.location.city,
        addressRegion: propertyData.location.state,
        addressCountry: 'NG'
      },
      numberOfRooms: propertyData.features.bedrooms,
      numberOfBathroomsTotal: propertyData.features.bathrooms
    };
  };

  // Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Solid Build Construction Limited Limited',
    url: 'https://Solid Buildproperty.com',
    logo: 'https://Solid Buildproperty.com/logo.png',
    description: 'Premier luxury real estate company in Nigeria',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lagos',
      addressCountry: 'NG'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234-XXX-XXX-XXXX',
      contactType: 'customer service'
    },
    sameAs: [
      'https://facebook.com/Solid Buildproperty',
      'https://twitter.com/Solid Buildproperty',
      'https://instagram.com/Solid Buildproperty'
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Solid Build Construction Limited Limited" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_NG" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Price meta for products/properties */}
      {price && (
        <>
          <meta property="product:price:amount" content={price.toString()} />
          <meta property="product:price:currency" content={currency} />
        </>
      )}

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {propertyData && (
        <script type="application/ld+json">
          {JSON.stringify(generatePropertySchema())}
        </script>
      )}

      {/* Additional meta tags for Nigerian market */}
      <meta name="geo.region" content="NG" />
      <meta name="geo.placename" content="Lagos, Nigeria" />
      <meta name="language" content="English" />
    </Helmet>
  );
};

export default SEOHead;
