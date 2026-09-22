# 🛍️ NearWear — Modern Local Fashion Marketplace (Frontend Master Plan)

> **Core Value Proposition**: *"Discover clothes from stores near you and get them delivered quickly."*  
> **Key Differentiator**: **Local boutiques + fast delivery (e.g. ⚡ 25–35 min) + nearby inventory**. This is NOT a generic fashion e-commerce site or a food-delivery app clone; it is a premium modern fashion marketplace powered by local-commerce convenience.

---

## 1. Project Overview & Architecture Principles

- **Framework**: React 19 + Vite (located in `/frontend`).
- **Core Philosophy**: Modular, clean, reusable, and maintainable. No bloated state libraries or premature abstractions. React Context + custom hooks for state management.
- **Visual Aesthetic**: Premium modern fashion brand aesthetics (generous whitespace, large product photography, restrained neutral palette with one distinctive accent color, clean typography, subtle borders, rounded cards).
- **Backend Readiness**: A dedicated Mock API layer (`/src/api/`) simulating asynchronous network calls over structured local mock datasets (`/src/data/`), designed for 1:1 drop-in replacement with a FastAPI backend.

---

## 2. All Customer-Facing Pages & Routing

| # | Page Name | Route | Key Features & Responsibilities |
|---|---|---|---|
| 1 | **Landing / Home** | `/` | Hero with location selector & fast delivery promise, "How It Works" editorial step card, "Ready now" product discovery strip, "Boutiques near you" section, category tiles, brand footer. |
| 2 | **Boutiques Directory** | `/boutiques` | Location bar, search, sorting (distance, rating, delivery speed), grid of `BoutiqueCard`s with live distance and delivery time badges. |
| 3 | **Boutique Details** | `/boutiques/:boutiqueId` | Cover banner, store avatar, rating, distance, opening hours, address, category tabs, and responsive grid of boutique-specific `ProductCard`s. |
| 4 | **Product Details (PDP)** | `/products/:productId` | Multi-image gallery, boutique link, rating, price & discount, color swatches, size selector with size guide modal, delivery estimate pill (`⚡ 25–35 min`), accordion (material, care, returns), and "Add to Bag". |
| 5 | **Search Results** | `/search?q=...` | Live search for products & boutiques, multi-faceted filters (category, price range, size, color, delivery time), sorting controls, and empty state handling. |
| 6 | **Shopping Cart** | `/cart` | Single-boutique cart items, size/color variant tags, quantity stepper (`− 1 +`), subtotal, delivery fee, discount, total, estimated delivery badge, and single-boutique conflict modal. |
| 7 | **Checkout** | `/checkout` | Delivery address selector/input, delivery estimate, order summary review, mocked payment method selection, price breakdown, and "Place Order" trigger. |
| 8 | **Order Confirmation** | `/orders/:id/success` | Visual confirmation checkmark, order number (e.g. `#NW12345`), estimated arrival time, and direct CTA buttons ("Track order", "Continue shopping"). |
| 9 | **Order Tracking** | `/orders/:id` | Visual `OrderStatusTimeline` (Order placed → Boutique accepted → Preparing → Ready for pickup → Out for delivery → Delivered), delivery estimate countdown, map placeholder visualization, and boutique contact info. |
| 10 | **Orders History** | `/orders` | Tabbed view for Active Orders and Past Orders using reusable `OrderCard`s with action buttons ("Track order", "View order", "Buy again"). |
| 11 | **Customer Profile** | `/profile` | User avatar/info, saved addresses, payment methods, navigation links to My Orders, Help & Support, Terms, and Logout button. |
| 12 | **Authentication** | `/login` | Minimalist phone number / OTP login modal or page with mock verification and redirection to previous page. |

---

## 3. Reusable Component Architecture

Strict rule: **No huge monolithic components and no duplicated JSX.** Components must be configurable and shared across all pages.

### Universal Reusable Components
- **`ProductCard`**: Used **everywhere** products are displayed (Home "Ready Now", Boutique Details, Search Results, Category listings, Related Products).
  - *Props*: `product` (image, name, price, originalPrice, discount, boutique name, rating, deliveryMin, deliveryMax, isFavorite).
  - *Features*: Click card/title navigates to `/products/:id`; dedicated `[Add to bag]` button stops propagation and adds to cart without navigating; favorite heart toggle.
- **`BoutiqueCard`**: Used on Home and Boutiques directory.
  - *Props*: `boutique` (cover image, avatar, name, rating, distance, deliveryMin, deliveryMax, featuredProducts preview thumbnails).
  - *Features*: Navigates to `/boutiques/:id`.
- **`DeliveryTime`**:
  - *Usage*: `<DeliveryTime minMinutes={25} maxMinutes={35} variant="badge|inline|pill" />`
  - Visual output: `⚡ 25–35 min` or `⚡ Ready in 30 min`.
- **`Distance`**:
  - *Usage*: `<Distance km={1.8} />`
  - Visual output: `1.8 km away`.
- **`Rating`**: Displays star icon, rating value (e.g., `4.8`), and optional review count.
- **`Price`**: Formats current price, strikethrough original price, and percentage discount tag.
- **`LocationSelector`**: Displays current active address/city in the navbar with a dropdown/modal to change to saved addresses or enter manual location.
- **`OrderStatusTimeline`**: Interactive vertical/horizontal progress steps for active orders.
- **`CartItem`**: Item row with thumbnail, boutique tag, size, color, unit price, quantity stepper, and remove button.
- **`OrderCard`**: Unified card for active orders (`Arriving in X min` + `[Track order]`) and past orders (`Delivered on Date` + `[Buy again]`).
- **`Modal`**: Accessible dialog wrapper for size guides, boutique conflict prompts, address pickers, and auth OTP.
- **`EmptyState`**: Configurable illustration/icon, title, supportive copy, and action button (e.g. empty cart, empty orders, no search results).
- **`LoadingState` / Skeletons**: Skeleton cards for products, boutiques, and order cards to prevent blank screens during async fetching.
- **`Button` & `Badge`**: Design-system primitives (Primary, Secondary, Outline, Ghost, Accent Badge).

---

## 4. Data Architecture & Mock API Layer

The frontend consumes data solely through asynchronous API wrapper functions simulating network calls (with realistic ~150-300ms delays). This decouples UI from data fetching and guarantees zero refactoring when switching to a real FastAPI backend.

### Folder Structure
```
src/
├── data/
│   ├── boutiques.js      # 5–8 realistic local boutique profiles
│   ├── products.js       # 30+ structured clothing products across categories
│   ├── categories.js     # Men, Women, Streetwear, Shoes, Accessories, New Arrivals
│   ├── orders.js         # Seed active & past orders
│   └── users.js          # Mock user profiles & saved addresses
└── api/
    ├── boutiquesApi.js   # getBoutiques(), getBoutiqueById(id), getNearbyBoutiques(location)
    ├── productsApi.js    # getProducts(), getProductById(id), getProductsByBoutique(id), searchProducts(query, filters)
    ├── ordersApi.js      # getOrders(), getOrderById(id), createOrder(orderData), updateOrderStatus(id, status)
    └── authApi.js        # loginWithPhone(phone), verifyOtp(phone, otp), getCurrentUser()
```

### Mock Data Specifications
- **Boutiques (5–8 stores)**:
  - `id`, `name` (e.g., "The Velvet Atelier", "Nordic Thread Studio", "Kith & Kin Curated", "Raw Denim Co."), `description`, `coverImage`, `logoImage`, `rating`, `reviewCount`, `distance` (km), `deliveryMin`, `deliveryMax`, `address`, `openingHours`, `categories`, `featuredProductIds`.
- **Products (30+ items)**:
  - `id`, `boutiqueId`, `name`, `description`, `images` (array of 3-4 high-res editorial fashion photos), `price`, `originalPrice`, `category`, `gender` (Men, Women, Unisex), `colors` (array of objects: name, hex), `sizes` (XS, S, M, L, XL), `rating`, `reviewCount`, `deliveryMin`, `deliveryMax`, `available`, `fabric`, `careInstructions`.
  - *Integrity Rule*: Every product's `boutiqueId` strictly matches a valid boutique, ensuring boutique name and distance match everywhere.

---

## 5. Critical Business Logic & UX Rules

### 1. Single-Boutique Cart Rule
- Fast local delivery requires picking up from one local boutique per trip.
- When a customer adds an item from **Boutique B** while their cart already contains items from **Boutique A**, the app **MUST NOT** silently overwrite or merge.
- Trigger a confirmation modal:
  > *"Your bag contains items from **Fashion Hub**.*  
  > *Start a new bag for **Trends Studio**? This will clear your current bag."*  
  > `[ Cancel ]` &nbsp; `[ Start New Bag ]`

### 2. Location & Delivery Engine
- App maintains global `LocationContext`:
  - `activeLocation` (default: "Indiranagar, Bengaluru" or mock local area).
  - Calculates dynamic delivery estimate and distance based on selected location.
  - Can switch between: Current Location (browser geolocation with mock fallback), Saved Addresses, or Manual Search.

### 3. Cart & Wishlist Persistence
- Stored in `localStorage` under `nearwear_cart` and `nearwear_wishlist`.
- Real-time calculations:
  - `subtotal` = $\sum (\text{price} \times \text{qty})$
  - `deliveryFee` = Flat local courier rate (e.g., ₹49, or Free over ₹1,499)
  - `tax` = 5% GST
  - `total` = `subtotal` + `deliveryFee` + `tax`

### 4. Checkout & Order Lifecycle Simulation
- Placing an order in `/checkout` generates a realistic order:
  - Generates unique ID: `#NW` + 5 random digits (e.g., `#NW84920`).
  - Sets initial state to `"Order placed"`.
  - Saves into `orders` state/storage.
  - Clears cart and navigates to `/orders/:id/success`.
- Order Tracking page simulates progression:
  - `Order placed` → `Boutique accepted` → `Preparing` → `Ready for pickup` → `Out for delivery` → `Delivered`.

---

## 6. Visual Design System & Figma Integration Rules

### Visual Hierarchy & Tokens
- **Neutrals**:
  - Background: `#FAF9F6` (Warm Alabaster) and `#FFFFFF` (Crisp White)
  - Dark/Text: `#111111` (Deep Charcoal Black)
  - Muted/Secondary Text: `#6B7280`
  - Subtle Borders: `#E5E7EB`
- **Accent Color**:
  - `#D97706` (Warm Amber / Fast-Commerce Gold) or `#0F766E` (Deep Teal / Luxury Local) used selectively for:
    - Primary CTA buttons (`Add to Bag`, `Place Order`)
    - Fast delivery badge (`⚡ 25–35 min`)
    - Active selection states (Selected Size pill, Active Tab)
    - Important badges and notifications
- **Typography**: Clean, modern grotesque sans-serif (`Plus Jakarta Sans` or `Inter`) with generous letter-spacing on subheadings and badges.
- **Card Design**: Rounded corners (`border-radius: 12px` to `16px`), light border (`1px solid #E5E7EB`), gentle hover elevate shadow (`0 8px 24px rgba(0,0,0,0.06)`).

### Figma Priority Hierarchy
When Figma designs are provided:
$$\text{Figma Visual Design} \longrightarrow \text{Product Requirements in Spec} \longrightarrow \text{Reusable Component Architecture} \longrightarrow \text{Reasonable UX Decisions}$$
- Match visual tokens (spacing, typography, border radius, aspect ratios) while preserving functional requirements and modular component structure.

---

## 7. Complete Frontend Directory Structure

```
frontend/src/
├── assets/
│   └── images/              # Fallback illustrations, logo assets
├── api/
│   ├── apiUtils.js          # Simulated network delay & response wrappers
│   ├── boutiquesApi.js      # Boutiques data retrieval
│   ├── productsApi.js       # Products catalog & search queries
│   ├── ordersApi.js         # Order creation & tracking simulation
│   └── authApi.js           # Mock authentication
├── data/
│   ├── boutiques.js         # Curated local store data
│   ├── products.js          # 30+ fashion products with variants & tags
│   ├── categories.js        # Category definitions & hero images
│   └── mockOrders.js        # Seed orders for testing tracking
├── context/
│   ├── CartContext.jsx      # Single-boutique cart state, calculations, conflict modal
│   ├── AuthContext.jsx      # User profile, login/logout, address book
│   └── LocationContext.jsx  # User's active delivery address & city
├── components/
│   ├── common/
│   │   ├── Button.jsx       # Variant styles: primary, secondary, outline, text
│   │   ├── Badge.jsx        # Pill badges (Delivery, Discount, New, In-Stock)
│   │   ├── Rating.jsx       # Star rating component
│   │   ├── Price.jsx        # Formatted price with discount strikethrough
│   │   ├── DeliveryTime.jsx # ⚡ X–Y min indicator component
│   │   ├── Distance.jsx     # X.X km away indicator
│   │   ├── Modal.jsx        # Accessible dialog wrapper
│   │   ├── EmptyState.jsx   # Friendly empty illustrations & action CTA
│   │   └── LoadingState.jsx # Skeleton loaders for cards & lists
│   ├── layout/
│   │   ├── Navbar.jsx       # Brand logo, location picker, search trigger, bag counter
│   │   ├── Footer.jsx       # Editorial brand footer, quick links, copyright
│   │   ├── PageContainer.jsx# Standardized width & padding wrapper
│   │   └── LocationModal.jsx# Switch delivery address / city
│   ├── products/
│   │   ├── ProductCard.jsx  # UNIVERSAL product card used across entire app
│   │   ├── ProductGrid.jsx  # Responsive 2-to-4 column product layout
│   │   ├── ProductImage.jsx # Optimized image with loading placeholder
│   │   └── ProductFilters.jsx # Sidebar/drawer for Category, Size, Price, Delivery
│   ├── boutiques/
│   │   ├── BoutiqueCard.jsx # Reusable boutique card with product thumbnails
│   │   ├── BoutiqueGrid.jsx # Multi-column boutique grid
│   │   └── BoutiqueHeader.jsx # Store cover banner, rating, hours, address
│   ├── cart/
│   │   ├── CartItem.jsx     # Line item with variant chips & qty stepper
│   │   ├── CartSummary.jsx  # Subtotal, delivery fee, taxes, total
│   │   └── ConflictModal.jsx# "Replace current boutique cart?" confirmation
│   └── orders/
│       ├── OrderCard.jsx    # Active & past order summaries
│       └── OrderTimeline.jsx# Step-by-step progress tracking visualization
├── pages/
│   ├── Home.jsx             # Hero, How It Works, Ready Now, Boutiques Near You
│   ├── Boutiques.jsx        # Directory of all local boutiques with filters
│   ├── BoutiqueDetails.jsx  # Boutique storefront & inventory
│   ├── ProductDetails.jsx   # High-impact PDP with gallery & variant selection
│   ├── SearchResults.jsx    # Product & store search results
│   ├── Cart.jsx             # Shopping bag view & checkout launcher
│   ├── Checkout.jsx         # Address selection, payment method, place order
│   ├── OrderConfirmation.jsx# Order success receipt & tracking link
│   ├── OrderTracking.jsx    # Real-time simulated status timeline
│   ├── Orders.jsx           # Customer's active & past order history
│   ├── Profile.jsx          # User settings, saved addresses, support
│   └── Login.jsx            # Phone & OTP mock login
├── styles/
│   ├── variables.css        # Palette, typography, spacing, shadows tokens
│   └── index.css            # Base resets, smooth transitions, utility classes
├── App.jsx                  # Route definitions & Context providers
└── main.jsx                 # Vite application mount
```

---

## 8. Phased Development Roadmap

### Phase 1: Core Foundation, Design System & Mock API Layer
- [x] Scaffold Vite + React 19 app and install `lucide-react`.
- [ ] Configure `variables.css` (neutral fashion palette, accent color, elevation shadows, typography).
- [ ] Implement `src/data/` (5-8 boutiques, 30+ products, categories, mock users).
- [ ] Implement `src/api/` (async API wrappers for boutiques, products, orders, auth).
- [ ] Build global `Context` providers (`LocationContext`, `CartContext`, `AuthContext`).
- [ ] Build atomic common components: `Button`, `Badge`, `DeliveryTime`, `Distance`, `Rating`, `Price`, `Modal`, `EmptyState`, `LoadingState`.

### Phase 2: Global Navigation & Layout Shell
- [ ] Global `Navbar` with dynamic brand name ("NearWear"), active location selector, search input, and cart badge with item counter.
- [ ] `LocationModal` allowing user to switch addresses or enter custom locality.
- [ ] Responsive `Footer` with brand story, local boutique partnership pitch, help links.
- [ ] Set up client-side routing covering all 12 page paths.

### Phase 3: Home & Discovery Experience
- [ ] **Hero Section**: Location indicator, bold title (*"Fashion from stores near you"*), clear CTA buttons (*"Explore boutiques"*, *"Shop ready now"*), and lifestyle photography.
- [ ] **How It Works Section**: Editorial 4-step card:
  1. *Choose your look*
  2. *We pick it up from your local boutique*
  3. *Try it at home*
  4. *Keep what you love, return what you don't*
- [ ] **Universal `ProductCard`**: Implement once with delivery badge (`⚡ 25–35 min`), pricing, rating, wishlist toggle, and quick add-to-bag.
- [ ] **Ready Now Section**: Product discovery strip populated with fast-delivery items.
- [ ] **Boutiques Near You Section**: Reusable `BoutiqueCard` displaying cover image, rating, distance, delivery time, and 3-4 product thumbnails.
- [ ] **Category Showcase**: Visual cards for Men, Women, Kids, Shoes, Accessories, New Arrivals.

### Phase 4: Boutique Browsing & Details
- [ ] `/boutiques`: Directory page with search, sorting by distance/rating, and boutique grid.
- [ ] `/boutiques/:boutiqueId`: Boutique detail page with cover banner, opening hours, address, category filter tabs, and responsive grid using the universal `ProductCard`.

### Phase 5: Product Details Page (PDP) & Search
- [ ] `/products/:productId`:
  - Image gallery with multi-angle previews and main photo zoom.
  - Title, boutique link, rating, price & discount.
  - Color swatches with active selection rings.
  - Size selector with visual out-of-stock indicators.
  - Size Guide modal with measurement charts.
  - Delivery time indicator pill.
  - Fabric, fit, and care accordion.
  - Add to Bag with single-boutique validation.
- [ ] `/search`: Live search for products and stores with category, size, price, and delivery time filters.

### Phase 6: Single-Boutique Cart & Checkout Flow
- [ ] `/cart`:
  - List of items with variant labels, price, and quantity steppers.
  - Subtotal, delivery fee, taxes, and total summary.
  - Single-boutique conflict modal (`ConflictModal.jsx`) if adding from another store.
  - Empty bag illustration with shopping CTA.
- [ ] `/checkout`:
  - Delivery address selection (Home, Office, Custom).
  - Estimated delivery time recap.
  - Payment method selection (UPI, Credit/Debit Card, Cash on Delivery).
  - Place order action triggering order creation in mock API.

### Phase 7: Order Confirmation, Live Tracking & Order History
- [ ] `/orders/:id/success`: Clean confirmation screen with order reference and tracking CTA.
- [ ] `/orders/:id`: Real-time order status timeline (`OrderStatusTimeline.jsx`), delivery countdown, visual map placeholder, and contact store button.
- [ ] `/orders`: Active and past orders using reusable `OrderCard`s with "Track" and "Buy again" actions.

### Phase 8: Profile, Authentication & Responsive Polish
- [ ] `/profile`: Account details, address book management, order shortcut, help & support.
- [ ] `/login`: Phone number + OTP login interface with mock auth persistence.
- [ ] Full responsiveness audit (Mobile 375px, Tablet 768px, Desktop 1280px+).
- [ ] Sticky mobile "Add to Bag" bar on product details page.
- [ ] Accessibility (keyboard navigation, focus states, ARIA tags).

---

## 9. Definition of Done (DoD)

The implementation is verified and complete when:
- [ ] All 12 customer-facing routes render and navigate seamlessly without broken links.
- [ ] The exact same `ProductCard` is reused on Home, Boutiques, Search, and Category views.
- [ ] The exact same `BoutiqueCard` is reused on Home and Boutiques directory.
- [ ] All product and store data is fetched through the async `/src/api/` layer.
- [ ] Products can be added to the cart, with single-boutique conflict handled via modal.
- [ ] Cart state persists in `localStorage`.
- [ ] Checkout completes with mock payment, creating a trackable order.
- [ ] Order Tracking displays the 6-stage status timeline and delivery countdown.
- [ ] Orders page displays newly placed orders under "Active orders".
- [ ] Mobile responsive layout is intuitive with proper touch targets and navigation.
- [ ] Loading skeletons and friendly empty states exist for all data-driven screens.
- [ ] Zero dead buttons across all customer-facing journeys.
- [ ] Code is modular, clean, and ready for future FastAPI backend integration.

---

## 10. Explicitly Out of Scope (Do Not Build Yet)
- Delivery partner rider app / GPS socket tracking
- Real payment gateway SDKs (Stripe/Razorpay live transactions)
- Real SMS OTP service
- Boutique owner / Admin management portal
- Multi-boutique checkout in a single cart
- Live WebSockets or microservices
