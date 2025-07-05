import React, { useState, useEffect } from 'react';
import { FaPlay, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import 'animate.css/animate.min.css';

const winterDonationSlides = [
  {
    img: "https://i.postimg.cc/mg9Y3QgV/winter-coat-drive.avif",
    tagline: "Welcome to Donat Charity",
    title1: "Give Hope For Homeless",
    title2: "Helping Each Other Can Make World Better",
    button1: "Discover Now",
    button2: "Watch Video"
  },
  {
    img: "https://i.postimg.cc/qBQjgXN3/Chat-GPT-Image-Jun-27-2025-07-48-03-PM.png",
    tagline: "Coats for Kids",
    title1: "Help Children Stay Warm",
    title2: "Support Winter Smiles",
    button1: "Donate Children's Coats",
    button2: "View Stories"
  },
  {
    img: "https://i.postimg.cc/52Q3PhnB/Flux-Dev-A-rustic-wooden-chest-overflowing-with-a-colorful-ass-0.jpg",
    tagline: "Blanket Collection",
    title1: "Warm Hearts",
    title2: "One Blanket at a Time",
    button1: "Donate Blankets",
    button2: "Our Locations"
  },
  {
    img: "https://i.postimg.cc/BQ6NFLFw/Flux-Dev-A-bustling-volunteer-group-consisting-of-people-of-di-0.jpg",
    tagline: "Volunteers Needed",
    title1: "Be The Change",
    title2: "Join Our Volunteer Team",
    button1: "Sign Up",
    button2: "Learn More"
  },
  {
    img: "https://i.postimg.cc/65mcfWL6/Flux-Dev-A-worn-and-weary-homeless-person-with-a-gaunt-face-su-1.jpg",
    tagline: "Winter Outreach",
    title1: "Deliver Warmth",
    title2: "To Those Who Need It Most",
    button1: "Donate Essentials",
    button2: "See Our Work"
  }
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % winterDonationSlides.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % winterDonationSlides.length);
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + winterDonationSlides.length) % winterDonationSlides.length);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <div className="relative w-full h-[90vh] min-h-[600px] overflow-hidden">
      {winterDonationSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img src={slide.img} alt={slide.title1} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className={`text-center text-white px-6 animate__animated ${index === currentSlide ? 'animate__fadeInUp' : ''}`}>
              <p className="text-yellow-400 text-lg font-semibold italic mb-3 underdog">
                —--- {slide.tagline} ---—
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow mb-2">
                {slide.title1}
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow mb-6">
                {slide.title2}
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <button className="bg-cyan-600 hover:bg-yellow-400 text-white px-6 py-3 rounded-full font-medium text-lg flex items-center gap-2 shadow">
                  {slide.button1} <FaArrowRight />
                </button>
                <button className="bg-yellow-400 hover:bg-cyan-600 px-6 py-3 rounded-full font-medium text-lg flex items-center gap-2 shadow">
                  <FaPlay /> {slide.button2}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full z-20 transition"
        aria-label="Previous slide"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full z-20 transition"
        aria-label="Next slide"
      >
        <FaArrowRight />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {winterDonationSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              resetAutoPlay();
            }}
            className={`w-3 h-3 rounded-full transition ${index === currentSlide ? 'bg-yellow-400' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
