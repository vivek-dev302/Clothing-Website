import productsData from '../data/json/products.json';
import { delay } from './apiUtils';

export async function getProducts() {
  await delay(150);
  return [...productsData];
}

export async function getProductById(id) {
  await delay(100);
  const found = productsData.find(p => p.id === id);
  if (!found) throw new Error(`Product with id ${id} not found`);
  return { ...found };
}

export async function getProductsByBoutique(boutiqueId) {
  await delay(120);
  return productsData.filter(p => p.boutiqueId === boutiqueId);
}


export async function searchProducts(query, filters = {}) {
  await delay(150);
  let results = [...productsData];

  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    results = results.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.boutiqueName.toLowerCase().includes(q)
    );
  }

  if (filters.category && filters.category !== 'all') {
    results = results.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
  }

  if (filters.maxPrice) {
    results = results.filter(p => p.price <= filters.maxPrice);
  }

  if (filters.size) {
    results = results.filter(p => p.sizes.includes(filters.size));
  }

  return results;
}
