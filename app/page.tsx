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


import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter(); 
  const heroRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj.role === "student") {
          router.push("/Student");
          return; // Stop AOS init if redirecting
        }
        // Add other roles if needed
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }

    AOS.init({
      duration: 1000,
      once: true, 
    });
  }, [router]);

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
