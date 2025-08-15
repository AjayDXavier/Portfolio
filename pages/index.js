"use client";
import Head from "next/head";
import dynamic from "next/dynamic";

// Components (all default exports)
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

// Dynamic import for StarTrails (disable SSR)
const StarTrails = dynamic(() => import("../components/StarTrails"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Ajay Domnic Xavier — Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Ajay Domnic Xavier: AI/ML, Web, and 3D experiences."
        />
      </Head>

      {/* Star Trails Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
        <StarTrails />
      </div>

      <Navbar />
      <main className="pt-14">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
