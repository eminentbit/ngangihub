import HeroSection from "../components/sections/hero";
import Navbar from "../components/navbar";
import CardSection from "../components/sections/card.section";
import Footer from "../components/footer";

export default function WelcomePage() {
  return (
    <div>
      <main className="bg-gray-50">
        <Navbar />
        <HeroSection />
        <CardSection />
      </main>
      <Footer />
    </div>
  );
}
