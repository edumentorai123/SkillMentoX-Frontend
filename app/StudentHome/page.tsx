import CTA from "./CTA";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import HowItWorks from "./Howtoworks";
import Mentors from "./Mentors";
import Navbar from "./Navbar";
import SuccessStories from "./SuccessStories";

const page = () => {
    return (
        <div className="bg-white min-h-screen">
            <Navbar/>
            <Hero/>
            <HowItWorks/>
            <Features/>
            <Mentors/>
            <SuccessStories/>
            <CTA/>
            <Footer/>
        </div>
    );
}

export default page;