/* hifi-shared.jsx — data, primitives, chrome, cart drawer. */
import React from 'react';

/* ---- data ------------------------------------------------------------- */
const PRODUCTS = [
  { slug: "sugador-pro", name: "Sugador Pro", price: 749, cat: "Vibradores", img: "/assets/sugador-pro.jpg" },
  { slug: "sugador", name: "Sugador", price: 549, cat: "Vibradores", img: "/assets/sugador.jpg" },
  { slug: "rosa-velvet", name: "Rosa Velvet", price: 459, cat: "Vibradores", img: "/assets/rosa-velvet.jpg" },
  { slug: "golfinho", name: "Golfinho", price: 329, cat: "Vibradores", img: "/assets/golfinho.jpg" },
  { slug: "egg", name: "Egg", price: 229, cat: "Acessórios", img: "/assets/egg.jpg" },
  { slug: "bullet", name: "Bullet", price: 189, cat: "Vibradores", img: "/assets/bullet.jpg" },
  { slug: "sedenta-hot", name: "Sedenta Hot", price: 129, cat: "Cosméticos", img: "/assets/sedenta-hot.jpg" },
];
const PRODUCT_BY_SLUG = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]));

const MENU_CATEGORIES = [
  { label: "Vibradores", slug: "vibradores", cat: "Vibradores" },
  { label: "Kits", slug: "kits", cat: "Kits" },
  { label: "Cosméticos", slug: "cosmeticos", cat: "Cosméticos" },
  { label: "Acessórios", slug: "acessorios", cat: "Acessórios" },
  { label: "Vintage", slug: "vintage", cat: "Vintage" },
];

function productsInCategory(catName) {
  return PRODUCTS.filter((p) => p.cat === catName);
}

function categoryMetaFromSlug(slug) {
  return MENU_CATEGORIES.find((c) => c.slug === slug) || null;
}

const CATEGORIES = [
  { name: "Vibradores", slug: "vibradores", count: "5 produtos", img: "/assets/foto_vibradores.jpg" },
  { name: "Kits", slug: "kits", count: "Em breve", img: "/assets/kitis.jpg" },
  { name: "Cosméticos Íntimos", slug: "cosmeticos", count: "1 produto", img: "/assets/comesticos.jpg" },
  { name: "Acessórios", slug: "acessorios", count: "1 produto", img: "/assets/acessorios.jpg" },
];

const BENEFITS = [
  "Frete grátis acima de R$350",
  "Entrega 100% discreta",
  "Parcele em até 6x",
  "3% de desconto no Pix",
];

const NAV_LINKS = ["Coleção", "Kits", "Cosméticos", "Acessórios", "Sobre"];

const BRL = (n) => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const WA_PHONE = "5565996490705"; // substitua pelo número real com DDI
const WA_URL = `https://wa.me/${WA_PHONE}`;

function buildWACartLink(items) {
  const linhas = items.map(it =>
    `• ${it.p.name}${it.qty > 1 ? ` (x${it.qty})` : ''} - ${BRL(it.p.price * it.qty)}`
  ).join('\n');
  const total = items.reduce((s, it) => s + it.p.price * it.qty, 0);
  const msg = `Olá! Tenho interesse nos seguintes produtos:\n\n${linhas}\n\nTotal: ${BRL(total)}\n\nPode me ajudar? 😊`;
  return `${WA_URL}?text=${encodeURIComponent(msg)}`;
}

function buildWASingleLink(product) {
  const msg = `Olá! Tenho interesse no produto:\n\n• ${product.name} - ${BRL(product.price)}\n\nPode me ajudar? 😊`;
  return `${WA_URL}?text=${encodeURIComponent(msg)}`;
}

/* ---- contexts --------------------------------------------------------- */
const Nav = React.createContext({ go: () => {} });
const Cart = React.createContext(null);
const useNav = () => React.useContext(Nav);
const useCart = () => React.useContext(Cart);

/* ---- reveal-on-scroll ------------------------------------------------- */
function Reveal({ children, delay = 0, as = "div", className = "", style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("in"); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); } }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}>
      {children}
    </Tag>
  );
}

/* ---- placeholder / image --------------------------------------------- */
function resolveRes(p) {
  if (!p) return p;
  return (window.__resources && window.__resources[p]) || p;
}
function Ph({ label = "Editorial", src, className = "", style, ratio }) {
  const s = ratio ? { aspectRatio: ratio, ...style } : style;
  if (src) {
    return (
      <div className={`ph real ${className}`} style={s}>
        <img src={resolveRes(src)} alt={label} loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`ph ${className}`} style={s}>
      <span className="ph-label">{label}</span>
    </div>
  );
}

/* ---- tiny line icons (stroke = currentColor) ------------------------- */
const Icon = {
  search: (p) => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>),
  bag: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>),
  wa: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c.6.3 1.1.4 1.5.5a3.5 3.5 0 0 0 1.6.1 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z"/></svg>),
  check: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M20 6L9 17l-5-5"/></svg>),
  box: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></svg>),
  swap: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M17 3l4 4-4 4"/><path d="M21 7H7a4 4 0 0 0-4 4"/><path d="M7 21l-4-4 4-4"/><path d="M3 17h14a4 4 0 0 0 4-4"/></svg>),
  lock: (p) => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>),
  shield: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/></svg>),
  arrow: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>),
};

function Stars({ n = 5 }) {
  return <span className="stars">{"★".repeat(n)}</span>;
}

/* ---- navbar ----------------------------------------------------------- */
function Navbar() {
  const { go } = useNav();
  const cart = useCart();
  const [shrink, setShrink] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <React.Fragment>
      <header className={`nav ${shrink ? "shrink" : ""}`}>
        <div className="wrap nav-inner">
          <div className="nav-left">
            <button className="menu-btn" onClick={() => setMenu(true)}>
              <span className="menu-bars"><span/><span/><span/></span>
              <span className="menu-label">Menu</span>
            </button>
          </div>
          <a className="nav-logo" href="#" onClick={(e) => { e.preventDefault(); go("home"); }}>BW</a>
          <div className="nav-right">
            <button className="icon-btn" aria-label="Buscar"><Icon.search/></button>
            <button className="icon-btn" aria-label="Carrinho" onClick={() => cart.setOpen(true)}>
              <Icon.bag/>
              {cart.count > 0 && <span className="cart-count">{cart.count}</span>}
            </button>
          </div>
        </div>
      </header>
      <div className={`scrim ${menu ? "open" : ""}`} onClick={() => setMenu(false)} />
      <aside className={`side-menu ${menu ? "open" : ""}`} aria-hidden={!menu}>
        <div className="side-menu-head">
          <span className="side-menu-logo">BW</span>
          <button className="drawer-close" onClick={() => setMenu(false)}>Fechar ✕</button>
        </div>
        <div className="side-menu-eyebrow">Coleção</div>
        <nav className="side-menu-nav">
          <a className="side-menu-all" href="#" onClick={(e) => { e.preventDefault(); setMenu(false); go("colecao"); }}>
            <span>Todos os prazeres</span>
            <Icon.arrow/>
          </a>
          {MENU_CATEGORIES.map((c) => (
            <a key={c.slug} href="#" onClick={(e) => { e.preventDefault(); setMenu(false); go("colecao", c.slug); }}>
              <span>{c.label}</span>
              <Icon.arrow/>
            </a>
          ))}
        </nav>
        <div className="side-menu-foot">
          <a href="#" onClick={(e) => { e.preventDefault(); setMenu(false); go("filosofia"); }}>Nossa Filosofia</a>
          <a href={WA_URL} target="_blank" rel="noopener">Falar com Especialista</a>
        </div>
      </aside>
    </React.Fragment>
  );
}

/* ---- footer ----------------------------------------------------------- */
function Footer() {
  const { go } = useNav();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">BW</div>
            <div className="footer-tag">Prazer com sofisticação.</div>
          </div>
          <div className="footer-col">
            <h4>Navegação</h4>
            <a href="#" onClick={(e) => { e.preventDefault(); go("home"); }}>Coleção</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("filosofia"); }}>Sobre</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("home"); }}>FAQ</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Trocas e Devoluções</a>
          </div>
          <div className="footer-col">
            <h4>Redes</h4>
            <a href="#" onClick={(e) => e.preventDefault()}>Instagram</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Pinterest</a>
            <a href="#" onClick={(e) => e.preventDefault()}>TikTok</a>
          </div>
          <div className="footer-col">
            <h4>Selos</h4>
            <span>SSL Seguro</span>
            <span>Pagamento Seguro</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 BW Íntimo — Todos os direitos reservados</span>
          <div className="footer-seals">
            <span>SSL · Criptografado</span>
            <span>Embalagem Neutra</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---- floating whatsapp ----------------------------------------------- */
function WhatsApp() {
  return (
    <a className="wa" href={WA_URL} target="_blank" rel="noopener">
      <span className="wa-tip">Falar com Especialista</span>
      <span className="wa-btn"><Icon.wa/></span>
    </a>
  );
}

/* ---- product card ----------------------------------------------------- */
function ProductCard({ product }) {
  const { go } = useNav();
  const cart = useCart();
  return (
    <article className="pcard">
      <a className="pcard-media" href="#" onClick={(e) => { e.preventDefault(); go("product", product.slug); }}>
        <Ph label={product.name} src={product.img} />
        <span className="pcard-add" onClick={(e) => { e.preventDefault(); e.stopPropagation(); cart.add(product.slug); }}>
          Adicionar ao Carrinho
        </span>
      </a>
      <div className="pcard-cat">{product.cat}</div>
      <a className="pcard-name" href="#" onClick={(e) => { e.preventDefault(); go("product", product.slug); }}>{product.name}</a>
      <div className="pcard-price">{BRL(product.price)}</div>
      <a className="pcard-buy-now" href={buildWASingleLink(product)} target="_blank" rel="noopener">Comprar agora →</a>
    </article>
  );
}

/* ---- cart drawer ------------------------------------------------------ */
function CartDrawer() {
  const cart = useCart();
  const { go } = useNav();
  const items = cart.items.map((it) => ({ ...it, p: PRODUCT_BY_SLUG[it.slug] })).filter((it) => it.p);
  const subtotal = items.reduce((s, it) => s + it.p.price * it.qty, 0);
  return (
    <React.Fragment>
      <div className={`scrim ${cart.open ? "open" : ""}`} onClick={() => cart.setOpen(false)} />
      <aside className={`drawer ${cart.open ? "open" : ""}`} aria-hidden={!cart.open}>
        <div className="drawer-head">
          <h3>Seu Carrinho</h3>
          <div className="drawer-head-right">
            {items.length > 0 && (
              <button className="cart-clear" onClick={cart.clear}>Limpar</button>
            )}
            <button className="drawer-close" onClick={() => cart.setOpen(false)}>Fechar ✕</button>
          </div>
        </div>
        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="drawer-empty">
              <Icon.bag width="30" height="30" />
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--ink-dim)" }}>Seu carrinho está vazio</div>
              <button className="link-cta" onClick={() => { cart.setOpen(false); go("home"); }}>Explorar Coleção</button>
            </div>
          ) : (
            items.map((it) => (
              <div className="cart-row" key={it.slug}>
                {it.p.img ? <img className="thumb" src={resolveRes(it.p.img)} alt={it.p.name} /> : <Ph label="" />}
                <div className="cart-info">
                  <div className="cn">{it.p.name}</div>
                  <div className="cp">{BRL(it.p.price)}</div>
                  <div className="qty">
                    <button onClick={() => cart.setQty(it.slug, it.qty - 1)}>–</button>
                    <span>{it.qty}</span>
                    <button onClick={() => cart.setQty(it.slug, it.qty + 1)}>+</button>
                  </div>
                </div>
                <button className="cart-remove" onClick={() => cart.remove(it.slug)}>Remover</button>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="drawer-sub">
              <span className="lbl">Subtotal</span>
              <span className="val">{BRL(subtotal)}</span>
            </div>
            <div className="drawer-note">Frete e impostos calculados na finalização · Embalagem neutra garantida.</div>
            <a className="btn btn-wa btn-block" href={buildWACartLink(items)} target="_blank" rel="noopener">
              Comprar Agora
            </a>
          </div>
        )}
      </aside>
    </React.Fragment>
  );
}

export {
  PRODUCTS, PRODUCT_BY_SLUG, CATEGORIES, BENEFITS, NAV_LINKS, MENU_CATEGORIES,
  productsInCategory, categoryMetaFromSlug, BRL, WA_URL, WA_PHONE, buildWACartLink, buildWASingleLink,
  Nav, Cart, useNav, useCart, Reveal, Ph, Icon, Stars,
  Navbar, Footer, WhatsApp, ProductCard, CartDrawer,
};
