const categories = [
  {
    id: 1,
    name: "Lips",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY1r15dyLLDdcJIGNDPn6BsS97drM3dFuA5qU2EKzhSg&s",
    link: "/lips",
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
    <div className="bg-white min-h-screen">

      {/* ================= PRODUCT SECTION ================= */}
      <section className="py-14 px-20">

        {/* Heading */}
        <h1 className="font-bold text-3xl m-5 text-[#2B007B]">
          OUR PRODUCTS ARE
        </h1>

        {/* Product List */}
        <div className="flex justify-start p-20 gap-10">

          {categories.map((product) => (
            <div
              key={product.id}
              className="w-56 text-center"
            >
              <a
                href={product.link}
                className="block"
              >
                {/* Product Image */}
                <div className="w-56 h-56 bg-pink-100 rounded-lg overflow-hidden flex items-center justify-center hover:shadow-lg transition-shadow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Name */}
                <h2 className="mt-4 text-xl font-bold text-[#2B007B]">
                  {product.name}
                </h2>
              </a>
            </div>
          ))}

        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-10 px-20">

        {/* Heading */}
        <h1 className="font-bold text-4xl text-[#2B007B] mb-8">
          Our Products
        </h1>

        {/* Category Cards */}
        <div className="flex justify-center gap-16">

          {categories.map((category) => (
            <a
              href={category.link}
              key={category.id}
              className="
                w-[184px]
                h-[173px]
                rounded-2xl
                bg-gradient-to-b
                from-[#eadcf4]
                to-[#f8f8ed]
                p-3
                overflow-hidden
                hover:shadow-md
                transition
                duration-300
                cursor-pointer
                block
              "
            >

              {/* Category Name */}
              <div
                className="
                  w-full
                  h-10
                  bg-white
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  mb-2
                "
              >
                <h2 className="text-lg font-medium text-black">
                  {category.name}
                </h2>
              </div>

              {/* Category Image */}
              <div className="h-[105px] flex items-end justify-center overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="max-w-[130px] max-h-[105px] object-contain"
                />
              </div>

            </a>
          ))}

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-gray-50 py-14 px-20">

        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Cosmetopia?
        </h2>

        <div className="flex justify-center gap-10">

          {/* Card 1 */}
          <div className="w-64 text-center">
            <div className="text-4xl mb-4">
              💄
            </div>

            <h3 className="font-bold text-xl mb-2">
              Premium Products
            </h3>

            <p className="text-gray-600">
              Carefully selected beauty products for you.
            </p>
          </div>

          {/* Card 2 */}
          <div className="w-64 text-center">
            <div className="text-4xl mb-4">
              🌸
            </div>

            <h3 className="font-bold text-xl mb-2">
              Natural Beauty
            </h3>

            <p className="text-gray-600">
              Products designed to enhance your natural beauty.
            </p>
          </div>

          {/* Card 3 */}
          <div className="w-64 text-center">
            <div className="text-4xl mb-4">
              ✨
            </div>

            <h3 className="font-bold text-xl mb-2">
              Quality You Trust
            </h3>

            <p className="text-gray-600">
              Beauty essentials with quality you can rely on.
            </p>
          </div>

        </div>
      </section>

      {/* ================= OFFER BANNER ================= */}
      <section className="py-12">

        <div
          className="
            mx-20
            bg-[#f98abb]
            rounded-2xl
            p-10
            text-center
            text-white
          "
        >

          <h2 className="text-4xl font-bold mb-3">
            Get 20% Off Your First Order
          </h2>

          <p className="mb-6 text-lg">
            Discover your new beauty favorites today.
          </p>

          <a
            href="/Shop"
            className="
              inline-block
              bg-white
              text-[#f84ea0]
              px-8
              py-3
              rounded-full
              font-semibold
              hover:bg-gray-100
              transition
            "
          >
            EXPLORE PRODUCTS
          </a>

        </div>

      </section>

    </div>
  );
}

export default About;