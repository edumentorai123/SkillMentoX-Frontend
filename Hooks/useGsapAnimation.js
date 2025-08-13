"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useGsapAnimation(targetClass = ".fade-up") {
    useEffect(() => {
    gsap.from(targetClass, {
        scrollTrigger: {
        trigger: targetClass,
        start: "top 85%",
        toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
    });
    }, [targetClass]);
}
