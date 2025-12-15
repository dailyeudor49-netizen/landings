'use client';
import React, { useState, useEffect } from 'react';
import { Check, Truck, Shield, Clock, ChevronLeft, ChevronRight, Star, Phone, MapPin, User } from 'lucide-react';

// Dichiarazioni TypeScript per Google Ads
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function AirWaveSmartLanding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ nome: '', telefono: '', indirizzo: '' });

  const slides = [
    '/images/condizionatore/specifiche.webp',
    '/images/condizionatore/caldo-freddo.webp',
    '/images/condizionatore/installazione.webp',
    '/images/condizionatore/silenzioso.webp',
    '/images/condizionatore/risparmio.webp',
  ];

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const scrollToOrder = () => {
    document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!formData.nome || !formData.telefono || !formData.indirizzo) {
      alert('Compila tutti i campi!');
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch('https://ap.purchstar.com/api/networks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.nome.split(' ')[0] || formData.nome,
          lastName: formData.nome.split(' ').slice(1).join(' ') || '',
          phone: formData.telefono,
          address: formData.indirizzo,
          product: 'Air Wave Smart',
          price: 199,
          source: 'new-cond',
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
        window.location.href = '/ty/ty-airwave';
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reviews = [
    { nome: 'Mario R.', testo: 'arrivato in 2 giorni, pagato al corriere. funziona benissimo, la casa è fresca e la bolletta non è salita', stelle: 5 },
    { nome: 'Giuseppe T.', testo: 'ero scettico ma devo dire che funziona. mia moglie non si lamenta più del caldo la notte', stelle: 5 },
    { nome: 'Anna M.', testo: 'finalmente dormo! col caldo non chiudevo occhio, ora la camera è sempre fresca. consigliatissimo', stelle: 5 },
    { nome: 'Franco B.', testo: 'nel mio condominio non si può mettere il condizionatore fuori. questo ha risolto il problema', stelle: 5 },
    { nome: 'Lucia P.', testo: 'spedizione velocissima e si paga alla consegna. prodotto ottimo, lo uso tutti i giorni', stelle: 4 },
    { nome: 'Roberto C.', testo: 'lo uso anche per scaldare d inverno. praticamente due prodotti in uno', stelle: 5 },
    { nome: 'Carla S.', testo: 'ho 68 anni e il caldo mi faceva stare male. adesso sto molto meglio grazie a questo apparecchio', stelle: 5 },
    { nome: 'Vincenzo D.', testo: 'pensavo costasse di più l elettricità invece quasi non se ne accorge. classe A+++ vuol dire qualcosa', stelle: 5 },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* HERO SECTION */}
      <section className="px-4 pt-4 pb-6">
        {/* Social Proof Badge */}
        <div className="flex justify-center gap-2 mb-4">
          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">BEST SELLER 2025</span>
          <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded">⭐ 4.8/5</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl md:text-4xl font-black text-center leading-tight mb-4">
          STOP AL CALDO INFERNALE:<br/>
          <span className="text-red-600">RINFRESCA TUTTA LA CASA</span><br/>
          SENZA INSTALLAZIONE
        </h1>

        {/* Slider 1:1 */}
        <div className="relative max-w-md mx-auto mb-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={slides[currentSlide]}
              alt="Air Wave Smart"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full ${i === currentSlide ? 'bg-red-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="text-center mb-4">
          <div className="inline-block bg-red-600 text-white text-sm font-bold px-4 py-1 rounded mb-2">
            -60% SOLO OGGI
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-gray-400 line-through text-2xl">€499</span>
            <span className="text-5xl font-black text-green-600">€199</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 mb-4">
          <div className="flex items-center justify-center gap-2 bg-green-100 text-green-800 font-bold px-4 py-2 rounded-lg">
            <Truck className="w-5 h-5" />
            SPEDIZIONE 24/48H
          </div>
          <div className="flex items-center justify-center gap-2 bg-yellow-100 text-yellow-800 font-bold px-4 py-2 rounded-lg">
            <Shield className="w-5 h-5" />
            PAGAMENTO ALLA CONSEGNA
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={scrollToOrder}
          className="w-full max-w-md mx-auto block bg-green-600 hover:bg-green-700 text-white text-xl font-black py-4 rounded-lg shadow-lg transition-all"
        >
          ORDINA ORA - PAGA AL CORRIERE
        </button>
      </section>

      {/* PROBLEMA/AGITAZIONE */}
      <section className="bg-gray-100 px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-6">
          😰 TI RICONOSCI IN QUESTE SITUAZIONI?
        </h2>
        <div className="max-w-2xl mx-auto space-y-4 text-lg">
          <div className="bg-white p-4 rounded-lg border-l-4 border-red-600">
            <p><strong>Non riesci a dormire</strong> perché il caldo ti soffoca di notte?</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-red-600">
            <p><strong>Il condominio ti ha detto NO</strong> al condizionatore esterno?</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-red-600">
            <p><strong>Hai paura della bolletta</strong> che schizza alle stelle?</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-red-600">
            <p><strong>Sei stufo dei preventivi</strong> da 500€+ per l'installazione?</p>
          </div>
        </div>
        <p className="text-center text-xl font-bold mt-6">
          Non è colpa tua. <span className="text-red-600">I condizionatori tradizionali sono un incubo.</span>
        </p>
      </section>

      {/* LA SOLUZIONE */}
      <section className="px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2">
          🎉 ECCO LA SOLUZIONE DEFINITIVA
        </h2>
        <p className="text-center text-xl text-gray-600 mb-8">
          Air Wave Smart™ - Il climatizzatore che <strong>NON richiede installazione</strong>
        </p>

        {/* Bullet Points Aggressivi */}
        <div className="max-w-2xl mx-auto space-y-3 mb-8">
          {[
            'RAFFREDDA, RISCALDA e DEUMIDIFICA - 3 prodotti in 1',
            'ZERO INSTALLAZIONE - Lo attacchi alla presa e funziona',
            'NESSUNA UNITÀ ESTERNA - Il condominio non può dirti nulla',
            'CLASSE A+++ - Bolletta leggerissima, risparmio fino al 60%',
            'SILENZIOSISSIMO - Puoi dormirci accanto senza problemi',
            '12.000 BTU - Potenza vera per stanze fino a 60m²',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-lg font-medium">{item}</span>
            </div>
          ))}
        </div>

        {/* Come Funziona - 3 Step */}
        <h3 className="text-xl font-black text-center mb-6">COME FUNZIONA (Facilissimo!)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-3">1</div>
            <p className="font-bold text-lg">APRI LA SCATOLA</p>
            <p className="text-gray-600">Tiri fuori il prodotto già pronto</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-3">2</div>
            <p className="font-bold text-lg">ATTACCA LA SPINA</p>
            <p className="text-gray-600">Collega alla presa di corrente</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-3">3</div>
            <p className="font-bold text-lg">GODITI IL FRESCO</p>
            <p className="text-gray-600">In 5 minuti casa tua è fresca</p>
          </div>
        </div>
      </section>

      {/* DEMONSTRAZIONE - Griglia 1:1 */}
      <section className="bg-gray-100 px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">
          💪 COSA PUÒ FARE PER TE
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { img: '/images/condizionatore/caldo-freddo.webp', title: 'FREDDO D\'ESTATE', desc: 'Rinfresca in 5 minuti' },
            { img: '/images/condizionatore/riscaldamento.webp', title: 'CALDO D\'INVERNO', desc: 'Scalda senza gas' },
            { img: '/images/condizionatore/silenzioso.webp', title: 'SILENZIO TOTALE', desc: 'Dormi tranquillo' },
            { img: '/images/condizionatore/risparmio.webp', title: 'BOLLETTA -60%', desc: 'Classe A+++' },
            { img: '/images/condizionatore/installazione.webp', title: 'ZERO LAVORI', desc: 'Niente buchi o tecnici' },
            { img: '/images/condizionatore/specifiche.webp', title: '60M² COPERTI', desc: '12.000 BTU di potenza' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow">
              <div className="aspect-square">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 text-center">
                <p className="font-black text-sm">{item.title}</p>
                <p className="text-gray-600 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ANCORAGGIO DI PREZZO - Comparison Table */}
      <section className="px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">
          📊 CONFRONTA E RISPARMIA
        </h2>
        <div className="max-w-2xl mx-auto overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2">
                <th className="py-3 px-2"></th>
                <th className="py-3 px-2 text-center bg-green-100 text-green-800 font-black">AIR WAVE SMART</th>
                <th className="py-3 px-2 text-center">Condizionatore Tradizionale</th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-base">
              {[
                ['Prezzo', '€199', '€800-2000'],
                ['Installazione', 'GRATIS (fai da te)', '€300-500'],
                ['Unità esterna', 'NON SERVE', 'Obbligatoria'],
                ['Permessi condominio', 'NON SERVONO', 'Obbligatori'],
                ['Tempo di attesa', '2 GIORNI', '2-4 settimane'],
                ['Consumi', 'CLASSE A+++', 'Classe A/B'],
                ['Funzione riscaldamento', 'INCLUSA', 'Extra €200+'],
              ].map(([feature, us, them], i) => (
                <tr key={i} className="border-b">
                  <td className="py-3 px-2 font-medium">{feature}</td>
                  <td className="py-3 px-2 text-center bg-green-50 text-green-800 font-bold">{us}</td>
                  <td className="py-3 px-2 text-center text-red-600">{them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center text-xl font-bold mt-6 text-red-600">
          RISPARMI OLTRE €1.000 rispetto a un condizionatore tradizionale!
        </p>
      </section>

      {/* IL BUNDLE */}
      <section className="bg-yellow-50 px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2">
          🎁 GUARDA COSA RICEVI
        </h2>
        <p className="text-center text-gray-600 mb-6">Tutto incluso nel prezzo, senza sorprese</p>

        <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
          <div className="space-y-3">
            {[
              { item: 'Climatizzatore Air Wave Smart 12.000 BTU', valore: '€499' },
              { item: 'Telecomando con batterie', valore: '€25' },
              { item: 'Kit di installazione completo', valore: '€40' },
              { item: '2x Filtri HEPA di ricambio', valore: '€30' },
              { item: 'App smartphone (iOS/Android)', valore: '€15' },
              { item: 'Manuale in 60 lingue', valore: '€5' },
              { item: 'Garanzia 24 mesi', valore: '€50' },
            ].map((bundle, i) => (
              <div key={i} className="flex justify-between items-center border-b pb-2">
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  {bundle.item}
                </span>
                <span className="text-gray-400 line-through text-sm">{bundle.valore}</span>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-dashed mt-4 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">Valore Totale:</span>
              <span className="text-gray-400 line-through">€664</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-black text-xl">PAGHI SOLO:</span>
              <span className="font-black text-3xl text-green-600">€199</span>
            </div>
          </div>
        </div>
      </section>

      {/* RECENSIONI */}
      <section className="px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2">
          ⭐ COSA DICONO I CLIENTI
        </h2>
        <p className="text-center text-gray-600 mb-6">Oltre 2.000 clienti soddisfatti</p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {review.nome[0]}
                </div>
                <div>
                  <p className="font-bold">{review.nome}</p>
                  <div className="flex text-yellow-500">
                    {[...Array(review.stelle)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                  </div>
                </div>
                <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded">✓ Verificato</span>
              </div>
              <p className="text-gray-700 text-sm">{review.testo}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODULO D'ORDINE */}
      <section id="order-section" className="bg-red-600 px-4 py-10">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center text-white mb-2">
            📦 ORDINA ORA
          </h2>
          <p className="text-center text-red-100 mb-4">Paga comodamente al corriere alla consegna</p>

          {/* Timer */}
          <div className="bg-white rounded-lg p-4 mb-4 text-center">
            <p className="text-sm text-gray-600 mb-1">⏰ OFFERTA SCADE TRA:</p>
            <p className="text-4xl font-black text-red-600">{formatTime(timeLeft)}</p>
            <p className="text-xs text-gray-500">Poi il prezzo torna a €499</p>
          </div>

          {/* Prezzo */}
          <div className="bg-white rounded-lg p-4 mb-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-gray-400 line-through text-xl">€499</span>
              <span className="text-4xl font-black text-green-600">€199</span>
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">-60%</span>
            </div>
            <p className="text-green-600 font-bold mt-1">+ Spedizione GRATIS</p>
          </div>

          {/* Form - Solo 3 campi */}
          <div className="bg-white rounded-lg p-4 space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1">
                <User className="w-4 h-4" /> Nome e Cognome
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-600 focus:outline-none"
                placeholder="Es: Mario Rossi"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1">
                <Phone className="w-4 h-4" /> Telefono
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-600 focus:outline-none"
                placeholder="Es: 333 1234567"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1">
                <MapPin className="w-4 h-4" /> Indirizzo Completo
              </label>
              <textarea
                value={formData.indirizzo}
                onChange={(e) => setFormData({ ...formData, indirizzo: e.target.value })}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-600 focus:outline-none"
                rows={2}
                placeholder="Via, numero, CAP, Città"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-black text-xl transition-all ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-600'
                  : 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
              }`}
            >
              {isSubmitting ? 'INVIO IN CORSO...' : '✓ CONFERMA ORDINE - PAGO ALLA CONSEGNA'}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Pagamento Sicuro</span>
              <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Consegna 24/48h</span>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY BAR - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green-600 p-3 shadow-2xl md:hidden z-50">
        <button
          onClick={scrollToOrder}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-black text-lg flex items-center justify-center gap-2"
        >
          ORDINA ORA - €199
          <span className="text-xs bg-white/20 px-2 py-1 rounded">Paga al Corriere</span>
        </button>
      </div>

      {/* Spacer per sticky bar mobile */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
}
