import React from 'react';
import Container from '../components/Container';
import PricingTier from '../components/PricingTier';

const Pricing: React.FC = () => {
  const pricingTiers = [
    {
      title: 'Starter',
      price: '$19',
      description: 'Perfect for small community groups',
      features: [
        'Up to 15 members per group',
        '1 active Njangi group',
        'Basic reporting',
        'Email notifications',
        'Standard security',
      ],
      recommended: false,
      ctaText: 'Get Started',
    },
    {
      title: 'Pro',
      price: '$49',
      description: 'For growing communities with multiple groups',
      features: [
        'Up to 50 members per group',
        '3 active Njangi groups',
        'Advanced reporting & analytics',
        'Email & SMS notifications',
        'Enhanced security',
        'Payment reminders',
        'Group chat',
      ],
      recommended: true,
      ctaText: 'Get Started',
    },
    {
      title: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations and institutions',
      features: [
        'Unlimited members',
        'Unlimited Njangi groups',
        'Custom reporting',
        'Priority support',
        'Advanced security',
        'API access',
        'Custom integration',
        'Dedicated account manager',
      ],
      recommended: false,
      ctaText: 'Contact Sales',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that's right for your community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <PricingTier
              key={index}
              title={tier.title}
              price={tier.price}
              description={tier.description}
              features={tier.features}
              recommended={tier.recommended}
              ctaText={tier.ctaText}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Pricing;