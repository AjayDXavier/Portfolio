"use client";
import Head from "next/head";
import dynamic from "next/dynamic";

// Components
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

// Dynamic import for StarTrails
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

      {/* ✅ Scroll-linked Star Trails */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <StarTrails />
      </div>

      {/* Content */}
      <Navbar />
      <main className="pt-14 relative z-10">
        <section className="min-h-screen flex items-center justify-center">
          <Hero />
        </section>

        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
