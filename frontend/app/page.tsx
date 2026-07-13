import { HeroSection } from "@/components/hero-section"
import { SignalsSection } from "@/components/signals-section"
import { WorkSection } from "@/components/work-section"
import { PrinciplesSection } from "@/components/principles-section"
import { ColophonSection } from "@/components/colophon-section"
import { SideNav } from "@/components/side-nav"
import { AppGeneratorSection } from "@/components/generate/AppGeneratorSection"
import { UsedBySection, WhyLeetWriteSection, FAQSection } from "@/components/marketing-sections"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        <HeroSection />
        <UsedBySection />
        <AppGeneratorSection />
        <SignalsSection />
        <WhyLeetWriteSection />
        <WorkSection />
        <PrinciplesSection />
        <FAQSection />
        <ColophonSection />
      </div>
    </main>
  )
}
