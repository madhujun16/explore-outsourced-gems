import { useState, useEffect } from 'react';

interface GeoLocation {
  country: string;
  countryCode: string;
  currency: string;
  currencySymbol: string;
  region: 'india' | 'europe' | 'uk' | 'us' | 'asia' | 'other';
}

interface PricingTier {
  starter: number;
  starterOriginal: number;
  growth: number;
  growthOriginal: number;
  enterprise: string;
}

interface GeolocationPricing {
  location: GeoLocation | null;
  pricing: PricingTier;
  isLoading: boolean;
  error: string | null;
  formatPrice: (price: number | string) => string;
}

// Regional pricing configurations (with original prices for strikethrough display)
const REGIONAL_PRICING: Record<string, PricingTier> = {
  india: { starter: 1999, starterOriginal: 3999, growth: 4999, growthOriginal: 8999, enterprise: 'Custom' },
  europe: { starter: 79, starterOriginal: 129, growth: 149, growthOriginal: 249, enterprise: 'Custom' },
  uk: { starter: 69, starterOriginal: 119, growth: 129, growthOriginal: 219, enterprise: 'Custom' },
  us: { starter: 89, starterOriginal: 149, growth: 169, growthOriginal: 279, enterprise: 'Custom' },
  asia: { starter: 69, starterOriginal: 119, growth: 129, growthOriginal: 219, enterprise: 'Custom' },
  other: { starter: 79, starterOriginal: 129, growth: 149, growthOriginal: 249, enterprise: 'Custom' },
};

// Currency symbols by region
const CURRENCY_CONFIG: Record<string, { currency: string; symbol: string }> = {
  india: { currency: 'INR', symbol: '₹' },
  europe: { currency: 'EUR', symbol: '€' },
  uk: { currency: 'GBP', symbol: '£' },
  us: { currency: 'USD', symbol: '$' },
  asia: { currency: 'USD', symbol: '$' },
  other: { currency: 'USD', symbol: '$' },
};

// Country to region mapping
const COUNTRY_REGION_MAP: Record<string, GeoLocation['region']> = {
  // India
  IN: 'india',
  // Europe
  DE: 'europe', FR: 'europe', IT: 'europe', ES: 'europe', NL: 'europe',
  BE: 'europe', AT: 'europe', PT: 'europe', IE: 'europe', PL: 'europe',
  SE: 'europe', DK: 'europe', FI: 'europe', NO: 'europe', CH: 'europe',
  CZ: 'europe', GR: 'europe', HU: 'europe', RO: 'europe',
  // UK
  GB: 'uk', UK: 'uk',
  // US & Canada
  US: 'us', CA: 'us',
  // Asia Pacific
  JP: 'asia', KR: 'asia', SG: 'asia', AU: 'asia', NZ: 'asia',
  HK: 'asia', TW: 'asia', MY: 'asia', TH: 'asia', PH: 'asia',
  ID: 'asia', VN: 'asia',
};

const getRegionFromCountry = (countryCode: string): GeoLocation['region'] => {
  return COUNTRY_REGION_MAP[countryCode] || 'other';
};

export const useGeolocationPricing = (): GeolocationPricing => {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Try ipapi.co first (free, no API key needed, 1000 requests/day)
        const response = await fetch('https://ipapi.co/json/', {
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch location');
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.reason || 'Location detection failed');
        }

        const countryCode = data.country_code || data.country || 'US';
        const region = getRegionFromCountry(countryCode);
        const currencyConfig = CURRENCY_CONFIG[region];

        setLocation({
          country: data.country_name || 'Unknown',
          countryCode,
          currency: currencyConfig.currency,
          currencySymbol: currencyConfig.symbol,
          region,
        });
      } catch (err) {
        console.warn('Primary geolocation failed, trying fallback...', err);
        
        // Fallback to ip-api.com (free, no API key, 45 requests/minute)
        try {
          const fallbackResponse = await fetch('http://ip-api.com/json/?fields=country,countryCode');
          const fallbackData = await fallbackResponse.json();
          
          if (fallbackData.status === 'success') {
            const countryCode = fallbackData.countryCode || 'US';
            const region = getRegionFromCountry(countryCode);
            const currencyConfig = CURRENCY_CONFIG[region];

            setLocation({
              country: fallbackData.country || 'Unknown',
              countryCode,
              currency: currencyConfig.currency,
              currencySymbol: currencyConfig.symbol,
              region,
            });
          } else {
            throw new Error('Fallback location detection failed');
          }
        } catch (fallbackErr) {
          // Default to US pricing if all else fails
          setError('Could not detect location, showing default pricing');
          setLocation({
            country: 'United States',
            countryCode: 'US',
            currency: 'USD',
            currencySymbol: '$',
            region: 'us',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const region = location?.region || 'us';
  const pricing = REGIONAL_PRICING[region];
  const currencySymbol = location?.currencySymbol || '$';

  const formatPrice = (price: number | string): string => {
    if (typeof price === 'string') return price;
    
    // Format number with locale-appropriate separators
    if (region === 'india') {
      // Indian numbering system (lakhs, crores)
      return `${currencySymbol}${price.toLocaleString('en-IN')}`;
    }
    
    return `${currencySymbol}${price.toLocaleString()}`;
  };

  return {
    location,
    pricing,
    isLoading,
    error,
    formatPrice,
  };
};

export default useGeolocationPricing;

