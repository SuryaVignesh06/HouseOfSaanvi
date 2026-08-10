"use client";

import Image from "next/image";
import Link from "next/link";
import { SquigglyLine, OutlineCircle, XMark, VerticalLabel, DottedColumn, AccentLine } from "@/components/ui/LineArt";
import DepthCarousel from "@/components/ui/DepthCarousel";

const CAROUSEL_ITEMS = [
  { image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop", alt: "Silk Saree Collection" },
  { image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop", alt: "Royal Lehenga Drapes" },
  { image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop", alt: "Handcrafted Anarkali" },
  { image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop", alt: "Pastel Festive Kurta" },
  { image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop", alt: "Modern Heritage Suit" }
];

export function HeroBanner() {
  return (
    <section className="relative w-full flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 pt-0 pb-0">
      
      {/* Background Line Art & Geometric Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <XMark className="absolute top-[18%] left-[28%]" variant="black" />
        <XMark className="absolute top-[42%] left-[14%]" variant="black" />
        <XMark className="absolute bottom-[12%] left-[24%]" variant="black" />
        <OutlineCircle className="absolute top-[22%] left-[16%] w-8 h-8" variant="black" />
        <OutlineCircle className="absolute top-[48%] left-[36%] w-10 h-10" variant="black" />
        <OutlineCircle className="absolute bottom-[22%] left-[14%] w-8 h-8" variant="black" />
        <SquigglyLine className="absolute top-[22%] left-[8%] h-24" variant="white" />
        <SquigglyLine className="absolute bottom-[18%] left-[10%] h-24" variant="black" />
        <SquigglyLine className="absolute top-[38%] left-[40%] h-24" variant="white" />
        <DottedColumn className="absolute top-[28%] left-[36%]" variant="white" />
        <DottedColumn className="absolute bottom-[32%] left-[39%]" variant="white" />
      </div>

      {/* Far Left: Vertical Caption */}
      <div className="hidden lg:flex flex-col w-[70px] h-full absolute left-4 top-2 bottom-0 items-center justify-center z-30 pointer-events-none">
        <AccentLine variant="black" className="h-[50px] mb-3" />
        <VerticalLabel variant="black" className="mt-0">
          BIG FASHION SALE | SEASON SUMMER 2026
        </VerticalLabel>
      </div>

      {/* Left 48%: Main Model Showcase (Enlarged, Fits bottom edge) */}
      <div className="w-full md:w-[48%] relative h-[45vh] md:h-full min-h-0 z-10 lg:pl-[60px] flex items-end justify-center pb-0">
        <div className="relative w-full h-full flex justify-center md:justify-start items-end">
          <Image 
            src="/hero-image.png" 
            alt="House of Saanvi Hero Showcase" 
            fill 
            priority
            className="object-contain object-bottom origin-bottom transition-none" 
          />
        </div>
      </div>

      {/* Right 52%: Content & Interactive DepthCarousel */}
      <div className="w-full md:w-[52%] flex flex-col justify-between px-[20px] md:pr-[40px] lg:pr-[60px] md:pl-[10px] relative py-2 md:py-4 z-20 h-full">
        
        <div className="flex flex-col max-w-xl self-end text-right my-auto w-full">
          
          {/* Main Title Overlay */}
          <div className="relative mb-2 md:mb-3 flex justify-end">
            <div className="relative inline-block text-left">
              <span className="absolute top-[-10px] md:top-[-4px] lg:top-[2px] -left-6 md:-left-10 font-script text-pure-white text-[75px] md:text-[95px] lg:text-[110px] -rotate-12 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] pointer-events-none z-0 leading-none opacity-95">
                Big
              </span>
              <h1 className="relative font-serif text-[50px] md:text-[70px] lg:text-[84px] uppercase leading-[0.85] tracking-[2px] text-ink-black z-10">
                Fashion<br/>Sale
              </h1>
            </div>
          </div>

          {/* Editorial Paragraph */}
          <p className="font-sans font-normal text-[13px] md:text-[14px] leading-[1.55] text-ink-black/85 max-w-md self-end mb-4 md:mb-5 text-right">
            Fashion is a popular aesthetic expression at a particular time, place and in a specific context, especially in clothing, footwear, lifestyle, accessories, makeup, hairstyle, and body proportions.
          </p>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 mb-3 md:mb-4">
            <Link 
              href="/category/sale" 
              className="inline-flex h-[44px] md:h-[48px] items-center justify-center rounded-[4px] font-sans font-bold text-[13px] tracking-[1.5px] uppercase px-8 border-2 border-ink-black text-ink-black hover:bg-ink-black hover:text-pure-white transition-all shadow-sm"
            >
              BUY NOW!
            </Link>
            <Link 
              href="/category/new-in" 
              className="inline-flex h-[44px] md:h-[48px] items-center justify-center rounded-[4px] font-sans font-bold text-[13px] tracking-[1.5px] uppercase px-8 bg-ink-black text-pure-white hover:bg-ink-black/90 transition-all shadow-sm"
            >
              PRE-ORDER
            </Link>
          </div>

          {/* Right Bottom Corner: DepthCarousel Animation */}
          <div className="w-full h-[210px] md:h-[240px] relative flex justify-end items-end overflow-hidden mt-1">
            <div className="w-[320px] md:w-[380px] h-full relative">
              <DepthCarousel
                items={CAROUSEL_ITEMS}
                depth={160}
                spread={65}
                tilt={16}
                tiltDirection="right"
                perspective={1200}
                visibleCards={3}
                falloff={0.2}
                blur={4}
                autoplay={true}
                loop
                cardWidth={160}
                cardHeight={210}
                radius={16}
                tint="#05060a"
                duration={700}
                ease="power3.out"
                autoplayDelay={3000}
                showControls={false}
                showIndicators={false}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
