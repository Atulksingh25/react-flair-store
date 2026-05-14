import { createFileRoute, Link } from "@tanstack/react-router";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Shopline — Everything you need, delivered fast" },
      { name: "description", content: "Shop electronics, books, games and more on Shopline. Free fast delivery on millions of items." },
    ],
  }),
});

function Home() {
  const deals = products.filter((p) => p.listPrice).slice(0, 4);
  const top = products.slice(0, 8);

  return (
    <div className="bg-secondary/40">
      {/* Hero */}
      <section className="relative">
        <img
          src={heroImg}
          alt="Modern living room set up with electronics"
          width={1920}
          height={768}
          className="h-[280px] w-full object-cover sm:h-[380px] md:h-[460px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-screen-2xl px-4 pb-8 md:pb-12">
          <div className="max-w-xl rounded-lg bg-card/95 p-6 shadow-xl backdrop-blur md:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-cta-hover">New arrivals</p>
            <h1 className="mt-2 text-2xl font-bold leading-tight md:text-4xl">
              Premium tech for everyday life — up to 40% off this week
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Free Prime delivery on millions of items. Fresh deals dropped daily.
            </p>
            <Link
              to="/shop"
              className="mt-5 inline-flex items-center rounded-full bg-cta px-6 py-3 text-sm font-bold text-cta-foreground transition hover:bg-cta-hover"
            >
              Shop today's deals
            </Link>
          </div>
        </div>
      </section>

      {/* Floating cards row */}
      <section className="mx-auto -mt-10 grid max-w-screen-2xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Sign up for Prime", desc: "Free 2-day shipping & exclusive deals", img: categories[0].image },
          { title: "Top tech this week", desc: "Headphones, watches, laptops & more", img: categories[1].image },
          { title: "Capture more", desc: "Cameras and accessories from $29", img: categories[2].image },
          { title: "Game on", desc: "Consoles, controllers and games", img: categories[3].image },
        ].map((c) => (
          <Link
            to="/shop"
            key={c.title}
            className="group rounded-lg bg-card p-5 shadow-sm ring-1 ring-border transition hover:shadow-lg"
          >
            <h3 className="text-lg font-bold">{c.title}</h3>
            <div className="my-3 aspect-[4/3] overflow-hidden rounded bg-white">
              <img
                src={c.img}
                alt=""
                loading="lazy"
                width={400}
                height={300}
                className="h-full w-full object-contain transition group-hover:scale-105"
              />
            </div>
            <p className="text-sm text-link group-hover:text-link-hover">{c.desc} →</p>
          </Link>
        ))}
      </section>

      {/* Today's Deals */}
      <section className="mx-auto mt-12 max-w-screen-2xl px-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Today's deals</h2>
            <p className="text-sm text-muted-foreground">Limited-time savings on customer favorites</p>
          </div>
          <Link to="/shop" className="hidden text-sm font-semibold text-link hover:text-link-hover sm:block">
            See all deals →
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto mt-12 max-w-screen-2xl px-4">
        <h2 className="text-2xl font-bold">Shop by category</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((c) => (
            <Link
              to="/shop"
              search={{ category: c.name }}
              key={c.name}
              className="group flex flex-col items-center rounded-lg bg-card p-4 ring-1 ring-border transition hover:ring-cta"
            >
              <div className="aspect-square w-full overflow-hidden rounded bg-white">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={400}
                  height={400}
                  className="h-full w-full object-contain transition group-hover:scale-105"
                />
              </div>
              <span className="mt-3 text-sm font-semibold">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto mt-12 max-w-screen-2xl px-4">
        <h2 className="text-2xl font-bold">Best sellers</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {top.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
