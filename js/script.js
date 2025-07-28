document.addEventListener('DOMContentLoaded', () => {
  fetchCategories();
  fetchProducts();

  async function fetchCategories() {
    try {
      const res = await fetch('/api/products');
      const products = await res.json();
      const categories = [...new Set(products.map(p => p.category))];
      const catList = document.getElementById('category-list');
      categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary category-btn animate-pop';
        btn.textContent = cat;
        btn.onclick = () => fetchByCategory(cat);
        catList.appendChild(btn);
      });
    } catch (err) {
      console.error('Categories error:', err);
    }
  }

  async function fetchProducts(category = '') {
    try {
      let url = '/api/products';
      if (category) url += `?category=${encodeURIComponent(category)}`;
      const res = await fetch(url);
      const products = await res.json();
      renderProducts(products);
    } catch (err) {
      console.error('Products error:', err);
    }
  }

  function fetchByCategory(cat) {
    fetchProducts(cat);
    window.location.hash = 'product-list-section';
  }

  function renderProducts(products) {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    if (!products.length) {
      list.innerHTML = '<li class="list-group-item">No products found.</li>';
      return;
    }
    products.forEach(product => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between animate-fade';
      li.innerHTML = `
        <div>
          <strong>${product.name}</strong>
          <small class="text-muted">(${product.category})</small>
        </div>
        <span class="badge bg-primary rounded-pill">₹${product.price}</span>
      `;
      list.appendChild(li);
    });
  }
});
