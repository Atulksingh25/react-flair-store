import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { getProduct, products } from "@/lib/products";
import { fmt, useCart } from "@/lib/cart";
import { Stars } from "@/components/Stars";
import { ProductCard } from "@/components/ProductCard";
import { Check, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.title} — Shopline` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.title },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl p-12 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-block text-link hover:underline">Browse all products</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-xl p-12 text-center">
      <p className="text-destructive">{error.message}</p>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const off = product.listPrice
    ? Math.round(((product.listPrice - product.price) / product.listPrice) * 100)
    : 0;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-6">
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link to="/" className="text-link hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" search={{ category: product.category }} className="text-link hover:underline">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="line-clamp-1 inline">{product.title}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr_320px]">
        {/* Image */}
        <div className="rounded-lg bg-white p-6 ring-1 ring-border">
          <img
            src={product.image}
            alt={product.title}
            width={768}
            height={768}
            className="mx-auto aspect-square w-full object-contain"
          />
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-link">{product.brand}</p>
          <h1 className="mt-1 text-2xl font-bold leading-tight md:text-3xl">{product.title}</h1>
          <div className="mt-2 flex items-center gap-2">
            <Stars rating={product.rating} size={16} />
            <span className="text-sm text-link">{product.reviews.toLocaleString()} ratings</span>
          </div>
          <hr className="my-4" />
          {off > 0 && (
            <span className="rounded bg-price/10 px-2 py-0.5 text-sm font-semibold text-price">-{off}%</span>
          )}
          <div className="mt-1 flex items-baseline gap-3">
            <span className="text-3xl font-bold">{fmt(product.price)}</span>
            {product.listPrice && (
              <span className="text-sm text-muted-foreground">
                List: <span className="line-through">{fmt(product.listPrice)}</span>
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">All prices include applicable taxes</p>

          <p className="mt-5 text-sm leading-relaxed text-foreground">{product.description}</p>
          <h2 className="mt-5 text-base font-semibold">About this item</h2>
          <ul className="mt-2 space-y-1.5 text-sm">
            {product.bullets.map((b: string) => (
              <li key={b} className="flex gap-2">
                <Check size={16} className="mt-0.5 shrink-0 text-success" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Buy box */}
        <aside className="h-fit rounded-lg bg-card p-5 ring-1 ring-border">
          <p className="text-2xl font-bold">{fmt(product.price)}</p>
          {product.prime && (
            <p className="mt-1 text-sm text-link">
              <span className="rounded bg-link/10 px-1.5 py-0.5 font-bold">Prime</span> FREE delivery tomorrow
            </p>
          )}
          <p className="mt-3 text-lg font-semibold text-success">In Stock</p>
          <div className="mt-3">
            <label className="block text-xs text-muted-foreground">Quantity</label>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => add(product.id, qty)}
            className="mt-4 w-full rounded-full bg-cta py-2.5 text-sm font-bold text-cta-foreground transition hover:bg-cta-hover"
          >
            Add to Cart
          </button>
          <button
            onClick={() => { add(product.id, qty); navigate({ to: "/cart" }); }}
            className="mt-2 w-full rounded-full bg-price py-2.5 text-sm font-bold text-destructive-foreground transition hover:brightness-110"
          >
            Buy Now
          </button>

          <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><Truck size={14} /> Free shipping over $35</li>
            <li className="flex items-center gap-2"><RotateCcw size={14} /> 30-day returns</li>
            <li className="flex items-center gap-2"><ShieldCheck size={14} /> Secure transaction</li>
          </ul>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold">Customers also viewed</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
