/* muhammad zain | 26i_3036 | section a */

/* ---------- PRODUCT DATA ----------
   The Carry Bag (id 1) is YOUR original product: size 45, box type, 5000 $.
   The other products are extra examples so the shop has a full grid:
   change their names/prices to whatever you like.
   "tint" recolours the same bag photo so each colour looks different. */
const COLORS = {
  forest: { name: "Forest", hex: "#2f6b45", tint: "none" },
  ocean:  { name: "Ocean",  hex: "#2a6fb0", tint: "hue-rotate(100deg)" },
  rose:   { name: "Rose",   hex: "#b04a78", tint: "hue-rotate(195deg)" },
  gold:   { name: "Gold",   hex: "#b5942f", tint: "hue-rotate(-85deg) saturate(1.1)" }
};

const PRODUCTS = [
  { id: 1, name: "The Carry Bag", category: "Signature", price: 5000, style: "Box type",
    sizes: [35, 45, 55], defaultSize: 45, colors: ["forest", "ocean", "rose", "gold"], badge: "Best seller",
    desc: "The bag that will help people carry their stuff in an efficient way. Our signature box-type carry bag keeps its shape, holds more than it looks like it can, and goes with everything.",
    material: "Vegan leather, cotton lining", weight: "0.9 kg" },
  { id: 2, name: "Carry Bag Mini", category: "Everyday", price: 3200, style: "Box type",
    sizes: [25, 30, 35], defaultSize: 30, colors: ["rose", "gold", "forest"], badge: "New",
    desc: "A pocket-sized take on the classic. Holds your phone, wallet and keys with room to spare.",
    material: "Vegan leather, cotton lining", weight: "0.5 kg" },
  { id: 3, name: "Carry Bag Max", category: "Travel", price: 6800, style: "Box type",
    sizes: [50, 55, 60], defaultSize: 55, colors: ["forest", "ocean"], badge: "",
    desc: "Maximum capacity for weekends away. Reinforced handles and a structured base carry the heavy stuff.",
    material: "Heavy canvas, leather trim", weight: "1.3 kg" },
  { id: 4, name: "Ocean Tote", category: "Everyday", price: 4500, style: "Open tote",
    sizes: [40, 45], defaultSize: 45, colors: ["ocean", "forest"], badge: "New",
    desc: "A light, open-top tote in a deep ocean tone. Easy to grab, easy to love.",
    material: "Recycled canvas", weight: "0.7 kg" },
  { id: 5, name: "Rose Edition", category: "Signature", price: 5500, style: "Box type",
    sizes: [35, 45], defaultSize: 45, colors: ["rose"], badge: "Limited",
    desc: "A limited colourway of the signature bag in soft rose. Once it is gone, it is gone.",
    material: "Vegan leather, cotton lining", weight: "0.9 kg" },
  { id: 6, name: "Gold Weekender", category: "Travel", price: 7200, style: "Duffle box",
    sizes: [55, 60], defaultSize: 55, colors: ["gold", "forest"], badge: "",
    desc: "Built for the airport and beyond. Wipe-clean surface and a zip-secure top.",
    material: "Coated canvas, brass hardware", weight: "1.4 kg" }
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => n.toLocaleString("en-US") + " $";
const byId = id => PRODUCTS.find(p => p.id === Number(id));

/* ---------- CART (saved in the browser so it survives page changes) ---------- */
function loadCart() { try { return JSON.parse(localStorage.getItem("cb_cart")) || []; } catch (e) { return []; } }
let cart = loadCart();
function saveCart() { try { localStorage.setItem("cb_cart", JSON.stringify(cart)); } catch (e) {} updateCartUI(); }

function addToCart(id, size, color, qty = 1) {
  const item = cart.find(i => i.id === id && i.size === size && i.color === color);
  if (item) item.qty += qty; else cart.push({ id, size, color, qty });
  saveCart();
  toast(`${byId(id).name} (${size} cm, ${COLORS[color].name}) added to cart`);
  console.log("added to cart:", id, size, color, qty);
}
function cartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
function cartTotal() { return cart.reduce((s, i) => s + i.qty * byId(i.id).price, 0); }

function updateCartUI() {
  const c = $("#cartCount");
  if (c) { c.textContent = cartCount(); c.classList.toggle("show", cartCount() > 0); }
  const list = $("#cartItems");
  if (!list) return;
  if (!cart.length) {
    list.innerHTML = `<p class="cart-empty">Your cart is empty.<br><a href="shop.html">Start shopping →</a></p>`;
  } else {
    list.innerHTML = cart.map((i, idx) => {
      const p = byId(i.id);
      return `<div class="cart-item">
        <div class="thumb"><img src="im.jpg" alt="${p.name}" style="filter:${COLORS[i.color].tint}"></div>
        <div class="ci-info"><h4>${p.name}</h4><small>${i.size} cm · ${COLORS[i.color].name}</small>
          <div class="qty sm"><button data-act="dec" data-i="${idx}" aria-label="Decrease">−</button><span>${i.qty}</span><button data-act="inc" data-i="${idx}" aria-label="Increase">+</button></div></div>
        <div class="ci-right"><strong>${money(p.price * i.qty)}</strong><button class="link" data-act="rm" data-i="${idx}">Remove</button></div></div>`;
    }).join("");
  }
  $("#cartTotal").textContent = money(cartTotal());
}

/* ---------- SHARED HEADER / FOOTER / CART DRAWER ---------- */
function buildLayout() {
  const page = document.body.dataset.page;
  const act = n => (page === n ? "active" : "");
  $("#site-header").innerHTML = `
   <div class="announce">Free shipping on orders over 10,000 $ · New colours just landed</div>
   <nav class="nav"><div class="container nav-in">
     <a class="logo" href="index.html">carry<span>bag</span></a>
     <ul class="links" id="navLinks">
       <li><a class="${act("home")}" href="index.html">Home</a></li>
       <li><a class="${act("shop")}" href="shop.html">Shop</a></li>
       <li><a href="index.html#about">About</a></li>
       <li><a href="#contact">Contact</a></li>
     </ul>
     <div class="nav-actions">
       <button class="cart-btn" id="openCart" aria-label="Open cart">
         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
         <span id="cartCount" class="badge">0</span></button>
       <button class="burger" id="burger" aria-label="Menu"><span></span><span></span></button>
     </div></div></nav>`;
  $("#site-footer").innerHTML = `
   <footer class="footer" id="contact"><div class="container">
     <div class="f-grid">
       <div><a class="logo light" href="index.html">carry<span>bag</span></a>
         <p>Bags made to carry your day, beautifully.</p>
         <div class="social">
           <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
           <a href="https://tiktok.com" target="_blank" rel="noopener" aria-label="TikTok"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.3 2.4 2 4 4.5 4.2"/></svg></a>
           <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/></svg></a>
           <a href="https://pinterest.com" target="_blank" rel="noopener" aria-label="Pinterest"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M11 8c3-1 5 1 4 3.5S12 14 11 16l1-8"/></svg></a>
         </div></div>
       <div><h5>Explore</h5><a href="index.html">Home</a><a href="shop.html">Shop</a><a href="index.html#about">About</a></div>
       <div><h5>Contact</h5><a href="mailto:hello@carrybag.example">hello@carrybag.example</a><a href="tel:+920000000000">+92 000 0000000</a><span>Islamabad, Pakistan</span></div>
       <div><h5>Stay in touch</h5>
         <form class="news" id="newsForm"><input type="email" required placeholder="Your email" aria-label="Email"><button>Join</button></form></div>
     </div>
     <div class="f-bottom">© 2026 The Carry Bag · muhammad zain · 26i_3036 · Section A</div>
   </div></footer>
   <div class="overlay" id="overlay"></div>
   <aside class="drawer" id="drawer" aria-label="Shopping cart">
     <div class="d-head"><h3>Your cart</h3><button id="closeCart" aria-label="Close cart">✕</button></div>
     <div class="d-body" id="cartItems"></div>
     <div class="d-foot"><div class="row"><span>Total</span><strong id="cartTotal">0 $</strong></div>
       <button class="btn btn-dark wide" id="checkout">Checkout</button></div>
   </aside><div class="toast" id="toast"></div>`;
}

function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2400);
}
function openCart(o = true) { $("#drawer").classList.toggle("open", o); $("#overlay").classList.toggle("show", o); }

function wireLayout() {
  $("#openCart").onclick = () => openCart(true);
  $("#closeCart").onclick = $("#overlay").onclick = () => openCart(false);
  $("#burger").onclick = () => document.body.classList.toggle("menu-open");
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => document.body.classList.remove("menu-open")));
  $("#cartItems").addEventListener("click", e => {
    const b = e.target.closest("button[data-act]"); if (!b) return;
    const i = +b.dataset.i;
    if (b.dataset.act === "inc") cart[i].qty++;
    if (b.dataset.act === "dec") cart[i].qty = Math.max(1, cart[i].qty - 1);
    if (b.dataset.act === "rm") cart.splice(i, 1);
    saveCart();
  });
  $("#checkout").onclick = () => {
    if (!cart.length) return toast("Your cart is empty");
    alert("Thank you for joining! Checkout is coming soon. Your total is " + money(cartTotal()));
    console.log("user clicked checkout, total:", cartTotal());
  };
  $("#newsForm").onsubmit = e => { e.preventDefault(); toast("Thanks for joining!"); e.target.reset(); };
  window.addEventListener("scroll", () => $(".nav").classList.toggle("scrolled", scrollY > 20));
  updateCartUI();
}

/* ---------- PRODUCT CARD ---------- */
function cardHTML(p) {
  return `<article class="card" data-id="${p.id}">
    <a class="card-img" href="product.html?id=${p.id}">
      ${p.badge ? `<span class="tag">${p.badge}</span>` : ""}
      <img src="im.jpg" alt="${p.name}" style="filter:${COLORS[p.colors[0]].tint}"></a>
    <div class="card-body">
      <div class="row"><h3>${p.name}</h3><strong>${money(p.price)}</strong></div>
      <p class="muted">Sizes: ${p.sizes.join(" · ")} cm</p>
      <div class="swatches">${p.colors.map((c, i) => `<button class="sw ${i === 0 ? "on" : ""}" data-color="${c}" title="${COLORS[c].name}" style="background:${COLORS[c].hex}"></button>`).join("")}</div>
      <div class="card-btns">
        <a class="btn btn-ghost" href="product.html?id=${p.id}">View Details</a>
        <button class="btn btn-dark" data-add>Add to Cart</button></div>
    </div></article>`;
}
function wireCards(root) {
  root.addEventListener("click", e => {
    const card = e.target.closest(".card"); if (!card) return;
    const p = byId(card.dataset.id);
    const sw = e.target.closest(".sw");
    if (sw) {
      $$(".sw", card).forEach(s => s.classList.remove("on")); sw.classList.add("on");
      $(".card-img img", card).style.filter = COLORS[sw.dataset.color].tint;
    }
    if (e.target.closest("[data-add]")) {
      const color = $(".sw.on", card).dataset.color;
      addToCart(p.id, p.defaultSize, color, 1);
    }
  });
}

/* ---------- HOME ---------- */
function initHome() {
  const f = PRODUCTS.filter(p => [1, 2, 4].includes(p.id));
  $("#featured").innerHTML = f.map(cardHTML).join("");
  wireCards($("#featured"));
  const na = PRODUCTS.filter(p => p.badge === "New" || p.badge === "Limited").slice(0, 3);
  $("#arrivals").innerHTML = na.map(cardHTML).join("");
  wireCards($("#arrivals"));
  const buy = $("#heroBuy");
  buy.onclick = () => { alert("Coming soon for the price of " + money(byId(1).price)); console.log("user clicked the button"); };
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
  $$(".reveal").forEach(el => io.observe(el));
}

/* ---------- SHOP ---------- */
function initShop() {
  const cats = ["All", ...new Set(PRODUCTS.map(p => p.category))];
  let cat = new URLSearchParams(location.search).get("cat") || "All";
  if (!cats.includes(cat)) cat = "All";
  $("#chips").innerHTML = cats.map(c => `<button class="chip ${c === cat ? "on" : ""}" data-cat="${c}">${c}</button>`).join("");
  const grid = $("#grid");
  function render() {
    let list = PRODUCTS.filter(p => cat === "All" || p.category === cat);
    const q = $("#search").value.trim().toLowerCase();
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q));
    const s = $("#sort").value;
    if (s === "low") list.sort((a, b) => a.price - b.price);
    if (s === "high") list.sort((a, b) => b.price - a.price);
    if (s === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    $("#resultCount").textContent = `${list.length} bag${list.length === 1 ? "" : "s"}`;
    grid.innerHTML = list.length ? list.map(cardHTML).join("") : `<p class="muted">No bags match your search.</p>`;
  }
  $("#chips").onclick = e => { const c = e.target.closest(".chip"); if (!c) return; cat = c.dataset.cat; $$(".chip").forEach(x => x.classList.toggle("on", x === c)); render(); };
  $("#sort").onchange = render; $("#search").oninput = render;
  wireCards(grid); render();
}

/* ---------- PRODUCT DETAILS ---------- */
function initProduct() {
  const p = byId(new URLSearchParams(location.search).get("id")) || PRODUCTS[0];
  document.title = p.name + " – The Carry Bag";
  let size = p.defaultSize, color = p.colors[0], qty = 1, view = 0;
  const views = ["scale(1)", "scale(1.7) translate(4%,8%)", "scale(1.9) translate(-10%,-18%)"]; // 3 "angles" from one photo
  $("#crumb").textContent = p.name;
  $("#pName").textContent = p.name;
  $("#pCat").textContent = p.category;
  $("#pDesc").textContent = p.desc;
  $("#pStyle").textContent = p.style; $("#pMaterial").textContent = p.material; $("#pWeight").textContent = p.weight;
  function paint() {
    $("#pPrice").textContent = money(p.price);
    $("#mainImg").style.filter = COLORS[color].tint;
    $("#mainImg").style.transform = views[view];
    $("#pSize").textContent = size + " cm"; $("#pColor").textContent = COLORS[color].name; $("#qty").textContent = qty;
    $$("#sizes button").forEach(b => b.classList.toggle("on", +b.dataset.v === size));
    $$("#colors button").forEach(b => b.classList.toggle("on", b.dataset.v === color));
    $$("#thumbs button").forEach((b, i) => { b.classList.toggle("on", i === view); $("img", b).style.filter = COLORS[color].tint; });
  }
  $("#sizes").innerHTML = p.sizes.map(s => `<button data-v="${s}">${s}</button>`).join("");
  $("#colors").innerHTML = p.colors.map(c => `<button data-v="${c}" title="${COLORS[c].name}" style="background:${COLORS[c].hex}"></button>`).join("");
  $("#thumbs").innerHTML = views.map((v, i) => `<button data-i="${i}"><img src="im.jpg" alt="View ${i + 1}" style="transform:${v}"></button>`).join("");
  $("#sizes").onclick = e => { const b = e.target.closest("button"); if (b) { size = +b.dataset.v; paint(); } };
  $("#colors").onclick = e => { const b = e.target.closest("button"); if (b) { color = b.dataset.v; paint(); } };
  $("#thumbs").onclick = e => { const b = e.target.closest("button"); if (b) { view = +b.dataset.i; paint(); } };
  $("#minus").onclick = () => { qty = Math.max(1, qty - 1); paint(); };
  $("#plus").onclick = () => { qty = Math.min(10, qty + 1); paint(); };
  $("#addBtn").onclick = () => { addToCart(p.id, size, color, qty); openCart(true); };
  $("#buyBtn").onclick = () => { alert("Coming soon for the price of " + money(p.price * qty)); console.log("user clicked the button"); };
  const rel = PRODUCTS.filter(x => x.id !== p.id).sort((a, b) => (b.category === p.category) - (a.category === p.category)).slice(0, 3);
  $("#related").innerHTML = rel.map(cardHTML).join(""); wireCards($("#related"));
  paint();
}

/* ---------- START ---------- */
document.addEventListener("DOMContentLoaded", () => {
  buildLayout(); wireLayout();
  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "shop") initShop();
  if (page === "product") initProduct();
});
