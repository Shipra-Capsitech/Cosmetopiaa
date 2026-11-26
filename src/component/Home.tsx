import About from "./About";
import Service from "./Service";
import Contact from "./Contact";
import Navbar from "./Navbar";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductType {
  id?: string | number;
  _id?: string | number;
  brand: string;
  name: string;
  price: string | number;
}

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQySz6c1rXXOmfVZEkrfAQIM2zZecmxXg4ZFxv7CCl97g&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQv3A32uZO9-wWiZaTEmjzsRIVW24FRNJZyVc-0photA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCzVtC-s6VtZo4qTJUt0_8UFV-E7LtBadFH1kMaig7cA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4t0SwrCvs1W3MP4nxWBbDTlmww45gF3zyc3zP_8_c6Q&s=10",
];

function Home() {
  const [current, setCurrent] = useState<number>(0);

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || "User";

  const [userProducts, setUserProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const previousSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (token) {
      setLoading(true);

      fetch("/Products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data: ProductType[]) => {
          setUserProducts(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(
            "Error fetching personalized products:",
            err
          );
          setLoading(false);
        });
    } else {
      setUserProducts([]);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {token ? (
        <main className="w-full max-w-7xl mx-auto px-6 mt-10">

          <div className="bg-pink-50 rounded-2xl p-6 md:p-8 border border-pink-100 shadow-sm mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome back,{" "}
              <span className="text-pink-600">
                {userName}
              </span>
              !
            </h1>

            <p className="text-gray-600 mt-2">
              Here are your curated updates and recommendations
              from your profile feed.
            </p>
          </div>

          <section className="mb-14">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Your Personalized Feed
            </h2>

            {loading ? (
              <div className="text-center py-10 text-gray-500">
                Fetching data from backend server...
              </div>
            ) : userProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProducts.map((product) => (
                  <div
                    key={product.id || product._id}
                    className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
                  >
                    <span className="text-xs font-bold tracking-wider text-pink-500 uppercase">
                      {product.brand}
                    </span>

                    <h3 className="text-lg font-medium text-gray-800 mt-1">
                      {product.name}
                    </h3>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-bold text-gray-900">
                        ₹{product.price}
                      </span>

                      <button className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition">
                        View Item
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-400">
                No items matching your profile preferences were found.
              </div>
            )}
          </section>
        </main>
      ) : (
        <section className="w-full max-w-7xl mx-auto px-6 mt-10">

          <div className="relative w-full h-[250px] md:h-[400px] rounded-2xl overflow-hidden group bg-white border border-gray-100 shadow-sm">

            <img
              src={images[current]}
              alt={`Slide ${current + 1}`}
              className="w-full h-full object-cover"
            />

            <button
              onClick={previousSlide}
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-pink-50"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <button
              onClick={nextSlide}
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-pink-50"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-7 bg-pink-600"
                    : "w-2 bg-pink-200"
                }`}
              />
            ))}
          </div>
        </section>
      )}

      <About />
      <Service />
      <Contact />
    </div>
  );
}

export default Home;