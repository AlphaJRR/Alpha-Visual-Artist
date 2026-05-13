import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Privacy() {
  React.useEffect(() => {
    document.title = "Privacy Policy — Alpha Visual Artists";
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest mb-6">
            Legal
          </div>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6 text-white">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-white/50 text-sm mb-12">
            Last updated: May 2026
          </p>

          <div className="prose prose-invert max-w-none space-y-8 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Who we are</h2>
              <p>
                Alpha Visual Artists ("AVA", "we", "us") is a Chicago-based
                video production studio operating the website
                alphavisualartists.com and the Alpha Visual Artists mobile app
                (the "Services").
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">
                What we collect
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Email address</strong> — only when you voluntarily
                  submit it through our discount popup, contact form, or
                  booking flow.
                </li>
                <li>
                  <strong>Standard request data</strong> — IP address, browser /
                  device type, and pages visited, used solely for security and
                  basic analytics.
                </li>
                <li>
                  <strong>Cookies</strong> — small files used by our site and
                  mobile app to remember your session and preferences. The
                  mobile app stores these in the system WebView's secure
                  storage.
                </li>
              </ul>
              <p className="mt-3">
                We do <strong>not</strong> sell your personal information,
                track you across third-party apps or websites, or use your data
                for advertising.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">
                How we use it
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To respond to inquiries and book production work.</li>
                <li>To send the discount code you requested.</li>
                <li>To improve the website and app experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">
                Mobile app specifics
              </h2>
              <p>
                The Alpha Visual Artists iOS / Android app does not access your
                camera, microphone, photos, contacts, or location. It does not
                use any tracking SDKs, advertising identifiers, or third-party
                analytics. The app stores only standard web cookies and your
                last-viewed page locally on your device.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">
                Third-party services
              </h2>
              <p>
                Bookings are scheduled through Cal.com, which has its own
                privacy policy. Apparel checkout is handled by our merchandise
                partner under their privacy terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">
                Your rights
              </h2>
              <p>
                You may request a copy of, correction of, or deletion of any
                personal data we hold about you at any time by emailing us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Contact</h2>
              <p>
                Questions about this policy? Email{" "}
                <a
                  href="mailto:hello@alphavisualartists.com"
                  className="text-primary hover:underline"
                >
                  hello@alphavisualartists.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
