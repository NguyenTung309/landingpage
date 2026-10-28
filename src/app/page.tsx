import Header from "@/components/Header"
import Hero from "@/components/Hero"
import ProcessSteps from "@/components/ProcessSteps"
import Features from "@/components/Features"
import RegistrationSection from "@/components/RegistrationSection"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProcessSteps />
      <Features />
      <RegistrationSection />
      <FAQ />
      <Footer />
    </main>
  )
}