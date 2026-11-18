import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { getCart, saveCart, type CartItem } from "../utils/cart";
import { message } from "antd";

interface Product {
  id: string;
  name: string;
  image?: string;
  imageUrl?: string;
  price: number;
  category: string;
  stock?: boolean;
  left?: number;
}

function Face() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ==========================
  // GET FRAGRANCE PRODUCTS
  // ==========================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await API.get<Product[]>("/Product");
        const faceProducts = response.data.filter((product) =>
          [
            "face",
            "foundation",
            "concealer",
            "face primer",
            "blush",
            "contour",
            "bronzer",
            "highlighter",
            "compact powder",
            "setting powder",
            "loose powder",
            "face powder",
            "setting spray",
            "bb cream",
            "cc cream",
            "face tint",
            "skin tint",
            "makeup kit",
          ].includes(product.category.trim().toLowerCase()),
        );

        setProducts(faceProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load fragrance products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ==========================
  // ADD TO CART
  // ==========================
  const handleAddToCart = (product: Product) => {
    try {
      const existingCart: CartItem[] = getCart();

      const existingProduct = existingCart.find(
        (item) => item.id === product.id,
      );

      let updatedCart: CartItem[];

      if (existingProduct) {
        // INCREASE QUANTITY
        updatedCart = existingCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      } else {
        // ADD NEW PRODUCT
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          image: product.image || product.imageUrl || "",
          price: product.price,
          quantity: 1,
        };

        updatedCart = [...existingCart, newItem];
      }

      // SAVE CART
      saveCart(updatedCart);

      message.success("Product added to cart sucesfully");
    } catch (error) {
      console.error("Cart Error:", error);
      message.error("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* OFFER BAR */}
      <div className="h-[52px] bg-[#111111] flex items-center justify-center"></div>

      {/* NAVBAR */}
      <nav className="h-[82px] border-b border-gray-200 flex items-center px-[265px]">
        <div className="w-[260px]">
          <h1 className="text-[31px] font-light tracking-[-2px]">
            <Link to="/" className="text-3xl font-bold text-[#f84ea0] italic">
              Cosmetopia
            </Link>
          </h1>
        </div>
      </nav>

      {/* MAIN */}
      <main className="w-[1000px] mx-auto">
        <section className="pt-[12px]">
          <h2 className="text-[31px] font-bold text-[#360099]">Face</h2>

          <p className="text-[13px] text-gray-700 mt-1">
            {products.length} Products
          </p>
        </section>

        {/* FILTER AND SORT */}
        <div className="mt-[49px] mb-[27px] flex justify-between">
          <button className="text-[15px] font-medium">⚙ Filter</button>

          <button className="text-[14px]">Sort by: Featured ⌄</button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center mt-10">Loading face products...</p>
        )}

        {/* ERROR */}
        {error && <p className="text-center text-red-500 mt-10">{error}</p>}

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
                    src={product.image || product.imageUrl || ""}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* PRODUCT DETAILS */}
                <div className="p-3">
                  <h3 className="text-[14px] font-semibold">{product.name}</h3>

                  <p className="text-[15px] font-bold mt-2">₹{product.price}</p>

                  {/* ADD TO CART BUTTON */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={
                      product.stock === false ||
                      (product.left !== undefined && product.left <= 0)
                    }
                    className="w-full h-[39px] bg-[#e83f83] hover:bg-[#d82f72] text-white font-semibold text-[13px] mt-4 rounded-[5px] disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {product.stock === false ||
                    (product.left !== undefined && product.left <= 0)
                      ? "OUT OF STOCK"
                      : "ADD TO CART"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NO PRODUCTS */}
        {!loading && !error && products.length === 0 && (
          <p className="text-center mt-10">No Face products found</p>
        )}
      </main>
    </div>
  );
}

export default Face;
