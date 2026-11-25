import Background from "../Background.png";

import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Contact() {
  return (
    <div className="w-full">

      <section
        className="relative min-h-[420px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >

        {/* CENTERED CONTAINER */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-24">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* LEFT */}
            <div className="text-center">

              <h2 className="text-2xl font-serif font-bold text-[#e84c9b]">
                Cosmetopia
              </h2>

              <p className="mt-2 mx-auto max-w-[280px] text-sm leading-5 text-gray-700">
                Good SKIN is important, so all of our products
                have been carefully designed to bring out the
                best in you.
              </p>

            </div>

            {/* CENTER */}
            <div className="text-center">

              <h2 className="text-2xl font-semibold text-gray-900">
                Keep In Touch
              </h2>

              <p className="mt-2 text-sm leading-5 text-gray-700">
                Subscribe to receive new product updates, be the
                first to know about sales, and more.
              </p>

              {/* EMAIL */}
              <div className="flex w-full max-w-md mx-auto mt-7 border-b border-gray-400 pb-2">

                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 min-w-0 bg-transparent outline-none text-sm text-gray-700"
                />

                <button className="font-semibold text-sm text-[#e84c9b]">
                  SUBSCRIBE
                </button>

              </div>

            </div>

            {/* RIGHT */}
            <div className="text-center md:text-left md:pl-8">

              <h3 className="text-base font-semibold text-gray-900 mb-4">
                MORE INFO
              </h3>

              <div className="space-y-2 text-sm text-gray-700">
                <p>Shipping & Delivery</p>
                <p>Refund Policy</p>
                <p>Partner Program</p>
                <p>Wholesale Portal</p>
                <p>You Buy, We Donate</p>
                <p>Privacy Policy</p>
                <p>Terms & Conditions</p>
              </div>

            </div>

          </div>

          {/* BOTTOM */}
          <div className="mt-16 border-t border-gray-300 pt-4 flex flex-wrap justify-between items-center gap-4">

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 text-gray-500">
              <FaInstagram size={15} />
              <FaFacebook size={15} />
              <FaTwitter size={15} />
              <FaPinterest size={15} />
              <FaYoutube size={15} />
            </div>

            {/* COPYRIGHT */}
            <p className="text-sm text-gray-700">
              © 2023,{" "}
              <span className="text-[#e84c9b]">
                COSMETOPEA
              </span>
              . Powered by Shopify
            </p>

          </div>

        </div>
      </section>
    </div>
  );
}

export default Contact;