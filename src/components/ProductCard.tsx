import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { fmt } from "@/lib/cart";
import { Stars } from "./Stars";

export function ProductCard({ product }: { product: Product }) {
  const off = product.listPrice
    ? Math.round(((product.listPrice - product.price) / product.listPrice) * 100)
    : 0;
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group flex flex-col rounded-md bg-card p-4 ring-1 ring-border transition hover:ring-cta hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden rounded-sm bg-white">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          width={768}
          height={768}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 flex flex-1 flex-col gap-1">
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <h3 className="line-clamp-2 text-sm font-medium text-link group-hover:text-link-hover">
          {product.title}
        </h3>
        <div className="flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-xs text-link">{product.reviews.toLocaleString()}</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-foreground">{fmt(product.price)}</span>
          {product.listPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {fmt(product.listPrice)}
            </span>
          )}
          {off > 0 && (
            <span className="rounded bg-price/10 px-1.5 py-0.5 text-xs font-semibold text-price">
              -{off}%
            </span>
          )}
        </div>
        {product.prime && (
          <p className="text-xs font-semibold text-link">
            <span className="rounded bg-link/10 px-1 py-0.5">Prime</span> FREE delivery
          </p>
        )}
      </div>
    </Link>
  );
}
