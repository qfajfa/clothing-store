import { useState } from "react";
import { ShoppingCart, Shirt, Phone, Info, Trash2, ArrowLeft, Instagram, Send } from "lucide-react";

export default function ClothingStore() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [category, setCategory] = useState("all");
  const [filterSize, setFilterSize] = useState("all");
  const [filterColor, setFilterColor] = useState("all");

  const products = [
    { id: 1, name: "Nike Air Max", price: 9500, category: "Кроссовки", images: ["https://via.placeholder.com/600x600.png?text=Nike+Air+Max+1","https://via.placeholder.com/600x600.png?text=Nike+Air+Max+2"], sizes: [38,39,40,41,42,43], colors: ["Черный","Белый","Синий"] },
    { id: 2, name: "Adidas Ultraboost", price: 11000, category: "Кроссовки", images: ["https://via.placeholder.com/600x600.png?text=Ultraboost+1","https://via.placeholder.com/600x600.png?text=Ultraboost+2"], sizes: [39,40,41,42,44], colors: ["Черный","Серый"] },
    { id: 3, name: "Puma RS-X", price: 8700, category: "Кроссовки", images: ["https://via.placeholder.com/600x600.png?text=Puma+RS-X+1","https://via.placeholder.com/600x600.png?text=Puma+RS-X+2"], sizes: [38,40,41,42], colors: ["Красный","Белый"] },
    ...Array.from({ length: 12 }, (_, i) => ({
      id: 4 + i,
      name: `Одежда ${i + 1}`,
      price: 3000 + i * 500,
      category: i % 2 === 0 ? "Футболки" : "Куртки",
      images: [`https://via.placeholder.com/600x600.png?text=Одежда+${i + 1}+A`,`https://via.placeholder.com/600x600.png?text=Одежда+${i + 1}+B`],
      sizes: ["S","M","L","XL"],
      colors: ["Черный","Белый","Серый"]
    }))
  ];

  const addToCart = (product) => {
    if (!selectedSize || !selectedColor) {
      alert("Пожалуйста, выберите размер и цвет");
      return;
    }
    setCart(prev => [...prev, { ...product, size: selectedSize, color: selectedColor }]);
    setSelectedSize(null);
    setSelectedColor(null);
  };

  const removeFromCart = (index) => setCart(prev => prev.filter((_, i) => i !== index));

  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => category === "all" || p.category === category)
    .filter(p => filterSize === "all" || p.sizes.map(String).includes(String(filterSize)))
    .filter(p => filterColor === "all" || p.colors.includes(filterColor))
    .sort((a, b) => sortOrder === "asc" ? a.price - b.price : b.price - a.price);

  const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-300/50" onClick={() => { setPage("home"); setSelectedProduct(null); }}>
          <Shirt /> Магазин одежды
        </h1>

        <nav className="flex gap-4 text-gray-700">
          <button onClick={() => { setPage("home"); setSelectedProduct(null); }} className="hover:underline">Каталог</button>
          <button onClick={() => setPage("about")} className="hover:underline">О нас</button>
          <button onClick={() => setPage("contacts")} className="hover:underline">Контакты</button>
          <button onClick={() => setPage("cart")} className="flex items-center gap-1 hover:underline"><ShoppingCart /> Корзина ({cart.length})</button>
        </nav>
      </header>

      <main className="p-6">
        {page === "home" && !selectedProduct && (
          <>
            <div className="flex gap-4 mb-6 flex-wrap">
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border p-2 rounded">
                <option value="asc">Сначала дешёвые</option>
                <option value="desc">Сначала дорогие</option>
              </select>

              <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
                <option value="all">Все категории</option>
                <option value="Кроссовки">Кроссовки</option>
                <option value="Футболки">Футболки</option>
                <option value="Куртки">Куртки</option>
              </select>

              <select value={filterSize} onChange={(e) => setFilterSize(e.target.value)} className="border p-2 rounded">
                <option value="all">Все размеры</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
                <option value="44">44</option>
              </select>

              <select value={filterColor} onChange={(e) => setFilterColor(e.target.value)} className="border p-2 rounded">
                <option value="all">Все цвета</option>
                <option value="Черный">Черный</option>
                <option value="Белый">Белый</option>
                <option value="Синий">Синий</option>
                <option value="Красный">Красный</option>
                <option value="Серый">Серый</option>
              </select>

              <input type="text" placeholder="Поиск..." value={search} onChange={(e) => setSearch(e.target.value)} className="border p-2 rounded flex-1" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="shadow-md cursor-pointer p-4 rounded-2xl bg-white hover:shadow-lg" onClick={() => setSelectedProduct(product)}>
                  <img loading="lazy" src={product.images[0]} alt={product.name} className="rounded-t-2xl w-full h-48 object-cover" />
                  <div className="p-4 flex flex-col gap-2">
                    <h2 className="font-semibold text-lg">{product.name}</h2>
                    <p className="text-gray-700">{product.price} ₽</p>
                    <p className="text-sm text-gray-500">Категория: {product.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {page === "home" && selectedProduct && (
          <section className="max-w-4xl mx-auto text-gray-700">
            <button className="flex items-center gap-2 mb-4 hover:underline" onClick={() => setSelectedProduct(null)}><ArrowLeft /> Назад</button>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {selectedProduct.images.map((img, idx) => (
                  <img key={idx} loading="lazy" src={img} alt={`${selectedProduct.name} ${idx + 1}`} className="mb-2 rounded-lg" />
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <p className="text-lg">Цена: {selectedProduct.price} ₽</p>

                <div>
                  <h3 className="font-semibold">Выберите размер:</h3>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.sizes.map(size => (
                      <button key={size} onClick={() => setSelectedSize(size)} className={`border px-2 py-1 rounded ${selectedSize === size ? 'bg-gray-200' : ''}`}>{size}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Выберите цвет:</h3>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.colors.map(color => (
                      <button key={color} onClick={() => setSelectedColor(color)} className={`border px-2 py-1 rounded ${selectedColor === color ? 'bg-gray-200' : ''}`}>{color}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Наличие:</h3>
                  <p>Уточняйте наличие товара в наших социальных сетях:</p>
                  <div className="flex gap-3 mt-2">
                    <a href="https://instagram.com/shop1" target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 bg-pink-500 text-whit_
