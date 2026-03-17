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
    const storedAuth = localStorage.getItem("auth");
    const storedToken = localStorage.getItem("token") || localStorage.getItem("accessToken");
    
    if (storedAuth && storedToken) {
      try {
        const authObj = JSON.parse(storedAuth);
        const role = authObj.user?.role || localStorage.getItem("userRole");
        
        if (role === "student") {
          router.replace("/Student");
          return;
        } else if (role === "mentor") {
          router.replace("/mentorHome");
          return;
        } else if (role === "admin") {
          router.replace("/Admin");
          return;
        }
      } catch (e) {
        console.error("Error parsing auth data", e);
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
