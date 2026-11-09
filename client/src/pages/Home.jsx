import { useEffect, useState } from 'react';
import { ArrowRight, Plane, Globe2, ShieldCheck, Compass, House, BriefcaseBusiness, Menu, X, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import api from '../api';
import Intro from '../components/Intro.jsx';
import EarthGlobe from '../components/EarthGlobe.jsx';
import { site, destinations, services } from '../data/site';

const photos = {
  USA:'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=700&q=85',
  Canada:'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=700&q=85',
  UK:'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=700&q=85',
  Australia:'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=700&q=85',
  Europe:'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=700&q=85',
  'New Zealand':'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=700&q=85',
  Japan:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=85',
  'South Korea':'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=700&q=85'
};
const serviceIcons = [Plane, House, BriefcaseBusiness];

export default function Home() {
  const [menuOpen,setMenuOpen] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealNodes = document.querySelectorAll('.section, .trust, .cta-band, footer, .service-card, .destination');
    if (!reduce && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
      revealNodes.forEach(node => { node.classList.add('reveal-on-scroll'); observer.observe(node); });
      const journey = document.querySelector('.journey-scroll');
      const onScroll = () => {
        if (!journey) return;
        const rect = journey.getBoundingClientRect();
        const travel = Math.max(1, journey.offsetHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -rect.top / travel));
        journey.style.setProperty('--journey-progress', progress.toFixed(3));
        const active = progress < .34 ? 0 : progress < .68 ? 1 : 2;
        journey.querySelectorAll('.journey-step').forEach((step, index) => step.classList.toggle('active', index === active));
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
    }
  }, []);
  const [form,setForm] = useState({fullName:'',phone:'',email:'',countryOfResidence:'',destination:'',visaType:'Not sure',message:''});
  const [feedback,setFeedback] = useState({type:'',text:''});
  const update = e => setForm({...form,[e.target.name]:e.target.value});
  async function submit(e) {
    e.preventDefault(); setFeedback({type:'',text:''});
    try {
      const {data} = await api.post('/enquiries',form);
      setFeedback({type:'success',text:`${data.message} Reference: ${data.enquiryId}`});
      setForm({fullName:'',phone:'',email:'',countryOfResidence:'',destination:'',visaType:'Not sure',message:''});
    } catch(err) { setFeedback({type:'error',text:err.response?.data?.message || 'Could not submit your enquiry. Please try again.'}); }
  }
  const closeMenu=()=>setMenuOpen(false);
  return <><Intro /><div className="website-shell"><div className="topline"><div className="wrap topinner"><span>✦ Your journey abroad starts with the right guidance</span><span>Visa guidance · Destination support · Personal assistance</span></div></div>
    <header className="header"><nav className="wrap nav"><a className="brand" href="#home"><span className="brandmark">✈</span><span>EXPLORE OVERSEAS<small>YOUR JOURNEY, OUR GUIDANCE</small></span></a>
      <button className="mobile-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen?<X/>:<Menu/>}</button>
      <div className={`navlinks ${menuOpen?'open':''}`}><a onClick={closeMenu} href="#home">Home</a><a onClick={closeMenu} href="#about">About Us</a><a onClick={closeMenu} href="#services">Our Services</a><a onClick={closeMenu} href="#destinations">Destinations</a><a onClick={closeMenu} href="#contact">Contact</a></div>
      <a className="btn navbtn" href="#contact">Get a Consultation <ArrowRight size={16}/></a>
    </nav></header>
    <main>
      <section className="hero" id="home"><div className="hero-globe" aria-hidden="true"><EarthGlobe /></div><div className="wrap"><div className="hero-content"><div className="eyebrow">MAKE THE WORLD YOUR DESTINATION</div><h1>Your next chapter<br/>begins <em>overseas.</em></h1><p>Big journeys begin with clear guidance. Explore Overseas helps you take the next step towards international travel with thoughtful visa assistance and support at every stage.</p><div className="hero-actions"><a className="btn" href="#contact">Start Your Journey <ArrowRight size={17}/></a><a className="btn btn-outline" href="#services">Explore Our Services</a></div><div className="hero-note"><span className="live-dot"/> <b>One destination at a time.</b> Let’s plan your next move.</div></div></div></section>
      <div className="wrap trust"><div><Globe2/><span><b>Global destinations</b><small>Explore opportunities worldwide</small></span></div><div><ShieldCheck/><span><b>Personalised guidance</b><small>Support shaped around your plans</small></span></div><div><Compass/><span><b>Clear process</b><small>Know your next step with confidence</small></span></div></div>
      <section className="journey-scroll" aria-label="Scroll through your journey around the world">
        <div className="journey-sticky">
          <div className="journey-copy">
            <div className="kicker">SCROLL. DISCOVER. GO BEYOND.</div>
            <h2>Your world is<br/><em>waiting.</em></h2>
            <p>Keep scrolling to explore the destinations and possibilities that could shape your next journey.</p>
            <div className="journey-steps"><div className="journey-step step-one"><b>01 / DISCOVER</b><span>Find the destination that inspires you.</span></div><div className="journey-step step-two"><b>02 / PREPARE</b><span>Understand the visa process and what comes next.</span></div><div className="journey-step step-three"><b>03 / DEPART</b><span>Move forward with a clearer travel plan.</span></div></div>
          </div>
          <div className="journey-visual"><div className="journey-orbit orbit-a"></div><div className="journey-orbit orbit-b"></div><div className="journey-earth"><EarthGlobe /></div><div className="journey-route route-a"></div><div className="journey-route route-b"></div><span className="journey-pin jp-one">USA</span><span className="journey-pin jp-two">UK</span><span className="journey-pin jp-three">JAPAN</span><div className="journey-counter"><b>GLOBAL</b><span>YOUR NEXT CHAPTER STARTS HERE</span></div></div>
          <div className="journey-scroll-hint"><span></span> KEEP SCROLLING</div>
        </div>
      </section>
      <section className="section" id="about"><div className="wrap about-grid"><div className="about-image"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85" alt="Team planning together"/><div className="image-note"><b>Explore more.</b><span>Discover new places, possibilities and experiences.</span></div></div><div><div className="kicker">A LITTLE ABOUT US</div><h2>We make your global ambitions feel closer.</h2><p className="muted">Explore Overseas is built around a simple belief: every international journey deserves the right information, preparation and personal attention.</p><p className="muted">Our goal is to make the visa guidance process easier to understand — from exploring your destination to preparing for the steps ahead.</p><div className="checks"><span><CheckCircle2/> Clear communication</span><span><CheckCircle2/> Personal attention</span><span><CheckCircle2/> Destination-focused support</span><span><CheckCircle2/> Step-by-step guidance</span></div><a className="btn" href="#contact">Talk to our team <ArrowRight size={16}/></a></div></div></section>
      <section className="section services" id="services"><div className="wrap"><div className="section-head"><div className="kicker">WHAT WE CAN HELP WITH</div><h2>Visa services for the journeys that matter.</h2><p className="muted">Whether you are planning a holiday, visiting loved ones or travelling for business, explore the support that fits your purpose.</p></div><div className="service-grid">{services.map((s,i)=>{const Icon=serviceIcons[i];return <article className="service-card" key={s.title}><div className="service-icon"><Icon/></div><h3>{s.title}</h3><p>{s.description}</p><a href="#contact">Enquire now <ArrowRight size={14}/></a></article>})}</div></div></section>
      <section className="section" id="destinations"><div className="wrap"><div className="section-head"><div className="kicker">WHERE WOULD YOU LIKE TO GO?</div><h2>The world is open to explore.</h2><p className="muted">Tell us where you want to go. We’ll help you understand the visa pathway and preparation involved for your chosen destination.</p></div><div className="destination-grid">{destinations.map(d=><a href="#contact" className="destination" key={d}><img src={photos[d]} alt={d} loading="lazy"/><span><b>{d}</b><small>Explore destination <ArrowRight size={13}/></small></span></a>)}</div></div></section>
      <section className="cta-band"><div className="wrap cta-inner"><div><h2>Have a destination in mind?</h2><p>Let’s turn your travel plans into a clear next step.</p></div><a className="btn btn-white" href="#contact">Talk to Explore Overseas <ArrowRight size={16}/></a></div></section>
      <section className="section contact-section" id="contact"><div className="wrap contact-grid"><div><div className="kicker">LET’S CONNECT</div><h2>Tell us where you want to go.</h2><p className="muted">Share a few details about your plans. Our team can get in touch to understand your requirements and guide you on the next steps.</p><div className="contact-line"><Phone/><span><small>Call us</small><b>{site.phone}</b></span></div><div className="contact-line"><Mail/><span><small>Email us</small><b>{site.email}</b></span></div><div className="contact-line"><MapPin/><span><small>Our office</small><b>{site.address}</b></span></div></div>
        <form className="form-card" onSubmit={submit}><h3>Enquiry Form</h3><p>Fill in the details and we’ll be in touch.</p>{feedback.text&&<div className={`notice ${feedback.type}`}>{feedback.text}</div>}<div className="form-grid">
          <label>Full Name *<input name="fullName" value={form.fullName} onChange={update} required maxLength="100" placeholder="Enter your full name"/></label>
          <label>Contact Number *<input name="phone" value={form.phone} onChange={update} required maxLength="25" placeholder="+91 00000 00000"/></label>
          <label>Email ID *<input name="email" type="email" value={form.email} onChange={update} required placeholder="you@example.com"/></label>
          <label>Country of Residence *<input name="countryOfResidence" value={form.countryOfResidence} onChange={update} required placeholder="e.g. India"/></label>
          <label>Interested Destination *<select name="destination" value={form.destination} onChange={update} required><option value="">Select destination</option>{destinations.map(d=><option key={d}>{d}</option>)}<option>Other</option></select></label>
          <label>Visa Type<select name="visaType" value={form.visaType} onChange={update}><option>Not sure</option><option>Tourist Visa</option><option>Visitor Visa</option><option>Business Visa</option></select></label>
          <label className="full">Message (optional)<textarea name="message" value={form.message} onChange={update} maxLength="2000" placeholder="Tell us about your travel plans..."/></label>
        </div><button className="btn submit-btn" type="submit">Submit Enquiry <ArrowRight size={16}/></button><small className="privacy-note">Your details will be used to respond to your enquiry.</small></form>
      </div></section>
    </main>
    <footer><div className="wrap footer-grid"><div><a className="brand footer-brand" href="#home"><span className="brandmark">✈</span><span>EXPLORE OVERSEAS<small>YOUR JOURNEY, OUR GUIDANCE</small></span></a><p>Helping you explore international travel possibilities with clear information, thoughtful guidance and personal support.</p></div><div><b>Quick Links</b><a href="#about">About Us</a><a href="#services">Our Services</a><a href="#destinations">Destinations</a><a href="#contact">Contact</a></div><div><b>Our Services</b><a href="#services">Tourist Visa</a><a href="#services">Visitor Visa</a><a href="#services">Business Visa</a><a href="/admin/login">Admin Login</a></div></div><div className="wrap copyright">© {new Date().getFullYear()} Explore Overseas. All rights reserved. <span>Visa decisions are made by the relevant immigration authorities.</span></div></footer>
  </div></>;
}
