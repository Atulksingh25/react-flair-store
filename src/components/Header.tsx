import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingCart, MapPin, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { categories } from "@/lib/products";

export function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const search = useRouterState({ select: (s) => s.location.search as { q?: string } });
  const [q, setQ] = useState(search.q ?? "");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: q || undefined } });
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Top bar */}
      <div className="bg-nav text-nav-foreground">
        <div className="mx-auto flex max-w-screen-2xl items-center gap-2 px-3 py-2 md:gap-4">
          <Link
            to="/"
            className="flex items-baseline gap-0.5 rounded px-2 py-1.5 ring-1 ring-transparent hover:ring-white"
          >
            <span className="text-2xl font-bold tracking-tight">shop</span>
            <span className="text-2xl font-bold text-cta">line</span>
            <span className="ml-0.5 text-xs text-cta">.co</span>
          </Link>

          <button className="hidden items-center gap-1 rounded px-2 py-1.5 text-left ring-1 ring-transparent hover:ring-white md:flex">
            <MapPin size={18} className="text-nav-foreground/80" />
            <div className="leading-tight">
              <div className="text-[11px] text-nav-foreground/70">Deliver to</div>
              <div className="text-sm font-bold">New York 10001</div>
            </div>
          </button>

          <form onSubmit={onSubmit} className="flex flex-1 items-stretch overflow-hidden rounded-md">
            <select
              aria-label="Category"
              className="hidden border-r border-border bg-secondary px-2 text-xs text-secondary-foreground md:block"
              defaultValue="all"
            >
              <option value="all">All</option>
              {categories.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search Shopline"
              className="min-w-0 flex-1 bg-white px-3 py-2 text-sm text-foreground outline-none"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex items-center justify-center bg-cta px-3 text-cta-foreground transition hover:bg-cta-hover"
            >
              <Search size={20} />
            </button>
          </form>

          <Link
            to="/shop"
            className="hidden rounded px-2 py-1.5 text-sm font-bold ring-1 ring-transparent hover:ring-white md:block"
          >
            Sign in
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-1 rounded px-2 py-1.5 ring-1 ring-transparent hover:ring-white"
          >
            <div className="relative">
              <ShoppingCart size={26} />
              <span className="absolute -right-2 -top-1 min-w-[20px] rounded-full bg-cta px-1 text-center text-xs font-bold text-cta-foreground">
                {count}
              </span>
            </div>
            <span className="hidden text-sm font-bold md:inline">Cart</span>
          </Link>
        </div>

        {/* Secondary nav */}
        <div className="bg-nav-secondary text-nav-foreground">
          <div className="mx-auto flex max-w-screen-2xl items-center gap-1 overflow-x-auto px-3 py-1.5 text-sm">
            <button className="flex items-center gap-1 rounded px-2 py-1 font-semibold ring-1 ring-transparent hover:ring-white">
              <Menu size={18} /> All
            </button>
            <Link to="/shop" className="whitespace-nowrap rounded px-2 py-1 hover:ring-1 hover:ring-white">
              Today's Deals
            </Link>
            {categories.map((c) => (
              <Link
                key={c.name}
                to="/shop"
                search={{ category: c.name }}
                className="whitespace-nowrap rounded px-2 py-1 hover:ring-1 hover:ring-white"
              >
                {c.name}
              </Link>
            ))}
            <Link to="/shop" className="whitespace-nowrap rounded px-2 py-1 hover:ring-1 hover:ring-white">
              Customer Service
            </Link>
            <Link to="/shop" className="ml-auto hidden items-center gap-1 whitespace-nowrap rounded px-2 py-1 hover:ring-1 hover:ring-white md:flex">
              Shop deals in Electronics <ChevronDown size={14} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
