"use client";

import CTA from "@/Components/CTA/page";
import Footer from "@/Components/Footer/page";
import Hero from "@/Components/Hero/page";
import HowItWorks from "@/Components/HowitWorks/page";
import Mentors from "@/Components/Mentors/page";
import Nav from "@/Components/Navbar/page";
import Features from "@/Components/powefulfeatures/page";
import SuccessStories from "@/Components/SuccessStories/page";
import { useEffect, useRef } from "react";

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".scroll-animation").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Hero heroRef={heroRef} rightSideRef={rightSideRef} />
      <HowItWorks />
      <Features />
      <Mentors />
      <SuccessStories />
      <CTA />
      <Footer />

      <style jsx global>{`
        .animate-fade-in-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

2025-08-11 15:04:58,563 [INFO] xAI.grok.services.chat: assistant: .scroll-animation {
          opacity: 0;
          transform: translateY(20px);
          transition: all 1s ease-out;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;