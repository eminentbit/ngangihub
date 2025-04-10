import HeroSection from "../components/sections/hero";
import Navbar from "../components/navbar";
import CardSection from "../components/sections/card.section";

export default function WelcomePage() {
  return (
    <main className="bg-gray-50">
      <Navbar />
      <HeroSection />
      <CardSection />
    </main>
  );
}
