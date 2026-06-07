/* hifi-app.jsx — router, cart provider, theme + Tweaks. */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './hifi.css';
import { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakToggle, TweakText, TweakButton } from './tweaks-panel';
import { Nav, Cart, Navbar, Footer, WhatsApp, CartDrawer } from './hifi-shared';
import LandingPage from './hifi-landing';
import ProductPage from './hifi-product';
import PhilosophyPage from './hifi-philosophy';
import CollectionPage from './hifi-collection';

const HIFI_TWEAKS = /*EDITMODE-BEGIN*/{
  "accent": "mono",
  "headingFont": "Cormorant Garamond",
  "density": "comfortable",
  "motion": true,
  "philoVideo": ""
}/*EDITMODE-END*/;

const ACCENTS = {
  mono:   { "--accent": "#F5F5F5", "--accent-ink": "#0A0A0A", "--accent-soft": "rgba(245,245,245,0.10)" },
  gold:   { "--accent": "#C9A96E", "--accent-ink": "#0A0A0A", "--accent-soft": "rgba(201,169,110,0.12)" },
  bronze: { "--accent": "#B08D57", "--accent-ink": "#0A0A0A", "--accent-soft": "rgba(176,141,87,0.12)" },
};
const HEADING_FONTS = {
  "Cormorant Garamond": "'Cormorant Garamond', serif",
  "Bodoni Moda": "'Bodoni Moda', serif",
};

/* ---- cart hook -------------------------------------------------------- */
function useCartStore() {
  const [items, setItems] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem("bw_cart") || "[]"); } catch { return []; }
  });
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => { localStorage.setItem("bw_cart", JSON.stringify(items)); }, [items]);
  const add = (slug) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.slug === slug);
      if (ex) return prev.map((i) => i.slug === slug ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { slug, qty: 1 }];
    });
    setOpen(true);
  };
  const setQty = (slug, qty) => setItems((prev) => qty <= 0 ? prev.filter((i) => i.slug !== slug) : prev.map((i) => i.slug === slug ? { ...i, qty } : i));
  const remove = (slug) => setItems((prev) => prev.filter((i) => i.slug !== slug));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return { items, open, setOpen, add, setQty, remove, clear, count };
}

/* ---- routing (hash) --------------------------------------------------- */
function parseHash() {
  const h = (location.hash || "").replace(/^#\/?/, "");
  const parts = h.split("/").filter(Boolean);
  if (parts[0] === "colecao") return { view: "colecao", slug: parts[1] || null };
  if (parts[0] === "produto" && parts[1]) return { view: "product", slug: parts[1] };
  if (parts[0] === "filosofia") return { view: "filosofia", slug: null };
  return { view: "home", slug: null };
}

function App() {
  const [t, setTweak] = useTweaks(HIFI_TWEAKS);
  const [route, setRoute] = React.useState(parseHash);
  const cart = useCartStore();

  React.useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = React.useCallback((view, slug) => {
    location.hash =
      view === "product" && slug ? `#/produto/${slug}`
      : view === "filosofia" ? "#/filosofia"
      : view === "colecao" && slug ? `#/colecao/${slug}`
      : view === "colecao" ? "#/colecao"
      : "#/";
    window.scrollTo(0, 0);
  }, []);

  // theme vars + motion flag
  React.useEffect(() => {
    const root = document.documentElement;
    const acc = ACCENTS[t.accent] || ACCENTS.mono;
    Object.entries(acc).forEach(([k, v]) => root.style.setProperty(k, v));
    root.style.setProperty("--font-display", HEADING_FONTS[t.headingFont] || HEADING_FONTS["Cormorant Garamond"]);
    root.style.setProperty("--sp", t.density === "compact" ? "0.74" : t.density === "spacious" ? "1.22" : "1");
    document.body.dataset.motion = t.motion ? "on" : "off";
  }, [t.accent, t.headingFont, t.density, t.motion]);

  const navValue = React.useMemo(() => ({ go }), [go]);

  return (
    <Nav.Provider value={navValue}>
      <Cart.Provider value={cart}>
        <Navbar />
        {route.view === "product"
          ? <ProductPage slug={route.slug} />
          : route.view === "filosofia"
          ? <PhilosophyPage videoUrl={t.philoVideo} />
          : route.view === "colecao"
          ? <CollectionPage categorySlug={route.slug} />
          : <LandingPage />}
        <Footer />
        <WhatsApp />
        <CartDrawer />

        <TweaksPanel>
          <TweakSection label="Aparência" />
          <TweakRadio label="Acento" value={t.accent} options={["mono", "gold", "bronze"]} onChange={(v) => setTweak("accent", v)} />
          <TweakSelect label="Fonte do título" value={t.headingFont} options={["Cormorant Garamond", "Bodoni Moda"]} onChange={(v) => setTweak("headingFont", v)} />
          <TweakRadio label="Densidade" value={t.density} options={["compact", "comfortable", "spacious"]} onChange={(v) => setTweak("density", v)} />
          <TweakSection label="Movimento" />
          <TweakToggle label="Animações" value={t.motion} onChange={(v) => setTweak("motion", v)} />
          <TweakSection label="Navegação" />
          <TweakButton label="Ir para a Landing" onClick={() => go("home")} />
          <TweakButton label="Ver Página de Produto" onClick={() => go("product", "sugador-pro")} />
          <TweakButton label="Ver Todos os prazeres" onClick={() => go("colecao")} />
          <TweakButton label="Ver Nossa Filosofia" onClick={() => go("filosofia")} />
          <TweakSection label="Filosofia" />
          <TweakText label="URL do vídeo" value={t.philoVideo} placeholder="https://… ou assets/filosofia.mp4" onChange={(v) => setTweak("philoVideo", v)} />
        </TweaksPanel>
      </Cart.Provider>
    </Nav.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
