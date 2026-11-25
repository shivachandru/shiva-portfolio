import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Asterisk, Code2, Github, Layers3, Linkedin, Menu, MoveUpRight, Rocket, Send, Sparkles, Terminal, X } from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const nav = ['Home', 'About', 'Services', 'Skills', 'Projects', 'Experience', 'Contact'];
const services = [
  { n: '01', title: 'Website development', copy: 'Modern, responsive websites built to make a memorable first impression and turn visits into meaningful connections.', tags: ['Business sites', 'E-commerce', 'SEO-ready'], icon: Layers3 },
  { n: '02', title: 'Web applications', copy: 'Thoughtful, scalable applications that bring complex workflows into clear focus—from dashboards to custom platforms.', tags: ['Dashboards', 'API integration', 'Architecture'], icon: Code2 },
  { n: '03', title: 'Application development', copy: 'Purpose-built digital tools designed around the way your business works and the people who use them.', tags: ['Custom apps', 'Cross-platform', 'Business tools'], icon: Terminal },
  { n: '04', title: 'UI/UX & frontend', copy: 'Intuitive interfaces with precise details, responsive layouts and motion that makes every interaction feel natural.', tags: ['Interface design', 'Interaction', 'Performance'], icon: Sparkles },
  { n: '05', title: 'Deployment & care', copy: 'Reliable launches and ongoing care, from domain configuration to performance monitoring and maintenance.', tags: ['Vercel', 'Hosting', 'Maintenance'], icon: Rocket },
];
const tech = ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Angular', 'React', 'Responsive design', 'REST APIs', 'Git', 'GitHub', 'Vercel', 'Frontend architecture'];
const projects = [
  { no: '01', name: 'E-commerce website', type: 'COMMERCE / WEB', copy: 'A considered storefront concept designed to make product discovery feel effortless.', tech: ['React', 'TypeScript', 'Responsive design'], theme: 'shop' },
  { no: '02', name: 'Business management app', type: 'APPLICATION / DASHBOARD', copy: 'A clear, adaptable workspace for the moving pieces of a modern business.', tech: ['Angular', 'REST API', 'UI engineering'], theme: 'manage' },
  { no: '03', name: 'Jewellery store website', type: 'COMMERCE / EDITORIAL', copy: 'An elegant digital setting for a collection where every detail matters.', tech: ['React', 'CSS', 'E-commerce'], theme: 'jewel' },
  { no: '04', name: 'Custom web application', type: 'PRODUCT / WEB APP', copy: 'A flexible application experience shaped around a distinctive product idea.', tech: ['TypeScript', 'API integration', 'Frontend'], theme: 'app' },
  { no: '05', name: 'Responsive business website', type: 'BUSINESS / WEB', copy: 'A crisp digital home designed to work beautifully at every size.', tech: ['HTML', 'CSS', 'JavaScript'], theme: 'studio' },
];
const process = [
  ['01', 'Discover', 'Understand the business, requirements and objectives.'],
  ['02', 'Design', 'Create intuitive, attractive and user-focused interfaces.'],
  ['03', 'Develop', 'Transform designs into functional, responsive and scalable applications.'],
  ['04', 'Deploy', 'Launch the application, configure hosting and ensure production readiness.'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const [progress, setProgress] = useState(0);
  const [sent, setSent] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = new Lenis({ autoRaf: true, smoothWheel: !reduced, lerp: reduced ? 1 : 0.085 });
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      let current = 'Home';
      nav.forEach((name) => {
        const el = document.getElementById(name.toLowerCase());
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.42) current = name;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    if (!reduced) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.hero-copy > *', { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.13, ease: 'power3.out', delay: 0.25 });
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.fromTo(el, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
        });
        gsap.to('.orbit-ring', { rotate: 360, duration: 60, repeat: -1, ease: 'none' });
        gsap.to('.orbit-ring-inner', { rotate: -360, duration: 43, repeat: -1, ease: 'none' });
        gsap.to('.orb-core', { scale: 1.06, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      }, heroRef);
      return () => { ctx.revert(); lenis.destroy(); window.removeEventListener('scroll', onScroll); };
    }
    return () => { lenis.destroy(); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const go = (id: string) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSent(true); };

  return <>
    <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
    <div className={`custom-cursor ${hovering ? 'is-hover' : ''}`} style={{ left: cursor.x, top: cursor.y }} aria-hidden="true"><span /></div>
    <header className="nav-shell">
      <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); go('home'); }}><span className="brand-mark">S<span>.</span></span><span className="brand-name">SHIVA S.<small>INDEPENDENT DEVELOPER</small></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map((item) => <a key={item} className={active === item ? 'active' : ''} href={`#${item.toLowerCase()}`} onClick={(e) => { e.preventDefault(); go(item); }}>{item}</a>)}</nav>
      <a className="nav-cta" href="#contact" onClick={(e) => { e.preventDefault(); go('contact'); }}><span>LET’S TALK</span><ArrowUpRight size={15} /></a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>{nav.map((item, i) => <a key={item} href={`#${item.toLowerCase()}`} onClick={(e) => { e.preventDefault(); go(item); }}><span>0{i + 1}</span>{item}<ArrowUpRight /></a>)}</div>

    <main>
      <section className="hero" id="home" ref={heroRef}>
        <div className="hero-grid" />
        <div className="hero-topline"><span>FULL STACK DEVELOPER <i>—</i> INDIA</span><span className="availability"><b /> AVAILABLE FOR SELECT PROJECTS</span></div>
        <div className="hero-main">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> SOFTWARE DEVELOPER <span className="eyebrow-dot">✳</span> 7+ YEARS EXPERIENCE</p>
            <h1>Turning ideas<br />into <span className="serif-word">digital</span><br /><span className="outline-word">experiences.</span></h1>
            <p className="hero-description">I’m Shiva, a software developer crafting modern websites, scalable applications and seamless digital experiences. I turn complex ideas into elegant, functional products.</p>
            <div className="hero-actions"><a className="button button-primary magnetic" href="#projects" onClick={(e) => { e.preventDefault(); go('projects'); }} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>Explore my work <ArrowRight size={17} /></a><a className="button button-quiet" href="#contact" onClick={(e) => { e.preventDefault(); go('contact'); }}>Let’s build something <MoveUpRight size={15} /></a></div>
          </div>
          <div className="hero-art" aria-label="Abstract orbiting digital sculpture"><div className="art-label art-label-top">FIG. 001 <span>—</span> THOUGHT IN MOTION</div><div className="orbit orbit-ring"><i /><i /><i /></div><div className="orbit orbit-ring-inner"><i /><i /></div><div className="orb-halo" /><div className="orb-core"><div className="orb-shine" /></div><div className="art-cross cross-a">+</div><div className="art-cross cross-b">+</div><div className="art-coordinate">13° 04′ N<br />80° 17′ E</div><div className="art-label art-label-bottom">DESIGN <span>×</span> ENGINEERING</div></div>
        </div>
        <div className="hero-bottom"><span>SHIVA S. <i>—</i> CREATIVE DEVELOPER</span><a href="#about" onClick={(e) => { e.preventDefault(); go('about'); }}>SCROLL TO EXPLORE <span className="scroll-icon"><ArrowDown size={14} /></span></a><span>CHENNAI · INDIA <i>© 2026</i></span></div>
      </section>

      <section className="intro section-pad" id="about">
        <div className="section-kicker" data-reveal><span>01 / A LITTLE ABOUT ME</span><span>THE PERSON BEHIND THE PIXELS</span></div>
        <div className="intro-layout"><div className="intro-statement" data-reveal><span className="intro-asterisk">✳</span><h2>Curiosity makes<br />the <em>best</em> interface.</h2></div><div className="intro-copy" data-reveal><p>I’m a passionate software developer with 7 years of experience building digital products, web applications and modern websites.</p><p>My journey revolves around transforming ideas into practical digital solutions. I enjoy solving complex problems, creating intuitive user experiences and developing applications that are both visually appealing and technically efficient.</p><p>From frontend architecture to deployment, I enjoy being involved throughout the product development lifecycle.</p><div className="education"><span>EDUCATION</span><p>B.E. Computer Science and Engineering</p></div></div></div>
        <div className="stats-row" data-reveal><div className="stat"><strong>7<span>+</span></strong><small>YEARS OF EXPERIENCE</small></div><div className="stat"><strong>—</strong><small>PROJECTS COMPLETED <i>EDITABLE</i></small></div><div className="stat"><strong>—</strong><small>TECHNOLOGIES USED <i>EDITABLE</i></small></div><div className="stat-note">Thoughtfully built.<br />Made to matter.</div></div>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-kicker" data-reveal><span>02 / WHAT I DO</span><span>CAPABILITIES & SERVICES</span></div><div className="services-heading" data-reveal><h2>Good work begins<br />with <em>good thinking.</em></h2><p>From a single landing page to a complete digital product, I bring ideas to life with craft, care and a clear point of view.</p></div>
        <div className="service-list">{services.map(({ n, title, copy, tags, icon: Icon }) => <article className="service-row" key={n} data-reveal><span className="service-no">{n}</span><div className="service-icon"><Icon size={22} strokeWidth={1.3} /></div><div className="service-body"><h3>{title}</h3><p>{copy}</p><div className="service-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><ArrowUpRight className="service-arrow" size={19} /></article>)}</div>
      </section>

      <section className="skills section-pad" id="skills">
        <div className="section-kicker" data-reveal><span>03 / THE TOOLKIT</span><span>TECHNOLOGY, WITH INTENTION</span></div><div className="skills-layout"><div data-reveal><h2>The right tools<br />for the <em>right idea.</em></h2><p>Good technology should feel invisible. I choose the tools that best serve the product, the people using it and the team behind it.</p><div className="tool-categories"><span>DESIGN & BUILD</span><span>DEPLOY & DELIVER</span></div></div><div className="tech-cloud" data-reveal>{tech.map((item, i) => <span className={`tech-pill ${i < 8 ? 'primary-tech' : ''}`} key={item}><i>{['◈', '◉', '⌘', 'Ｔ', '△', '◒', '↔', '⌁', '⌘', '◉', '▲', '⟐'][i]}</i>{item}</span>)}</div></div>
        <div className="marquee" aria-label="Technology toolkit"><div className="marquee-track">{[...tech, ...tech].map((t, i) => <span key={`${t}-${i}`}>{t}<b>✳</b></span>)}</div></div>
      </section>

      <section className="projects section-pad" id="projects">
        <div className="section-kicker" data-reveal><span>04 / SELECTED PROJECTS</span><span>MADE WITH PURPOSE</span></div><div className="projects-heading" data-reveal><h2>A few things<br />I’ve <em>put into the world.</em></h2><p>Every project starts with a question. These placeholders are ready for the real stories behind your work.</p></div>
        <div className="project-grid">{projects.map((p) => <article className={`project-card theme-${p.theme}`} key={p.no} data-reveal><a className="project-visual" href="#contact" onClick={(e) => { e.preventDefault(); go('contact'); }} aria-label={`Discuss ${p.name}`}><div className="project-art"><div className="mock-window"><div className="mock-bar"><span /><span /><span /><i>shiva.studio</i></div><div className="mock-content"><div className="mock-side"><b /><b /><b /><b /></div><div className="mock-main"><div className="mock-title" /><div className="mock-subtitle" /><div className="mock-panels"><i /><i /><i /></div><div className="mock-chart"><span /><span /><span /><span /><span /><span /><span /><span /></div></div></div></div><span className="project-open"><ArrowUpRight size={18} /></span></div></a><div className="project-info"><div className="project-meta"><span>{p.no} / {p.type}</span><span>CONCEPT / PLACEHOLDER</span></div><h3>{p.name}</h3><p>{p.copy}</p><div className="project-footer"><div>{p.tech.map((t) => <span key={t}>{t}</span>)}</div><div className="project-links"><a href="#contact" onClick={(e) => { e.preventDefault(); go('contact'); }}>LIVE DEMO <ArrowUpRight size={12} /></a><a href="#contact" onClick={(e) => { e.preventDefault(); go('contact'); }}>SOURCE <Github size={12} /></a></div></div></div></article>)}</div>
        <p className="project-note"><Asterisk size={15} /> Project visuals and links are placeholders—replace with your own work when ready.</p>
      </section>

      <section className="process section-pad">
        <div className="section-kicker" data-reveal><span>05 / HOW I WORK</span><span>FROM CONCEPT TO REALITY</span></div><div className="process-layout"><div data-reveal><h2>Ideas get better<br />when they <em>move.</em></h2><p>A clear, collaborative process keeps the big picture in view—and the small details just right.</p></div><div className="process-list">{process.map(([n, title, text]) => <div className="process-step" key={n} data-reveal><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div><div className="process-node" /></div>)}</div></div>
      </section>

      <section className="experience section-pad" id="experience">
        <div className="section-kicker" data-reveal><span>06 / THE JOURNEY</span><span>EXPERIENCE & APPROACH</span></div><div className="experience-layout"><div data-reveal><h2>Seven years<br />of building<br />for the <em>web.</em></h2><p>A practice shaped by curiosity, continuous learning and the belief that the best digital products balance thoughtful design with solid engineering.</p><span className="experience-badge"><b>7+</b> YEARS IN THE CRAFT</span></div><div className="experience-timeline"><article data-reveal><span className="timeline-year">2019 — NOW</span><div className="timeline-content"><span className="timeline-dot"/><h3>Software Developer</h3><p className="timeline-company">COMPANY / ORGANIZATION <i>EDITABLE</i></p><p>Building and delivering digital experiences across frontend development, web applications, responsive websites and production deployment.</p><div className="timeline-tags"><span>Frontend</span><span>Web applications</span><span>Integration</span><span>Deployment</span></div></div></article><article data-reveal><span className="timeline-year">FOUNDATION</span><div className="timeline-content"><span className="timeline-dot"/><h3>Computer Science & Engineering</h3><p className="timeline-company">B.E. · EDUCATION</p><p>Building a strong foundation in software engineering and the principles behind useful, reliable technology.</p></div></article><p className="editable-note">Company names, dates and achievements can be updated when you’re ready.</p></div></div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="section-kicker" data-reveal><span>07 / START A CONVERSATION</span><span>GOOD THINGS START HERE</span></div><div className="contact-layout"><div className="contact-left" data-reveal><span className="contact-star">✳</span><h2>Have an idea?<br />Let’s make it<br /><em>happen.</em></h2><p>Whether you’re planning a new website, building a web application or transforming an existing digital product, let’s create something meaningful together.</p><a className="email-link" href="mailto:hello@example.com">hello@example.com <ArrowUpRight size={16} /></a><div className="social-links"><a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn placeholder"><Linkedin /></a><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub placeholder"><Github /></a><a href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="WhatsApp placeholder"><Send /></a><span>LINKS READY TO PERSONALIZE</span></div></div><form className="contact-form" onSubmit={submit} data-reveal><label>Your name<input name="name" placeholder="How should I call you?" required /></label><label>Email address<input type="email" name="email" placeholder="you@company.com" required /></label><div className="form-row"><label>Project type<select name="type" defaultValue=""><option value="" disabled>Select a service</option><option>Website development</option><option>Web application</option><option>Application development</option><option>UI/UX & frontend</option><option>Deployment & maintenance</option><option>Something else</option></select></label><label>Budget <span>(optional)</span><select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>To be discussed</option><option>Under $2,500</option><option>$2,500–$5,000</option><option>$5,000+</option></select></label></div><label>Tell me a little about it<textarea name="message" rows={3} placeholder="The idea, the challenge, the big picture…" required /></label><button className="button button-primary form-submit" type="submit">{sent ? 'Thanks — message noted' : 'Send a message'} <ArrowRight size={16} /></button><small className="form-note">This demo form is ready to connect to your preferred email or form service.</small></form></div>
      </section>
    </main>
    <footer><div className="footer-top"><a className="footer-brand" href="#home" onClick={(e) => { e.preventDefault(); go('home'); }}>SHIVA S<span>.</span></a><span>DESIGNED WITH CREATIVITY.<br />DEVELOPED WITH PASSION.</span><a href="#home" onClick={(e) => { e.preventDefault(); go('home'); }}>BACK TO TOP <ArrowUpRight size={15} /></a></div><div className="footer-bottom"><span>© 2026 SHIVA S. ALL RIGHTS RESERVED.</span><span>BUILT FOR WHAT’S NEXT <i>✳</i></span><span>CHENNAI, INDIA</span></div></footer>
  </>;
}

export default App;

