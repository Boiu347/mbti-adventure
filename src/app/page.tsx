import Hero from "@/components/landing/Hero";
import Particles from "@/components/landing/Particles";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#050510] via-[#0a0a2e] to-[#050510]">
      <Particles />
      <Hero />
    </main>
  );
}
