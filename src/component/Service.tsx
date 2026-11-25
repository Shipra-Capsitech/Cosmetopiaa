import Dior from "../Dior.png";
import Product1 from "../Product1.png";
import Product2 from "../Product2.png";
import Product3 from "../Product3.png";

import {
  Truck,
  BadgeCheck,
  CreditCard,
} from "lucide-react";

function Service() {
  return (
    <section className="w-full bg-white">

      {/* ================= SERVICE SECTION ================= */}
      <div className="w-full max-w-7xl mx-auto px-6 py-16">

        <div className="min-h-[600px] grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

          {/* LEFT SIDE */}
          <div className="relative w-full max-w-xl h-[500px] mx-auto">

            {/* PINK BACKGROUND */}
            <div className="absolute left-0 top-0 w-[75%] h-full bg-[#fff0f4] rounded-lg"></div>

            {/* IMAGE */}
            <img
              src={Dior}
              alt="Cosmetic"
              className="absolute top-12 left-[20%] w-[75%] h-[85%] object-cover rounded-lg"
            />

          </div>

          {/* RIGHT SIDE */}
          <div className="w-full text-[#292929]">

            <h1 className="text-3xl md:text-4xl font-bold tracking-[2px] leading-[1.4] mb-6">
              TAKE CARE OF
              <br />
              YOUR OWN SKIN
            </h1>

            <p className="text-sm leading-6 text-gray-700 mb-5 max-w-md">
              Lorem ipsum dolor sit amet consectetur. Nulla neque ullamcorper ut
              arcu scelerisque.
            </p>

            <p className="text-sm leading-6 text-gray-700 mb-5 max-w-md">
              Lorem ipsum dolor sit amet consectetur. Nulla neque ullamcorper
              ut arcu scelerisque.
            </p>

            <p className="text-sm leading-6 text-gray-700 mb-6">
              Made in New Zealand from local and imported ingredients.
            </p>

            <button className="border-2 border-[#ed4c9a] rounded-lg px-8 py-3 text-sm font-medium text-[#292929] hover:bg-[#ed4c9a] hover:text-white transition">
              BROWSE OUR RANGE
            </button>

          </div>
        </div>
      </div>

      {/* ================= NEW COLLECTION SECTION ================= */}
      <section className="w-full py-16 bg-white">

        <div className="w-full max-w-7xl mx-auto px-6">

          {/* HEADING */}
          <div className="flex flex-wrap justify-between items-start gap-4 mb-8">

            <h2 className="text-3xl font-bold text-[#292929] leading-[1.4]">
              New Collections of
              <br />
              Cosmetopia
            </h2>

            <button className="mt-3 text-xs font-semibold text-[#ed4c9a] hover:underline">
              VIEW ALL PRODUCTS →
            </button>

          </div>

          {/* PRODUCT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* PRODUCT 1 */}
            <div>
              <div className="w-full h-[238px] rounded-md overflow-hidden">
                <img
                  src={Product1}
                  alt="Beauty Cream"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-3 text-xs font-semibold tracking-[1.5px] text-[#292929]">
                BEAUTY CREAM (COMBO 2)
              </p>

              <div className="flex gap-2 mt-1">
                <span className="text-xs text-[#ed4c9a]">
                  $39.95
                </span>

                <span className="text-xs text-gray-400 line-through">
                  $199.75
                </span>
              </div>
            </div>

            {/* PRODUCT 2 */}
            <div>
              <div className="w-full h-[238px] rounded-md overflow-hidden">
                <img
                  src={Product2}
                  alt="Beauty Serum"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-3 text-xs font-semibold tracking-[1.5px] text-[#292929]">
                BEAUTY SERUM (BEST COMBO)
              </p>

              <div className="flex gap-2 mt-1">
                <span className="text-xs text-[#ed4c9a]">
                  $134.95
                </span>

                <span className="text-xs text-gray-400 line-through">
                  $199.75
                </span>
              </div>
            </div>

            {/* PRODUCT 3 */}
            <div>
              <div className="w-full h-[238px] rounded-md overflow-hidden">
                <img
                  src={Product3}
                  alt="Super Fresh Scent"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-3 text-xs font-semibold tracking-[1.5px] text-[#292929]">
                SUPER FRESH SCENT
              </p>

              <div className="flex gap-2 mt-1">
                <span className="text-xs text-[#ed4c9a]">
                  $39.95
                </span>

                <span className="text-xs text-gray-400 line-through">
                  $199.75
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= BEST SELLING ================= */}
      <section className="w-full pt-10 pb-20">

        <div className="w-full max-w-7xl mx-auto px-6">

          {/* HEADING */}
          <div className="mb-8">

            <h2 className="text-2xl font-bold text-[#292929]">
              Our Best Selling Products
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <p className="text-xs text-gray-500">
              Aenean commodo ligula eget dolor.
            </p>

          </div>

          {/* PRODUCTS LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-[1.7fr_0.8fr] gap-4">

            {/* BIG PRODUCT */}
            <div className="relative h-[300px] rounded-md overflow-hidden group">

              <img
                src={Product1}
                alt="Best Selling Product"
                className="w-full h-full object-cover"
              />

              {/* BUTTONS */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">

                <button className="bg-[#ed4c9a] text-white text-xs font-semibold px-6 py-2 rounded-sm hover:bg-[#d93b88] transition">
                  BUY NOW
                </button>

                <button className="bg-white text-[#ed4c9a] text-xs font-semibold px-5 py-2 rounded-sm hover:bg-[#ed4c9a] hover:text-white transition">
                  ADD TO CART
                </button>

              </div>

            </div>

            {/* RIGHT PRODUCTS */}
            <div className="flex flex-col gap-4">

              {/* PRODUCT 2 */}
              <div className="h-[143px] rounded-md overflow-hidden">
                <img
                  src={Product2}
                  alt="Beauty Product"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* PRODUCT 3 */}
              <div className="h-[143px] rounded-md overflow-hidden">
                <img
                  src={Product3}
                  alt="Beauty Product"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= BEST SERVICES ================= */}
      <section className="w-full pb-20">

        <div className="w-full max-w-7xl mx-auto px-6">

          {/* HEADING */}
          <div className="mb-10">

            <h2 className="text-2xl font-bold text-[#292929]">
              Our Best Services
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <p className="text-xs text-gray-500">
              Aenean commodo ligula eget dolor.
            </p>

          </div>

          {/* SERVICES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* WORLDWIDE SHIPPING */}
            <div className="text-center">

              <div className="flex justify-center mb-4">
                <div className="relative">

                  <div className="absolute w-9 h-9 bg-[#fff0f4] rounded-full -right-2 -top-1"></div>

                  <Truck
                    size={27}
                    className="relative text-[#292929]"
                  />

                </div>
              </div>

              <h3 className="text-xs font-semibold text-[#292929]">
                WORLDWIDE SHIPPING
              </h3>

              <p className="text-xs text-gray-500 mt-2 leading-4">
                Lorem ipsum dolor sit amet, consectetur
                <br />
                adipiscing elit. Aenean
              </p>

            </div>

            {/* 30 DAYS GUARANTEE */}
            <div className="text-center">

              <div className="flex justify-center mb-4">
                <div className="relative">

                  <div className="absolute w-9 h-9 bg-[#fff0f4] rounded-full -right-2 -top-1"></div>

                  <BadgeCheck
                    size={27}
                    className="relative text-[#292929]"
                  />

                </div>
              </div>

              <h3 className="text-xs font-semibold text-[#292929]">
                30 DAYS GUARANTEE
              </h3>

              <p className="text-xs text-gray-500 mt-2 leading-4">
                Lorem ipsum dolor sit amet, consectetur
                <br />
                adipiscing elit. Aenean
              </p>

            </div>

            {/* SECURED PAYMENTS */}
            <div className="text-center">

              <div className="flex justify-center mb-4">
                <div className="relative">

                  <div className="absolute w-9 h-9 bg-[#fff0f4] rounded-full -right-2 -top-1"></div>

                  <CreditCard
                    size={27}
                    className="relative text-[#292929]"
                  />

                </div>
              </div>

              <h3 className="text-xs font-semibold text-[#292929]">
                SECURED PAYMENTS
              </h3>

              <p className="text-xs text-gray-500 mt-2 leading-4">
                Lorem ipsum dolor sit amet, consectetur
                <br />
                adipiscing elit. Aenean
              </p>

            </div>

          </div>
        </div>
      </section>

    </section>
  );
}

export default Service;