'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, Truck, Shield, Clock, ChevronLeft, ChevronRight, 
  Star, Phone, MapPin, User, AlertTriangle, Zap, ThumbsUp 
} from 'lucide-react';

// --- TYPE DEFINITIONS ---
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function AirWaveSmartLanding() {
  // --- STATE MANAGEMENT ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 32); // Partiamo da 14:32 per sembrare più reale
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ nome: '', telefono: '', indirizzo: '' });
  
  // Refs per lo scroll
  const orderSectionRef = useRef<HTMLElement>(null);

  // --- PLACEHOLDER IMAGES (Sostituisci con le tue foto reali 1:1) ---
  const slides = [
    'https://picsum.photos/800/800?random=1', // Foto principale prodotto
    'https://picsum.photos/800/800?random=2', // Contesto uso (salotto)
    'https://picsum.photos/800/800?random=3', // Pannello comandi
    'https://picsum.photos/800/800?random=4', // Camera da letto
  ];

  // --- EFFECTS ---
  
  // Timer Countdown (Urgenza)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-slide Hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [slides.length]);

  // --- HELPERS ---
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const scrollToOrder = () => {
    orderSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    // Validazione semplice ma robusta
    if (!formData.nome || formData.nome.length < 3) {
      alert('Per favore inserisci Nome e Cognome validi.');
      return;
    }
    if (!formData.telefono || formData.telefono.length < 9) {
      alert('Inserisci un numero di telefono valido per la consegna.');
      return;
    }
    if (!formData.indirizzo || formData.indirizzo.length < 5) {
      alert('Inserisci l\'indirizzo completo (Via, Civico, Città).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://ap.purchstar.com/api/networks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.nome.split(' ')[0] || formData.nome,
          lastName: formData.nome.split(' ').slice(1).join(' ') || '.',
          phone: formData.telefono,
          address: formData.indirizzo,
          product: 'Air Wave Smart',
          price: 199,
          source: 'new-landing-cro', // Tagghiamo la fonte
        }),
      });

      if (response.ok) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-17104994752/jZlCPqKod4aEMCDptw',
            'value': 199,
            'currency': 'EUR',
          });
        }
        // Redirect alla Thank You Page
        window.location.href = '/ty/ty-airwave';
      } else {
        alert('Errore di connessione. Riprova o chiamaci.');
      }
    } catch (error) {
      console.error(error);
      alert('Si è verificato un errore. Riprova tra poco.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- COMPONENTS ---

  return (
    <div className="min-h-screen bg-white text-black font-sans leading-relaxed pb-24 md:pb-0">
      
      {/* TOP STRIP - URGENZA & TRUST */}
      <div className="bg-red-700 text-white text-center py-2 px-2 font-bold text-sm md:text-base sticky top-0 z-50 shadow-md">
        ⚠️ ATTENZIONE: ULTIMI 7 PEZZI A MAGAZZINO
      </div>

      {/* 1. HERO SECTION (L'Uncino) */}
      <section className="px-4 pt-6 pb-8 max-w-lg mx-auto md:max-w-4xl">
        
        {/* Social Proof Immediata */}
        <div className="flex justify-center items-center gap-3 mb-4">
          <span className="bg-yellow-400 text-black text-xs font-black px-3 py-1 uppercase tracking-wider rounded-sm transform -skew-x-12">
            Visto in TV
          </span>
          <div className="flex text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
          <span className="text-gray-500 text-xs font-bold">(2.450+ Ordini)</span>
        </div>

        {/* HEADLINE SHOCK */}
        <h1 className="text-3xl md:text-5xl font-black text-center leading-tight mb-2">
          BASTA SUDARE IN CASA TUA!
        </h1>
        <p className="text-xl md:text-2xl text-center text-gray-600 font-bold mb-6">
          Il nuovo climatizzatore <span className="text-red-600 bg-red-50 px-1">SENZA TUBO ESTERNO</span> che rinfresca tutta la casa in 5 minuti.
        </p>

        {/* SLIDER IMMAGINI (1:1) */}
        <div className="relative aspect-square max-w-md mx-auto bg-gray-100 rounded-xl overflow-hidden shadow-2xl border-4 border-white mb-6">
          <img
            src={slides[currentSlide]}
            alt="Air Wave Smart Condizionatore Portatile"
            className="w-full h-full object-cover"
          />
          
          {/* Badge Sconto sulla foto */}
          <div className="absolute top-4 right-4 bg-red-600 text-white w-20 h-20 rounded-full flex flex-col items-center justify-center font-black shadow-lg transform rotate-12 z-10 border-2 border-white">
            <span className="text-xs">SCONTO</span>
            <span className="text-2xl">-60%</span>
          </div>

          {/* Navigation Arrows */}
          <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg text-black hover:bg-gray-200"><ChevronLeft size={24} /></button>
          <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg text-black hover:bg-gray-200"><ChevronRight size={24} /></button>
        </div>

        {/* PREZZO & CTA HERO */}
        <div className="text-center mb-6">
          <p className="text-gray-400 font-bold line-through text-lg">Prezzo listino: €499,00</p>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl font-bold text-gray-700">SOLO OGGI:</span>
            <span className="text-6xl font-black text-green-600 tracking-tighter">€199</span>
          </div>
          <p className="text-red-600 font-bold text-sm mb-4 animate-pulse">🔥 L'offerta scade tra {formatTime(timeLeft)}</p>

          <button 
            onClick={scrollToOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white text-xl md:text-2xl font-black py-5 px-4 rounded-lg shadow-[0_4px_0_rgb(21,128,61)] transform active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
          >
            <Truck className="w-8 h-8" />
            SI, LO VOGLIO ORA!
          </button>
          <p className="mt-3 text-sm font-bold text-gray-600 flex justify-center items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" /> PAGAMENTO ALLA CONSEGNA
          </p>
        </div>
      </section>

      {/* 2. PROBLEMA/AGITAZIONE (Il Dolore) */}
      <section className="bg-gray-100 py-10 px-4 border-t border-gray-200">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center text-gray-800 mb-8 uppercase">
            TI RICONOSCI IN QUESTI PROBLEMI?
          </h2>
          
          <div className="space-y-4">
            {[
              "La notte ti giri nel letto sudato e non chiudi occhio?",
              "Il tuo condominio VIETA di mettere motori esterni sulla facciata?",
              "Hai paura di vedere la bolletta della luce raddoppiata?",
              "I tecnici ti hanno chiesto 1.500€ solo per l'installazione?"
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-lg shadow-sm border-l-8 border-red-500">
                <div className="bg-red-100 p-2 rounded-full min-w-[40px] flex items-center justify-center">
                  <AlertTriangle className="text-red-600 w-6 h-6" />
                </div>
                <p className="text-lg font-bold text-gray-700 leading-snug">{text}</p>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-xl font-medium">
            Non è colpa tua. I vecchi condizionatori sono <span className="font-black text-red-600 bg-red-100 px-1">costosi, rumorosi e brutti</span>.
          </p>
        </div>
      </section>

      {/* 3. LA SOLUZIONE (Il Prodotto) */}
      <section className="py-10 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4 text-green-700">
          ECCO LA SOLUZIONE DEFINITIVA
        </h2>
        <p className="text-center text-xl text-gray-600 font-bold mb-8">
          Air Wave Smart™: Il climatizzatore portatile che attacchi alla presa e funziona subito.
        </p>

        {/* BULLET POINTS AGGRESSIVI */}
        <div className="space-y-3 mb-10">
          {[
            { title: "ZERO INSTALLAZIONE", desc: "Dimentica buchi nel muro, tubi esterni e tecnici costosi." },
            { title: "POTENZA 12.000 BTU", desc: "Raffredda stanze fino a 60mq in meno di 8 minuti." },
            { title: "RISPARMIO ENERGETICO A+++", desc: "Tecnologia Inverter che abbatte i costi in bolletta." },
            { title: "3-IN-1 TOTALE", desc: "Raffredda d'estate, Riscalda d'inverno, Deumidifica sempre." },
            { title: "SILENZIO ASSOLUTO", desc: "Modalità 'Notte' ultra-silenziosa per dormire sonni tranquilli." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <Check className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" strokeWidth={4} />
              <div>
                <h3 className="font-black text-xl text-gray-800 uppercase">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* COME FUNZIONA (3 step a prova di bambino) */}
        <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-100">
          <h3 className="text-center font-black text-2xl mb-6 uppercase text-blue-900">Come si usa? Facilissimo!</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: 1, title: "SCARTA", text: "Apri la scatola appena arriva il corriere." },
              { step: 2, title: "COLLEGA", text: "Attacca la spina a una normale presa di corrente." },
              { step: 3, title: "ACCENDI", text: "Premi ON e goditi l'aria fresca all'istante!" }
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-3 shadow-lg">
                  {s.step}
                </div>
                <h4 className="font-black text-lg">{s.title}</h4>
                <p className="text-sm text-gray-700 font-medium">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DEMONSTRAZIONE (Griglia Visiva) */}
      <section className="bg-gray-900 text-white py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8 uppercase text-yellow-400">
          TECNOLOGIA GIAPPONESE DI ULTIMA GENERAZIONE
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { img: 'https://picsum.photos/400/400?random=10', label: "GHIACCIA IN 5 MINUTI" },
            { img: 'https://picsum.photos/400/400?random=11', label: "FILTRO ARIA PURA" },
            { img: 'https://picsum.photos/400/400?random=12', label: "DISPLAY TOUCH" },
            { img: 'https://picsum.photos/400/400?random=13', label: "TELECOMANDO INCLUSO" },
            { img: 'https://picsum.photos/400/400?random=14', label: "RUOTE GIREVOLI" },
            { img: 'https://picsum.photos/400/400?random=15', label: "CONSUMI RIDOTTI" },
          ].map((item, i) => (
            <div key={i} className="relative group overflow-hidden rounded-lg aspect-square border-2 border-gray-700">
              <img src={item.img} alt={item.label} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-2 text-center font-bold text-sm md:text-base">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ANCORAGGIO DI PREZZO (Comparison) */}
      <section className="py-10 px-4">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">
          PERCHÉ TUTTI SCELGONO <br/><span className="text-green-600">AIR WAVE SMART?</span>
        </h2>
        <div className="max-w-xl mx-auto border-2 border-gray-200 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-center text-white">
                <th className="py-4 px-2 bg-gray-400 w-1/2">CONDIZIONATORE VECCHIO</th>
                <th className="py-4 px-2 bg-green-600 w-1/2 font-black text-lg transform scale-105 shadow-md">AIR WAVE SMART</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold">
              {[
                ["Costo oltre €1.000", "Solo €199 (Oggi)"],
                ["Richiede tecnico (€500)", "Fai da te (GRATIS)"],
                ["Buchi nel muro", "Nessun lavoro"],
                ["Bollette salate", "Risparmio 60%"],
                ["Rumoroso", "Silenzioso"],
                ["Fisso in una stanza", "Portatile ovunque"]
              ].map(([bad, good], i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="py-4 px-2 text-center text-gray-500 bg-gray-50 flex flex-col items-center justify-center h-full">
                    <span className="line-through mb-1">{bad}</span>
                    <span className="text-red-500 text-xs">❌ MALE</span>
                  </td>
                  <td className="py-4 px-2 text-center text-green-700 bg-green-50 text-base md:text-lg">
                    {good} <br/><span className="text-xs uppercase bg-green-200 px-2 rounded-full">✓ VINCITORE</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. IL BUNDLE (L'Offerta Irrinunciabile) */}
      <section className="bg-yellow-50 py-10 px-4 border-y-4 border-yellow-400 border-dashed">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-2 uppercase">🎁 Offerta Limitata</h2>
          <p className="text-center text-gray-700 mb-6 font-medium">Ordinando OGGI ricevi il KIT COMPLETO:</p>
          
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <div className="flex justify-between items-center text-lg font-bold text-gray-400 line-through">
              <span>1x Air Wave Smart 12.000 BTU</span>
              <span>€499,00</span>
            </div>
            
            {[
              { name: "Telecomando Smart", val: "€29,00" },
              { name: "Kit Guarnizioni Finestra", val: "€39,00" },
              { name: "Filtro HEPA Aggiuntivo", val: "€19,00" },
              { name: "Spedizione Rapida", val: "€15,00" },
              { name: "Garanzia 2 Anni", val: "€49,00" },
            ].map((bonus, i) => (
              <div key={i} className="flex justify-between items-center text-green-700 font-bold bg-green-50 p-2 rounded">
                <span className="flex items-center gap-2"><Check size={18} /> {bonus.name}</span>
                <span className="uppercase text-sm bg-green-600 text-white px-2 py-0.5 rounded">GRATIS</span>
              </div>
            ))}

            <div className="border-t-2 border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-end">
                <div className="text-left">
                  <p className="text-sm text-gray-500">Valore Totale Reale</p>
                  <p className="text-xl line-through text-red-400 font-bold">€650,00</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-bold uppercase">Paghi solo oggi:</p>
                  <p className="text-5xl font-black text-green-600 leading-none">€199</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RECENSIONI (Social Proof) */}
      <section className="py-12 px-4 bg-white">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">
          ⭐ DICONO DI NOI (4.8/5)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { name: "Maria Rossi", loc: "Milano", txt: "Ero scettica, ma mi ha salvato l'estate! Arrivato in 24h, pagato al corriere. Rinfresca davvero!", vote: 5 },
            { name: "Luigi Bianchi", loc: "Roma", txt: "Ottimo prodotto. Non potevo mettere l'unità esterna in centro storico. Questo è perfetto e silenzioso.", vote: 5 },
            { name: "Anna Verdi", loc: "Napoli", txt: "Consuma pochissimo! Lo uso anche d'inverno per scaldare il bagno. Consigliatissimo.", vote: 5 },
            { name: "Piero Neri", loc: "Torino", txt: "Facile da usare, mia madre di 80 anni lo adora. Niente più caldo soffocante.", vote: 4 }
          ].map((rev, i) => (
            <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                {[...Array(rev.vote)].map((_, j) => <Star key={j} className="fill-current w-4 h-4" />)}
              </div>
              <p className="text-gray-800 italic mb-3">"{rev.txt}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600">{rev.name[0]}</div>
                <div>
                  <p className="font-bold text-sm">{rev.name}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><Check size={10} /> Acquisto Verificato • {rev.loc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. MODULO D'ORDINE (Frizione Zero) */}
      <section id="order-section" ref={orderSectionRef} className="py-10 px-4 bg-red-700">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Header Form */}
          <div className="bg-gray-100 p-4 text-center border-b-2 border-gray-200">
            <h3 className="text-2xl font-black text-gray-800">COMPILA IL MODULO</h3>
            <p className="text-green-600 font-bold flex justify-center items-center gap-1 text-sm mt-1">
              <Truck size={16} /> Spedizione GRATIS + Pagamento alla Consegna
            </p>
          </div>

          <div className="p-6">
            
            {/* Scarcity Timer nel form */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center mb-6">
              <p className="text-red-600 font-bold text-sm">L'OFFERTA A €199 SCADE TRA:</p>
              <p className="text-3xl font-black text-red-700 font-mono">{formatTime(timeLeft)}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1 text-sm uppercase">Nome e Cognome</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Es. Mario Rossi"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:bg-white focus:outline-none transition-colors text-lg"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1 text-sm uppercase">Numero di Telefono</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input 
                    type="tel" 
                    placeholder="Es. 340 1234567"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:bg-white focus:outline-none transition-colors text-lg"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Il corriere ti chiamerà prima di arrivare.</p>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1 text-sm uppercase">Indirizzo e Città</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <textarea 
                    rows={2}
                    placeholder="Via Roma 10, Milano, 20100"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:bg-white focus:outline-none transition-colors text-lg resize-none"
                    value={formData.indirizzo}
                    onChange={(e) => setFormData({...formData, indirizzo: e.target.value})}
                  />
                </div>
              </div>

              <div className="py-2">
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full text-white font-black text-xl md:text-2xl py-4 rounded-xl shadow-lg border-b-4 transform active:scale-95 transition-all ${
                    isSubmitting ? 'bg-gray-400 border-gray-500 cursor-not-allowed' : 'bg-green-600 border-green-800 hover:bg-green-500'
                  }`}
                >
                  {isSubmitting ? 'INVIO ORDINE...' : 'ORDINA ADESSO'}
                </button>
                <p className="text-center text-xs text-gray-500 mt-2">Cliccando confermi l'ordine. Pagherai €199 in contanti al corriere.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 p-3 text-center border-t border-gray-200">
            <img src="https://picsum.photos/300/50?grayscale" alt="Loghi Spedizionieri" className="h-8 mx-auto opacity-50 mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-8 text-center text-gray-400 text-xs">
        <p>Air Wave Smart © 2025 - Tutti i diritti riservati.</p>
        <p>Privacy Policy | Termini e Condizioni</p>
        <p className="mt-2">Questo sito non fa parte del sito Facebook o Facebook Inc.</p>
      </footer>

      {/* STICKY MOBILE CTA BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green-600 p-2 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-40 flex items-center justify-between gap-2">
        <div className="flex flex-col pl-2">
          <span className="text-xs text-gray-500 line-through">€499</span>
          <span className="text-2xl font-black text-green-700 leading-none">€199</span>
        </div>
        <button 
          onClick={scrollToOrder}
          className="flex-1 bg-green-600 text-white font-black text-lg py-3 rounded-lg shadow-md animate-pulse"
        >
          ORDINA ORA
        </button>
      </div>

    </div>
  );
}