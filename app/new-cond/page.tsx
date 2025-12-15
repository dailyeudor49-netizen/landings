'use client';
import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Shield, Zap, Battery, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function AirWaveSmartLanding() {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedEndTime = localStorage.getItem('airwave-offer-end');
      if (savedEndTime) {
        const remaining = Math.floor((parseInt(savedEndTime) - Date.now()) / 1000);
        return remaining > 0 ? remaining : 0;
      } else {
        const endTime = Date.now() + 57 * 60 * 1000;
        localStorage.setItem('airwave-offer-end', endTime.toString());
        return 57 * 60;
      }
    }
    return 57 * 60;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '' });
  const [submitError, setSubmitError] = useState('');

  const slides = [
    '/images/condizionatore/specifiche.webp',
    '/images/condizionatore/caldo-freddo.webp',
    '/images/condizionatore/installazione.webp',
    '/images/condizionatore/silenzioso.webp',
    '/images/condizionatore/risparmio.webp',
  ];

  // Timer countdown (sempre attivo)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-slide (si ferma quando utente interagisce)
  useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length, autoSlide]);

  const stopAutoSlide = () => setAutoSlide(false);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const openOrderPopup = () => {
    document.getElementById('order-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!orderData.name.trim() || !orderData.phone.trim() || !orderData.address.trim()) {
      setSubmitError('Compila tutti i campi!');
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://ap.purchstar.com/api/networks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: orderData.name.split(' ')[0] || orderData.name,
          lastName: orderData.name.split(' ').slice(1).join(' ') || '',
          phone: orderData.phone,
          address: orderData.address,
          product: 'Air Wave Smart',
          price: 199,
          source: 'new-cond',
        }),
      });

      if (response.ok) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-17104994752/jZlCPqKod4aEMCDptw',
            value: 199,
            currency: 'EUR',
          });
        }
        window.location.href = '/ty/ty-airwave';
      }
    } catch (error) {
      console.error(error);
      setSubmitError('Errore durante l\'invio. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const comparisonData = [
    { feature: "Riscalda la casa", airwave: "✓ In 5 minuti", comp1: "✓ Ma costa molto", comp2: "✓ Lentamente" },
    { feature: "Rinfresca d'estate", airwave: "✓ In 5 minuti", comp1: "✓ Impiega ore", comp2: "✗ No" },
    { feature: "Deumidifica", airwave: "✓ Tutto l'anno", comp1: "✓ Solo alcuni modelli", comp2: "✗ No" },
    { feature: "Installazione", airwave: "✓ Lo fai da solo", comp1: "✗ Serve tecnico (€300+)", comp2: "✗ Installazione complessa" },
    { feature: "Lo sposti dove vuoi", airwave: "✓ Facile da spostare", comp1: "✗ Fisso al muro", comp2: "✗ Pesante e ingombrante" },
    { feature: "Consumi in bolletta", airwave: "✓ Bassissimi (classe A+++)", comp1: "~ Medi", comp2: "✗ Altissimi" },
    { feature: "Silenzioso di notte", airwave: "✓ Non lo senti", comp1: "~ Dipende dal modello", comp2: "~ Alcuni fanno rumore" },
    { feature: "Costo totale", airwave: "€199 tutto incluso", comp1: "€500-1000 + installazione", comp2: "€150-300 + bollette alle stelle" },
  ];

  const faqs = [
    {
      question: "Scalda davvero bene?",
      answer: "Eccome! Con 12.000 BTU scalda stanze fino a 60m² in pochi minuti. La pompa di calore è efficientissima e consuma pochissimo. Molti clienti lo usano come riscaldamento principale d'inverno."
    },
    {
      question: "Ma non serve l'unità esterna?",
      answer: "No, è il bello di questo prodotto! Air Wave Smart è un climatizzatore monoblocco: tutto in un unico apparecchio. Niente buchi nel muro, niente permessi, niente installatori. Lo attacchi alla presa e funziona."
    },
    {
      question: "Quanto consuma di corrente?",
      answer: "Pochissimo! Classe energetica A+++ significa risparmio fino al 60% rispetto ai vecchi condizionatori. In media costa meno di €0,50 al giorno di corrente."
    },
    {
      question: "Devo pagare subito?",
      answer: "No, paghi solo quando arriva a casa tua. Il corriere ti porta il pacco e paghi direttamente a lui in contanti o con carta. Zero rischi per te."
    },
    {
      question: "E se non mi piace?",
      answer: "Hai 30 giorni per restituirlo e riavere i soldi indietro, senza domande. Ma vedrai che non vorrai farlo!"
    }
  ];

  const reviews = [
    { nome: 'Mario R.', testo: 'Finalmente casa calda senza spendere una fortuna di gas. lo uso da un mese e la bolletta è bassissima. arrivato in 2 giorni', stelle: 5, data: '12 Dicembre 2025', risposta: 'Grazie mille Mario! Siamo felicissimi che tu stia risparmiando sulla bolletta. Se hai bisogno di qualsiasi cosa, siamo sempre qui per te!' },
    { nome: 'Lucia P.', testo: 'Col freddo che fa quest anno non potevo stare senza riscaldamento. questo mi ha salvato, scalda benissimo e in fretta', stelle: 5, data: '8 Dicembre 2025' },
    { nome: 'Giuseppe T.', testo: 'Nel mio appartamento il riscaldamento condominiale non basta mai. con questo aggiungo calore dove serve senza opere murarie', stelle: 5, data: '29 Novembre 2025', risposta: 'Ciao Giuseppe, grazie per la recensione! È proprio quello che volevamo: darti comfort extra senza complicazioni. Buon inverno caldo!' },
    { nome: 'Anna M.', testo: 'Lo uso per scaldare la camera da letto la sera. silenziosissimo, non lo senti proprio. consegna veloce e pagato al corriere', stelle: 5, data: '15 Novembre 2025', risposta: 'Grazie Anna! Dormire al caldo e in silenzio è fondamentale. Siamo contenti che ti trovi bene, buon riposo!' },
    { nome: 'Franco B.', testo: 'Avevo paura della bolletta ma invece consuma niente. classe A+++ vuol dire qualcosa. lo consiglio', stelle: 5, data: '2 Ottobre 2025' },
    { nome: 'Carla S.', testo: 'Ho 72 anni e soffro il freddo. questo apparecchio mi ha cambiato la vita, casa sempre calda. facile da usare col telecomando', stelle: 5, data: '18 Settembre 2025', risposta: 'Cara Carla, ci hai commosso! Sapere che stai bene e al caldo ci riempie il cuore. Per qualsiasi dubbio, chiamaci pure, siamo qui per aiutarti!' },
    { nome: 'Roberto C.', testo: 'D\'estate rinfresca d\'inverno scalda. due prodotti in uno, ottimo affare. spedizione in due giorni', stelle: 5, data: '5 Agosto 2025', risposta: 'Grazie Roberto! Esatto, un prodotto per tutte le stagioni. Siamo contenti che apprezzi la versatilità!' },
    { nome: 'Vincenzo D.', testo: 'Scettico all\'inizio ma funziona davvero. il gas costa troppo, questo è il futuro. pompa di calore efficientissima', stelle: 4, data: '22 Giugno 2025', risposta: 'Ciao, ci fa piacere che hai apprezzato il nostro prodotto. Se hai suggerimenti per raggiungere le 5 stelle, scrivici e prenderemo in considerazione il tuo parere.' },
    { nome: 'Teresa L.', testo: 'Comprato per mia madre anziana che aveva sempre freddo. ora sta benissimo e la bolletta non è aumentata. ottimo prodotto', stelle: 5, data: '10 Aprile 2025', risposta: 'Grazie Teresa! Che bello sapere che la tua mamma sta al caldo. Un abbraccio a lei e grazie per aver pensato a noi!' },
    { nome: 'Giovanni M.', testo: 'Abito in affitto e non potevo fare buchi. questo è perfetto, lo appoggio dove voglio e funziona alla grande. consigliatissimo', stelle: 5, data: '3 Marzo 2025', risposta: 'Ciao Giovanni! Proprio per situazioni come la tua abbiamo creato questo prodotto. Grazie mille e goditi il comfort!' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans leading-relaxed">
      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-green-500 shadow-2xl">
        <div className="max-w-md mx-auto px-4 py-2">
          <button
            onClick={openOrderPopup}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-base sm:text-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <span>ORDINA ORA - €199</span>
            <span className="text-xs sm:text-sm bg-white/20 px-2 py-1 rounded">💳 Paga alla consegna</span>
          </button>
        </div>
      </div>

      {/* Yellow Alert Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-2 text-center text-sm font-medium shadow-md">
        📦 Spedito in 48h – Pagamento alla Consegna
      </div>

      {/* Hero Title Section */}
      <section className="bg-white pt-6 pb-4 md:py-8 px-4 border-b">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-black text-[#0f1c3f] mb-4 leading-tight tracking-tight">
            <span className="text-orange-500">RISCALDA</span> O <span className="text-orange-500">RAFFREDDA</span> LA CASA SENZA GAS E SENZA INSTALLAZIONE
          </h1>
          <p className="text-xl md:text-2xl font-bold text-red-600 mb-4">
            Basta bollette del gas alle stelle!
          </p>
          <p className="text-lg md:text-xl text-gray-700 bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 inline-block">
            🔥 <strong>Butta via ventilatori, vecchi termosifoni e stufe</strong> grazie a questo innovativo <strong>condizionatore 3 in 1</strong>.
          </p>
        </div>
      </section>

      {/* Product Section */}
      <main className="max-w-6xl mx-auto px-4 pt-6 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative">
              <img
                src={slides[currentSlide]}
                alt="Air Wave Smart"
                className="w-full h-full object-cover"
              />
              {/* Badge Ultimi Pezzi */}
              <div className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-lg">
                🔥 Ultimi 7 pezzi disponibili
              </div>
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev + 1) % slides.length); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => { stopAutoSlide(); setCurrentSlide(i); }}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer ${
                    i === currentSlide ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
                  }`}
                >
                  <img src={slide} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Bullet Points sotto la galleria */}
            <div className="bg-orange-100/20 rounded-xl p-5 text-left">
              <ul className="space-y-4 text-slate-800 text-base">
                <li className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Caldo Immediato:</strong> Scalda la stanza in 5 minuti. 12.000 BTU di potenza per ambienti fino a 60m².</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Rinfresca e Deumidifica:</strong> D'estate diventa un potente condizionatore. Elimina umidità e aria viziata tutto l'anno.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Battery className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Addio Bollette Gas:</strong> Pompa di calore classe A+++. Costa meno di €0,50 al giorno di corrente.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Zero Installazione:</strong> Senza unità esterna, lo appoggi dove vuoi o lo appendi alla parete, colleghi la presa e godi dei benefici.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Silenziosissimo (35dB):</strong> Puoi dormirci accanto senza problemi. Perfetto per la camera da letto.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            {/* Price Box */}
            <div className="bg-white border-2 border-green-500 rounded-2xl p-5 mb-6 shadow-lg relative">
              {/* Bollino Sconto */}
              <div className="absolute -top-4 -right-4 bg-red-600 text-white text-base font-bold w-14 h-14 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.4)] transform rotate-12 flex items-center justify-center">
                -60%
              </div>

              {/* Titolo e Recensioni */}
              <h2 className="text-xl font-bold text-[#0f1c3f] text-center mb-2">
                Air Wave Smart - Condizionatore 3 in 1: Riscalda, Raffredda e Deumidifica
              </h2>
              <div
                className="flex items-center justify-center space-x-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-500 text-sm underline">(2.847 recensioni)</span>
              </div>

              <div className="flex items-center justify-center space-x-3 mb-4">
                <span className="text-gray-400 line-through text-xl" style={{ fontFamily: 'var(--font-montserrat)' }}>€499</span>
                <span className="text-5xl font-black text-green-700" style={{ fontFamily: 'var(--font-montserrat)' }}>€199</span>
              </div>

              {/* Kit Incluso */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400 rounded-xl p-4 mb-4">
                <p className="font-bold text-amber-800 text-base mb-3 flex items-center justify-center gap-2">
                  🎁 Incluso nel prezzo
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
                  <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Telecomando</span>
                  <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Kit installazione</span>
                  <span className="flex items-center gap-1"><span className="text-green-500">✓</span> 2 Filtri HEPA</span>
                  <span className="flex items-center gap-1"><span className="text-green-500">✓</span> App smartphone</span>
                  <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Manuale italiano</span>
                  <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Garanzia 24 mesi</span>
                </div>
              </div>

              <button
                onClick={openOrderPopup}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition-all cursor-pointer shadow-lg"
              >
                Ordina Ora - Paghi alla Consegna
              </button>

              <p className="text-center text-red-600 font-bold mt-3">
                ⏱️ Scade tra: {formatTime(timeLeft)}
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4">
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-green-600" />
                  <span className="text-gray-700">Garanzia 24 mesi</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <CheckCircle className="w-5 h-5 mx-auto mb-1 text-green-600" />
                  <span className="text-gray-700">Reso 30 giorni</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <Zap className="w-5 h-5 mx-auto mb-1 text-green-600" />
                  <span className="text-gray-700">Spedizione 48h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Striscia Spedizione Assicurata */}
      <div className="bg-slate-800 text-white py-3 text-center text-sm font-medium">
        📦 <strong>Spedizione Express Assicurata</strong> - se il pacco è danneggiato, lo sostituiamo senza farti sborsare un euro.
      </div>

      {/* SCOPRI COME CAMBIERÀ LA TUA VITA - 6 Box */}
      <section className="py-12 bg-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10 text-[#0f1c3f] tracking-tight">
            SCOPRI COME CAMBIERÀ LA TUA VITA<br />CON AIR WAVE SMART
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Box 1 - Caldo Immediato */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-green-500 transition-all">
              <div className="aspect-square relative">
                <img src="/images/condizionatore/caldo-freddo.webp" alt="Caldo Immediato" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <span className="text-white font-bold text-xl p-4">CALDO IN 5 MINUTI</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">CALDO IMMEDIATO</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  In soli <strong>5 minuti</strong> la tua stanza passa da gelida a calda e accogliente.
                  Con 12.000 BTU di potenza riscalda ambienti <strong>fino a 60m²</strong> senza problemi.
                </p>
              </div>
            </div>

            {/* Box 2 - Addio Bollette Gas */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-green-500 transition-all">
              <div className="aspect-square relative">
                <img src="/images/condizionatore/risparmio.webp" alt="Risparmio Energetico" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <span className="text-white font-bold text-xl p-4">€0,50 AL GIORNO</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">ADDIO BOLLETTE GAS</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  La pompa di calore <strong>classe A+++</strong> consuma pochissimo: meno di <strong>€0,50 al giorno</strong>.
                  Risparmia fino al <strong>60%</strong> rispetto al riscaldamento tradizionale.
                </p>
              </div>
            </div>

            {/* Box 3 - Zero Installazione */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-green-500 transition-all">
              <div className="aspect-square relative">
                <img src="/images/condizionatore/installazione.webp" alt="Zero Installazione" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <span className="text-white font-bold text-xl p-4">ATTACCA E VIA</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">ZERO INSTALLAZIONE</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  <strong>Appendilo a parete o appoggialo dove vuoi</strong>. Niente tecnici, niente permessi.
                  Lo attacchi alla presa e <strong>funziona subito</strong>. Facilissimo.
                </p>
              </div>
            </div>

            {/* Box 4 - Silenzioso */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-green-500 transition-all">
              <div className="aspect-square relative">
                <img src="/images/condizionatore/silenzioso.webp" alt="Silenzioso" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <span className="text-white font-bold text-xl p-4">DORMI TRANQUILLO</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">SILENZIO ASSOLUTO</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Solo <strong>35 decibel</strong>: più silenzioso di un frigorifero. Puoi <strong>dormirci accanto</strong>.
                  Perfetto per la camera da letto o lo studio.
                </p>
              </div>
            </div>

            {/* Box 5 - Estate e Inverno */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-green-500 transition-all">
              <div className="aspect-square relative">
                <img src="/images/condizionatore/specifiche.webp" alt="Estate e Inverno" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <span className="text-white font-bold text-xl p-4">3 IN 1</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">ESTATE E INVERNO</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  <strong>3 prodotti in 1</strong>: riscalda d'inverno, rinfresca d'estate, deumidifica tutto l'anno.
                  Un solo acquisto per <strong>tutto l'anno</strong>.
                </p>
              </div>
            </div>

            {/* Box 6 - Senza Unità Esterna */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-green-500 transition-all">
              <div className="aspect-square relative">
                <img src="/images/condizionatore/riscaldamento.webp" alt="Senza Unità Esterna" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <span className="text-white font-bold text-xl p-4">ZERO PERMESSI</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">NIENTE UNITÀ ESTERNA</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Il condominio ti ha detto <strong>NO</strong>? Con Air Wave Smart il problema non esiste.
                  È tutto in un unico blocco compatto. <strong>Nessun permesso richiesto</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Installazione Facile */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-4 text-[#0f1c3f] tracking-wide">
            PRONTO IN 2 MINUTI
          </h2>
          <p className="text-lg text-gray-600 text-center mb-10">
            Scegli tu come posizionarlo: nessun tecnico, nessun attrezzo speciale
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Opzione 1 - Appoggiato */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-100 rounded-2xl p-6 border-2 border-sky-200">
              <div className="text-center mb-4">
                <div className="inline-block bg-sky-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-3">
                  OPZIONE 1
                </div>
                <h3 className="text-2xl font-black text-[#0f1c3f] tracking-wide">APPOGGIALO DOVE VUOI</h3>
              </div>
              <div className="aspect-video bg-white rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <img src="/images/condizionatore/installazione.webp" alt="Appoggiato a terra" className="w-full h-full object-cover" />
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-sky-600 font-bold text-lg">1.</span>
                  <span className="font-bold">Lo tiri fuori dalla scatola</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-600 font-bold text-lg">2.</span>
                  <span className="font-bold">Lo appoggi sul pavimento o su un mobile</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-600 font-bold text-lg">3.</span>
                  <span className="font-bold">Colleghi la spina alla presa</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold text-lg text-sky-600">Fatto! Pronto all'uso</span>
                </li>
              </ul>
              <div className="mt-4 text-center">
                <span className="inline-block bg-sky-100 text-sky-800 font-bold px-4 py-2 rounded-lg">
                  ⏱️ Tempo: 30 secondi
                </span>
              </div>
            </div>

            {/* Opzione 2 - A Parete */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 border-2 border-amber-200">
              <div className="text-center mb-4">
                <div className="inline-block bg-amber-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-3">
                  OPZIONE 2
                </div>
                <h3 className="text-2xl font-black text-[#0f1c3f] tracking-wide">FISSALO A PARETE</h3>
              </div>
              <div className="aspect-video bg-white rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <img src="/images/condizionatore/silenzioso.webp" alt="Fissato a parete" className="w-full h-full object-cover" />
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold text-lg">1.</span>
                  <span className="font-bold">Usa la staffa inclusa nella confezione</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold text-lg">2.</span>
                  <span className="font-bold">2 tasselli e il gioco è fatto</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold text-lg">3.</span>
                  <span className="font-bold">Agganci l'unità e colleghi la spina</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold text-lg text-amber-600">Fatto! Inizia a goderti il comfort</span>
                </li>
              </ul>
              <div className="mt-4 text-center">
                <span className="inline-block bg-amber-100 text-amber-800 font-bold px-4 py-2 rounded-lg">
                  ⏱️ Tempo: 2 minuti
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xl font-bold text-[#0f1c3f]">
              Niente buchi nel muro per tubi o scarichi, solo 2 tasselli se vuoi fissarlo e puoi spostarlo in qualsiasi stanza quando vuoi!
            </p>
          </div>
        </div>
      </section>

      {/*
      ============ SEZIONE SALVATA: INSTALLAZIONE? NON SERVE! ============
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-8 text-[#0f1c3f]">
            INSTALLAZIONE? NON SERVE!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-700 mb-4 text-center">❌ CONDIZIONATORE TRADIZIONALE</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Serve tecnico specializzato (€300-500)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Buchi nel muro e opere murarie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Unità esterna obbligatoria</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Permessi condominiali richiesti</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Tempi di attesa: 2-4 settimane</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-green-700 mb-4 text-center">✓ AIR WAVE SMART</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Lo installi da solo in 2 minuti</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Zero buchi, zero opere murarie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Nessuna unità esterna</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Nessun permesso richiesto</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Arriva in 48h, funziona subito</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={openOrderPopup}
              className="bg-orange-500 hover:bg-orange-600 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all cursor-pointer"
            >
              ORDINA ORA - Offerta Inverno
            </button>
            <p className="text-red-600 text-sm mt-2 font-medium">Solo 12 pezzi rimasti a questo prezzo</p>
          </div>
        </div>
      </section>
      ============ FINE SEZIONE SALVATA ============
      */}

      {/* Comparison Table */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-2 text-[#0f1c3f] tracking-tight">
            CONFRONTA TU STESSO
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Cosa fa Air Wave Smart che gli altri non fanno?
          </p>
          <div className="mb-8 overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden text-xs md:text-base min-w-[480px]">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-1.5 md:px-4 py-1.5 md:py-3 text-left w-[22%]"></th>
                  <th className="px-1.5 md:px-4 py-1.5 md:py-3 text-center bg-green-600 w-[32%]">
                    <div className="font-bold text-xs md:text-base">Air Wave Smart</div>
                  </th>
                  <th className="px-1 md:px-3 py-1.5 md:py-3 text-center bg-gray-500 w-[23%]">
                    <div className="font-bold text-[10px] md:text-sm leading-tight">Condizionatore Classico</div>
                  </th>
                  <th className="px-1 md:px-3 py-1.5 md:py-3 text-center bg-gray-500 w-[23%]">
                    <div className="font-bold text-[10px] md:text-sm">Termosifone</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-1.5 md:px-4 py-1.5 md:py-3 font-semibold text-slate-900 text-xs md:text-base">{row.feature}</td>
                    <td className={`px-1 md:px-4 py-1.5 md:py-3 text-center font-bold text-xs md:text-base ${
                      row.feature === 'Costo totale' ? 'text-green-700 bg-green-50' : 'text-teal-700 bg-teal-50'
                    }`}>
                      {row.airwave}
                    </td>
                    <td className="px-1 md:px-4 py-1.5 md:py-3 text-center text-gray-500 text-xs md:text-base">{row.comp1}</td>
                    <td className="px-1 md:px-4 py-1.5 md:py-3 text-center text-gray-500 text-xs md:text-base">{row.comp2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Urgency Strip */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white text-lg md:text-xl font-bold mb-3">
            🔥 Solo 12 pezzi rimasti a €199 - Offerta Inverno
          </p>
          <button
            onClick={openOrderPopup}
            className="bg-white text-green-600 hover:bg-gray-100 py-3 px-8 rounded-xl font-bold text-lg transition-all cursor-pointer"
          >
            Lo voglio, ordina ora
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews-section" className="py-12 bg-[#035aa6]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-white mb-2 tracking-wide">
            COSA DICONO I CLIENTI
          </h2>
          <p className="text-center text-white/80 mb-8">2.847 recensioni verificate</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, i) => (
              <div key={i} className={`bg-white rounded-xl p-4 shadow ${i >= visibleReviews ? 'hidden md:block' : ''}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    {review.nome[0]}
                  </div>
                  <div>
                    <p className="font-bold text-[#0f1c3f]">{review.nome}</p>
                    <div className="flex text-yellow-400">
                      {[...Array(review.stelle)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded block mb-1">✓ Verificato</span>
                    <span className="text-xs text-gray-500">{review.data}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{review.testo}</p>
                {review.risposta && (
                  <div className="mt-3 bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                    <p className="text-xs font-semibold text-blue-700 mb-1">Risposta del venditore:</p>
                    <p className="text-gray-600 text-sm">{review.risposta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {visibleReviews < reviews.length && (
            <div className="text-center mt-6 md:hidden">
              <button
                onClick={() => setVisibleReviews(prev => Math.min(prev + 3, reviews.length))}
                className="bg-white text-[#035aa6] font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
              >
                Vedi altre recensioni
              </button>
            </div>
          )}

          <p className={`text-center text-white/70 mt-6 text-sm ${visibleReviews >= reviews.length ? 'block' : 'hidden'} md:block`}>
            La lista completa delle recensioni è disponibile sul sito ufficiale.
          </p>
        </div>
      </section>

      {/* How to Order */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-[#0f1c3f] mb-6 text-center tracking-wide">
            COME ORDINARE
          </h2>
          <div className="flex flex-row items-start justify-center gap-2 md:gap-6">
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#035aa6] text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">1</div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Compila il modulo con i tuoi dati</p>
            </div>
            <div className="text-slate-300 text-xl md:text-2xl mt-3">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#035aa6] text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">2</div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Ti chiamiamo per confermare l'ordine</p>
            </div>
            <div className="text-slate-300 text-xl md:text-2xl mt-3">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">3</div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Ricevi in 48h e paghi alla consegna</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modulo d'Ordine */}
      <section id="order-form-section" className="bg-[#035aa6] py-12 pb-8">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2 text-center tracking-wide">
            MODULO D'ORDINE
          </h2>
          <p className="text-white/80 mb-6 text-center">
            Compila per ricevere l'offerta
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-xl">
            {/* Product Summary */}
            <div className="bg-slate-50 rounded-lg p-3 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#0f1c3f]">Air Wave Smart + Accessori</span>
                  <div className="mt-1">
                    <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded">📦 Spedizione 24/48h</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 line-through text-sm block" style={{ fontFamily: 'var(--font-montserrat)' }}>€499</span>
                  <span className="text-2xl font-black text-green-700" style={{ fontFamily: 'var(--font-montserrat)' }}>€199</span>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-5 text-center">
              <p className="text-red-700 font-medium">
                ⏱️ L'offerta scade tra: <span className="font-bold">{formatTime(timeLeft)}</span>
              </p>
            </div>

            {submitError && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                <p className="text-red-700 text-sm text-center">{submitError}</p>
              </div>
            )}

            <div className="space-y-4 mb-5">
              <div>
                <label className="block text-[#0f1c3f] font-semibold mb-2">Nome e Cognome *</label>
                <input
                  type="text"
                  name="name"
                  value={orderData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#035aa6] focus:border-[#035aa6] text-lg"
                  placeholder="Mario Rossi"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-[#0f1c3f] font-semibold mb-2">Telefono (Cellulare) *</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#035aa6] focus:border-[#035aa6] text-lg"
                  placeholder="333 1234567"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-[#0f1c3f] font-semibold mb-2">Indirizzo Completo *</label>
                <input
                  type="text"
                  name="address"
                  value={orderData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#035aa6] focus:border-[#035aa6] text-lg"
                  placeholder="Via, Numero Civico, CAP, Città"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Payment Badge */}
            <div className="flex items-center justify-center gap-2 mb-5 text-gray-600">
              <span>💳</span>
              <span className="font-medium">Pagamento alla consegna</span>
              <span className="text-green-500">✓</span>
              <span>Nessun anticipo</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 px-4 rounded-xl font-bold text-lg transition duration-300 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white cursor-pointer shadow-lg'
              }`}
            >
              {isSubmitting ? 'INVIO IN CORSO...' : <><span>CONFERMA ORDINE</span><ChevronRight className="w-5 h-5" /></>}
            </button>

            {/* Data Protection */}
            <p className="text-center text-gray-500 text-xs mt-4">
              🔒 I tuoi dati sono al sicuro e verranno usati solo per la spedizione
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#035aa6] py-8 pb-32">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-8 text-white tracking-wide">
            DOMANDE FREQUENTI
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-[#0f1c3f]">{faq.question}</h3>
                  <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
