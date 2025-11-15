// products.js

const pastelColors = [
    "a0ced9", "ffb6b9", "fae3d9", "bbded6", "8ac6d1",
    "f8b195", "c06c84", "6c5b7b", "355c7d", "f67280",
    "e2f0cb", "b5ead7", "c7ceea", "ffdac1", "ffb7b2",
    "a8e6cf", "dcedc1", "ffd3b6", "ffaaa5", "ff8b94",
    "70c1b3", "b39ddb", "ff8c94", "a8e6cf", "ffd3b6",
    "92c952", "771796", "24f355", "d32776", "ffcc70",
    "dcedc1", "ffaaa5", "ff8b94", "b5ead7", "c7ceea",
    "d5e1df", "e3eaa7", "b5e7a0", "c0dfd9", "3b3a30",
    "d6cbd3", "eca1a6", "bdcebe", "ada397", "f9d5e5",
    "99b898", "feceab", "ff847c", "e84a5f", "2a363b",
    "a7c5eb", "c9b6e4"
];

// mock สินค้า 50 รายการ
const products = Array.from({ length: 50 }, (_, i) => {
  const color = pastelColors[i % pastelColors.length];
  return {
    id: i + 1,
    title: `Sneaker Model #${i + 1}`,
    url: `https://placehold.co/600x400/${color}/fff?text=Sneaker+${i + 1}`,
    thumbnailUrl: `https://placehold.co/150x150/${color}/fff?text=S${i + 1}`,
  };
});

// caching + ราคา
let productsWithPrice = [];

export function fetchProducts() {
  if (productsWithPrice.length === 0) {
    productsWithPrice = products.map((p) => ({
      ...p,
      price: Math.round(Math.random() * 9000) / 100 + 10,
    }));
  }
  return productsWithPrice;
}

export default products;
