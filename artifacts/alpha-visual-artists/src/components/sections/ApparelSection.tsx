import React from "react";

export function ApparelSection() {
  return (
    <>
      <style>{`
        .ava-apparel *, .ava-apparel *::before, .ava-apparel *::after { box-sizing: border-box; }

        .ava-apparel { background: #080808; color: #fff; font-family: 'Inter', sans-serif; }

        .ava-apparel .section-rule { width: 100%; height: 1px; background: rgba(255,255,255,.07); }

        .ava-apparel .apparel-section { padding: 80px 48px; background: #080808; }

        .ava-apparel .hero-banner {
          position: relative; width: 100%; height: 520px;
          overflow: hidden; margin-bottom: 56px;
        }
        .ava-apparel .hero-banner img {
          width: 100%; height: 100%; object-fit: cover; object-position: center 30%;
          display: block; transition: transform .7s ease;
        }
        .ava-apparel .hero-banner:hover img { transform: scale(1.03); }
        .ava-apparel .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.2) 50%, transparent 100%);
        }
        .ava-apparel .hero-text { position: absolute; bottom: 40px; left: 48px; }
        .ava-apparel .eyebrow {
          font-size: 10px; letter-spacing: .35em; text-transform: uppercase;
          color: rgba(255,255,255,.4); margin-bottom: 10px; font-weight: 300;
        }
        .ava-apparel .hero-title {
          font-family: 'Sora', sans-serif; font-size: clamp(40px, 5vw, 68px);
          font-weight: 800; line-height: 1; letter-spacing: -.02em; margin: 0;
        }

        .ava-apparel .lifestyle-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto auto;
          gap: 10px;
          margin-bottom: 52px;
        }
        .ava-apparel .grid-item { position: relative; overflow: hidden; cursor: pointer; }
        .ava-apparel .grid-item img {
          width: 100%; height: 100%; object-fit: cover;
          display: block; transition: transform .5s ease;
        }
        .ava-apparel .grid-item:hover img { transform: scale(1.06); }
        .ava-apparel .grid-overlay {
          position: absolute; inset: 0; background: rgba(0,0,0,0);
          transition: background .3s; display: flex; align-items: flex-end; padding: 14px;
        }
        .ava-apparel .grid-item:hover .grid-overlay { background: rgba(0,0,0,.35); }
        .ava-apparel .grid-label {
          font-size: 9px; letter-spacing: .25em; text-transform: uppercase;
          color: rgba(255,255,255,0); transition: color .3s;
        }
        .ava-apparel .grid-item:hover .grid-label { color: rgba(255,255,255,.85); }

        .ava-apparel .grid-item.top { aspect-ratio: 3/4; }
        .ava-apparel .grid-item.bottom { aspect-ratio: 16/9; }
        .ava-apparel .grid-item.bottom-left { grid-column: 1 / 2; grid-row: 2; }
        .ava-apparel .grid-item.bottom-right { grid-column: 2 / 4; grid-row: 2; }

        .ava-apparel .img-solo { object-position: center 70% !important; }
        .ava-apparel .img-justice { object-position: center 45% !important; }

        .ava-apparel .bottom-row {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 48px;
        }
        .ava-apparel .copy-block { max-width: 520px; }
        .ava-apparel .copy-body { font-size: 18px; line-height: 1.7; color: rgba(255,255,255,.65); font-weight: 300; }
        .ava-apparel .cta-btn {
          display: inline-flex; align-items: center; gap: 12px;
          border: 1px solid rgba(255,255,255,.25); color: #fff;
          padding: 16px 32px; font-size: 11px; letter-spacing: .2em;
          text-transform: uppercase; text-decoration: none;
          transition: background .3s, color .3s, border-color .3s;
          white-space: nowrap; flex-shrink: 0;
        }
        .ava-apparel .cta-btn:hover { background: #fff; color: #000; border-color: #fff; }
        .ava-apparel .cta-btn:hover svg { transform: translateX(4px); }
        .ava-apparel .cta-btn svg { transition: transform .3s; }

        @media (max-width: 768px) {
          .ava-apparel .apparel-section { padding: 48px 20px; }
          .ava-apparel .hero-banner { height: 360px; }
          .ava-apparel .hero-text { left: 20px; bottom: 24px; }
          .ava-apparel .lifestyle-grid { grid-template-columns: repeat(2, 1fr); }
          .ava-apparel .grid-item.bottom-left { grid-column: 1 / 2; grid-row: auto; }
          .ava-apparel .grid-item.bottom-right { grid-column: 2 / 3; grid-row: auto; }
          .ava-apparel .grid-item.bottom { aspect-ratio: 3/4; }
          .ava-apparel .bottom-row { flex-direction: column; align-items: flex-start; gap: 28px; }
        }
      `}</style>

      <div className="ava-apparel" id="apparel">
        <div className="section-rule"></div>
        <section className="apparel-section">
          <div className="hero-banner">
            <img
              src="https://cdn.shopify.com/s/files/1/0813/1166/2300/files/hero_banner.jpg?v=1778629213"
              alt="Alpha Visual Artists — Concrete Vision"
            />
            <div className="hero-overlay"></div>
            <div className="hero-text">
              <p className="eyebrow">Alpha Visual Artists</p>
              <h2 className="hero-title">
                Alpha Crew<br />Collection
              </h2>
            </div>
          </div>

          <div className="lifestyle-grid">
            <div className="grid-item top">
              <img
                src="https://cdn.shopify.com/s/files/1/0813/1166/2300/files/eden_solo2_79c9e55f-4f71-4396-bc06-e3c7d8b15b2b.jpg?v=1778629300"
                alt="Eden solo green tee Chicago el tracks"
                style={{ objectPosition: "center 40%" }}
              />
              <div className="grid-overlay"><span className="grid-label">Forest Green Tee</span></div>
            </div>

            <div className="grid-item top">
              <img
                src="https://cdn.shopify.com/s/files/1/0813/1166/2300/files/ava_ashie_eden_grade1_8bb1ab5a-92df-4e85-83a5-d37a4402a0d8.jpg?v=1778629299"
                alt="AVA crew laughing blue garage"
                style={{ objectPosition: "center 30%" }}
              />
              <div className="grid-overlay"><span className="grid-label">The Crew</span></div>
            </div>

            <div className="grid-item top">
              <img
                src="https://cdn.shopify.com/s/files/1/0813/1166/2300/files/SOLO_SIT_KOIBE_WALL_061ff942-5535-46d9-9316-cea0c38ba9da.jpg?v=1778629241"
                alt="Alpha Crew hoodie PEACE mural"
                className="img-solo"
              />
              <div className="grid-overlay"><span className="grid-label">Alpha Hoodie</span></div>
            </div>

            <div className="grid-item bottom bottom-left">
              <img
                src="https://cdn.shopify.com/s/files/1/0813/1166/2300/files/PAPI_W__FOOTBALL_bd7ec3b7-0e3e-4400-b85b-137844bfe637.jpg?v=1778629271"
                alt="Girl golden hour green AVA tee"
                style={{ objectPosition: "center 35%" }}
              />
              <div className="grid-overlay"><span className="grid-label">Golden Hour</span></div>
            </div>

            <div className="grid-item bottom bottom-right">
              <img
                src="https://shopify-staged-uploads.storage.googleapis.com/tmp/81311662300/products/b97df512-2715-414c-bc97-487fb9c370ae/justice_tree_flex.jpg"
                alt="Justice flexing tree pink tee golden hour"
                className="img-justice"
              />
              <div className="grid-overlay"><span className="grid-label">Justice</span></div>
            </div>
          </div>

          <div className="bottom-row">
            <div className="copy-block">
              <p className="eyebrow" style={{ marginBottom: 16 }}>Concrete Vision</p>
              <p className="copy-body">
                Wearable documentation. Shot on location across Chicago —
                garments built for creators who move through the world with intention.
              </p>
            </div>
            <a
              href="https://shop.alphavisualartists.com"
              target="_blank"
              rel="noreferrer"
              className="cta-btn"
            >
              Shop the Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
