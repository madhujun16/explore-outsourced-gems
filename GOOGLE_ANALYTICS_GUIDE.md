# Google Analytics Integration Guide

This guide explains how to use the Google Analytics integration in your NovalSquad application to track page visits and user interactions.

## Overview

Your application now has comprehensive Google Analytics tracking that automatically tracks:
- Page views when users navigate between routes
- Form submissions (success and failures)
- Button clicks and user interactions
- Custom events and conversions

## Configuration

### Google Analytics Setup
Your Google Analytics is configured with tracking ID: `G-BEBSCERBB3`

The tracking code is already included in your `index.html` file and will automatically track basic page views.

## Automatic Page Tracking

Page views are automatically tracked when users navigate between routes in your React application. This is handled by the `GoogleAnalyticsProvider` component that wraps your entire app.

### What gets tracked automatically:
- Page path (e.g., `/contact`, `/about`)
- Page title
- Full URL
- Referrer information

## Manual Event Tracking

You can track custom events throughout your application using the `useGA` hook.

### Basic Usage

```typescript
import { useGA } from '@/components/GoogleAnalyticsProvider';

const MyComponent = () => {
  const ga = useGA();

  const handleButtonClick = () => {
    ga.trackButtonClick('cta_button', 'homepage_hero');
    // Your button logic here
  };

  return (
    <button onClick={handleButtonClick}>
      Click Me
    </button>
  );
};
```

## Available Tracking Methods

### 1. Form Submissions
```typescript
// Track successful form submission
ga.trackFormSubmission('contact_form', true);

// Track failed form submission
ga.trackFormSubmission('contact_form', false);
```

### 2. Button Clicks
```typescript
ga.trackButtonClick('button_name', 'location_on_page');
```

### 3. Custom Events
```typescript
ga.trackEvent('event_name', {
  custom_parameter: 'value',
  another_parameter: 123
});
```

### 4. Conversions
```typescript
ga.trackConversion('conversion_id', {
  value: 100,
  currency: 'USD'
});
```

### 5. File Downloads
```typescript
ga.trackFileDownload('brochure.pdf', 'pdf');
```

### 6. Outbound Links
```typescript
ga.trackOutboundLink('https://external-site.com', 'External Link Text');
```

### 7. Video Interactions
```typescript
ga.trackVideoPlay('Product Demo Video', 120); // 120 seconds duration
```

### 8. Search Tracking
```typescript
ga.trackSearch('search term', 15); // 15 results found
```

## Real-World Examples

### Contact Form Tracking
```typescript
const handleSubmit = async (formData) => {
  try {
    await submitForm(formData);
    
    // Track successful submission
    ga.trackFormSubmission('contact_form', true);
    ga.trackEvent('form_submit', {
      form_name: 'contact_form',
      company_name: formData.company_name,
      industry: formData.industry,
      success: true
    });
    
  } catch (error) {
    // Track failed submission
    ga.trackFormSubmission('contact_form', false);
    ga.trackEvent('form_error', {
      form_name: 'contact_form',
      error_message: error.message,
      success: false
    });
  }
};
```

### Navigation Tracking
```typescript
const handleNavigation = (destination) => {
  ga.trackButtonClick(`nav_${destination}`, 'main_navigation');
  navigate(destination);
};
```

### CTA Button Tracking
```typescript
const handleCTAClick = () => {
  ga.trackButtonClick('get_started_cta', 'homepage_hero');
  ga.trackEvent('cta_click', {
    cta_location: 'homepage_hero',
    cta_text: 'Get Started Today'
  });
};
```

## Viewing Analytics Data

### In Google Analytics Dashboard:
1. Go to [Google Analytics](https://analytics.google.com)
2. Select your property (G-BEBSCERBB3)
3. Navigate to **Reports** > **Realtime** to see live data
4. Check **Reports** > **Engagement** > **Pages and screens** for page view data
5. View **Reports** > **Engagement** > **Events** for custom event tracking

### Key Reports to Monitor:
- **Pages and screens**: See which pages users visit most
- **Events**: Track form submissions, button clicks, and custom interactions
- **Conversions**: Monitor goal completions and conversion events
- **User acquisition**: Understand how users find your site

## Debug Mode

The integration includes console logging for debugging. In development, you'll see logs like:
```
GA Page View Tracked: { page_path: "/contact", page_title: "Contact Us", page_location: "https://novalsquad.com/contact" }
GA Event Tracked: form_submit { form_name: "contact_form", success: true }
```

## Best Practices

### 1. Consistent Naming
Use consistent naming conventions for events:
- `form_submit`, `form_error` for forms
- `button_click` for button interactions
- `file_download` for downloads

### 2. Meaningful Parameters
Include relevant context in your events:
```typescript
ga.trackEvent('product_view', {
  product_name: 'Virtual Assistant Service',
  product_category: 'BPO Services',
  page_location: 'services_page'
});
```

### 3. Don't Over-Track
Track meaningful interactions, not every minor UI interaction.

### 4. Test Your Tracking
Use the browser's developer tools and Google Analytics Real-time reports to verify tracking is working.

## Privacy Compliance

The tracking implementation respects user privacy:
- No personally identifiable information (PII) is tracked
- Complies with GDPR requirements
- Users can opt-out through browser settings

## Troubleshooting

### Common Issues:

1. **Events not showing up**: Check browser console for errors and verify gtag is loaded
2. **Page views not tracking**: Ensure GoogleAnalyticsProvider wraps your routes
3. **Custom events missing**: Verify you're using the useGA hook correctly

### Debug Steps:
1. Open browser developer tools
2. Check console for GA tracking logs
3. Verify gtag is available: `window.gtag`
4. Check Network tab for analytics requests

## Advanced Features

### Custom Dimensions
You can add custom dimensions to track additional data:
```typescript
ga.trackEvent('page_view', {
  custom_dimension_1: 'user_type',
  custom_dimension_2: 'subscription_level'
});
```

### Enhanced Ecommerce
For tracking purchases and ecommerce events:
```typescript
ga.trackEvent('purchase', {
  transaction_id: 'T12345',
  value: 299.99,
  currency: 'USD',
  items: [{
    item_id: 'virtual_assistant',
    item_name: 'Virtual Assistant Service',
    category: 'BPO Services',
    quantity: 1,
    price: 299.99
  }]
});
```

## Support

For questions about Google Analytics integration:
1. Check the console logs for debugging information
2. Verify your tracking ID in `index.html`
3. Test in Google Analytics Real-time reports
4. Review this documentation for implementation examples

Remember: It may take 24-48 hours for data to appear in standard Google Analytics reports, but Real-time reports show data immediately.

