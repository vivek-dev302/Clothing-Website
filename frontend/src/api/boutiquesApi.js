import boutiquesData from '../data/json/boutiques.json';
import { delay } from './apiUtils';

export async function getBoutiques() {
  await delay(150);
  return [...boutiquesData];
}

export async function getBoutiqueById(id) {
  await delay(120);
  const found = boutiquesData.find(b => b.id === id);
  if (!found) throw new Error(`Boutique with id ${id} not found`);
  return { ...found };
}

export async function getNearbyBoutiques(neighborhood) {
  await delay(120);
  if (!neighborhood || neighborhood.toLowerCase() === 'all') {
    return [...boutiquesData];
  }
  return boutiquesData.filter(b => b.neighborhood.toLowerCase() === neighborhood.toLowerCase());
}
