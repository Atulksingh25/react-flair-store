import { createFileRoute, Link } from "@tanstack/react-router";
import { fmt, useCart } from "@/lib/cart";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Your cart — Shopline" },
      { name: "description", content: "Review the items in your Shopline cart and proceed to checkout." },
    ],
  }),
});

function CartPage() {
  const { detailed, subtotal, count, setQty, remove, clear } = useCart();

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-lg bg-card p-10 text-center ring-1 ring-border">
          <h1 className="text-2xl font-bold">Your Shopline Cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Discover today's deals and add your first item.</p>
          <Link to="/shop" className="mt-6 inline-block rounded-full bg-cta px-6 py-2.5 text-sm font-bold text-cta-foreground hover:bg-cta-hover">
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-lg bg-card p-6 ring-1 ring-border">
          <div className="flex items-baseline justify-between border-b pb-3">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <button onClick={clear} className="text-sm text-link hover:text-link-hover hover:underline">
              Deselect all items
            </button>
          </div>
          <ul>
            {detailed.map(({ product, qty }) => (
              <li key={product.id} className="grid grid-cols-[100px_1fr] gap-4 border-b py-5 sm:grid-cols-[140px_1fr]">
                <Link to="/product/$id" params={{ id: product.id }} className="block bg-white">
                  <img src={product.image} alt={product.title} loading="lazy" width={140} height={140} className="h-full w-full object-contain" />
                </Link>
                <div className="flex flex-col">
                  <Link to="/product/$id" params={{ id: product.id }} className="text-sm font-semibold text-foreground hover:text-link-hover sm:text-base">
                    {product.title}
                  </Link>
                  <p className="text-xs text-success">In Stock</p>
                  {product.prime && <p className="text-xs text-link">Eligible for FREE Prime delivery</p>}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center rounded-full ring-1 ring-border">
                      <button
                        onClick={() => setQty(product.id, qty - 1)}
                        className="rounded-l-full px-3 py-1 hover:bg-accent"
                        aria-label="Decrease quantity"
                      >−</button>
                      <span className="min-w-[2ch] px-2 text-center font-semibold">{qty}</span>
                      <button
                        onClick={() => setQty(product.id, qty + 1)}
                        className="rounded-r-full px-3 py-1 hover:bg-accent"
                        aria-label="Increase quantity"
                      >+</button>
                    </div>
                    <button
                      onClick={() => remove(product.id)}
                      className="flex items-center gap-1 text-link hover:text-link-hover hover:underline"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
                <div className="col-span-2 text-right text-lg font-bold sm:col-span-1 sm:col-start-2">
                  {fmt(product.price * qty)}
                </div>
              </li>
            ))}
          </ul>
          <p className="pt-4 text-right text-lg">
            Subtotal ({count} items): <span className="font-bold">{fmt(subtotal)}</span>
          </p>
        </section>

        <aside className="h-fit rounded-lg bg-card p-6 ring-1 ring-border">
          {subtotal > 35 && (
            <p className="mb-2 text-sm text-success">✓ Your order qualifies for FREE Shipping.</p>
          )}
          <p className="text-lg">
            Subtotal ({count} items): <span className="font-bold">{fmt(subtotal)}</span>
          </p>
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input type="checkbox" className="accent-cta-hover" /> This order contains a gift
          </label>
          <button className="mt-4 w-full rounded-full bg-cta py-2.5 text-sm font-bold text-cta-foreground transition hover:bg-cta-hover">
            Proceed to checkout
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Secure transaction</p>
        </aside>
      </div>
    </div>
  );
}
