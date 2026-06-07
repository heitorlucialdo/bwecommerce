/* hifi-landing.jsx — Landing (direction C: Gallery / Magazine) hi-fi. */
import React from 'react';
import { useNav, WA_URL, BENEFITS, CATEGORIES, PRODUCTS, Reveal, Ph, Icon, Stars, ProductCard } from './hifi-shared';

const VALUES = [
  ["Qualidade Premium", "Materiais certificados, seguros e de alto padrão, selecionados sem concessões."],
  ["Discrição Total", "Embalagem neutra, sem identificação na entrega ou na fatura do cartão."],
  ["Atendimento Personalizado", "Especialistas disponíveis para orientar você na escolha certa."],
];

const TESTIMONIALS = [
  { name: "Marcos e Fernanda Lima, 34", text: "Discrição no envio, qualidade no produto. Virou nosso ritual." },
  { name: "Carolina Mendes, 31", text: "Me sinto segura comprando aqui. O atendimento é impecável do início ao fim." },
  { name: "Rafael Souza, 26", text: "Presente perfeito. Ela amou a embalagem antes mesmo de abrir." },
];

const GUARANTEES = [
  ["lock", "Pagamento 100% Seguro"],
  ["box", "Embalagem Neutra"],
  ["check", "Troca Garantida"],
];

const FAQS = [
  ["Minha compra aparece na fatura ou na embalagem?", "Não. A embalagem é totalmente neutra, sem qualquer identificação. Na fatura do cartão aparece apenas o nome institucional da empresa, sem menção ao produto."],
  ["Os materiais são seguros?", "Sim. Todos os produtos são certificados e produzidos com materiais body-safe, hipoalergênicos e livres de ftalatos."],
  ["Qual o prazo de entrega?", "De 3 a 7 dias úteis, dependendo da região. Você acompanha cada etapa pelo código de rastreio enviado por e-mail."],
  ["Posso trocar se não gostar?", "Sim. Trabalhamos com política de troca em até 7 dias após o recebimento, conforme as condições de higiene e lacre do produto."],
];

function HeroLanding() {
  const { go } = useNav();
  return (
    <section className="hero">
      <div className="wrap">
        <Reveal><span className="eyebrow">BW Íntimo</span></Reveal>
        <Reveal as="h1" className="display" delay={80}>Intimidade elevada ao seu mais alto nível</Reveal>
        <Reveal delay={160}>
          <p className="sub">Produtos selecionados para quem não abre mão de qualidade, discrição e prazer genuíno.</p>
        </Reveal>
        <Reveal delay={240}>
          <div className="ctas">
            <button className="btn btn-primary" onClick={() => go("colecao")}>Explorar Coleção</button>
            <a className="btn btn-ghost" href={WA_URL} target="_blank" rel="noopener">Falar com Especialista</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BenefitsBar() {
  return (
    <section className="benefits">
      <div className="wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="benefits-grid">
          {BENEFITS.map((b) => (
            <div className="benefit" key={b}>
              <span className="benefit-ico"><Icon.check/></span>
              <span>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const { go } = useNav();
  return (
    <section className="section bg2">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <Reveal><span className="eyebrow dim">Por categoria</span></Reveal>
            <Reveal delay={60}><h2 className="display">Encontre o seu ritual</h2></Reveal>
          </div>
          <Reveal delay={120}><span className="eyebrow dim" style={{ whiteSpace: "nowrap" }}>← arraste →</span></Reveal>
        </div>
        <Reveal delay={80}>
          <div className="rail">
            {CATEGORIES.map((c) => (
              <a className="cat-card" href="#" key={c.name} onClick={(e) => { e.preventDefault(); go("colecao", c.slug); }}>
                <Ph label={c.name} src={c.img} />
                <div className="cat-meta">
                  <div>
                    <h3 className="serif">{c.name}</h3>
                    <div className="eyebrow dim" style={{ marginTop: 6, fontSize: 10 }}>{c.count}</div>
                  </div>
                  <span className="cat-arrow"><Icon.arrow/></span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BestSellers() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head center">
          <Reveal><span className="eyebrow">Seleção da casa</span></Reveal>
          <Reveal delay={60}><h2 className="display">Mais Vendidos</h2></Reveal>
        </div>
        <div className="grid-4">
          {PRODUCTS.slice(0, 4).map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}><ProductCard product={p} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueProps() {
  return (
    <section className="section light">
      <div className="wrap">
        <div className="values">
          {VALUES.map(([t, d], i) => (
            <Reveal key={t} delay={i * 100} className="value-item">
              <div className="v-ico"><Icon.shield/></div>
              <div className="value-num">0{i + 1}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sobre() {
  const { go } = useNav();
  const videoRef = React.useRef(null);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const mobile = window.innerWidth <= 768;
    let scrollHandler = null;
    let observer = null;

    if (mobile) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { video.play().catch(() => {}); }
          else { video.pause(); }
        });
      }, { threshold: 0.4 });
      observer.observe(video);
    } else {
      const setupScroll = () => {
        scrollHandler = () => {
          const rect = section.getBoundingClientRect();
          const winH = window.innerHeight;
          if (rect.top > winH || rect.bottom < 0) return;
          const sectionScrollHeight = section.offsetHeight - winH;
          if (sectionScrollHeight <= 0) return;
          const progress = Math.max(0, Math.min(1, -rect.top / sectionScrollHeight));
          if (progress >= 1) { video.currentTime = video.duration; return; }
          if (progress <= 0) { video.currentTime = 0; return; }
          video.currentTime = progress * video.duration;
        };
        window.addEventListener('scroll', scrollHandler, { passive: true });
      };
      if (video.readyState >= 1) { setupScroll(); }
      else { video.addEventListener('loadedmetadata', setupScroll, { once: true }); }
    }

    return () => {
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section className="section sobre-section" ref={sectionRef}>
      <div className="sobre-sticky">
        <div className="wrap">
          <div className="sobre-grid">
            <Reveal delay={120} className="sobre-copy">
              <span className="eyebrow">A marca</span>
              <h2 className="display" style={{ fontSize: "clamp(32px,4vw,52px)", marginTop: 18 }}>
                Bem-estar íntimo, sem julgamentos
              </h2>
              <p>A BW nasceu da convicção de que prazer é cuidado — e merece a mesma sofisticação de qualquer outro ritual de bem-estar.</p>
              <p>Curamos cada peça pensando em quem valoriza qualidade real, discrição absoluta e uma experiência que começa muito antes de abrir a caixa.</p>
              <div style={{ marginTop: 30 }}>
                <button className="link-cta" onClick={() => go("filosofia")}>Nossa Filosofia <Icon.arrow/></button>
              </div>
            </Reveal>
            <Reveal>
              <div className="sobre-video-wrap">
                <video
                  ref={videoRef}
                  className="sobre-video"
                  src="assets/sugadorVideosPagina.mp4"
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section panel">
      <div className="wrap">
        <div className="sec-head center">
          <Reveal><span className="eyebrow">Quem vive a BW</span></Reveal>
          <Reveal delay={60}><h2 className="display">O que estão dizendo</h2></Reveal>
        </div>
        <Reveal className="t-feature">
          <Stars />
          <p className="quote serif">"Nunca imaginei que um produto íntimo pudesse ter esse nível de acabamento. A BW é outra categoria."</p>
          <div className="who">Isabela Rocha, 28</div>
        </Reveal>
        <div className="grid-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90} className="t-card">
              <Stars />
              <p>"{t.text}"</p>
              <div className="who-row">
                <span className="name">{t.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Guarantees() {
  return (
    <section className="section light" style={{ paddingTop: "calc(64px * var(--sp))", paddingBottom: "calc(64px * var(--sp))" }}>
      <div className="wrap">
        <Reveal>
          <div className="guarantees">
            {GUARANTEES.map(([ico, t]) => {
              const I = Icon[ico];
              return (
                <div className="guar" key={t}>
                  <span className="g-ico"><I/></span>
                  <span>{t}</span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className={`faq ${open ? "open" : ""}`}>
      <button className="faq-q" onClick={onToggle}>
        <span>{q}</span>
        <span className="faq-sign" />
      </button>
      <div className="faq-a"><div className="faq-a-inner"><p>{a}</p></div></div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head center">
          <Reveal><span className="eyebrow">Dúvidas frequentes</span></Reveal>
          <Reveal delay={60}><h2 className="display">Tudo o que você precisa saber</h2></Reveal>
        </div>
        <Reveal className="faq-list">
          {FAQS.map(([q, a], i) => (
            <FAQItem key={i} q={q} a={a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function LandingPage() {
  return (
    <main>
      <HeroLanding />
      <BenefitsBar />
      <Categories />
      <BestSellers />
      <ValueProps />
      <Sobre />
      <Testimonials />
      <Guarantees />
      <FAQ />
    </main>
  );
}

export default LandingPage;
