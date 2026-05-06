// loader.js
async function loadProducts(containerId, category = null, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const response = await fetch('products-data/products.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        let products = await response.json();

        if (category) {
            products = products.filter(p => p.category === category);
        }
        if (limit) {
            products = products.slice(0, limit);
        }

        if (products.length === 0) {
            container.innerHTML = '<div class="loading">暂无产品</div>';
            return;
        }

        container.innerHTML = products.map(p => `
            <a href="product.html?slug=${p.slug}" class="product-card">
                <i class="fas fa-server"></i>
                <h3>${p.name}</h3>
                <p>${p.description || ''}</p>
                <div class="product-price">${p.price || '询价'}</div>
                <div class="btn-detail">查看详情 →</div>
            </a>
        `).join('');
    } catch (error) {
        console.error('加载产品失败:', error);
        container.innerHTML = '<div class="loading">加载产品失败，请检查网络或稍后重试。</div>';
    }
}
