import headphones from "@/assets/product-headphones.jpg";
import watch from "@/assets/product-watch.jpg";
import laptop from "@/assets/product-laptop.jpg";
import phone from "@/assets/product-phone.jpg";
import earbuds from "@/assets/product-earbuds.jpg";
import camera from "@/assets/product-camera.jpg";
import books from "@/assets/product-books.jpg";
import consoleImg from "@/assets/product-console.jpg";

export type Product = {
  id: string;
  title: string;
  brand: string;
  price: number;
  listPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  prime: boolean;
  description: string;
  bullets: string[];
};

export const products: Product[] = [
  {
    id: "wh-1000",
    title: "Studio Wireless Noise-Cancelling Over-Ear Headphones",
    brand: "Aurelio Audio",
    price: 248.0,
    listPrice: 349.99,
    rating: 4.6,
    reviews: 18432,
    image: headphones,
    category: "Electronics",
    prime: true,
    description:
      "Industry-leading active noise cancellation with 40-hour battery life and adaptive sound that adjusts to your environment.",
    bullets: [
      "Hybrid ANC with three listening modes",
      "40h battery, fast-charge 10 min for 5h",
      "Multipoint Bluetooth 5.3, LDAC support",
      "Plush memory-foam earcups",
    ],
  },
  {
    id: "sw-square",
    title: "Pulse Smartwatch — Always-On AMOLED, GPS, Health Tracking",
    brand: "Northwind",
    price: 199.0,
    listPrice: 249.0,
    rating: 4.4,
    reviews: 9821,
    image: watch,
    category: "Electronics",
    prime: true,
    description:
      "Track every workout, sleep stage and heartbeat with a brilliant always-on display and 7-day battery life.",
    bullets: [
      "1.78\" Always-On AMOLED",
      "Built-in dual-band GPS",
      "Heart rate, SpO2, ECG sensors",
      "5 ATM water resistance",
    ],
  },
  {
    id: "lap-air",
    title: "Stratus 14 Ultrabook — 16GB RAM, 1TB SSD, 14\" Retina",
    brand: "Lumen",
    price: 1199.0,
    listPrice: 1399.0,
    rating: 4.7,
    reviews: 3204,
    image: laptop,
    category: "Computers",
    prime: true,
    description:
      "A featherweight ultrabook engineered for creators — silent, all-day power and a stunning Retina display.",
    bullets: [
      "12-core Lumen M-series chip",
      "16GB unified memory, 1TB SSD",
      "14\" Liquid Retina, 1000 nits",
      "18-hour battery life",
    ],
  },
  {
    id: "ph-vivid",
    title: "Vivid 15 Pro Smartphone — 256GB, OLED 120Hz, Triple Camera",
    brand: "Vivid",
    price: 899.0,
    rating: 4.5,
    reviews: 12987,
    image: phone,
    category: "Electronics",
    prime: true,
    description:
      "A flagship phone with pro-grade triple cameras, a buttery 120Hz OLED, and all-day battery.",
    bullets: [
      "6.7\" LTPO OLED 120Hz",
      "Triple 50MP camera system",
      "256GB storage, 12GB RAM",
      "5G, Wi-Fi 7, IP68",
    ],
  },
  {
    id: "eb-air",
    title: "Echo Buds Pro — Active Noise Cancelling Wireless Earbuds",
    brand: "Aurelio Audio",
    price: 89.0,
    listPrice: 129.0,
    rating: 4.3,
    reviews: 24102,
    image: earbuds,
    category: "Electronics",
    prime: true,
    description:
      "Crisp, balanced sound in an impossibly small shell. Up to 30 hours with the wireless charging case.",
    bullets: [
      "Adaptive ANC + transparency",
      "30h with case, USB-C & Qi",
      "Custom 11mm dynamic drivers",
      "Sweat & water resistant (IPX4)",
    ],
  },
  {
    id: "cam-pro",
    title: "Canson R7 Mirrorless Camera with 24-70mm Lens",
    brand: "Canson",
    price: 1499.0,
    rating: 4.8,
    reviews: 1864,
    image: camera,
    category: "Cameras",
    prime: false,
    description:
      "A pro mirrorless body with 32MP full-frame sensor, 8-stop IBIS and 4K60 video — built for the field.",
    bullets: [
      "32MP full-frame BSI sensor",
      "8-stop in-body stabilization",
      "4K60 10-bit internal recording",
      "Weather-sealed magnesium body",
    ],
  },
  {
    id: "bk-set",
    title: "The Modern Reader's Bestseller Set (10 Hardcovers)",
    brand: "Harperline",
    price: 64.99,
    listPrice: 129.99,
    rating: 4.7,
    reviews: 5421,
    image: books,
    category: "Books",
    prime: true,
    description:
      "Ten of this year's most-talked-about hardcovers, curated by editors and gift-ready in a single box.",
    bullets: [
      "10 hardcover bestsellers",
      "Curated by Harperline editors",
      "Gift-ready packaging",
      "Free returns within 30 days",
    ],
  },
  {
    id: "gc-one",
    title: "Nimbus One Console — 1TB Disc Edition with Wireless Controller",
    brand: "Nimbus",
    price: 449.0,
    rating: 4.6,
    reviews: 8732,
    image: consoleImg,
    category: "Video Games",
    prime: true,
    description:
      "The next generation of play. 4K HDR gaming, lightning-fast SSD and a redesigned haptic controller.",
    bullets: [
      "Custom 8-core CPU, 16GB RAM",
      "1TB ultra-fast SSD",
      "4K @ 120fps, 8K-ready",
      "Includes wireless controller",
    ],
  },
];

export const categories = [
  { name: "Electronics", image: headphones },
  { name: "Computers", image: laptop },
  { name: "Cameras", image: camera },
  { name: "Video Games", image: consoleImg },
  { name: "Books", image: books },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
