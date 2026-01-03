const list = document.getElementById("product-list");
const search = document.getElementById("search");

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    render(data);

    search.addEventListener("input", () => {
      const keyword = search.value.toLowerCase();
      const filtered = data.filter(p =>
        p.nama.toLowerCase().includes(keyword)
      );
      render(filtered);
    });
  })
  .catch(() => {
    list.innerHTML = "<p class='loading'>Gagal load produk</p>";
  });

function render(products) {
  list.innerHTML = "";
  products.forEach(p => {
    list.innerHTML += `
      <div class="card">
        <img src="${p.foto}">
        <h3>${p.nama}</h3>
        <p>Rp ${p.harga.toLocaleString("id-ID")}</p>
        <button onclick="order('${p.nama}', ${p.harga})">
          Order WA
        </button>
      </div>
    `;
  });
}

function order(nama, harga) {
  const wa = "6287830586442";
  const text = `Halo ino.id, saya mau pesan ${nama} (Rp ${harga})`;
  window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`);
          }
