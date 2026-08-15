// File: E:\quintos_ai\app\(marketing)\page.tsx

import Hero from "@/components/marketing/hero/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import Features from "@/components/sections/Features";
import Services from "@/components/marketing/services/Services";
import Products from "@/components/marketing/products/Products";
import Research from "@/components/marketing/research/Research";
import Testimonials from "@/components/marketing/testimonials/Testimonials";
import FAQ from "@/components/marketing/faq/FAQ";
import ContactForm from "@/components/marketing/contact/ContactForm";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Features />
      <Services />
      <Products />
      <Research />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <CTA />
    </>
  );
}
