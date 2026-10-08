export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  imageAlt: string;
  tag?: string;
};

export const products: Product[] = [
  { id: 1, name: "Ripple Glass Set", description: "Two mouth-blown tumblers with a soft, tactile ripple.", price: 38, category: "Tableware", image: "/products/Ripple_Glasses_Smoke_Grey_1_5000x.webp", imageAlt: "Ripple drinking glasses" },
  { id: 2, name: "Mori Table Lamp", description: "A warm pool of light in linen and powder-coated steel.", price: 124, category: "Lighting", image: "/products/Mori Table Lamp.webp", imageAlt: "Mori table lamp" },
  { id: 3, name: "Form No. 03 Vase", description: "Sculptural stoneware shaped and glazed by hand.", price: 72, category: "Decor", image: "/products/vase.jpg", imageAlt: "Sculptural decorative vase" },
  { id: 4, name: "Sunday Carafe", description: "A graceful bedside carafe for unhurried mornings.", price: 56, category: "Tableware", image: "/products/carafe.jpg", imageAlt: "Glass Sunday carafe" },
  { id: 5, name: "Pebble Catchall", description: "A smooth marble tray for keys, rings, and small rituals.", price: 42, category: "Decor", image: "/products/catchall.webp", imageAlt: "Pebble catchall tray" },
  { id: 6, name: "Linen Market Tote", description: "A roomy everyday carry in heavyweight washed linen.", price: 48, category: "Accessories", image: "/products/tote.webp", imageAlt: "Linen market tote bag" },
];

export const categories = [...new Set(products.map((product) => product.category))];

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function findProduct(id: string) {
  if (!/^[1-9]\d*$/.test(id)) return undefined;
  return products.find((product) => product.id === Number(id));
}

export function filterProducts(q = "", category = "") {
  const query = q.trim().toLocaleLowerCase();
  const selectedCategory = category.trim().toLocaleLowerCase();

  return products.filter(
    (product) =>
      (!query ||
        product.name.toLocaleLowerCase().includes(query) ||
        product.description.toLocaleLowerCase().includes(query)) &&
      (!selectedCategory ||
        product.category.toLocaleLowerCase() === selectedCategory),
  );
}
