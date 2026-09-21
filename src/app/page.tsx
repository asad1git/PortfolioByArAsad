import { BootSequence } from "@/components/boot/BootSequence";
import { Hero } from "@/components/hero/Hero";
import { Identity } from "@/components/identity/Identity";
import { Philosophy } from "@/components/philosophy/Philosophy";
import { TechCore } from "@/components/tech/TechCore";
import { Projects } from "@/components/projects/Projects";
import { Lab } from "@/components/lab/Lab";
import { Timeline } from "@/components/timeline/Timeline";
import { Contact } from "@/components/contact/Contact";
import { SystemShutdown } from "@/components/shutdown/SystemShutdown";

export default function Home() {
  return (
    <>
      <BootSequence />
      <Hero />
      <Identity />
      <Philosophy />
      <TechCore />
      <Projects />
      <Lab />
      <Timeline />
      <Contact />
      <SystemShutdown />
    </>
  );
}
