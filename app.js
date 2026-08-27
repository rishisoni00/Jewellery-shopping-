// Catalog Store & User State
let products = [
  { id: 1, name: "Royal Diamond Solitaire", category: "women", price: 125000, mudraReward: 50, img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500" },
  { id: 2, name: "Men's Solid Gold Kada", category: "men", price: 85000, mudraReward: 30, img: "https://images.unsplash.com/photo-1611591475155-4282fc289e74?w=500" },
  { id: 3, name: "Emerald Cut Platinum Ring", category: "women", price: 210000, mudraReward: 80, img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500" }
];

let userState = {
  memberId: "",
  mudraBalanceGold: 0,
  mudraBalanceSilver: 0,
  productTimeSpent: {}
};

let startTime = Date.now();
let activeInspectedProduct = null;
let inspectionStartTime = null;

// Initialize Session & Permanent ID
function initUserSession() {
  let savedId = localStorage.getItem('aura_member_id');
  if (!savedId) {
    savedId = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('aura_member_id', savedId);
  }
  userState.memberId = savedId;
  document.getElementById('user-member-id').innerText = savedId;
  document.getElementById('profile-id').innerText = savedId;
}

// Render Engine
function displayProducts(items) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  items.forEach(p => {
    grid.innerHTML += `
      <div class="product-card" onclick="openHDView('${p.img}', '${p.name}', ${p.price}, ${p.id})">
        <div class="img-container">
          <img src="${p.img}" class="product-img" alt="${p.name}">
        </div>
        <h3>${p.name}</h3>
        <p class="mudra-tag">Reward: ${p.mudraReward} Mudra Gold</p>
        <p class="price">₹${p.price.toLocaleString()}</p>
        <button class="btn-gold" onclick="event.stopPropagation(); bookProduct(${p.id})">Book Now</button>
        <button class="btn-gold" style="background:#444; color:#fff" onclick="event.stopPropagation(); open3D()">View</button>
      </div>
    `;
  });
}

// Product Inspection Analytics Tracker
function startInspectingProduct(id) {
  if (activeInspectedProduct !== null) {
    recordTimeSpent(activeInspectedProduct);
  }
  activeInspectedProduct = id;
  inspectionStartTime = Date.now();
}

function recordTimeSpent(id) {
  if (inspectionStartTime) {
    const elapsed = Math.round((Date.now() - inspectionStartTime) / 1000);
    userState.productTimeSpent[id] = (userState.productTimeSpent[id] || 0) + elapsed;
    console.log(`[Analytics] Member ${userState.memberId} spent ${elapsed}s inspecting Product ID ${id}. Total: ${userState.productTimeSpent[id]}s`);
  }
}

// HD Image Zoom Modal Trigger
function openHDView(imgSrc, title, price, id) {
  startInspectingProduct(id);
  document.getElementById('hdModalImage').src = imgSrc;
  document.getElementById('hdModalTitle').innerText = title;
  document.getElementById('hdModalPrice').innerText = `₹${price.toLocaleString()}`;
  document.getElementById('imageModal').style.display = 'flex';
}

function closeImageModal() {
  if (activeInspectedProduct !== null) {
    recordTimeSpent(activeInspectedProduct);
    activeInspectedProduct = null;
    inspectionStartTime = null;
  }
  document.getElementById('imageModal').style.display = 'none';
}

// Mudra Reward Execution
function bookProduct(id) {
  const item = products.find(p => p.id === id);
  const halfReward = item.mudraReward / 2;
  
  userState.mudraBalanceGold += halfReward;
  updateMudraUI();
  
  alert(`Booking initiated for ${item.name}.\n\n✅ ${halfReward} Mudra Gold credited to your wallet.\n⌛ The remaining ${halfReward} Mudra Gold will be released upon order preparation confirmation.`);
}

function updateMudraUI() {
  document.getElementById('mudra-gold').innerText = userState.mudraBalanceGold;
  document.getElementById('profile-mudra').innerText = `${userState.mudraBalanceGold} Gold`;
}

// Navigation & Drawer Controllers
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('active');
}

function showUserDetailsModal() {
  const totalSessionSeconds = Math.round((Date.now() - startTime) / 1000);
  document.getElementById('session-time').innerText = totalSessionSeconds;
  document.getElementById('userModal').style.display = 'flex';
}

function closeUserModal() {
  document.getElementById('userModal').style.display = 'none';
}

function toggleAdminPanel() {
  const panel = document.getElementById('adminPanel');
  panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
}

// Admin Catalog Update Manager
function addNewProduct() {
  const name = document.getElementById('newProdName').value;
  const price = Number(document.getElementById('newProdPrice').value);
  const category = document.getElementById('newProdCat').value;
  const img = document.getElementById('newProdImg').value;
  const mudraReward = Number(document.getElementById('newProdMudra').value);

  if (name && price && category && img) {
    const newProduct = {
      id: products.length + 1,
      name, price, category, img,
      mudraReward: mudraReward || 20
    };
    products.push(newProduct);
    displayProducts(products);
    toggleAdminPanel();
    alert('New item successfully published to store catalog.');
  }
}

// Real-Time Active Users Simulation
setInterval(() => {
  const liveUsers = Math.floor(Math.random() * (160 - 110 + 1)) + 110;
  document.getElementById('live-users').innerText = liveUsers;
}, 3000);

// Buyer Notification Streamer
const locations = ["Mumbai", "Delhi", "Bangalore", "Jaipur", "Kolkata", "Hyderabad"];
setInterval(() => {
  const city = locations[Math.floor(Math.random() * locations.length)];
  const prod = products[Math.floor(Math.random() * products.length)].name;
  
  const toast = document.getElementById('buyer-toast');
  toast.innerText = `🛒 Buyer from ${city} just booked ${prod}!`;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}, 10000);

// Product Search & Filter Functions
function filterProducts() {
  const val = document.getElementById('searchInput').value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(val));
  displayProducts(filtered);
}

function sortProducts() {
  const val = document.getElementById('sortPrice').value;
  let sorted = [...products];
  if (val === 'low-high') sorted.sort((a, b) => a.price - b.price);
  if (val === 'high-low') sorted.sort((a, b) => b.price - a.price);
  displayProducts(sorted);
}

function filterCategory(cat) {
  if (cat === 'all') return displayProducts(products);
  const filtered = products.filter(p => p.category === cat);
  displayProducts(filtered);
}

// Three.js 3D Viewer Engine
function open3D() {
  document.getElementById('3dModal').style.display = 'flex';
  const container = document.getElementById('three-container');
  container.innerHTML = '';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, 300);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
  const material = new THREE.MeshBasicMaterial({ color: 0xD4AF37, wireframe: true });
  const ring = new THREE.Mesh(geometry, material);
  scene.add(ring);

  camera.position.z = 3;

  function animate() {
    requestAnimationFrame(animate);
    ring.rotation.x += 0.01;
    ring.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
}

function close3DModal() {
  document.getElementById('3dModal').style.display = 'none';
}

// App Initialization
initUserSession();
displayProducts(products);
