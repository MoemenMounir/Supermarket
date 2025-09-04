let products = [];
let cart = [];
let total = 0;

// تحميل المنتجات
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    displayProducts(products);
  });

// عرض المنتجات
function displayProducts(productsList) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  const categories = {};
  productsList.forEach(p => {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  });

  for (const cat in categories) {
    const catDiv = document.createElement("div");
    catDiv.classList.add("category");
    catDiv.innerHTML = `<h2>${cat}</h2>`;

    const leftBtn = document.createElement("button");
    leftBtn.classList.add("slider-btn", "left");
    leftBtn.textContent = "◀";

    const rightBtn = document.createElement("button");
    rightBtn.classList.add("slider-btn", "right");
    rightBtn.textContent = "▶";

    const slider = document.createElement("div");
    slider.classList.add("products-slider");

    categories[cat].forEach(product => {
      const div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price} جنيه</p>
      `;
      div.addEventListener("click", () => showDetails(product));
      slider.appendChild(div);
    });

    leftBtn.addEventListener("click", () => {
      slider.scrollBy({ left: -200, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
      slider.scrollBy({ left: 200, behavior: "smooth" });
    });

    catDiv.appendChild(leftBtn);
    catDiv.appendChild(rightBtn);
    catDiv.appendChild(slider);
    container.appendChild(catDiv);
  }
}

// بحث
document.getElementById("search").addEventListener("input", function() {
  const value = this.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(value));
  displayProducts(filtered);
});

// تفاصيل المنتج
function showDetails(product) {
  const details = document.getElementById("product-details");
  details.classList.remove("hidden");
  details.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p>السعر: ${product.price} جنيه</p>
    <button onclick="addToCart('${product.name}')">إضافة للعربة</button>
    <button id="cart-btn2"> اذهب للعربة(<span id="cart-count2">0</span>)</button>
  `;
  details.scrollIntoView({ behavior: "smooth" });
}

// إضافة للعربة
function addToCart(name) {
  const product = products.find(p => p.name === name);
  cart.push(product);
  document.getElementById("cart-count").textContent = cart.length;
  updateCart();
  
  document.getElementById("cart-count2").textContent = cart.length;
  updateCart();
}

// تحديث العربة
function updateCart() {
  const list = document.getElementById("cart-items");
  const totalElem = document.getElementById("cart-total");
  list.innerHTML = "";
   total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ${item.price} جنيه
      <button onclick="removeFromCart(${index})">❌</button>
    `;
    list.appendChild(li);
  });

  totalElem.textContent = total;
}

// حذف من العربة
function removeFromCart(index) {
  cart.splice(index, 1);
  document.getElementById("cart-count").textContent = cart.length;
  updateCart();
}

// إظهار العربة
document.getElementById("cart-btn").addEventListener("click", () => {
  document.getElementById("cart").classList.add("show");
});

document.getElementById("product-details").addEventListener("click", (e) => {
  if (e.target && e.target.id === "cart-btn2") {
    document.getElementById("cart").classList.add("show");
  }
});

// إغلاق العربة
function closeCart() {
  document.getElementById("cart").classList.remove("show");
}

function goToPage() {
  if (cart.length > 0) {
    // إنشاء مصفوفة فيها أسماء المنتجات فقط
    const productNames = cart.map(item => item.name);
    
    // تخزينها ك string في sessionStorage
    sessionStorage.setItem("paymentItems", JSON.stringify(productNames));
    sessionStorage.setItem("paymentAmount", total);
    
    window.location.href = "payment.html";
  } else {
    alert("العربة فاضية!");
  }
}