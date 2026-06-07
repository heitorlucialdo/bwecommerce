/* hifi-collection.jsx — catálogo completo e por categoria. */

function CollectionPage({ categorySlug }) {
  const { go } = useNav();
  const meta = categorySlug ? categoryMetaFromSlug(categorySlug) : null;
  const items = categorySlug
    ? (meta ? productsInCategory(meta.cat) : [])
    : PRODUCTS;
  const title = meta ? meta.label : categorySlug ? "Categoria" : "Todos os prazeres";
  const lead = meta
    ? `Seleção BW em ${meta.label.toLowerCase()}.`
    : "Cada peça curada para quem busca qualidade, discrição e uma experiência à altura do desejo.";

  React.useEffect(() => { window.scrollTo(0, 0); }, [categorySlug]);

  return (
    <main>
      <section className="section collection-page">
        <div className="wrap">
          <div className="sec-head center">
            <Reveal><span className="eyebrow">{meta ? meta.label : "Coleção BW"}</span></Reveal>
            <Reveal delay={60}><h1 className="display">{title}</h1></Reveal>
            <Reveal delay={120}>
              <p className="collection-lead">{lead}</p>
            </Reveal>
          </div>
          {items.length === 0 ? (
            <Reveal className="collection-empty">
              <p>Em breve — novidades chegando nesta categoria.</p>
              <button className="link-cta" type="button" onClick={() => go("colecao")}>
                Ver todos os prazeres <Icon.arrow/>
              </button>
            </Reveal>
          ) : (
            <div className="grid-4 collection-grid">
              {items.map((p, i) => (
                <Reveal key={p.slug} delay={i * 70}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { CollectionPage });
