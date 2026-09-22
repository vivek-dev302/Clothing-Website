import ordersData from '../data/json/orders.json';
import { delay } from './apiUtils';

const ORDERS_STORAGE_KEY = 'nearwear_orders';

function getStoredOrders() {
  const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse stored orders', e);
    }
  }
  return [...ordersData];
}

function saveStoredOrders(orders) {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export async function getActiveOrder() {
  await delay(120);
  const orders = getStoredOrders();
  const active = orders.find(o => o.status === 'en_route' || o.status === 'preparing');
  return active || orders[0] || null;
}

export async function getOrders() {
  await delay(150);
  return getStoredOrders();
}

export async function getOrderById(id) {
  await delay(100);
  const orders = getStoredOrders();
  const found = orders.find(o => o.id === id);
  if (!found) throw new Error(`Order ${id} not found`);
  return { ...found };
}

export async function createOrder(newOrderData) {
  await delay(250);
  const orders = getStoredOrders();
  const newId = `WN-${Math.floor(1000 + Math.random() * 9000)}`;
  const order = {
    id: newId,
    status: 'en_route',
    statusLabel: `#${newId} en route`,
    etaMinutes: 18,
    etaLabel: '18m doorstep',
    courierName: 'Marcus V.',
    courierTransport: 'Zero-Emission E-Cargo Bike',
    courierPhone: '+1 (212) 555-0194',
    steamedGuarantee: true,
    doorstepFittingWindowMinutes: 10,
    createdAt: new Date().toISOString(),
    ...newOrderData,
    timeline: [
      { step: 'order_placed', title: 'Order Placed', time: 'Just now', completed: true },
      { step: 'boutique_packing', title: 'Boutique Packing & Steaming', time: '3m ago', completed: true },
      { step: 'courier_dispatched', title: 'Courier Dispatched', time: '1m ago', completed: true },
      { step: 'en_route', title: 'Out for Doorstep Delivery', time: 'Active', completed: true, current: true },
      { step: 'delivered', title: 'Doorstep Fitting & Mirror Check', time: 'Est 18m', completed: false }
    ]
  };
  orders.unshift(order);
  saveStoredOrders(orders);
  return order;
}
