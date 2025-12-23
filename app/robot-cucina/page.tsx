'use client';
import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Shield, Zap, ChevronDown, ChevronLeft, ChevronRight, Flame, Timer, Gauge, Utensils, ChefHat, Soup, Truck } from 'lucide-react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function RobotCucinaLanding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '' });
  const [submitError, setSubmitError] = useState('');

  const slides = [
    '/images/robot-cucina/1.png',
    '/images/robot-cucina/2.png',
    '/images/robot-cucina/3.png',
    '/images/robot-cucina/4.png',
    '/images/robot-cucina/5.png',
  ];

  // Auto-slide
  useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length, autoSlide]);

  const stopAutoSlide = () => setAutoSlide(false);

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
          product: 'Robot Cucina Multifunzione 12in1',
          price: 69,
          source: 'robot-cucina',
        }),
      });

      if (response.ok) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-17104994752/robotcucina',
            value: 69,
            currency: 'EUR',
          });
        }
        window.location.href = '/ty/ty-robot-cucina';
      }
    } catch (error) {
      console.error(error);
      setSubmitError('Errore durante l\'invio. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const comparisonData = [
    { feature: "Funzioni incluse", robot: "12 IN 1", without: "1-2 elettrodomestici" },
    { feature: "Spazio in cucina", robot: "UN SOLO APPARECCHIO", without: "Frullatore + Impastatrice + Tritatutto..." },
    { feature: "Modalità di cottura", robot: "AUTOMATICO", without: "Stai lì a mescolare" },
    { feature: "Ricette possibili", robot: "INFINITE", without: "Solo le solite" },
    { feature: "Pulizia", robot: "ULTRARAPIDA", without: "Mille pezzi da lavare" },
    { feature: "Prezzo totale", robot: "€69 UNA TANTUM", without: "€400+ per gli stessi risultati" },
  ];

  const faqs = [
    {
      question: "Cosa fa esattamente questo robot?",
      answer: "TUTTO. Taglia, trita, frulla, impasta, cuoce, mescola automaticamente, manteca, fa il soffritto da solo, cuoce a vapore, pesa gli ingredienti, e molto altro. 12 funzioni in un unico apparecchio compatto. Sostituisce frullatore, impastatrice, tritatutto, vaporiera e planetaria."
    },
    {
      question: "È difficile da usare?",
      answer: "Facilissimo! Ha un display intuitivo con programmi preimpostati. Selezioni cosa vuoi fare, metti gli ingredienti, premi START. Lui fa tutto da solo. Anche tua nonna imparerebbe in 5 minuti."
    },
    {
      question: "Quanto è potente?",
      answer: "Motore da 1500W. Trita ghiaccio come burro, impasta anche le farine più dure, frulla qualsiasi cosa in secondi. Potenza PROFESSIONALE a prezzo da supermercato."
    },
    {
      question: "La capienza è sufficiente?",
      answer: "Capacità da 6 litri! Cucini per tutta la famiglia in una volta. Risotti, zuppe, impasti per pizza e pane, dolci... tutto in quantità abbondanti."
    },
    {
      question: "Si pulisce facilmente?",
      answer: "Facilissimo! La ciotola è completamente antiaderente, non si attacca nulla. Niente viti o smontaggio complicato: un click e la ciotola si stacca. Puoi metterla direttamente in lavastoviglie. Pulizia in 30 secondi, zero sbattimento."
    },
    {
      question: "Perché costa così poco?",
      answer: "È il nostro regalo di fine anno ai clienti! Il deposito chiude e dobbiamo svuotare tutto. Questi robot li vendevamo a €449, ora li offriamo a prezzo di costo per ringraziare chi ci ha supportato. Rimangono solo 7 pezzi, poi chiudiamo."
    },
    {
      question: "E se non mi piace?",
      answer: "30 giorni per restituirlo, rimborso totale, zero domande. Ma credici: quando lo provi, non lo molli più. Il 98% dei clienti lo tiene."
    }
  ];

  const reviews = [
    { nome: 'Giulia M.', testo: 'HO BUTTATO VIA IL MIO VECCHIO ROBOT DA €800. Questo fa le stesse identiche cose a 1/10 del prezzo. Sono ancora sotto shock. Ho fatto risotto, vellutate, impasto pizza... PERFETTO tutto. A €69 è un FURTO (per loro, non per noi!)', stelle: 5, data: '18 Dicembre 2024', risposta: 'Giulia, grazie! Sì, il confronto con i robot da €1000+ è impietoso... per loro!' },
    { nome: 'Marco T.', testo: 'Non so cucinare. ZERO. Con questo robot ho fatto il ragù della domenica che mia madre fa da 40 anni. Lei non ci credeva. Io nemmeno. È tutto automatico, impossibile sbagliare.', stelle: 5, data: '15 Dicembre 2024' },
    { nome: 'Francesca R.', testo: 'Avevo frullatore, tritatutto, impastatrice, vaporiera... 4 apparecchi che occupavano TUTTO il piano di lavoro. Li ho venduti tutti e ho tenuto solo questo. Fa tutto lui e occupa niente.', stelle: 5, data: '12 Dicembre 2024', risposta: 'Francesca, esattamente! Un robot, infinite possibilità, zero ingombro!' },
    { nome: 'Antonio D.', testo: 'Scettico all\'inizio, a questo prezzo pensavo fosse un giocattolo. SBAGLIATO. Motore potentissimo, trita il ghiaccio, impasta come una planetaria pro. L\'ho pagato €69, vale 10 volte tanto.', stelle: 5, data: '8 Dicembre 2024' },
    { nome: 'Laura B.', testo: 'Ho 3 figli e zero tempo. Questo robot mi ha cambiato la vita. Butto dentro tutto, premo un tasto, e mentre fa da solo io faccio altro. Vellutate, zuppe, risotti pronti in automatico. MIRACOLOSO.', stelle: 5, data: '3 Dicembre 2024', risposta: 'Laura, le mamme impegnate sono le nostre clienti più soddisfatte. Il tempo è prezioso!' },
    { nome: 'Roberto C.', testo: 'Ho comprato il primo, poi ne ho presi altri 2 da regalare. A questo prezzo è il regalo perfetto. Mia suocera piangeva dalla gioia, e non piange MAI.', stelle: 5, data: '28 Novembre 2024' },
    { nome: 'Simona P.', testo: 'Sono chef professionista. Questo robot a €69 batte apparecchi da €500 che uso in cucina. Non so come facciano a venderlo a questo prezzo, ma approfittatene SUBITO prima che se ne accorgano!', stelle: 5, data: '20 Novembre 2024', risposta: 'Simona, quando anche gli chef professionisti lo confermano... grazie!' },
    { nome: 'Giuseppe L.', testo: 'Mia moglie voleva un robot da cucina professionale da anni. €1200 quelli famosi. Le ho comprato questo a €69, fa TUTTO uguale. Con i soldi risparmiati ci siamo fatti un weekend alle terme. GRAZIE!', stelle: 5, data: '15 Novembre 2024' },
    { nome: 'Valentina S.', testo: 'La cottura automatica è PAZZESCA. Metto gli ingredienti per il risotto, vado a farmi la doccia, torno e il risotto è pronto mantecato. Non ci credo ancora.', stelle: 5, data: '10 Novembre 2024', risposta: 'Valentina, la funzione cottura automatica è quella che fa innamorare tutti!' },
    { nome: 'Davide F.', testo: 'Ne ho ordinati 5. Uno per me, 4 per regali. A €69 li prendo a stock. Quando li vendevano a €449 non li avrei mai comprati. ORA È IL MOMENTO.', stelle: 5, data: '5 Novembre 2024' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans leading-relaxed">
      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-orange-500 shadow-2xl">
        <div className="max-w-md mx-auto px-4 py-2">
          <button
            onClick={openOrderPopup}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-black text-base sm:text-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <span>ORDINA ORA - €69</span>
          </button>
        </div>
      </div>

      {/* Hero Title Section */}
      <section className="bg-white pt-6 pb-4 md:py-8 px-4 border-b">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-orange-500 text-white text-sm md:text-base font-bold py-2 px-4 rounded-full inline-block mb-4">
            REGALO DI FINE ANNO - SVUOTAMENTO MAGAZZINO
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-[#0f1c3f] mb-4 leading-tight tracking-tight">
            ROBOT DA CUCINA <span className="text-orange-500">12 IN 1</span><br/>
            AL PREZZO DI UN FRULLATORE
          </h1>
          <p className="text-xl md:text-2xl font-bold text-gray-500 mb-4">
            <span className="line-through text-2xl">€449</span> <br></br><span className="text-orange-500 font-black text-3xl">OGGI A €69</span>
          </p>
          <p className="text-lg md:text-xl text-[#0f1c3f] bg-slate-100 border-2 border-slate-300 rounded-xl p-4 inline-block font-medium">
            Un superchef che trita, monta, frulla, impasta, cuoce, frigge. <strong className="text-orange-600">TUTTO IN UN UNICO STRUMENTO.</strong><br/>
          
          </p>
        </div>
      </section>

      {/* Product Section */}
      <main className="max-w-6xl mx-auto px-4 pt-6 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative border-2 border-gray-200">
              <img
                src={slides[currentSlide]}
                alt="Robot Cucina Multifunzione"
                className="w-full h-full object-cover"
              />
              {/* Badge Ultimi Pezzi - URGENZA */}
              <div className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
                SOLO 7 RIMASTI!
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
                    i === currentSlide ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'
                  }`}
                >
                  <img src={slide} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Bullet Points sotto la galleria - SOLO MOBILE */}
            <div className="bg-slate-50 rounded-xl p-5 text-left lg:hidden border border-slate-200">
              <h3 className="text-lg font-black text-slate-800 mb-3 text-center">12 FUNZIONI IN 1 ROBOT:</h3>
              <ul className="space-y-3 text-slate-700 text-base">
                <li className="flex items-start gap-3">
                  <Utensils className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-800">TRITA, SMINUZZA E FRULLA:</strong> Verdure, carne, vellutate, omogeneizzati, chips... tutto in pochi secondi, senza fatica.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChefHat className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-800">IMPASTA E MONTA:</strong> Pizza, pane, pasta fresca, dolci, panna montata, pan di spagna... addio fruste e planetaria!</span>
                </li>
                <li className="flex items-start gap-3">
                  <Flame className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                                    <span><strong className="text-slate-800">CUOCE COME UN SUPERCHEF (NORMALE + VAPORE):</strong> Riso, zuppe, carne, verdure al vapore... mescola DA SOLO e il risultato è da ristorante!</span>

                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-800">FRITTURA SUPER CROCCANTE (CLASSICA + AD ARIA):</strong> Patatine croccanti, zero cattivi odori, fritture perfette, anche senza olio!</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-800">TOUCHSCREEN CON 999+ RICETTE:</strong> Display touch intuitivo con ricette preimpostate e manuali. Scegli la ricetta dal menu e premi avvio: fa tutto lui!</span>
                </li>
              </ul>
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span className="text-amber-800 text-sm"><strong>+ BILANCIA INTEGRATA:</strong> Pesa direttamente nel robot, preciso al decimo di grammo!</span>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            {/* Price Box */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 mb-6 shadow-lg relative">
              {/* Bollino Sconto - URGENZA */}
              <div className="absolute -top-3 -right-3 bg-red-600 text-white text-sm font-black w-14 h-14 rounded-full shadow-lg transform rotate-12 flex items-center justify-center text-center leading-tight">
                -85%
              </div>

              {/* Titolo e Recensioni */}
              <h2 className="text-xl font-black text-[#0f1c3f] text-center mb-1">
                Robot Cucina Multifunzione 12in1
              </h2>
              <p className="text-xs text-gray-500 text-center mb-2">App per SmartPhone inclusa, senza abbonamenti.</p>
              <div
                className="flex items-center justify-center space-x-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-500 text-sm underline">(4.847 recensioni)</span>
              </div>

              <div className="flex items-center justify-center mb-2">
                <span className="text-gray-400 line-through text-2xl" style={{ fontFamily: 'var(--font-montserrat)' }}>€449</span>
              </div>
              <div className="flex items-center justify-center mb-4">
                <span className="text-6xl font-black text-orange-500" style={{ fontFamily: 'var(--font-montserrat)' }}>€69</span>
              </div>

              {/* Spedizione e Pagamento */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                  <Truck className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="font-bold text-slate-800 text-sm">Consegna</p>
                  <p className="text-green-600 text-xs font-bold">2-4 giorni lavorativi</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <span className="text-2xl block mb-1">💶</span>
                  <p className="font-bold text-slate-800 text-sm">Pagamento</p>
                  <p className="text-green-600 text-xs font-bold">Alla consegna</p>
                </div>
              </div>

              <button
                onClick={openOrderPopup}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-6 rounded-xl font-black text-lg transition-all cursor-pointer shadow-lg"
              >
                ORDINA ORA
              </button>

              {/* Urgenza */}
              <p className="text-center text-red-600 font-black mt-2 text-lg">
                Il deposito chiude fra: 3 giorni
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4">
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-green-800" />
                  <span className="text-green-800 font-medium">Garanzia 24 mesi</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <CheckCircle className="w-5 h-5 mx-auto mb-1 text-green-800" />
                  <span className="text-green-800 font-medium">Reso 30 giorni</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <Zap className="w-5 h-5 mx-auto mb-1 text-green-800" />
                  <span className="text-green-800 font-medium">Spedizione 48h</span>
                </div>
              </div>
            </div>

            {/* Bullet Points - SOLO DESKTOP */}
            <div className="hidden lg:block bg-slate-50 rounded-xl p-5 text-left border border-slate-200">
              <h3 className="text-lg font-black text-slate-800 mb-3 text-center">12 FUNZIONI IN 1 ROBOT:</h3>
              <ul className="space-y-3 text-slate-700 text-base">
                <li className="flex items-start gap-3">
                  <Utensils className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-800">TRITA, SMINUZZA E FRULLA:</strong> Verdure, carne, vellutate, omogeneizzati, chips... tutto in pochi secondi, senza fatica.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChefHat className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-800">IMPASTA E MONTA:</strong> Pizza, pane, pasta fresca, dolci, panna montata, pan di spagna... addio fruste e planetaria!</span>
                </li>
                <li className="flex items-start gap-3">
                  <Flame className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                                    <span><strong className="text-slate-800">CUOCE COME UN SUPERCHEF (NORMALE + VAPORE):</strong> Riso, zuppe, carne, verdure al vapore... mescola DA SOLO e il risultato è da ristorante!</span>

                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-800">FRITTURA SUPER CROCCANTE (CLASSICA + AD ARIA):</strong> Patatine croccanti, zero cattivi odori, fritture perfette, anche senza olio!</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-800">TOUCHSCREEN CON 999+ RICETTE:</strong> Display touch intuitivo con ricette preimpostate e manuali. Scegli la ricetta dal menu e premi avvio: fa tutto lui!</span>
                </li>
              </ul>
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span className="text-amber-800 text-sm"><strong>+ BILANCIA INTEGRATA:</strong> Pesa direttamente nel robot, preciso al decimo di grammo!</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Striscia Urgenza - ROSSO OK */}
      <div className="bg-red-600 text-white py-4 text-center font-bold px-4">
        <p className="text-lg md:text-xl mb-1">SVUOTATUTTO DEPOSITO</p>
        <p className="text-sm md:text-base opacity-90">Il deposito chiude definitivamente. Rimangono solo 7 pezzi a questo prezzo!</p>
      </div>

      {/* SEZIONE PROBLEMA */}
      <section className="py-5 md:py-10 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4 md:mb-6 text-red-800">
            LA TUA CUCINA È UN CAOS?
          </h2>

          {/* Problemi in lista compatta */}
          <div className="bg-white rounded-xl p-4 md:p-6 mb-4 md:mb-6 shadow-sm">
            <ul className="space-y-2 md:space-y-3 text-gray-700">
              <li className="flex items-start gap-2"><span className="text-red-600 font-bold">✗</span><span><strong>Troppi elettrodomestici</strong> che occupano spazio e usi raramente</span></li>
              <li className="flex items-start gap-2"><span className="text-red-600 font-bold">✗</span><span><strong>€400+ spesi</strong> per apparecchi che fanno una sola funzione</span></li>
              <li className="flex items-start gap-2"><span className="text-red-600 font-bold">✗</span><span><strong>Ore ai fornelli</strong> a tagliare, mescolare, controllare...</span></li>
              <li className="flex items-start gap-2"><span className="text-red-600 font-bold">✗</span><span><strong>Robot pro a €1200+?</strong> Impossibile. Quelli economici? Inutili.</span></li>
            </ul>
          </div>

          {/* Soluzione */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-4 md:p-6 text-white text-center shadow-xl">
            <h3 className="text-lg md:text-2xl font-black mb-3">
              LA SOLUZIONE: <span className="text-orange-400">UN SOLO ROBOT A €69</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-3">
              <div className="bg-white/10 rounded-lg p-2">
                <div className="text-xl md:text-2xl font-bold">12</div>
                <p className="text-[10px] md:text-xs">FUNZIONI</p>
              </div>
              <div className="bg-white/10 rounded-lg p-2">
                <div className="text-xl md:text-2xl font-bold">1500W</div>
                <p className="text-[10px] md:text-xs">POTENZA</p>
              </div>
              <div className="bg-white/10 rounded-lg p-2">
                <div className="text-xl md:text-2xl font-bold">6L</div>
                <p className="text-[10px] md:text-xs">CAPIENZA</p>
              </div>
              <div className="bg-white/10 rounded-lg p-2">
                <div className="text-xl md:text-2xl font-bold text-orange-400">APP</div>
                <p className="text-[10px] md:text-xs">SMARTPHONE</p>
              </div>
            </div>
            <p className="text-sm md:text-base">
              Fa TUTTO, costa NIENTE, libera la tua cucina!
            </p>
          </div>

          {/* Box Regalo */}
          <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 md:p-4 mt-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl md:text-3xl">🎁</span>
              <div>
                <p className="text-amber-900 font-bold text-sm md:text-base mb-1">IDEA REGALO PERFETTA!</p>
                <p className="text-amber-800 text-sm md:text-base">
                  Utile per chiunque: moglie, mamma, suocera, amica... A €69 <strong>nessuno immaginerà quanto lo hai pagato!</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COSA PUOI FARE - 6 Box */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-[#0f1c3f] tracking-tight">
            COSA CAMBIERÀ NELLA TUA CUCINA?
          </h2>
          <p className="text-lg text-gray-600 text-center mb-10">
            Non è uno strumento, è un superlchef sempre presente nella tua cucina.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Box 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:border-orange-400 transition-all">
              <div className="bg-slate-800 text-white text-center py-2 font-bold">TRITA, SMINUZZA E AFFETTA</div>
              <div className="p-5">
                <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop" alt="Trita e sminuzza" className="w-full h-40 object-cover rounded-xl mb-4" />
                <p className="text-base text-gray-700 leading-relaxed">
                  Verdure a Juelienne, cubetti o tritate? In <strong>3 secondi</strong> hai verdure tagliate perfettamente, utile anche per fare le patatine e le chips. Carne macinata perfetta. <strong>Addio coltello e tagliere!</strong>
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:border-orange-400 transition-all">
              <div className="bg-slate-800 text-white text-center py-2 font-bold">FRULLATI E OMOGENEIZZATI SENZA GRUMI</div>
              <div className="p-5">
                <img src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=300&h=300&fit=crop" alt="Frulla e omogeneizza" className="w-full h-40 object-cover rounded-xl mb-4" />
                <p className="text-base text-gray-700 leading-relaxed">
                  Vellutate cremose, smoothie perfetti, pappe per bimbi, salse... <strong>Consistenza professionale</strong> in secondi. Il ghiaccio? Lo polverizza come neve.
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:border-orange-400 transition-all">
              <div className="bg-slate-800 text-white text-center py-2 font-bold">IMPASTA COME UN PRO</div>
              <div className="p-5">
                <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop" alt="Impasta come un pro" className="w-full h-40 object-cover rounded-xl mb-4" />
                <p className="text-base text-gray-700 leading-relaxed">
                  Pizza, pane, pasta fresca, dolci, brioche... <strong>1500W di potenza</strong> per impasti perfetti. Sostituisce planetarie da €400+. Mani sempre pulite!
                </p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:border-orange-400 transition-all">
              <div className="bg-slate-800 text-white text-center py-2 font-bold">4 COTTURE IN UN SOLO STRUMENTO</div>
              <div className="p-5">
                <img src="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=300&h=300&fit=crop" alt="Cuoce automaticamente" className="w-full h-40 object-cover rounded-xl mb-4" />
                <p className="text-base text-gray-700 leading-relaxed">
                  <strong>Cottura tradizionale, al vapore, frittura classica e frittura ad aria. </strong>Mescola da solo e non attacca mai! Usa il pratico cestello vapore per verdure croccanti, pesce e carne sana senza grassi. <strong>Temperature sempre costanti per cotture perfette.</strong>
                </p>
              </div>
            </div>

            {/* Box 5 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:border-orange-400 transition-all">
              <div className="bg-slate-800 text-white text-center py-2 font-bold">BILANCIA INTEGRATA ULTRAPRECISA</div>
              <div className="p-5">
                <img src="https://images.unsplash.com/photo-1607877742574-a3d21c560e55?w=300&h=300&fit=crop" alt="Bilancia integrata" className="w-full h-40 object-cover rounded-xl mb-4" />
                <p className="text-base text-gray-700 leading-relaxed">
                  Pesa gli ingredienti <strong>DIRETTAMENTE nel robot!</strong> Zero bilance esterne, zero sporco in più. Precisione al grammo per ricette perfette ogni volta.
                </p>
              </div>
            </div>

            {/* Box 6 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:border-orange-400 transition-all">
              <div className="bg-slate-800 text-white text-center py-2 font-bold">DURATA GARANTITA 10+ ANNI</div>
              <div className="p-5">
                <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop" alt="Qualità tedesca" className="w-full h-40 object-cover rounded-xl mb-4" />
                <p className="text-base text-gray-700 leading-relaxed">
                  <strong>Qualità tedesca certificata.</strong> Se si rompe un pezzo, non butti tutto: i ricambi costano pochissimo e si trovano sempre. <strong>Durata testata: 10 anni!</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Box Pulizia Facile */}
          <div className="mt-8 bg-gradient-to-r from-sky-50 to-sky-100 border-2 border-sky-200 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="text-5xl">✨</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-black text-slate-800 mb-2">PULIZIA? UN GIOCO DA RAGAZZI!</h3>
                <p className="text-gray-700">
                  Ciotola <strong>completamente antiaderente</strong>: non si attacca nulla, neanche i sughi più ostinati.
                  Niente viti, niente smontaggio complicato: <strong>un click e la ciotola si stacca</strong> e puoi lavarla anche in lavastoviglie.
                 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione CONFRONTO PREZZI */}
      <section className="py-8 md:py-12 bg-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-[#0f1c3f] tracking-wide">
            FACCIAMO DUE CONTI?
          </h2>
          <p className="text-lg text-gray-600 text-center mb-5 md:mb-10">
            Quanto avresti speso per avere le stesse funzioni?
          </p>

          <div className="bg-white rounded-2xl p-4 md:p-8 border border-slate-200 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Colonna elettrodomestici singoli */}
              <div>
                <h3 className="text-xl font-bold text-slate-700 mb-4 text-center">COMPRANDO TUTTO SEPARATO:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between border-b pb-2"><span>Frullatore potente</span><span className="font-bold">€80-120</span></li>
                  <li className="flex justify-between border-b pb-2"><span>Tritatutto</span><span className="font-bold">€50-80</span></li>
                  <li className="flex justify-between border-b pb-2"><span>Impastatrice/Planetaria</span><span className="font-bold">€150-300</span></li>
                  <li className="flex justify-between border-b pb-2"><span>Vaporiera</span><span className="font-bold">€40-80</span></li>
                  <li className="flex justify-between border-b pb-2"><span>Bilancia cucina</span><span className="font-bold">€20-40</span></li>
                  <li className="flex justify-between border-b pb-2"><span>Varie padelle</span><span className="font-bold">€100-150</span></li>
                  <li className="flex justify-between pt-2 text-lg"><span className="font-black">TOTALE:</span><span className="font-black text-slate-800">€440-770</span></li>
                </ul>
              </div>

              {/* Colonna robot */}
              <div className="bg-green-50 rounded-xl p-3 md:p-4 border border-green-200">
                <h3 className="text-lg md:text-xl font-bold text-green-700 mb-2 md:mb-4 text-center">CON IL NOSTRO ROBOT:</h3>
                <div className="text-center">
                  <p className="text-gray-400 line-through text-lg md:text-2xl">€449</p>
                  <p className="text-4xl md:text-6xl font-black text-orange-500 my-1 md:my-4">€69</p>
                  <p className="text-green-700 font-bold text-base md:text-xl">RISPARMI FINO A €700!</p>
                  <div className="mt-2 md:mt-4 bg-white rounded-lg p-2 md:p-3 border border-green-200 text-xs md:text-base">
                    <p className="font-bold text-slate-700">+ Tutto in UN SOLO apparecchio</p>
                    <p className="font-bold text-slate-700">+ Zero ingombro in cucina</p>
                    <p className="font-bold text-slate-700">+ Facile da pulire</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-[#0f1c3f] tracking-tight">
            CON VS SENZA ROBOT
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            La differenza è ABISSALE
          </p>
          <div className="mb-8 overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden text-sm md:text-base shadow-md">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left w-[40%]"></th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-center bg-green-600 w-[30%]">
                    <div className="font-bold text-sm md:text-base">CON IL ROBOT</div>
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-center bg-slate-600 w-[30%]">
                    <div className="font-bold text-sm md:text-base">SENZA ROBOT</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-3 md:px-6 py-2 md:py-3 font-bold text-slate-900 text-sm md:text-base">{row.feature}</td>
                    <td className="px-3 md:px-6 py-2 md:py-3 text-center font-bold text-sm md:text-base text-green-700 bg-green-50">
                      {row.robot}
                    </td>
                    <td className="px-3 md:px-6 py-2 md:py-3 text-center text-slate-600 text-sm md:text-base bg-slate-50">{row.without}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Urgency Strip - ROSSO OK */}
      <section className="bg-red-600 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white text-lg md:text-xl font-bold mb-3">
            REGALO DI FINE ANNO - Solo 7 pezzi rimasti, poi il deposito chiude!
          </p>
          <button
            onClick={openOrderPopup}
            className="bg-white text-slate-800 hover:bg-gray-100 py-3 px-8 rounded-xl font-bold text-lg transition-all cursor-pointer"
          >
            LO VOGLIO ADESSO!
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews-section" className="py-12 bg-slate-800">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-2 tracking-wide">
            4.847 CLIENTI SODDISFATTI
          </h2>
          <p className="text-center text-white/70 mb-8">Ecco cosa dicono di questo robot</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, i) => (
              <div key={i} className={`bg-white rounded-xl p-4 shadow ${i >= visibleReviews ? 'hidden md:block' : ''}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold">
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
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded block mb-1">✓ Acquisto Verificato</span>
                    <span className="text-xs text-gray-500">{review.data}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{review.testo}</p>
                {review.risposta && (
                  <div className="mt-3 bg-slate-50 border-l-4 border-slate-400 p-3 rounded-r-lg">
                    <p className="text-xs font-bold text-slate-700 mb-1">Risposta del venditore:</p>
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
                className="bg-white text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
              >
                Vedi altre recensioni
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How to Order */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-[#0f1c3f] mb-6 text-center tracking-wide">
            COME ORDINARE
          </h2>
          <div className="flex flex-row items-start justify-center gap-2 md:gap-6">
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-slate-700 text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">1</div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Compila il modulo sotto</p>
            </div>
            <div className="text-slate-300 text-xl md:text-2xl mt-3">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-slate-700 text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">2</div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Ti chiamiamo per conferma</p>
            </div>
            <div className="text-slate-300 text-xl md:text-2xl mt-3">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">3</div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Ricevi in 48h, PAGHI ALLA CONSEGNA!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modulo d'Ordine */}
      <section id="order-form-section" className="bg-slate-800 py-12 pb-8">
        <div className="max-w-xl mx-auto px-4">
          {/* Badge urgenza - ROSSO OK */}
          <div className="bg-red-600 text-white font-bold text-center py-2 rounded-full mb-4">
            REGALO DI FINE ANNO - SOLO 7 PEZZI RIMASTI
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 text-center tracking-wide">
            ORDINA ORA
          </h2>
          <p className="text-white/80 mb-6 text-center">
            Approfitta del regalo di fine anno! Paghi alla consegna.
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-xl">
            {/* Product Summary */}
            <div className="bg-slate-50 rounded-lg p-3 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#0f1c3f]">Robot Cucina 12in1</span>
                  <p className="text-sm text-gray-600">1500W • 6L • 12 funzioni</p>
                  <div className="mt-1">
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">SCONTO 85%</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 line-through text-sm block" style={{ fontFamily: 'var(--font-montserrat)' }}>€449</span>
                  <span className="text-3xl font-black text-orange-500" style={{ fontFamily: 'var(--font-montserrat)' }}>€69</span>
                </div>
              </div>
            </div>

            {/* Urgenza */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-5 text-center">
              <p className="text-red-700 font-bold">
                Il deposito chiude fra: 3 giorni
              </p>
            </div>

            {submitError && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                <p className="text-red-700 text-sm text-center">{submitError}</p>
              </div>
            )}

            <div className="space-y-4 mb-5">
              <div>
                <label className="block text-[#0f1c3f] font-medium mb-2">Nome e Cognome *</label>
                <input
                  type="text"
                  name="name"
                  value={orderData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
                  placeholder="Mario Rossi"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-[#0f1c3f] font-medium mb-2">Telefono (Cellulare) *</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
                  placeholder="333 1234567"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-[#0f1c3f] font-medium mb-2">Indirizzo Completo *</label>
                <input
                  type="text"
                  name="address"
                  value={orderData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
                  placeholder="Via, Numero Civico, CAP, Città"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 px-4 rounded-xl font-bold text-xl transition duration-300 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white cursor-pointer shadow-lg'
              }`}
            >
              {isSubmitting ? 'INVIO IN CORSO...' : 'CONFERMA ORDINE - €69'}
            </button>

            {/* Data Protection */}
            <p className="text-center text-gray-500 text-xs mt-4">
              I tuoi dati sono al sicuro. Li usiamo SOLO per la spedizione.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-100 py-8 pb-32">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8 text-[#0f1c3f] tracking-wide">
            DOMANDE FREQUENTI
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-[#0f1c3f]">{faq.question}</h3>
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
