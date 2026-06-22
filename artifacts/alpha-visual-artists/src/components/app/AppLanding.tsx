import React, { useEffect } from "react";
import { FaApple } from "react-icons/fa";
import { APP_STORE_URL } from "@/config/app";
import "@/styles/ava-tokens.css";
import "@/styles/app-landing.css";

const MARQUEE_ITEMS = [
  "ESSENCE",
  "OWN NETWORK",
  "HBO MAX",
  "ESPN",
  "BET EXPERIENCE",
  "OBAMA FOUNDATION",
];

const PHONE_IMAGES = {
  left: "/app-landing/phone-left.jpeg",
  center: "/app-landing/phone-center.jpeg",
  right: "/app-landing/phone-right.jpeg",
  edit: "/app-landing/show-edit.jpeg",
  apparel: "/app-landing/show-apparel.jpeg",
} as const;

function useRevealOnScroll() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".app-landing .reveal-up, .app-landing .phone.reveal");
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function StoreButton({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <a
      href={APP_STORE_URL}
      className={`btn-store store ${className}`.trim()}
      style={style}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download ALPHA Creators on the App Store"
    >
      <span className="ap">
        <FaApple aria-hidden />
      </span>
      <span>
        <small>Download on the</small>
        <b>App Store</b>
      </span>
    </a>
  );
}

export function AppLanding() {
  useRevealOnScroll();

  useEffect(() => {
    document.documentElement.classList.add("app-landing-root");
    return () => document.documentElement.classList.remove("app-landing-root");
  }, []);

  return (
    <div className="app-landing">
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
      <div className="viewfinder" aria-hidden>
        <i className="vf tl" />
        <i className="vf tr" />
        <i className="vf bl" />
        <i className="vf br" />
      </div>
      <div className="rec" aria-hidden>
        <span className="dot" />
        REC · AVA
      </div>

      <nav>
        <div className="wrap nav-in">
          <div className="brand">
            ALPHA<b>·</b>CREATORS
          </div>
          <a href={APP_STORE_URL} className="nav-cta" target="_blank" rel="noopener noreferrer">
            Download
          </a>
        </div>
      </nav>

      <header className="hero wrap">
        <div className="hero-glow" aria-hidden />
        <span className="eyebrow">The Alpha Creators App</span>
        <h1>
          BEYOND THE FRAME,
          <span className="l2">IN YOUR POCKET.</span>
        </h1>
        <p className="lede">
          Lessons, on-set tools, and the business of the craft — built on real sets by a working
          cinematographer. Everything I learned the hard way, now in your hands.
        </p>
        <div className="cta-row">
          <StoreButton />
          <span className="free-tag">
            <span className="r">Free</span> to start · no catch
          </span>
        </div>
        <div className="cluster">
          <div className="phone p-side p-left reveal">
            <span className="glass">
              <img src={PHONE_IMAGES.left} alt="ALPHA Creators app — toolkit view" />
              <span className="reflect" aria-hidden />
            </span>
          </div>
          <div className="phone p-center reveal">
            <span className="glass">
              <img src={PHONE_IMAGES.center} alt="ALPHA Creators app — home screen" />
              <span className="reflect" aria-hidden />
            </span>
          </div>
          <div className="phone p-side p-right reveal">
            <span className="glass">
              <img src={PHONE_IMAGES.right} alt="ALPHA Creators app — production tools" />
              <span className="reflect" aria-hidden />
            </span>
          </div>
        </div>
      </header>

      <section className="divide">
        <div className="wrap">
          <div className="sec-head reveal-up">
            <span className="eyebrow">What&apos;s inside</span>
            <h2>THE WHOLE CRAFT — AND THE BUSINESS OF IT.</h2>
          </div>
          <div className="feat-grid">
            <div className="feat reveal-up">
              <div className="edge" aria-hidden />
              <div className="n">01 · LEARN</div>
              <h3>Creators Toolkit</h3>
              <p>
                108 lessons across camera, framing, lighting, editing, strategy, and Production 101.
                Film school, in your pocket.
              </p>
            </div>
            <div className="feat reveal-up">
              <div className="edge" aria-hidden />
              <div className="n">02 · PLAN</div>
              <h3>Production Tools</h3>
              <p>
                Pre-prod, day-of, and post checklists that make sure nothing slips. Run your set like
                the productions you want to be on.
              </p>
            </div>
            <div className="feat reveal-up">
              <div className="edge" aria-hidden />
              <div className="n">03 · EARN</div>
              <h3>Rate &amp; Invoice</h3>
              <p>
                Know what to charge and bill it clean from your phone. Look like the business
                you&apos;re becoming.
              </p>
            </div>
            <div className="feat reveal-up">
              <div className="edge" aria-hidden />
              <div className="n">04 · REP</div>
              <h3>Shop the Drop</h3>
              <p>
                Apparel built for production days — tested on set, worn by creators. The uniform of
                working artists.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="divide">
        <div className="wrap">
          <div className="show">
            <div className="copy reveal-up">
              <span className="eyebrow">Post-production</span>
              <h3>FROM LOG TO DELIVER, IN ORDER.</h3>
              <p>
                The Edit checklist walks the whole back end — offload and back up on the 3-2-1 rule,
                set your sequence to delivery spec, label bins, sync audio, flag selects. The pro
                workflow, built in.
              </p>
            </div>
            <div className="ph reveal-up">
              <div className="phone">
                <span className="glass">
                  <img src={PHONE_IMAGES.edit} alt="Edit checklist in ALPHA Creators" />
                  <span className="reflect" aria-hidden />
                </span>
              </div>
            </div>
          </div>
          <div className="show rev">
            <div className="copy reveal-up">
              <span className="eyebrow">Wear the work</span>
              <h3>BUILT FOR PRODUCTION DAYS.</h3>
              <p>
                The AVA drop lives in the app — heavyweight, oversized, shot on the streets of
                Chicago. Tested on set, built between shoots. Shop it the moment it lands.
              </p>
            </div>
            <div className="ph reveal-up">
              <div className="phone">
                <span className="glass">
                  <img src={PHONE_IMAGES.apparel} alt="Apparel shop in ALPHA Creators" />
                  <span className="reflect" aria-hidden />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="divide tested">
        <div className="wrap">
          <span className="eyebrow">Field-tested</span>
          <div className="sec-head reveal-up">
            <h2 style={{ marginTop: 8 }}>BUILT ON SETS THAT MATTERED.</h2>
          </div>
          <div className="marq">
            <div className="marq-track">
              {[0, 1].map((dup) => (
                <React.Fragment key={dup}>
                  {MARQUEE_ITEMS.map((item) => (
                    <span key={`${dup}-${item}`}>
                      {item} <span aria-hidden>·</span>
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="get" className="divide close">
        <div className="wrap">
          <span className="eyebrow">Free to start</span>
          <h2>YOUR STORY&apos;S NEXT.</h2>
          <div className="spec" aria-hidden />
          <p>Download ALPHA Creators and start where the work actually happens.</p>
          <StoreButton style={{ margin: "0 auto" }} />
        </div>
      </section>

      <footer>
        <div className="wrap foot-in">
          <div>
            <div className="foot-brand">ALPHA VISUAL ARTISTS</div>
            <div className="foot-tag">Inspire. Connect. Create Impact.</div>
          </div>
          <a href={APP_STORE_URL} className="get-app store" target="_blank" rel="noopener noreferrer">
            ↓ Get the App
          </a>
        </div>
      </footer>
    </div>
  );
}

export default AppLanding;
