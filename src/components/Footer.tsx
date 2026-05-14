import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-16 bg-nav text-nav-foreground">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-nav-secondary py-3 text-center text-sm font-semibold transition hover:brightness-125"
      >
        Back to top
      </button>
      <div className="mx-auto grid max-w-screen-2xl gap-8 px-6 py-12 md:grid-cols-4">
        {[
          { title: "Get to Know Us", links: ["About Shopline", "Careers", "Press Releases", "Sustainability"] },
          { title: "Make Money with Us", links: ["Sell on Shopline", "Become an Affiliate", "Advertise Your Products", "Self-Publish"] },
          { title: "Payment Products", links: ["Shopline Card", "Reload Your Balance", "Currency Converter", "Gift Cards"] },
          { title: "Let Us Help You", links: ["Your Account", "Your Orders", "Shipping Rates", "Returns & Replacements"] },
        ].map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-base font-semibold">{col.title}</h3>
            <ul className="space-y-2 text-sm text-nav-foreground/70">
              {col.links.map((l) => (
                <li key={l}>
                  <Link to="/" className="hover:underline">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-nav-foreground/60">
        © {new Date().getFullYear()} Shopline.co — Built as a demo storefront.
      </div>
    </footer>
  );
}
