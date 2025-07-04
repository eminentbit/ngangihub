import React from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-500"></div>
        <div className="absolute -left-20 top-32 h-40 w-40 rounded-full bg-teal-400"></div>
        <div className="absolute bottom-40 right-10 h-60 w-60 rounded-full bg-yellow-400"></div>
      </div>

      <Container className="relative pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Modern <span className="text-yellow-400">Njangi</span> for the
            Digital Age
          </h1>
          <p className="mb-10 text-lg md:text-xl text-blue-100">
            Streamline your community savings with our powerful SaaS platform.
            Automate contributions, track savings, and build financial security
            together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button type="button" size="lg" className="group" onClick={() => navigate("/about")}>
              Learn More
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-blue-800 group"
              onClick={() => navigate("/njangi-form")}
            >
              Start Your Njangi
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="mt-12 md:mt-16 flex flex-col items-center justify-center">
            {/* <p className="text-sm text-blue-200 mb-3">
              Trusted by growing communities across the globe
            </p> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="h-8 bg-white bg-opacity-20 rounded px-4 flex items-center justify-center text-white font-semibold">
                7+ Groups
              </div>
              <div className="h-8 bg-white bg-opacity-20 rounded px-4 flex items-center justify-center text-white font-semibold">
                10+ Users
              </div>
              <div className="h-8 bg-white bg-opacity-20 rounded px-4 flex items-center justify-center text-white font-semibold">
                1000XAF+ Saved
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
