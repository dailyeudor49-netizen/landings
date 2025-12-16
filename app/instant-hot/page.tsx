'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Montserrat } from 'next/font/google';
import { ShieldCheck, Zap, Droplets, Thermometer, Wrench, ArrowRight, CheckCircle2, Star, RefreshCw, Leaf, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const testimonials = [
  {
    name: 'Marco Z.',
    source: 'Google',
    rating: 5,
    text: 'Acqua calda subito, senza aspettare. Prima perdevo litri d\'acqua aspettando che arrivasse calda dalla caldaia in garage. Adesso apro e via. Ottimo acquisto.',
    gender: 'M'
  },
  {
    name: 'Giulia B.',
    source: 'Trustpilot',
    rating: 5,
    text: 'Ho la pelle molto delicata e l\'acqua del rubinetto mi seccava le mani. Da quando lo uso sento davvero la differenza, le mani restano morbide anche dopo tanti lavaggi.',
    gender: 'F'
  },
  {
    name: 'Alessandro P.',
    source: 'Amazon',
    rating: 5,
    text: 'Montato in 5 minuti, funziona perfettamente. Il display è comodissimo per vedere la temperatura. E in bolletta non ho notato aumenti, consuma pochissimo.',
    gender: 'M'
  },
  {
    name: 'Francesca M.',
    source: 'Facebook',
    rating: 4,
    text: 'Bello esteticamente e funziona bene. L\'unica cosa è che ci ho messo un po\' a capire come regolare il pH, ma poi è facilissimo. Lo consiglio!',
    gender: 'F'
  },
  {
    name: 'Roberto L.',
    source: 'Feedaty',
    rating: 5,
    text: 'Finalmente posso lavare le verdure con acqua calda senza aspettare mezz\'ora. E lo snodo a 360° è comodissimo per le pentole grandi. Soldi ben spesi.',
    gender: 'M'
  },
  {
    name: 'Sara T.',
    source: 'Google',
    rating: 5,
    text: 'Lo uso da 2 mesi e sono contentissima. L\'acqua esce calda istantaneamente e la pelle delle mani è molto meno secca di prima. Il design poi è bellissimo.',
    gender: 'F'
  },
  {
    name: 'Davide C.',
    source: 'Trustpilot',
    rating: 5,
    text: 'Ero scettico sul montaggio fai-da-te, ma è stato semplicissimo. Si avvita al posto del vecchio rubinetto e in 3 minuti era già funzionante. Top!',
    gender: 'M'
  },
  {
    name: 'Valentina G.',
    source: 'Amazon',
    rating: 5,
    text: 'Regalo perfetto per i miei genitori anziani. Non devono più aspettare l\'acqua calda e il display grande si legge benissimo. Sono felicissimi!',
    gender: 'F'
  },
  {
    name: 'Luca F.',
    source: 'Google',
    rating: 5,
    text: 'Qualità costruttiva ottima, si vede che è acciaio vero. Dopo 4 mesi è ancora perfetto, niente calcare e niente ruggine. Lo ricomprerei subito.',
    gender: 'M'
  },
  {
    name: 'Chiara D.',
    source: 'Feedaty',
    rating: 5,
    text: 'Cercavo qualcosa per non sprecare più acqua aspettando che si scaldasse. Questo rubinetto è la soluzione perfetta. E costa molto meno di quello che pensavo!',
    gender: 'F'
  }
];

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleManualNav = (callback: () => void) => {
    setAutoPlay(false);
    callback();
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <section id="testimonianze" className="py-10 md:py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-8 md:px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-4 uppercase tracking-tight">
            Cosa Dicono i Nostri Clienti
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-base md:text-lg font-bold text-blue-950">4.8</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span className="text-base md:text-lg text-gray-600">2.847 recensioni</span>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl p-6 md:p-10 min-h-[280px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center will-change-transform"
              >
                <Quote className="w-10 h-10 text-teal-600 mb-4 opacity-50" />
                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="font-bold text-blue-950">{testimonials[currentIndex].name}</p>
                <p className="text-sm text-gray-500 mt-1 italic">Tramite <span className="font-bold">{testimonials[currentIndex].source}</span></p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => handleManualNav(prevTestimonial)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-teal-600 transition-colors cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => handleManualNav(nextTestimonial)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-teal-600 transition-colors cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setAutoPlay(false);
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === currentIndex ? 'bg-teal-600 w-6' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          Puoi leggere altre recensioni su Google, Facebook e altre piattaforme che permettano di parlare di noi.
        </p>
      </div>
    </section>
  );
};

export default function LandingPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  const openForm = () => {
    // Seleziona il box giusto in base alla larghezza dello schermo
    const isMobile = window.innerWidth < 1024;
    const element = document.getElementById(isMobile ? 'order-form-mobile' : 'order-form');

    if (element) {
      // Scrolla al box
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Usa IntersectionObserver per aprire il form SOLO quando è visibile
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setFormOpen(true);
          observer.disconnect();
        }
      }, { threshold: 0.8 });

      observer.observe(element);
    } else {
      setFormOpen(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/instant-hot/thank-you');
  };

  const scrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('testimonianze')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Hide sticky CTA when at bottom of page
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 200;
      setShowSticky(!isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading screen
  if (!imageLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60 text-sm">Caricamento...</p>
        </div>
        {/* Preload image */}
        <Image
          src="/images/instant-hot/hero1.jpg"
          alt=""
          width={1}
          height={1}
          priority
          onLoad={() => setImageLoaded(true)}
          className="opacity-0 absolute"
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 text-blue-950 selection:bg-blue-600 selection:text-white ${montserrat.className}`}>

      {/* --- HERO SECTION --- */}
      <header className="relative overflow-hidden bg-white pb-10 lg:pb-0">
        <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/proxy/9r8IQAITiiVc7KPxWCQKahMU2N9x4kDCRGl_IWOoykp5ZHNORYeohNOZrlMu5WVmdqzcn82xl8K53mCczyV4Pj2b5g-6_cmv9YEtUGBV_JlUj56zIp9mTxqRuEC1l3NCpkCdCXzQjhk7ey6GitU_Rw')] bg-cover bg-center z-0 blur-[8px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-950/70 to-blue-900/75 z-[1]"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] opacity-15"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500 rounded-full blur-[100px] opacity-15"></div>
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-cyan-500 rounded-full blur-[80px] opacity-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-green-600 rounded-full blur-[90px] opacity-10"></div>

        <div className="relative z-10 container mx-auto px-4 py-8 lg:py-24">
          {/* Layout Desktop: 2 colonne affiancate */}
          {/* Layout Mobile: Titolo -> Foto -> Bullet points */}
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-16">

            {/* Colonna Sinistra Desktop / Titolo Mobile */}
            <div className="lg:w-1/2 text-white space-y-2 lg:space-y-6 order-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-bold tracking-wide text-blue-100 uppercase shadow-lg">
                <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 fill-yellow-400" /> Offerta Limitata - Ultime Unità
              </div>
              <h1 className="text-3xl lg:text-6xl font-extrabold leading-tight tracking-tight uppercase">
                Acqua <span className="text-orange-500">Calda</span> Istantanea,<br />
                Ovunque Tu Voglia
              </h1>
              <p className="text-lg lg:text-2xl text-yellow-400 font-bold">
                Azzera la Bolletta del Gas. Risparmia il 90% sull'Elettricità. Zero Installazioni.
              </p>
              <a onClick={scrollToReviews} className="flex items-center justify-center lg:justify-start gap-2 hover:opacity-80 transition-opacity cursor-pointer group">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileTap={{ scale: 1.4, rotate: 20 }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Star className="w-4 h-4 lg:w-5 lg:h-5 fill-yellow-400 text-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] transition-all" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm lg:text-base font-bold text-white">4.8</span>
                <span className="text-sm lg:text-base text-slate-300">• 2.847 recensioni verificate</span>
              </a>

              {/* Bullet points - visibili solo su desktop qui */}
              <ul className="hidden lg:block space-y-4 text-slate-200">
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-400 shrink-0" />
                  <span className="text-base lg:text-lg"><strong className="font-extrabold">Elimina completamente</strong> la bolletta del gas per l'acqua calda</span>
                </li>
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-400 shrink-0" />
                  <span className="text-base lg:text-lg"><strong className="font-extrabold">Risparmia il 90%</strong> sui consumi elettrici</span>
                </li>
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-400 shrink-0" />
                  <span className="text-base lg:text-lg">Acqua calda in <strong className="font-extrabold">3 secondi</strong>, ogni volta</span>
                </li>
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-400 shrink-0" />
                  <span className="text-base lg:text-lg"><strong className="font-extrabold">Zero installazioni</strong>, zero idraulici, zero modifiche</span>
                </li>
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-400 shrink-0" />
                  <span className="text-base lg:text-lg"><strong className="font-extrabold">Doccino premium incluso</strong> nella confezione</span>
                </li>
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-400 shrink-0" />
                  <span className="text-base lg:text-lg">Filtra il <strong className="font-extrabold">99% delle impurità</strong> automaticamente</span>
                </li>
              </ul>
            </div>

            {/* Colonna Destra Desktop / Foto Mobile */}
            <div className="lg:w-1/2 relative w-full order-2">
            {/* Immagine Hero Prodotto */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-square group">
                <Image
                  src="/images/instant-hot/hero1.jpg"
                  alt="HydroLux 3.0 - Rubinetto acqua calda istantanea"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8AzTxu2WC/lju5YbsQxlmSOTcN3xeeCOlPHZXVjlCpUjklTSlKlsYFiToY7Jn/2Q=="
                />
                
                {/* Overlay Informativi */}
                <div className="absolute top-3 right-3 lg:top-6 lg:right-6 bg-black/25 backdrop-blur-[2px] text-white p-3 rounded-xl border border-white/10 shadow-lg">
                   <div className="text-xs text-gray-300 uppercase font-bold">Pronto in</div>
                   <div className="text-2xl font-mono font-bold text-yellow-400 flex items-center gap-1">
                     3<span className="text-sm">sec</span> <Zap className="w-4 h-4 text-yellow-400 fill-current animate-pulse"/>
                   </div>
                </div>

                <div className="absolute bottom-3 left-3 lg:bottom-6 lg:left-6 w-[200px] h-[200px] bg-orange-500 blur-[60px] z-[1] rounded-full opacity-60"></div>
                <div className="absolute bottom-3 left-3 lg:bottom-6 lg:left-6 bg-white/50 backdrop-blur-[2px] p-4 rounded-xl shadow-xl max-w-[200px] z-[2]">
                    <div className="flex items-center gap-2 mb-1">
                        <Leaf className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-blue-950 text-sm">Zero Gas</span>
                    </div>
                    <div className="text-xs text-gray-700 leading-tight">Risparmio garantito dal primo utilizzo.</div>
                </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-cyan-500/30 blur-3xl -z-10 rounded-full"></div>

            {/* Box Ultimi Pezzi + Form - DESKTOP */}
            <div id="order-form" className="mt-4 hidden lg:block">
              <motion.div
                layout
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {!formOpen ? (
                    <motion.div
                      key="closed"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-6 py-4"
                    >
                      <div className="text-center text-white text-2xl font-extrabold mb-2">Instant Hot 3.0</div>
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-slate-400 line-through text-lg">€149,00</span>
                        <span className="text-3xl font-bold text-white">€89,90</span>
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-40%</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 sm:gap-4 text-slate-300 text-sm mb-4">
                        <span>Pagamento alla consegna</span>
                        <span className="text-slate-500">•</span>
                        <span>Spedizione in 48h</span>
                        <span className="text-slate-500">•</span>
                        <span>30 giorni di reso</span>
                      </div>
                      <button
                        onClick={openForm}
                        className="cursor-pointer w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-blue-950 font-bold py-4 px-6 rounded-xl shadow-[0_0_25px_rgba(251,191,36,0.4)] transition-all hover:scale-[1.03] flex flex-col items-center justify-center gap-0 animate-soft-pulse"
                      >
                        <span className="flex items-center gap-2 text-xl">ORDINA ORA <ArrowRight className="w-5 h-5" /></span>
                        <span className="text-sm font-medium opacity-80">Offerta Limitata - Paghi alla Consegna</span>
                      </button>
                      <div className="flex items-center justify-center gap-2 text-white font-bold mt-3">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        Ultimi 7 pezzi disponibili
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="px-6 py-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white text-2xl font-extrabold">Instant Hot 3.0</div>
                        <button
                          onClick={() => setFormOpen(false)}
                          className="cursor-pointer text-white/60 hover:text-white transition-colors text-sm"
                        >
                          Chiudi
                        </button>
                      </div>
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-slate-400 line-through text-lg">€149,00</span>
                        <span className="text-3xl font-bold text-white">€89,90</span>
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-40%</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 sm:gap-4 text-slate-300 text-sm mb-4">
                        <span>Pagamento alla consegna</span>
                        <span className="text-slate-500">•</span>
                        <span>Spedizione in 48h</span>
                        <span className="text-slate-500">•</span>
                        <span>30 giorni di reso</span>
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-white text-sm font-medium mb-1">Nome e Cognome</label>
                          <input
                            type="text"
                            placeholder="Mario Rossi"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-white text-sm font-medium mb-1">Numero di Telefono</label>
                          <input
                            type="tel"
                            placeholder="+39 333 1234567"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-white text-sm font-medium mb-1">Indirizzo di Spedizione</label>
                          <input
                            type="text"
                            placeholder="Via Roma 1, 00100 Roma"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors"
                          />
                        </div>
                        <button
                          type="submit"
                          className="cursor-pointer w-full bg-gradient-to-r from-green-800 via-green-600 to-emerald-500 hover:from-green-700 hover:via-green-500 hover:to-emerald-400 text-white font-bold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(22,163,74,0.6)] flex flex-col items-center justify-center gap-0 animate-soft-pulse"
                        >
                          <span className="flex items-center gap-2 text-xl">Conferma Ordine <ArrowRight className="w-5 h-5" /></span>
                          <span className="text-sm font-medium opacity-90">Paghi alla Consegna</span>
                        </button>
                      </form>
                      <div className="flex items-center justify-center gap-2 text-white font-bold mt-3">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        Ultimi 7 pezzi disponibili
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Bullet points - visibili solo su mobile, dopo la foto */}
            <ul className="lg:hidden space-y-4 text-slate-200 order-3 w-full mt-6">
              <li className="flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <span className="text-base"><strong className="font-extrabold">Elimina completamente</strong> la bolletta del gas</span>
              </li>
              <li className="flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <span className="text-base"><strong className="font-extrabold">Risparmia il 90%</strong> sui consumi elettrici</span>
              </li>
              <li className="flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <span className="text-base">Acqua calda in <strong className="font-extrabold">3 secondi</strong></span>
              </li>
              <li className="flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <span className="text-base"><strong className="font-extrabold">Zero installazioni</strong>, zero idraulici</span>
              </li>
              <li className="flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <span className="text-base"><strong className="font-extrabold">Doccino premium</strong> incluso</span>
              </li>
              <li className="flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <span className="text-base">Filtra il <strong className="font-extrabold">99% delle impurità</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

        {/* Box Ultimi Pezzi + Form - MOBILE (in fondo alla hero) */}
        <div id="order-form-mobile" className="lg:hidden relative z-10 container mx-auto px-4 pb-8">
          <motion.div
            layout
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!formOpen ? (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="px-6 py-4"
                >
                  <div className="text-center text-white text-2xl font-extrabold mb-2">Instant Hot 3.0</div>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="text-slate-400 line-through text-lg">€149,00</span>
                    <span className="text-3xl font-bold text-white">€89,90</span>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-40%</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-slate-300 text-sm mb-4">
                    <span>Pagamento alla consegna</span>
                    <span className="text-slate-500">•</span>
                    <span>Spedizione in 48h</span>
                    <span className="text-slate-500">•</span>
                    <span>30 giorni di reso</span>
                  </div>
                  <button
                    onClick={openForm}
                    className="cursor-pointer w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-blue-950 font-bold py-4 px-6 rounded-xl shadow-[0_0_25px_rgba(251,191,36,0.4)] transition-all hover:scale-[1.03] flex flex-col items-center justify-center gap-0 animate-soft-pulse"
                  >
                    <span className="flex items-center gap-2 text-xl">ORDINA ORA <ArrowRight className="w-5 h-5" /></span>
                    <span className="text-sm font-medium opacity-80">Offerta Limitata - Paghi alla Consegna</span>
                  </button>
                  <div className="flex items-center justify-center gap-2 text-white font-bold mt-3">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    Ultimi 7 pezzi disponibili
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="px-6 py-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white text-2xl font-extrabold">Instant Hot 3.0</div>
                    <button
                      onClick={() => setFormOpen(false)}
                      className="cursor-pointer text-white/60 hover:text-white transition-colors text-sm"
                    >
                      Chiudi
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="text-slate-400 line-through text-lg">€149,00</span>
                    <span className="text-3xl font-bold text-white">€89,90</span>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-40%</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-slate-300 text-sm mb-4">
                    <span>Pagamento alla consegna</span>
                    <span className="text-slate-500">•</span>
                    <span>Spedizione in 48h</span>
                    <span className="text-slate-500">•</span>
                    <span>30 giorni di reso</span>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-1">Nome e Cognome</label>
                      <input
                        type="text"
                        placeholder="Mario Rossi"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-1">Numero di Telefono</label>
                      <input
                        type="tel"
                        placeholder="+39 333 1234567"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-1">Indirizzo di Spedizione</label>
                      <input
                        type="text"
                        placeholder="Via Roma 1, 00100 Roma"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="cursor-pointer w-full bg-gradient-to-r from-green-800 via-green-600 to-emerald-500 hover:from-green-700 hover:via-green-500 hover:to-emerald-400 text-white font-bold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(22,163,74,0.6)] flex flex-col items-center justify-center gap-0 animate-soft-pulse"
                    >
                      <span className="flex items-center gap-2 text-xl">Conferma Ordine <ArrowRight className="w-5 h-5" /></span>
                      <span className="text-sm font-medium opacity-90">Paghi alla Consegna</span>
                    </button>
                  </form>
                  <div className="flex items-center justify-center gap-2 text-white font-bold mt-3">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    Ultimi 7 pezzi disponibili
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </header>

      {/* --- TRUST BAR --- */}
      <div className="bg-white border-b border-slate-200 shadow-sm relative z-20">
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap sm:justify-center gap-4 sm:gap-10">

                <TrustBadge
                    icon={<Leaf className="w-6 h-6 text-green-600" />}
                    title="Zero Gas"
                    sub="BOLLETTA ELIMINATA"
                />
                <TrustBadge
                    icon={<Zap className="w-6 h-6 text-yellow-500" />}
                    title="90% Risparmio"
                    sub="CONSUMI ELETTRICI"
                />
                <TrustBadge
                    icon={<Wrench className="w-6 h-6 text-gray-700" />}
                    title="Zero Installazione"
                    sub="FAI DA TE IN 2 MIN"
                />
                <TrustBadge
                    icon={<ShieldCheck className="w-6 h-6 text-blue-700" />}
                    title="Garanzia 2 Anni"
                    sub="RESO 30 GIORNI"
                />

            </div>
        </div>
      </div>

      {/* --- BENEFICI PRINCIPALI (con immagini) --- */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-950 mb-4 uppercase tracking-tight">Perché Instant Hot Cambierà La Tua Vita</h2>
            <p className="text-gray-700 text-lg">
              Non è solo un elettrodomestico. È la soluzione definitiva per avere acqua calda dove e quando vuoi, senza sprechi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ImgBenefitCard
              img="/images/instant-hot/6x1.jpg"
              title="Risparmio Totale sul Gas"
              desc="Elimina completamente la bolletta del gas per l'acqua calda. E risparmia il 90% anche sui consumi elettrici. Solo l'acqua che usi, quando la usi."
            />
            <ImgBenefitCard
              img="/images/instant-hot/6x2.jpg"
              title="Acqua Calda in 3 Secondi"
              desc="Niente più attese infinite davanti al lavandino. Apri il rubinetto e l'acqua è già calda. Istantaneamente. Ogni volta."
            />
            <ImgBenefitCard
              img="/images/instant-hot/6x3.jpg"
              title="Zero Installazioni"
              desc="Collegalo a qualsiasi tubo o lavandino in 2 minuti. Non serve l'idraulico, non serve modificare l'impianto. Plug & Play."
            />
            <ImgBenefitCard
              img="/images/instant-hot/6x4.jpg"
              title="Doccino Incluso Gratis"
              desc="Trasforma qualsiasi lavandino in una mini-doccia portatile. Perfetto per lavare i capelli o fare il bagno ai bambini."
            />
            <ImgBenefitCard
              img="/images/instant-hot/6x5.jpg"
              title="Funziona con Vecchie Tubature"
              desc="Filtra automaticamente il 99% delle impurità, ruggine e sedimenti. Anche con tubature di 50 anni."
            />
            <ImgBenefitCard
              img="/images/instant-hot/6x6.jpg"
              title="Collegabile Ovunque"
              desc="Cucina, bagno, garage, camper, giardino. Se c'è un rubinetto, Instant Hot funziona. Portalo dove ti serve."
            />
          </div>
        </div>
      </section>

      {/* --- SEZIONE PROBLEMI/SOLUZIONI --- */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-950 mb-4 uppercase tracking-tight">Stanco di Questi Problemi?</h2>
            <p className="text-gray-700 text-lg">
              Instant Hot risolve tutti i problemi più comuni legati all'acqua calda domestica.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-4xl mx-auto">
            <ProblemSolutionCard
              problem="Bollette del gas fuori controllo per l'acqua calda"
              solution="Elimina COMPLETAMENTE la spesa del gas per l'acqua calda"
            />
            <ProblemSolutionCard
              problem="Consumi elettrici eccessivi della caldaia"
              solution="Risparmia il 90% sui consumi elettrici con il riscaldamento istantaneo"
            />
            <ProblemSolutionCard
              problem="Ogni volta aspetti minuti prima che arrivi l'acqua calda"
              solution="Acqua calda istantanea in 3 secondi, ogni volta"
            />
            <ProblemSolutionCard
              problem="Non hai acqua calda in garage - cantina - giardino"
              solution="Porta l'acqua calda ovunque, nessuna modifica all'impianto necessaria"
            />
            <ProblemSolutionCard
              problem="Costi proibitivi per nuovi impianti"
              solution="Zero costi di installazione, zero idraulici, zero modifiche"
            />
            <ProblemSolutionCard
              problem="Acqua sporca dalle vecchie tubature"
              solution="Filtro integrato che elimina il 99% di impurità automaticamente"
            />
          </div>
        </div>
      </section>

      {/* --- CARATTERISTICHE TECNICHE (Layout Tetris) --- */}
      <section className="py-16 lg:py-24 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-950 mb-4 uppercase tracking-tight">Tecnologia Premium, Zero Complicazioni</h2>
            <p className="text-gray-700 text-lg">
              Ingegneria di precisione per prestazioni superiori. Qualità che si vede e si sente.
            </p>
          </div>

          {/* Layout Tetris Desktop / 2 Colonne Mobile */}
          <div className="max-w-6xl mx-auto">
            {/* Riga 1: Grande + Piccolo */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 mb-3 lg:mb-4">
              <TechCardTetris
                icon={<Thermometer className="w-8 h-8 lg:w-10 lg:h-10 text-orange-500" />}
                title="3 Secondi"
                desc="Da fredda a 60°C in un istante. Sistema termico di ultima generazione. Mai più attese."
                size="large"
                className="col-span-2 lg:col-span-3"
              />
              <TechCardTetris
                icon={<Droplets className="w-7 h-7 lg:w-8 lg:h-8 text-cyan-500" />}
                title="Filtra 99%"
                desc="Elimina impurità, ruggine e calcare. Acqua pura sempre."
                size="small"
                className="col-span-1 lg:col-span-2"
              />
              <TechCardTetris
                icon={<Wrench className="w-7 h-7 lg:w-8 lg:h-8 text-gray-700" />}
                title="Plug & Play"
                desc="2 minuti e funziona. Adattatori universali inclusi."
                size="small"
                className="col-span-1 lg:hidden"
              />
            </div>

            {/* Riga 2: 3 Piccoli su Desktop, 2+1 su Mobile */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-3 lg:mb-4">
              <TechCardTetris
                icon={<Wrench className="w-7 h-7 lg:w-8 lg:h-8 text-gray-700" />}
                title="Plug & Play"
                desc="2 minuti e funziona. Adattatori universali inclusi."
                size="small"
                className="hidden lg:block"
              />
              <TechCardTetris
                icon={<Zap className="w-7 h-7 lg:w-8 lg:h-8 text-yellow-500" />}
                title="Display Touch"
                desc="Controllo preciso 20-60°C. Vedi tutto in tempo reale."
                size="small"
              />
              <TechCardTetris
                icon={<Leaf className="w-7 h-7 lg:w-8 lg:h-8 text-green-600" />}
                title="Zero Sprechi"
                desc="Scalda solo quando serve. Bollette ridotte del 90%."
                size="small"
              />
            </div>

            {/* Riga 3: Piccolo + Grande */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
              <TechCardTetris
                icon={<RefreshCw className="w-7 h-7 lg:w-8 lg:h-8 text-blue-600" />}
                title="Doccino Pro"
                desc="3 getti + tubo 1.5m. Incluso gratis."
                size="small"
                className="col-span-1 lg:col-span-2"
              />
              <TechCardTetris
                icon={<ShieldCheck className="w-8 h-8 lg:w-10 lg:h-10 text-teal-600" />}
                title="Garanzia Totale"
                desc="Certificato CE. 2 anni di copertura completa. Reso gratuito 30 giorni. Zero rischi."
                size="large"
                className="col-span-1 lg:col-span-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- TABELLA CONFRONTO --- */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-950 mb-4 uppercase tracking-tight">Instant Hot vs. Caldaia Tradizionale</h2>
            <p className="text-gray-700 text-lg">
              Il confronto parla chiaro. Perché continuare a sprecare soldi?
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-3 px-2 md:py-4 md:px-6 text-left font-semibold text-xs md:text-base"></th>
                  <th className="py-3 px-2 md:py-4 md:px-6 text-center font-bold text-sm md:text-lg">
                    <span className="text-yellow-400">Instant Hot</span>
                  </th>
                  <th className="py-3 px-2 md:py-4 md:px-6 text-center font-semibold text-slate-300 text-xs md:text-base">Caldaia a Gas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <CompareRow label="Costo Gas Annuo" instant="€0 - Zero gas" traditional="€400-800/anno" />
                <CompareRow label="Risparmio Elettricità" instant="90%" traditional="-" />
                <CompareRow label="Costo Installazione" instant="€0 - Fai da te" traditional="€800-2000 + Idraulico" />
                <CompareRow label="Tempo Attesa Acqua Calda" instant="3 secondi" traditional="2-5 minuti" />
                <CompareRow label="Manutenzione Richiesta" instant="Minima" traditional="Annuale obbligatoria" />
                <CompareRow label="Portabilità" instant="Totale - Ovunque" traditional="Fissa" />
                <CompareRow label="Filtraggio Acqua" instant="99% impurità" traditional="Nessuno" />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- SEZIONE PARALLAX (Sfondo Fisso) --- */}
      <section className="relative py-24 lg:py-40 text-white overflow-hidden">
        {/* Immagine di sfondo fissa */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&q=80')"
          }}
        ></div>
        {/* Overlay scuro */}
        <div className="absolute inset-0 z-0 bg-slate-900/75"></div>

        {/* Contenuto */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight max-w-3xl mx-auto uppercase tracking-tight">
            La Scelta Intelligente
          </h2>
          <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Risparmia fino a <span className="text-green-400 font-bold">€540/anno</span>. Si ripaga in <span className="text-yellow-400 font-bold">1-3 mesi</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16 text-center">
            <div>
              <div className="text-4xl lg:text-6xl font-bold text-green-400">€0</div>
              <div className="text-slate-400 text-sm mt-1">Gas per acqua calda</div>
            </div>
            <div>
              <div className="text-4xl lg:text-6xl font-bold text-yellow-400">-90%</div>
              <div className="text-slate-400 text-sm mt-1">Consumi elettrici</div>
            </div>
            <div>
              <div className="text-4xl lg:text-6xl font-bold text-cyan-400">3 sec</div>
              <div className="text-slate-400 text-sm mt-1">Acqua calda</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- GARANZIE & TRUST --- */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-950 mb-4 uppercase tracking-tight">Acquista in Totale Sicurezza</h2>
            <p className="text-gray-700 text-lg">
              Il tuo acquisto è protetto da garanzie reali, non promesse vuote.
            </p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 lg:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-blue-950 font-semibold">Garanzia 2 Anni</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <span className="text-blue-950 font-semibold">Reso Gratuito 30 Giorni</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-teal-600"></div>
              <span className="text-blue-950 font-semibold">Certificazioni CE</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-blue-950 font-semibold">Spedizione in 48h</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-blue-950 font-semibold">Supporto Clienti</span>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSlider />

      {/* --- CTA FINAL --- */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://hellawater.com/wp-content/uploads/2025/01/blue-water-1024x576.webp')] bg-cover bg-center z-0 blur-[8px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 z-[1] opacity-80"></div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 max-w-5xl mx-auto">
                <div className="text-center lg:text-left lg:w-1/2">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-tight">Non Aspettare. Il Risparmio Inizia Oggi.</h2>
                    <p className="text-lg text-slate-300 max-w-xl">
                        Ogni giorno senza Instant Hot è denaro sprecato in gas e bollette. Fai la scelta intelligente: acqua calda istantanea, ovunque, senza sprechi.
                    </p>
                    <ul className="mt-6 space-y-2 text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                        <span>Zero bolletta gas per l'acqua calda</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                        <span>Si ripaga in 1-3 mesi di utilizzo</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                        <span>Garanzia 2 anni + reso gratuito 30 giorni</span>
                      </li>
                    </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-xl border border-white/20 lg:w-1/2 max-w-md mx-auto lg:mx-0">
                    <div className="text-center text-white text-2xl font-extrabold mb-4">Instant Hot 3.0</div>
                    <div className="flex flex-col items-center gap-3 mb-6">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 line-through text-xl">€149,00</span>
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-40%</span>
                        </div>
                        <div className="text-5xl md:text-6xl font-bold text-white tracking-tight">€89,90</div>
                    </div>

                    <div className="flex items-center justify-center gap-2 sm:gap-6 text-slate-300 text-sm mb-4">
                        <span>Spedizione in 48h</span>
                        <span className="text-slate-500">•</span>
                        <span>30 giorni di reso</span>
                    </div>

                    <button onClick={openForm} className="cursor-pointer w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-blue-950 font-bold py-5 px-6 rounded-xl text-xl shadow-[0_0_25px_rgba(251,191,36,0.4)] transition-all hover:scale-[1.02] flex flex-col items-center justify-center gap-0 animate-soft-pulse">
                        <span className="flex items-center gap-2">ORDINA ORA <ArrowRight className="w-5 h-5" /></span>
                        <span className="text-sm font-medium opacity-80">Offerta Limitata - Paghi alla Consegna</span>
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* --- STICKY CTA --- */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-50"
          >
            <div className="max-w-5xl mx-auto bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 border border-teal-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md rounded-xl sm:rounded-2xl">
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
                <div className="flex flex-col min-w-0 shrink">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-slate-400 line-through text-sm sm:text-lg">€149</span>
                    <span className="text-lg sm:text-2xl font-extrabold text-white">€89,90</span>
                    <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full animate-pulse">-40%</span>
                  </div>
                  <span className="text-xs sm:text-base text-slate-300 font-medium">Paghi alla consegna</span>
                </div>
                <button onClick={openForm} className="cursor-pointer shrink-0 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-blue-950 font-extrabold py-2.5 sm:py-4 px-4 sm:px-10 md:px-16 lg:px-24 rounded-lg sm:rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:scale-105 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-lg md:text-xl lg:text-2xl whitespace-nowrap animate-soft-pulse uppercase tracking-tight">
                  <span>Ordina</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- COMPONENTI ---

function TrustBadge({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
    return (
        <div className="flex items-center gap-3 group w-full sm:w-auto">
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors shadow-sm shrink-0">
                {icon}
            </div>
            <div className="flex flex-col text-left">
                <span className="font-bold text-blue-950 text-sm md:text-base leading-tight">{title}</span>
                <span className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wide">{sub}</span>
            </div>
        </div>
    )
}

function ImgBenefitCard({ img, title, desc }: { img: string; title: string; desc: string }) {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 border border-slate-100 group p-4 sm:p-5">
            {/* Image Container - 1:1 con margini sempre */}
            <div className="aspect-square overflow-hidden relative rounded-xl mb-4">
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors z-10"></div>
                <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            {/* Content */}
            <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-blue-950 mb-2 group-hover:text-teal-700 transition-colors uppercase tracking-tight">{title}</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}

function TechCardTetris({ icon, title, desc, size, className = '' }: { icon: React.ReactNode; title: string; desc: string; size: 'small' | 'large'; className?: string }) {
    const isLarge = size === 'large';
    return (
        <div className={`bg-white rounded-xl lg:rounded-2xl shadow border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all p-3 ${isLarge ? 'lg:p-8' : 'lg:p-6'} ${className}`}>
            <div className={`flex flex-col gap-2 ${isLarge ? 'lg:flex-row lg:items-start lg:gap-6' : 'lg:gap-3'}`}>
                <div className={`w-8 h-8 lg:w-auto lg:h-auto flex items-center justify-center shrink-0 ${isLarge ? 'lg:bg-teal-50 lg:p-4 lg:rounded-xl' : 'lg:bg-slate-50 lg:p-3 lg:rounded-lg'}`}>
                    {icon}
                </div>
                <div>
                    <h3 className={`font-extrabold text-blue-950 uppercase tracking-tight text-base mb-0.5 ${isLarge ? 'lg:text-3xl lg:mb-2' : 'lg:text-xl lg:mb-1'}`}>{title}</h3>
                    <p className={`text-gray-700 leading-snug lg:leading-relaxed text-sm ${isLarge ? 'lg:text-lg' : 'lg:text-sm'}`}>{desc}</p>
                </div>
            </div>
        </div>
    )
}

function BenefitCard({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
    return (
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition-all duration-300 border border-slate-100 group hover:border-teal-200">
            <div className="text-4xl mb-4">{emoji}</div>
            <h3 className="text-lg font-bold text-blue-950 mb-2 group-hover:text-teal-700 transition-colors">{title}</h3>
            <p className="text-gray-700 leading-relaxed">{desc}</p>
        </div>
    )
}

function ProblemSolutionCard({ problem, solution }: { problem: string; solution: string }) {
    return (
        <div className="bg-white rounded-xl p-3 md:p-6 shadow border border-slate-100 hover:shadow-lg transition-all">
            <div className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
                <span className="text-red-500 text-sm md:text-xl shrink-0">❌</span>
                <p className="text-gray-700 text-sm md:text-base min-w-0">{problem}</p>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
                <span className="text-green-500 text-sm md:text-xl shrink-0">✅</span>
                <p className="text-blue-950 font-medium text-sm md:text-base min-w-0">{solution}</p>
            </div>
        </div>
    )
}

function TechCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <div className="bg-white rounded-xl p-6 shadow border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all">
            <div className="mb-4">{icon}</div>
            <h3 className="text-lg font-bold text-blue-950 mb-2">{title}</h3>
            <p className="text-gray-700 leading-relaxed">{desc}</p>
        </div>
    )
}

function CompareRow({ label, instant, traditional }: { label: string; instant: string; traditional: string }) {
    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="py-3 px-2 md:py-4 md:px-6 font-medium text-gray-700 text-xs md:text-base">{label}</td>
            <td className="py-3 px-2 md:py-4 md:px-6 text-center">
                <span className="text-green-600 font-bold text-xs md:text-base">{instant}</span>
            </td>
            <td className="py-3 px-2 md:py-4 md:px-6 text-center text-slate-500 text-xs md:text-base">{traditional}</td>
        </tr>
    )
}

function SavingCard({ title, desc, highlight }: { title: string; desc: string; highlight: string }) {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-green-400 mb-2">{highlight}</div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}

function UseCaseCard({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
    return (
        <div className="bg-white rounded-xl p-6 shadow border border-slate-100 hover:shadow-lg hover:border-teal-200 transition-all group">
            <div className="text-3xl mb-3">{emoji}</div>
            <h3 className="text-lg font-bold text-blue-950 mb-2 group-hover:text-teal-700 transition-colors">{title}</h3>
            <p className="text-gray-700 leading-relaxed">{desc}</p>
        </div>
    )
}

function GuaranteeCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <div className="bg-slate-50 rounded-xl p-5 text-center border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all">
            <div className="flex justify-center mb-3">{icon}</div>
            <h3 className="font-bold text-blue-950 mb-1">{title}</h3>
            <p className="text-gray-700 text-sm leading-snug">{desc}</p>
        </div>
    )
}

