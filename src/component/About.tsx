const categories = [
  {
    id: 1,
    name: "Lips",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY1r15dyLLDdcJIGNDPn6BsS97drM3dFuA5qU2EKzhSg&s",
    link: "/Lips",
  },
  {
    id: 2,
    name: "Eyes",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxgWUcy9hD9u6MUlwFE-_t_WvpKnoZwCTu598QaxogwA&s",
    link: "/Eyes",
  },
  {
    id: 3,
    name: "Face",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb5Zy8XrmipvAknRMrUG1J_ltOrSx27wIK1587tiESXg&s=10",
    link: "/Face",
  },
  {
    id: 4,
    name: "Hair",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr0ry5RvZx_lyyFjWZ7EWexlNDx2KpdilZpaWilJpKZw&s=10",
    link: "/Hair",
  },
  {
    id: 5,
    name: "Fragrance",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNGuGajmrPTmxnMQyT0zo8A3WP4DDyaJJsWr9TEjdg_A&s=10",
    link: "/Fragrance",
  },
  {
    id: 6,
    name: "Everyday",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxW6z_CBsg1SyhbmhFVYdcX5eFbiq5GKLyRkJRrRbAKA&s",
    link: "/Everyday",
  },
];

function About() {
  return (
    <div className="bg-white">

      {/* OUR PRODUCTS ARE */}
      <section className="py-14">
        <div className="w-full max-w-7xl mx-auto px-6">

          <h1 className="font-bold text-2xl md:text-3xl text-[#2B007B] mb-8">
            OUR PRODUCTS ARE
          </h1>

          <div className="flex flex-wrap justify-center gap-8">

            {categories.map((product) => (
              <div
                key={product.id}
                className="w-36 sm:w-40 text-center"
              >
                <a href={product.link} className="block">

                  <div className="w-full h-36 sm:h-40 bg-pink-50 rounded-lg overflow-hidden flex items-center justify-center hover:shadow-lg transition-shadow">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h2 className="mt-3 text-base font-bold text-[#2B007B]">
                    {product.name}
                  </h2>

                </a>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* OUR PRODUCTS */}
      <section className="py-10">
        <div className="w-full max-w-7xl mx-auto px-6">

          <h1 className="font-bold text-3xl text-[#2B007B] mb-8">
            Our Products
          </h1>

          <div className="flex flex-wrap justify-center gap-6">

            {categories.map((category) => (
              <a
                href={category.link}
                key={category.id}
                className="w-36 h-40 rounded-2xl bg-gradient-to-b from-[#eadcf4] to-[#f8f8ed] p-3 overflow-hidden hover:shadow-md transition duration-300 cursor-pointer block"
              >

                <div className="w-full h-8 bg-white rounded-lg flex items-center justify-center mb-2">
                  <h2 className="text-sm font-medium text-black">
                    {category.name}
                  </h2>
                </div>

                <div className="h-28 flex items-center justify-center overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

              </a>
            ))}

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-gray-50 py-14">
        <div className="w-full max-w-7xl mx-auto px-6">

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Why Choose Cosmetopia?
          </h2>

          <div className="flex flex-wrap justify-center gap-8">

            <div className="w-64 text-center">
              <div className="text-4xl mb-4">💄</div>

              <h3 className="font-bold text-lg mb-2">
                Premium Products
              </h3>

              <p className="text-gray-600 text-sm">
                Carefully selected beauty products for you.
              </p>
            </div>

            <div className="w-64 text-center">
              <div className="text-4xl mb-4">🌸</div>

              <h3 className="font-bold text-lg mb-2">
                Natural Beauty
              </h3>

              <p className="text-gray-600 text-sm">
                Products designed to enhance your natural beauty.
              </p>
            </div>

            <div className="w-64 text-center">
              <div className="text-4xl mb-4">✨</div>

              <h3 className="font-bold text-lg mb-2">
                Quality You Trust
              </h3>

              <p className="text-gray-600 text-sm">
                Beauty essentials with quality you can rely on.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* OFFER BANNER */}
      <section className="py-12">
        <div className="w-full max-w-7xl mx-auto px-6">

          <div className="bg-[#f98abb] rounded-2xl p-8 md:p-10 text-center text-white">

            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Get 20% Off Your First Order
            </h2>

            <p className="mb-6">
              Discover your new beauty favorites today.
            </p>

            <a
              href="/Shop"
              className="inline-block bg-white text-[#f84ea0] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              EXPLORE PRODUCTS
            </a>

          </div>
        </div>
      </section>

    </div>
  );
}

export default About;