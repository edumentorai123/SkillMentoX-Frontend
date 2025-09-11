"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import CTA from "./CTA";
import Features from "./Features";
import Hero from "./Hero";
import HowItWorks from "./Howtoworks";
import Mentors from "./Mentors";
import SuccessStories from "./SuccessStories";
import AuthRedirect from "../AuthRedirect/AuthRedirect";



const StudentHome = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: "ease-in-out",
        });
    }, []);

    return (
        <AuthRedirect>
            <main className="bg-white min-h-screen">
                <Hero data-aos="fade-up" />
                <HowItWorks data-aos="fade-up" />
                <Features data-aos="fade-up" />
                <Mentors data-aos="fade-up" />
                <SuccessStories data-aos="fade-up" />
                <CTA data-aos="zoom-in" />
            </main>
        </AuthRedirect>
    );
};

export default StudentHome;
