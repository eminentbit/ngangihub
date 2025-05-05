import Header from './section.welcome.page/Header';
import Hero from './section.welcome.page/Hero';
import Features from './section.welcome.page/Features';
import HowItWorks from './section.welcome.page/HowItWorks';
import Pricing from './section.welcome.page/Pricing';
import Testimonials from './section.welcome.page/Testimonials';
import FAQ from './section.welcome.page/FAQ';
import CTA from './section.welcome.page/CTA';
import Footer from './section.welcome.page/Footer';

function App() {
  return (
    <div className="font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;