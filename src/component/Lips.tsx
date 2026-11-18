
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
}

interface CartItem extends Product {
  quantity: number;
}

function Lips() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [addingProductId, setAddingProductId] = useState<string | null>(
    null
  );

  // ==================================
  // GET PRODUCTS FROM BACKEND
  // ==================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get<Product[]>("/Product");

        const lipsProducts = response.data.filter((product) =>
          [
            "lips",
            "lipstick",
            "lip gloss",
            "lip balm",
            "lip tint",
            "lip liner",
            "lip oil",
          ].includes(product.category?.trim().toLowerCase())
        );

        setProducts(lipsProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ==================================
  // ADD PRODUCT TO MONGODB CART
  // ==================================

  const handleAddToCart = async (product: Product) => {
    try {
      setAddingProductId(product.id);

      // Product data for backend
      const cartData = {
        productId: product.id,
        productName: product.name,
        imageUrl: product.imageUrl || product.image || "",
        unitPrice: product.price,
        quantity: 1,
        totalPrice: product.price,
      };

      // Save product in MongoDB
      const response = await API.post("/Cart", cartData);

      console.log("MongoDB Cart Response:", response.data);

      // Get existing local cart
      const existingCart: CartItem[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      // Check if product already exists
      const existingProduct = existingCart.find(
        (item) => item.id === product.id
      );

      let updatedCart: CartItem[];

      if (existingProduct) {
        updatedCart = existingCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        updatedCart = [
          ...existingCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      }

      // Save in LocalStorage after API success
      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      // Update cart count in navbar
      window.dispatchEvent(new Event("cartUpdated"));

      message.success("Product added to cart successfully!");
    } catch (error: any) {
      console.error(
        "Add to cart error:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        message.error("Please login before adding products to cart");
      } else {
        message.error(
          error.response?.data?.message ||
          "Failed to save product in database"
        );
      }
    } finally {
      setAddingProductId(null);
    }
  };

  // ==================================
  // UI
  // ==================================

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

        {/* PAGE TITLE */}

        <section className="pt-[12px]">
          <h2 className="text-[31px] font-bold text-[#360099]">
            Lips
          </h2>

          <p className="text-[13px] text-gray-700 mt-1">
            {products.length} Products
          </p>
        </section>

        {/* FILTER */}

        <div className="mt-[49px] mb-[27px] flex justify-between">
          <button className="text-[15px] font-medium">
            ⚙ Filter
          </button>

          <button className="text-[14px]">
            Sort by: Featured ⌄
          </button>
        </div>

        {/* LOADING */}

        {loading && (
          <p className="text-center py-10">
            Loading products...
          </p>
        )}

        {/* ERROR */}

        {error && (
          <p className="text-center text-red-500 py-10">
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

                  <p className="text-[15px] font-bold mt-2">
                    ₹{product.price}
                  </p>

                  {/* ADD TO CART */}

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={addingProductId === product.id}
                    className="w-full h-[39px] bg-[#e83f83] hover:bg-[#d82f72] disabled:bg-gray-400 text-white font-semibold text-[13px] mt-4 rounded-[5px]"
                  >
                    {addingProductId === product.id
                      ? "ADDING..."
                      : "ADD TO CART"}
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

        {/* NO PRODUCTS */}

        {!loading && !error && products.length === 0 && (
          <p className="text-center mt-10">
            No Lips products found
          </p>
        )}

      </main>
    </div>
  );
}

export default Lips;
