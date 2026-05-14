import { createFileRoute, Link } from "@tanstack/react-router";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

type ShopSearch = { q?: string; category?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): ShopSearch => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  component: Shop,
  head: () => ({
    meta: [
      { title: "Shop all products — Shopline" },
      { name: "description", content: "Browse Shopline's full catalog of electronics, books, games, cameras and more." },
    ],
  }),
});

function Shop() {
  const { q, category } = Route.useSearch();
  const filtered = products.filter((p) => {
    const matchQ = !q || `${p.title} ${p.brand} ${p.category}`.toLowerCase().includes(q.toLowerCase());
    const matchC = !category || p.category === category;
    return matchQ && matchC;
  });

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-6">
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link to="/" className="text-link hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span>Shop{category ? ` / ${category}` : ""}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="hidden h-fit rounded-lg bg-card p-5 ring-1 ring-border lg:block">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">Department</h3>
          <ul className="space-y-1.5 text-sm">
            <li>
              <Link to="/shop" className={`block rounded px-2 py-1 hover:bg-accent ${!category ? "font-semibold" : ""}`}>
                All departments
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.name}>
                <Link
                  to="/shop"
                  search={{ category: c.name }}
                  className={`block rounded px-2 py-1 hover:bg-accent ${category === c.name ? "font-semibold text-link" : ""}`}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mb-3 mt-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Customer Reviews</h3>
          <ul className="space-y-1.5 text-sm">
            {[4, 3, 2].map((r) => (
              <li key={r} className="flex items-center gap-1 text-link">
                {"★".repeat(r)}
                <span className="text-foreground">& Up</span>
              </li>
            ))}
          </ul>
        </aside>

        <section>
          <div className="mb-4 flex items-center justify-between rounded-lg bg-card px-4 py-3 ring-1 ring-border">
            <p className="text-sm">
              <span className="font-semibold">{filtered.length}</span> results
              {q && <> for "<span className="font-semibold">{q}</span>"</>}
            </p>
            <select className="rounded border border-border bg-background px-3 py-1 text-sm">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Avg. Customer Review</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-lg bg-card p-12 text-center ring-1 ring-border">
              <h3 className="text-xl font-semibold">No results</h3>
              <p className="mt-2 text-muted-foreground">Try a different search or category.</p>
              <Link to="/shop" className="mt-4 inline-block text-link hover:underline">Reset filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
