// Sample Dynamic Product Data
const products = [
  { id: 1, name: "Royal Diamond Solitaire", category: "women", price: 125000, img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500" },
  { id: 2, name: "Men's Solid Gold Kada", category: "men", price: 85000, img: "https://images.unsplash.com/photo-1611591475155-4282fc289e74?w=500" },
  { id: 3, name: "Emerald Cut Platinum Ring", category: "women", price: 210000, img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500" }
];

let wishlist = [];
let cart = [];
let startTime = Date.now();

// Render Products
function displayProducts(items) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  items.forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <div class="img-container">
          <img src="${p.img}" class="product-img" alt="${p.name}">
        </div>
        <h3>${p.name}</h3>
        <p class="price">₹${p.price.toLocaleString()}</p>
        <button class="btn-gold" onclick="addToCart(${p.id})">Book Now</button>
        <button class="btn-gold" style="background:#444; color:#fff" onclick="open3D()">360 View</button>
      </div>
    `;
  });
}

// Real-Time Active Users Counter Simulation
setInterval(() => {
  const liveUsers = Math.floor(Math.random() * (150 - 110 + 1)) + 110;
  document.getElementById('live-users').innerText = liveUsers;
}, 3000);

// Sorting (Price: Low to High)
function sortProducts() {
  const val = document.getElementById('sortPrice').value;
  let sorted = [...products];
  if (val === 'low-high') sorted.sort((a, b) => a.price - b.price);
  if (val === 'high-low') sorted.sort((a, b) => b.price - a.price);
  displayProducts(sorted);
}

// Category Filter
function filterCategory(cat) {
  if (cat === 'all') return displayProducts(products);
  const filtered = products.filter(p => p.category === cat);
  displayProducts(filtered);
}

// User Time Spent Analytics Tracker
window.addEventListener('beforeunload', () => {
  const timeSpent = Math.round((Date.now() - startTime) / 1000);
  console.log(`User spent ${timeSpent} seconds on the site.`);
  // Send metrics to Google Analytics / Firebase API
});

// Three.js 3D Sphere/Ring View Simulation
function open3D() {
  document.getElementById('3dModal').style.display = 'flex';
  const container = document.getElementById('three-container');
  container.innerHTML = '';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(300, 300);
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

// Initialize
displayProducts(products);
