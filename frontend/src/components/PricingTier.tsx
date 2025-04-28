import React from 'react';
import { PricingTierProps } from '../types';
import Button from './Button';
import { Check } from 'lucide-react';

const PricingTier: React.FC<PricingTierProps> = ({
  title,
  price,
  description,
  features,
  recommended = false,
  ctaText,
}) => {
  return (
    <div className={`relative flex flex-col p-6 rounded-2xl border ${
      recommended 
        ? 'border-blue-200 bg-blue-50 shadow-md' 
        : 'border-gray-200 bg-white shadow-sm'
    }`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-full bg-blue-700 text-white px-4 py-1 text-sm font-medium">
          Recommended
        </div>
      )}
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-baseline mb-2">
          <span className="text-3xl font-bold text-gray-900">{price}</span>
          {price !== 'Custom' && <span className="ml-1 text-gray-500">/month</span>}
        </div>
      </div>
      <div className="space-y-3 flex-grow mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 text-blue-600">
              <Check size={20} />
            </div>
            <p className="ml-3 text-gray-600">{feature}</p>
          </div>
        ))}
      </div>
      <Button 
        variant={recommended ? 'primary' : 'outline'} 
        fullWidth
      >
        {ctaText}
      </Button>
    </div>
  );
};

export default PricingTier;