/* hifi-philosophy.jsx — "Nossa Filosofia" page.
   Hero = animated video stage (CSS-animated placeholder now; plays a real
   <video> once a URL is provided via Tweaks → t.philoVideo). All body copy
   is lorem until the brand text is final. */

const LOREM_1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const LOREM_2 = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const LOREM_3 = "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.";

const MVV = [
  ["Missão", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim."],
  ["Visão", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure."],
  ["Valores", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum lorem."],
];

function VideoStage() {
  return (
    <div className="philo-stage">
      {/* Desktop: imagem de fundo */}
      <div className="stage-bg-img" aria-hidden="true" />
      {/* Mobile: vídeo de fundo */}
      <video
        className="stage-media-video"
        src="../assets/videochampage.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="stage-overlay" />
      <div className="stage-badge">
        <span className="dot" />
        <span className="lbl">Reproduzindo</span>
      </div>
      <div className="stage-inner">
        <span className="eyebrow">BW Íntimo</span>
        <h1 className="stage-title">A filosofia por trás de cada detalhe</h1>
      </div>
    </div>
  );
}

function AboutUs() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="about-split">
          <Reveal className="a-side">
            <span className="eyebrow">Sobre Nós</span>
            <h2>Quem está por trás da BW</h2>
          </Reveal>
          <Reveal className="about-copy" delay={120}>
            <p>{LOREM_1}</p>
            <p>{LOREM_2}</p>
            <p>{LOREM_3}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MissionVisionValues() {
  return (
    <section className="section bg2">
      <div className="wrap">
        <div className="sec-head center">
          <Reveal><span className="eyebrow">O que nos guia</span></Reveal>
          <Reveal delay={60}><h2 className="display">Missão · Visão · Valores</h2></Reveal>
        </div>
        <Reveal>
          <div className="mvv">
            {MVV.map(([t, d], i) => (
              <div className="mvv-item" key={t}>
                <div className="mvv-num">0{i + 1}</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MegaTitle() {
  return (
    <section className="section philo-mega panel">
      <div className="wrap">
        <Reveal><span className="eyebrow">Nosso compromisso</span></Reveal>
        <Reveal delay={80}><h2>Nossa Filosofia</h2></Reveal>
        <Reveal delay={160}>
          <p className="mega-sub">{LOREM_2}</p>
        </Reveal>
      </div>
    </section>
  );
}

function PhilosophyPage() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main>
      <VideoStage />
      <AboutUs />
      <MissionVisionValues />
      <MegaTitle />
    </main>
  );
}

Object.assign(window, { PhilosophyPage });
