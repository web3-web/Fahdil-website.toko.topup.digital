// Data awal produk (contoh)
let products = [
    {id: 1, name: "PULSA 10.000", price: 10000, discount: 10, category: "Pulsa", stock: 20, image: "https://via.placeholder.com/150?text=Pulsa+10k", sales: 5},
    {id: 2, name: "AXIS 5GB 3HARI", price: 15000, discount: 20, category: "Paket Data", stock: 15, image: "https://via.placeholder.com/150?text=Axis+5GB", sales: 10},
    {id: 3, name: "1.000 DM GAME ML", price: 25000, discount: 98, category: "Voucher Game", stock: 5, image: "https://via.placeholder.com/150?text=1000+DM", sales: 8},
    {id: 4, name: "PULSA 5.000", price: 5000, discount: 0, category: "Pulsa", stock: 50, image: "https://via.placeholder.com/150?text=Pulsa+5k", sales: 2},
    // Tambahkan produk lain sesuai kebutuhan
];

// Variabel untuk menyimpan rating saat ini
let currentRating = 0;

// Fungsi menampilkan daftar produk sesuai filter dan sort
function displayProducts() {
    const list = document.getElementById("productList");
    list.innerHTML = "";
    const filter = document.getElementById("categorySelect").value;
    const search = document.getElementById("searchInput").value.toLowerCase();

    products.forEach(product => {
        // Cek kategori dan pencarian
        if ((filter === "Semua" || product.category === filter) &&
            product.name.toLowerCase().includes(search)) {
            const card = document.createElement("div");
            card.className = "product-card";
            // Highlight produk terlaris (misal penjualan >= 10)
            if (product.sales >= 10) {
                card.classList.add("best-seller");
            }

            let html = "";
            // Tampilkan badge diskon jika ada
            if (product.discount > 0) {
                html += `<div class="discount-badge">${product.discount}% OFF</div>`;
            }
            // Tampilkan peringatan stok jika hampir habis
            if (product.stock <= 5) {
                html += `<div class="stock-warning">⚠️ Stok Hampir Habis!</div>`;
            }
            // Tampilkan label flash sale (contoh sebagai tambahan)
            if (product.discount > 0) {
                html += `<div class="flashsale">⚡ Flash Sale berakhir segera!</div>`;
            }
            // Gambar produk
            html += `<img src="${product.image}" alt="${product.name}">`;
            // Nama produk
            html += `<h3>${product.name}</h3>`;
            // Harga (dengan diskon jika ada)
            if (product.discount > 0) {
                let discountedPrice = product.price * (100 - product.discount) / 100;
                html += `<p><span class="original-price">Rp${product.price.toLocaleString()}</span> <span class="discounted-price">Rp${discountedPrice.toLocaleString()}</span></p>`;
            } else {
                html += `<p>Rp${product.price.toLocaleString()}</p>`;
            }
            // Contoh rating statis (5 bintang penuh)
            html += `<p>${"★".repeat(5)}${"☆".repeat(0)}</p>`;
            // Tombol Beli dengan tooltip
            html += `<button onclick="buyProduct(${product.id})" title="Beli produk ini">Beli</button>`;

            card.innerHTML = html;
            list.appendChild(card);
        }
    });
}

// Fungsi filter produk (panggil saat input pencarian berubah)
function filterProducts() {
    displayProducts();
}

// Fungsi mengurutkan produk berdasarkan pilihan
function sortProducts() {
    const sort = document.getElementById("sortSelect").value;
    products.sort((a, b) => {
        if (sort === "termurah") return (a.price * (100 - a.discount)) - (b.price * (100 - b.discount));
        if (sort === "termahal") return (b.price * (100 - b.discount)) - (a.price * (100 - a.discount));
        if (sort === "terlaris") return b.sales - a.sales;
        // Terbaru (asumsi berdasarkan ID)
        return b.id - a.id;
    });
    displayProducts();
}

// Fungsi menangani pembelian produk
function buyProduct(id) {
    const product = products.find(p => p.id === id);
    if (product.stock > 0) {
        product.stock--;
        product.sales++;
        // Tambah ke riwayat pembelian
        const historyList = document.getElementById("historyList");
        const li = document.createElement("li");
        li.textContent = `Beli ${product.name} seharga Rp${(product.price * (100 - product.discount)/100).toLocaleString()}`;
        historyList.appendChild(li);
        alert("Terima kasih atas pembelian Anda!");
        // Tampilkan popup rating
        showRatingPopup();
        displayProducts();
    } else {
        alert("Maaf, stok produk ini telah habis.");
    }
}

// Fungsi menampilkan popup rating
function showRatingPopup() {
    document.getElementById("ratingModal").classList.remove("hidden");
}
// Set rating sesuai klik bintang
function setRating(r) {
    currentRating = r;
    document.querySelectorAll('#starRating .star').forEach((star, index) => {
        star.textContent = (index < r ? '★' : '☆');
    });
}
// Kirim rating (simulasi)
function submitRating() {
    alert("Terima kasih atas rating Anda: " + currentRating + "★");
    closeRatingModal();
}
// Tutup popup rating
function closeRatingModal() {
    document.getElementById("ratingModal").classList.add("hidden");
}

// Fungsi toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

// Fungsi menampilkan section tertentu dan menyembunyikan section lain
function showSection(id) {
    if (id === 'produk') document.getElementById('riwayat').classList.remove('hidden');
    else document.getElementById('riwayat').classList.add('hidden');

    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

// Fungsi login Pemilik
function loginPemilik(event) {
    event.preventDefault();
    const user = document.getElementById("usernamePemilik").value;
    const pass = document.getElementById("passwordPemilik").value;
    // Contoh validasi sederhana
    if (user === "admin" && pass === "1234") {
        alert("Login pemilik berhasil");
        // Simpan riwayat login pemilik ke localStorage
        let history = JSON.parse(localStorage.getItem("loginHistoryPemilik") || "[]");
        history.push(new Date().toLocaleString());
        localStorage.setItem("loginHistoryPemilik", JSON.stringify(history));
        displayLoginHistory("pemilik");
    } else {
        alert("Username atau password pemilik salah.");
    }
}

// Fungsi update akun Pemilik (simulasi)
function updatePemilikAccount(event) {
    event.preventDefault();
    alert("Akun pemilik diperbarui (simulasi).");
}

// Fungsi login Owner
function loginOwner(event) {
    event.preventDefault();
    const user = document.getElementById("usernameOwner").value;
    const pass = document.getElementById("passwordOwner").value;
    if (user === "owner" && pass === "5678") {
        alert("Login owner berhasil");
        let history = JSON.parse(localStorage.getItem("loginHistoryOwner") || "[]");
        history.push(new Date().toLocaleString());
        localStorage.setItem("loginHistoryOwner", JSON.stringify(history));
        displayLoginHistory("owner");
    } else {
        alert("Username atau password owner salah.");
    }
}

// Tampilkan riwayat login dari localStorage
function displayLoginHistory(type) {
    const listId = (type === "pemilik") ? "historyPemilik" : "historyOwner";
    const hist = JSON.parse(localStorage.getItem(type === "pemilik" ? "loginHistoryPemilik" : "loginHistoryOwner") || "[]");
    const list = document.getElementById(listId);
    if (list) {
        list.innerHTML = "";
        hist.forEach(time => {
            const li = document.createElement("li");
            li.textContent = time;
            list.appendChild(li);
        });
    }
}

// Fungsi tambah produk baru (hanya untuk Pemilik)
function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById("newProductName").value;
    const price = parseInt(document.getElementById("newProductPrice").value);
    const discount = parseInt(document.getElementById("newProductDiscount").value);
    const category = document.getElementById("newProductCategory").value;
    const stock = parseInt(document.getElementById("newProductStock").value);
    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    // Gunakan placeholder untuk gambar
    const imagePlaceholder = "https://via.placeholder.com/150?text=" + encodeURIComponent(name);
    const newProduct = {
        id: newId,
        name: name,
        price: price,
        discount: discount,
        category: category,
        stock: stock,
        image: imagePlaceholder,
        sales: 0
    };
    products.push(newProduct);
    displayProducts();
    alert("Produk baru berhasil ditambahkan!");
    document.getElementById("addProductForm").reset();
}

// Inisialisasi tampilan saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    displayLoginHistory("pemilik");
    displayLoginHistory("owner");
});
