import AdSection from "@/components/HomePage/AdSection/AdSection";
import BlogSection from "@/components/HomePage/BlogSection/BlogSection";
import BrandSlider from "@/components/HomePage/BrandSlider/BrandSlider";
import FeaturedCategories from "@/components/HomePage/FeaturedCategories/FeaturedCategories";
import FlashSale from "@/components/HomePage/FlashSale/FlashSale";
import HeroSection from "@/components/HomePage/HeroSection/HeroSection";
import LatestProducts from "@/components/HomePage/LatestProducts/LatestProducts";
import Newsletter from "@/components/HomePage/Newsletter/Newsletter";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs/WhyChooseUs";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Main attraction and call to action */}
      <HeroSection />
      
      {/* Building trust by showing associated brands early */}
      <BrandSlider />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation by categories */}
        <FeaturedCategories />

        {/* High urgency section to drive quick sales */}
        <FlashSale />

        {/* Regular new arrivals */}
        <LatestProducts />

        {/* Promotional banner placement between product grids */}
        <AdSection />

        {/* Value proposition to convince the customer */}
        <WhyChooseUs />

        {/* Engagement and SEO through technical articles */}
        <BlogSection />

        {/* Capturing leads before the user leaves the page */}
        <Newsletter />
      </div>
    </main>
  );
}