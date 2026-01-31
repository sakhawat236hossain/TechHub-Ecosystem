import AdSection from "@/components/HomePage/AdSection/AdSection";
import FeaturedCategories from "@/components/HomePage/FeaturedCategories/FeaturedCategories";
import HeroSection from "@/components/HomePage/HeroSection/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto">
        <FeaturedCategories />
        <AdSection></AdSection>
      </div>
    </main>
  );
}