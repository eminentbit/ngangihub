import React from 'react';
import Container from '../components/Container';
import Button from '../components/Button';

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-blue-700 text-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Community Savings?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of groups already using NAAS to manage their Njangi more efficiently.
            Get started with a 14-day free trial.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="text-blue-700 bg-blue-800"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-blue-800"
            >
              Start Your Njangi
            </Button>
          </div>
          <p className="mt-6 text-blue-200 text-sm">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default CTA;