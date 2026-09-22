export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  imageAlt: string;
  tag?: string;
};

export const products: Product[] = [
  { id: 1, name: "Ripple Glass Set", description: "Two mouth-blown tumblers with a soft, tactile ripple.", price: "$38.00", image: "/products/Ripple_Glasses_Smoke_Grey_1_5000x.webp", imageAlt: "Ripple drinking glasses" },
  { id: 2, name: "Mori Table Lamp", description: "A warm pool of light in linen and powder-coated steel.", price: "$124.00", image: "/products/Mori Table Lamp.webp", imageAlt: "Mori table lamp" },
  { id: 3, name: "Form No. 03 Vase", description: "Sculptural stoneware shaped and glazed by hand.", price: "$72.00", image: "/products/vase.jpg", imageAlt: "Sculptural decorative vase" },
  { id: 4, name: "Sunday Carafe", description: "A graceful bedside carafe for unhurried mornings.", price: "$56.00", image: "/products/carafe.jpg", imageAlt: "Glass Sunday carafe" },
  { id: 5, name: "Pebble Catchall", description: "A smooth marble tray for keys, rings, and small rituals.", price: "$42.00", image: "/products/catchall.webp", imageAlt: "Pebble catchall tray" },
  { id: 6, name: "Linen Market Tote", description: "A roomy everyday carry in heavyweight washed linen.", price: "$48.00", image: "/products/tote.webp", imageAlt: "Linen market tote bag" },
];
