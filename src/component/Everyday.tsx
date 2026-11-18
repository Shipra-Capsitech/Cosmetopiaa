
import { useState, useEffect } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { message } from "antd";

interface Product {
  id: string;
  name: string;
  image?: string;
  imageUrl?: string;
  price: number;
  category: string;
  stock: boolean;
  left: number;
}

interface CartItem extends Product {
  quantity: number;
}

function Everyday() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================
  // GET PRODUCTS FROM BACKEND
  // ============================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get<Product[]>("/Product");

        // FILTER EVERYDAY CATEGORY
        const everydayProducts = response.data.filter(
          (product) =>
            product.category.trim().toLowerCase() === "everyday"
        );

        setProducts(everydayProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load Everyday products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ============================
  // ADD TO CART - LOCAL STORAGE
  // ============================
  const handleAddToCart = (product: Product) => {
    try {
      if (!product.stock || product.left <= 0) {
        alert("Product is out of stock");
        return;
      }

      // GET EXISTING CART
      const existingCart: CartItem[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      // CHECK EXISTING PRODUCT
      const existingProduct = existingCart.find(
        (item) => item.id === product.id
      );

      if (
        existingProduct &&
        existingProduct.quantity >= product.left
      ) {
        alert("Only limited stock available");
        return;
      }

      let updatedCart: CartItem[];

      if (existingProduct) {
        // INCREASE QUANTITY
        updatedCart = existingCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // ADD NEW PRODUCT
        updatedCart = [
          ...existingCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      }

      // SAVE CART IN LOCAL STORAGE
      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      // NOTIFY NAVBAR
      window.dispatchEvent(new Event("cartUpdated"));

      console.log("Cart saved:", updatedCart);

     message.success("Product added to cart sucesfully")
    } catch (error) {
      console.error("Cart Error:", error);
    message.error("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* OFFER BAR */}
      <div className="h-[52px] bg-[#111111] flex items-center justify-center">
        <p className="text-white text-sm font-semibold">
          ✦ FREE GIFT ON ORDERS ABOVE ₹799 ✦
        </p>
      </div>

      {/* NAVBAR */}
      <nav className="h-[82px] border-b border-gray-200 flex items-center px-[265px]">
        <div className="w-[260px]">
          <h1 className="text-[31px] font-light tracking-[-2px]">
            <Link
              to="/"
              className="text-3xl font-bold text-[#f84ea0] italic"
            >
              Cosmetopia
            </Link>
          </h1>
        </div>
      </nav>

      {/* MAIN */}
      <main className="w-[1000px] mx-auto">
        <section className="pt-[12px]">
          <h2 className="text-[31px] font-bold text-[#360099]">
            Everyday
          </h2>

          <p className="text-[13px] text-gray-700 mt-1">
            {products.length} Products
          </p>
        </section>

        {/* FILTER */}
        <div className="mt-[49px] mb-[27px] flex justify-between">
          <button
            type="button"
            className="text-[15px] font-medium"
          >
            ⚙ Filter
          </button>

          <button
            type="button"
            className="text-[14px]"
          >
            Sort by: Featured ⌄
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center mt-10">
            Loading products...
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-center text-red-500">
            {error}
          </p>
        )}

        {/* PRODUCT GRID */}
        {!loading && !error && (
          <div className="grid grid-cols-4 gap-[15px]">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 bg-white overflow-hidden"
              >
                {/* PRODUCT IMAGE */}
                <div className="h-[250px] bg-[#f5f5f5]">
                  <img
                    src={product.image || product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* PRODUCT DETAILS */}
                <div className="p-3">
                  <h3 className="text-[14px] font-semibold">
                    {product.name}
                  </h3>

                  {/* PRICE */}
                  <p className="text-[15px] font-bold mt-2">
                    ₹{product.price}
                  </p>

                  {/* STOCK */}
                  <p className="text-[12px] text-gray-500 mt-2">
                    Available: {product.left}
                  </p>

                  {/* STOCK STATUS */}
                  <p
                    className={`text-[12px] font-semibold mt-1 ${
                      !product.stock || product.left <= 0
                        ? "text-red-500"
                        : product.left <= 5
                        ? "text-orange-500"
                        : "text-green-600"
                    }`}
                  >
                    {!product.stock || product.left <= 0
                      ? "OUT OF STOCK"
                      : product.left <= 5
                      ? "LOW STOCK"
                      : "IN STOCK"}
                  </p>

                  {/* ADD TO CART */}
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    disabled={
                      !product.stock || product.left <= 0
                    }
                    className="w-full h-[39px] bg-[#e83f83] hover:bg-[#d82f72] text-white font-semibold text-[13px] mt-4 rounded-[5px] disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {product.stock && product.left > 0
                      ? "ADD TO CART"
                      : "OUT OF STOCK"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NO PRODUCTS */}
        {!loading && !error && products.length === 0 && (
          <p className="text-center mt-10">
            No Everyday products found.
          </p>
        )}
      </main>
    </div>
  );
}

export default Everyday;
