/* hifi-product.jsx — product page template (works for any product). */
import React from 'react';
import { useNav, useCart, BRL, PRODUCTS, PRODUCT_BY_SLUG, buildWASingleLink, Reveal, Ph, Icon, Stars, ProductCard } from './hifi-shared';

const SPECS = [
  ["Material", "Silicone médico certificado"],
  ["Dimensões", "18cm x 3,5cm"],
  ["Carregamento", "USB magnético"],
  ["Autonomia", "até 2 horas"],
  ["À prova d'água", "Sim (IPX7)"],
  ["Modos de vibração", "10 intensidades"],
];
const PAY = ["Pix", "Visa", "Mastercard", "Elo", "AmEx"];
const PD_TRUST = [
  ["box", "Entrega discreta e segura"],
  ["swap", "Troca em até 7 dias"],
  ["check", "Produto certificado body-safe"],
];
const PD_REVIEWS = [
  { name: "Isabela Rocha, 28", text: "Nunca imaginei que um produto íntimo pudesse ter esse nível de acabamento." },
  { name: "Carolina Mendes, 31", text: "Me sinto segura comprando aqui. O atendimento é impecável." },
  { name: "Rafael Souza, 26", text: "Presente perfeito. Ela amou a embalagem antes mesmo de abrir." },
];

function Gallery({ product }) {
  const frames = [
    { src: product.img, label: product.name },
    { src: null, label: "Detalhe" },
    { src: null, label: "Embalagem" },
    { src: null, label: "Lifestyle" },
  ];
  const [active, setActive] = React.useState(0);
  const f = frames[active];
  return (
    <div>
      <div className="gallery-main">
        <Ph key={active} className="fade-in" label={f.label} src={f.src} />
      </div>
      <div className="thumbs">
        {frames.map((fr, i) => (
          <button key={i} className={`thumb-btn ${i === active ? "active" : ""}`} onClick={() => setActive(i)} aria-label={`Imagem ${i + 1}`}>
            <Ph label="" src={fr.src} />
          </button>
        ))}
      </div>
    </div>
  );
}

function Variations() {
  const opts = ["10 modos", "Intenso", "Suave"];
  const [sel, setSel] = React.useState(0);
  return (
    <div className="pd-var">
      <div className="var-label">Intensidade</div>
      <div className="var-opts">
        {opts.map((o, i) => (
          <button key={o} className={`var-opt ${i === sel ? "active" : ""}`} onClick={() => setSel(i)}>{o}</button>
        ))}
      </div>
    </div>
  );
}

function InfoColumn({ product }) {
  const { go } = useNav();
  const cart = useCart();
  const pix = product.price * 0.97;
  const parc = product.price / 6;
  return (
    <div className="pd-info">
      <div className="breadcrumb">
        <a href="#" onClick={(e) => { e.preventDefault(); go("home"); }}>Início</a>
        <span className="sep">/</span>
        <a href="#" onClick={(e) => { e.preventDefault(); go("home"); }}>{product.cat}</a>
        <span className="sep">/</span>
        <span className="cur">{product.name}</span>
      </div>
      <h1 className="name display">{product.name}</h1>
      <div className="pd-rating">
        <Stars />
        <span className="count">(28 avaliações)</span>
      </div>
      <div className="pd-price">
        <div className="big">{BRL(product.price)}</div>
        <div className="meta">ou 6x de {BRL(parc)} sem juros</div>
        <div className="meta">3% de desconto no Pix → {BRL(pix)}</div>
      </div>
      <Variations />
      <div className="pd-ctas">
        <button className="btn btn-primary btn-block" onClick={() => cart.add(product.slug)}>Adicionar ao Carrinho</button>
        <a className="btn btn-wa btn-block" href={buildWASingleLink(product)} target="_blank" rel="noopener">
          Comprar Agora
        </a>
      </div>
      <div className="pd-pay">
        <div className="p-title">Formas de pagamento aceitas</div>
        <div className="pay-badges">
          {PAY.map((p) => <span className="pay-badge" key={p}>{p}</span>)}
        </div>
        <div className="pd-secure"><Icon.lock/> Ambiente 100% seguro e criptografado</div>
      </div>
      <div className="pd-trust">
        {PD_TRUST.map(([ico, t]) => {
          const I = Icon[ico];
          return (
            <div className="t" key={t}>
              <span className="t-ico"><I/></span>
              <span>{t}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Description() {
  return (
    <section className="section panel">
      <div className="wrap">
        <div className="sec-head" style={{ marginBottom: "calc(30px * var(--sp))" }}>
          <div>
            <Reveal><span className="eyebrow">Detalhes</span></Reveal>
            <Reveal delay={60}><h2 className="display">Sobre o Produto</h2></Reveal>
          </div>
        </div>
        <div className="sobre-grid" style={{ alignItems: "start" }}>
          <Reveal className="desc-copy">
            <p>Concebido para quem entende que prazer e cuidado caminham juntos, este é um objeto de desejo tão bonito quanto eficiente — pensado nos mínimos detalhes.</p>
            <p>O silicone médico de toque aveludado garante segurança e conforto, enquanto o motor silencioso entrega potência sem ruído. Cada acabamento foi calibrado para uma experiência sensorial completa.</p>
            <p>Recarregável, à prova d'água e discreto: feito para acompanhar você em qualquer momento, com a sofisticação que define a BW.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="eyebrow dim" style={{ marginBottom: 8 }}>Especificações</div>
            <div className="specs">
              {SPECS.map(([k, v]) => (
                <div className="spec-row" key={k}>
                  <span className="k">{k}</span>
                  <span className="v">{v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head center">
          <Reveal><span className="eyebrow">Avaliações</span></Reveal>
          <Reveal delay={60}><h2 className="display">O que estão dizendo</h2></Reveal>
        </div>
        <div className="grid-3">
          {PD_REVIEWS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90} className="t-card">
              <Stars />
              <p>"{t.text}"</p>
              <div className="who-row">
                <span className="t-avatar" />
                <span className="name">{t.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Related({ current }) {
  const { go } = useNav();
  const items = PRODUCTS.filter((p) => p.slug !== current.slug).slice(0, 4);
  return (
    <section className="section bg2">
      <div className="wrap">
        <div className="sec-head center">
          <Reveal><span className="eyebrow">Curadoria</span></Reveal>
          <Reveal delay={60}><h2 className="display">Você também pode gostar</h2></Reveal>
        </div>
        <div className="grid-4">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}><ProductCard product={p} /></Reveal>
          ))}
        </div>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "calc(46px * var(--sp))" }}>
            <button className="btn btn-ghost" onClick={() => go("home")}>Ver Coleção Completa</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProductPage({ slug }) {
  const product = PRODUCT_BY_SLUG[slug] || PRODUCTS[0];
  React.useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  return (
    <main>
      <section className="section" style={{ paddingTop: "calc(54px * var(--sp))" }}>
        <div className="wrap">
          <div className="pd-split">
            <Reveal><Gallery product={product} /></Reveal>
            <Reveal delay={100}><InfoColumn product={product} /></Reveal>
          </div>
        </div>
      </section>
      <Description />
      <Reviews />
      <Related current={product} />
    </main>
  );
}

export default ProductPage;
