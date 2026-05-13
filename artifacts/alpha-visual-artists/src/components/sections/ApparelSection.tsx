import React from "react";
import productHoodie from "@/assets/product-hoodie.png";
import productTee from "@/assets/product-tee.png";
import productPants from "@/assets/product-pants.png";
import productJacket from "@/assets/product-jacket.png";

export function ApparelSection() {
  return (
    <>
      <style>{`
        .ava-crew * { margin: 0; padding: 0; box-sizing: border-box; }
        .ava-crew { background: #0a0a0a; color: #e0e0e0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; }
        .ava-crew .container { max-width: 1400px; margin: 0 auto; padding: 0 20px; }

        .ava-crew .hero { padding: 100px 0 80px; text-align: center; }
        .ava-crew .hero-tag { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #00d4ff; margin-bottom: 24px; font-weight: 600; }
        .ava-crew .hero h1 { font-size: clamp(42px, 8vw, 64px); font-weight: 700; line-height: 1.1; margin-bottom: 24px; color: #fff; font-family: 'Sora', sans-serif; }
        .ava-crew .hero h1 span { color: #00d4ff; }
        .ava-crew .hero p { font-size: 18px; color: #b0b0b0; max-width: 700px; margin: 0 auto 40px; line-height: 1.7; }

        .ava-crew .cta-group { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 40px; }
        .ava-crew .btn { padding: 14px 32px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; text-decoration: none; }
        .ava-crew .btn-primary { background: #00d4ff; color: #000; }
        .ava-crew .btn-primary:hover { background: #00c9ff; transform: translateY(-2px); box-shadow: 0 8px 16px rgba(0, 212, 255, 0.2); }
        .ava-crew .btn-secondary { background: transparent; color: #00d4ff; border: 2px solid #00d4ff; }
        .ava-crew .btn-secondary:hover { background: #00d4ff; color: #000; transform: translateY(-2px); }

        .ava-crew .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; margin: 100px 0; padding: 60px 0; border-top: 1px solid #222; border-bottom: 1px solid #222; }
        .ava-crew .stat { text-align: center; }
        .ava-crew .stat-number { font-size: 48px; font-weight: 700; color: #00d4ff; margin-bottom: 8px; font-family: 'Sora', sans-serif; }
        .ava-crew .stat-label { font-size: 13px; color: #999; text-transform: uppercase; letter-spacing: 1px; font-weight: 500; }

        .ava-crew .quote-section { margin: 100px 0; padding: 60px 40px; background: #111; border-left: 4px solid #00d4ff; border-radius: 4px; }
        .ava-crew .quote-section h2 { font-size: clamp(32px, 5vw, 48px); font-weight: 700; line-height: 1.2; margin-bottom: 16px; color: #fff; font-family: 'Sora', sans-serif; }
        .ava-crew .quote-section h2 span { color: #00d4ff; }
        .ava-crew .quote-section p { font-size: 13px; color: #999; margin-top: 16px; text-transform: uppercase; letter-spacing: 0.5px; }

        .ava-crew .products { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 28px; margin: 100px 0; }
        .ava-crew .product { background: #111; border-radius: 12px; overflow: hidden; transition: all 0.3s ease; border: 1px solid #1a1a1a; }
        .ava-crew .product:hover { transform: translateY(-8px); border-color: #00d4ff; box-shadow: 0 12px 32px rgba(0, 212, 255, 0.15); }
        .ava-crew .product-image { width: 100%; height: 300px; object-fit: cover; background: linear-gradient(135deg, #1a1a1a 0%, #222 100%); display: block; }
        .ava-crew .product-info { padding: 20px; }
        .ava-crew .product-name { font-size: 15px; font-weight: 600; margin-bottom: 6px; color: #fff; font-family: 'Sora', sans-serif; }
        .ava-crew .product-desc { font-size: 12px; color: #999; margin-bottom: 12px; }
        .ava-crew .product-price { font-size: 18px; font-weight: 700; color: #00d4ff; margin-bottom: 16px; }
        .ava-crew .product-btn { width: 100%; padding: 10px; background: #00d4ff; color: #000; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px; transition: all 0.3s; text-transform: uppercase; letter-spacing: 0.5px; }
        .ava-crew .product-btn:hover { background: #00c9ff; transform: translateY(-2px); }

        .ava-crew .three-col { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; margin: 100px 0; }
        .ava-crew .col-item { background: #111; padding: 40px; border-radius: 12px; text-align: center; border: 1px solid #1a1a1a; transition: all 0.3s; }
        .ava-crew .col-item:hover { border-color: #00d4ff; box-shadow: 0 8px 24px rgba(0, 212, 255, 0.1); }
        .ava-crew .col-item h4 { font-size: 20px; font-weight: 700; margin-bottom: 12px; color: #fff; font-family: 'Sora', sans-serif; }
        .ava-crew .col-item p { font-size: 13px; color: #999; margin-bottom: 20px; line-height: 1.6; }
        .ava-crew .col-item .badge { display: inline-block; background: #00d4ff; color: #000; padding: 6px 12px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

        .ava-crew .divider { text-align: center; margin: 100px 0; }
        .ava-crew .divider h3 { font-size: clamp(32px, 5vw, 56px); font-weight: 700; color: #fff; font-family: 'Sora', sans-serif; line-height: 1.2; }
        .ava-crew .divider h3 span { color: #00d4ff; }

        .ava-crew .footer-cta { text-align: center; padding: 100px 0; }
        .ava-crew .footer-cta h2 { font-size: clamp(40px, 8vw, 64px); font-weight: 700; line-height: 1.1; margin-bottom: 32px; color: #fff; font-family: 'Sora', sans-serif; }
        .ava-crew .footer-cta h2 span { color: #00d4ff; }
        .ava-crew .footer-cta p { font-size: 16px; color: #999; max-width: 700px; margin: 0 auto 40px; line-height: 1.7; }

        @media (max-width: 768px) {
          .ava-crew .hero { padding: 60px 0 40px; }
          .ava-crew .hero h1 { margin-bottom: 16px; }
          .ava-crew .hero p { font-size: 16px; }
          .ava-crew .stats { gap: 24px; padding: 40px 0; }
          .ava-crew .quote-section { padding: 40px 24px; }
          .ava-crew .products { gap: 20px; }
          .ava-crew .product-image { height: 250px; }
          .ava-crew .three-col { gap: 20px; }
          .ava-crew .col-item { padding: 28px; }
        }
      `}</style>

      <div className="ava-crew" id="apparel">
        <div className="container">
          <div className="hero">
            <p className="hero-tag">AVA Apparel — Crew Collection</p>
            <h1>Made for the crew &amp;<br />creators.<br /><span>Worn by everyone.</span></h1>
            <p>Built for production days. Designed for those who create. Apparel built for discipline, precision, and the standard of excellence required when the lights come on.</p>
            <div className="cta-group">
              <a href="#products" className="btn btn-primary">Shop the collection</a>
              <a href="https://shop.alphavisualartists.com" target="_blank" rel="noreferrer" className="btn btn-secondary">Browse all</a>
            </div>
          </div>

          <div className="stats">
            <div className="stat"><div className="stat-number">17</div><div className="stat-label">Styles available</div></div>
            <div className="stat"><div className="stat-number">100%</div><div className="stat-label">Cotton heavyweight</div></div>
            <div className="stat"><div className="stat-number">Set</div><div className="stat-label">Tested &amp; approved</div></div>
            <div className="stat"><div className="stat-number">AVA15</div><div className="stat-label">15% off first order</div></div>
          </div>

          <div className="quote-section">
            <h2>Creators don't just<br />make things.<br />They make the world<br /><span>make sense.</span></h2>
            <p>For everyone who stays creating.</p>
          </div>

          <div id="products" className="products">
            <div className="product">
              <img src={productHoodie} alt="ALPHA CREW Hoodie" className="product-image" />
              <div className="product-info">
                <div className="product-name">ALPHA CREW Hoodie</div>
                <div className="product-desc">Premium heavyweight hoodie</div>
                <div className="product-price">$87.50</div>
                <a href="https://shop.alphavisualartists.com" target="_blank" rel="noreferrer" className="product-btn" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>Shop now</a>
              </div>
            </div>
            <div className="product">
              <img src={productTee} alt="Oversized T-Shirt" className="product-image" />
              <div className="product-info">
                <div className="product-name">Oversized T-Shirt</div>
                <div className="product-desc">100% cotton, classic fit</div>
                <div className="product-price">$45.00</div>
                <a href="https://shop.alphavisualartists.com" target="_blank" rel="noreferrer" className="product-btn" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>Shop now</a>
              </div>
            </div>
            <div className="product">
              <img src={productPants} alt="CREW Sweatpants" className="product-image" />
              <div className="product-info">
                <div className="product-name">CREW Sweatpants</div>
                <div className="product-desc">Comfort for set days</div>
                <div className="product-price">$67.50</div>
                <a href="https://shop.alphavisualartists.com" target="_blank" rel="noreferrer" className="product-btn" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>Shop now</a>
              </div>
            </div>
            <div className="product">
              <img src={productJacket} alt="Canvas Work Jacket" className="product-image" />
              <div className="product-info">
                <div className="product-name">Canvas Work Jacket</div>
                <div className="product-desc">Built for all conditions</div>
                <div className="product-price">$125.00</div>
                <a href="https://shop.alphavisualartists.com" target="_blank" rel="noreferrer" className="product-btn" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>Shop now</a>
              </div>
            </div>
          </div>

          <div className="quote-section">
            <h2>The streets don't care<br />what you make.<br /><span>Neither do we.</span></h2>
            <p>Real recognizes real.</p>
          </div>

          <div className="three-col">
            <div className="col-item">
              <h4>On the clock</h4>
              <p>Wear ALPHA when you're directing, shooting, or building something real.</p>
              <span className="badge">Set wear</span>
            </div>
            <div className="col-item">
              <h4>Off the clock</h4>
              <p>Crew apparel for everything else. Studio, coffee shop, anywhere else.</p>
              <span className="badge">Street wear</span>
            </div>
            <div className="col-item">
              <h4>For anyone</h4>
              <p>You don't have to be on set to wear ALPHA. Just create.</p>
              <span className="badge">Creator wear</span>
            </div>
          </div>

          <div className="quote-section">
            <h2>Every great artist was<br />once a kid who<br /><span>refused to stop.</span></h2>
            <p>Keep creating.</p>
          </div>

          <div className="divider">
            <h3>Built for the <span>set.</span><br />Made for<br /><span>everything else.</span></h3>
          </div>

          <div className="quote-section">
            <h2>The next generation<br />of creators<br /><span>is already here.</span></h2>
            <p>Are you with them?</p>
          </div>

          <div className="footer-cta">
            <h2>Wear the<br /><span>vision.</span></h2>
            <p>ALPHA CREW doesn't care if you're directing a feature or a first date. Show up like you mean it.</p>
            <div className="cta-group">
              <a href="https://shop.alphavisualartists.com" target="_blank" rel="noreferrer" className="btn btn-primary">Shop all styles</a>
              <a href="/" className="btn btn-secondary">Back to AVA</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
