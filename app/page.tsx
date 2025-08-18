"use client";
import CTA from "@/Components/landing/cta";
import Hero from "@/Components/landing/Hero";
import Mentors from "@/Components/landing/Mentors";
import Features from "@/Components/landing/powerfulfeatures";
import SuccessStories from "@/Components/landing/SuccessStories";
import { useEffect, useRef } from "react";
import "aos/dist/aos.css";
import AOS from 'aos'
import HowItWorks from "@/Components/landing/Howitworks";


const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, 
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">

      <Hero _heroRef={heroRef} _rightSideRef={rightSideRef} data-aos="fade-up" />
      <HowItWorks data-aos="fade-up" />
      <Features data-aos="fade-up" />
      <Mentors data-aos="fade-up" />
      <SuccessStories data-aos="fade-up" />
      <CTA data-aos="fade-up" />

    </div>
  );
};

export default Home;
