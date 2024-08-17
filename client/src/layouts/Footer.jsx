import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 text-sm md:text-md  md:mx-auto md:grid-cols-4 gap-8">
          {/* Section 1: Customer Service */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Get to Know Us</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Press Releases
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Bazaarify Cares
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Gift a Smile
                </a>
              </li>
            </ul>
          </div>

          {/* Section 2: Make Money with Us */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Make Money with Us</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Sell on Bazaarify
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sell under Our Brand
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Become an Affiliate
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Advertise Your Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Fulfillment by Bazaarify
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Payment Methods */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Payment Methods</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Credit/Debit Cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Internet Banking
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  EMI Options
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pay on Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Bazaarify Pay Balance
                </a>
              </li>
            </ul>
          </div>

          {/* Section 4: Let Us Help You */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Let Us Help You</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Your Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Returns Centre
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  100% Purchase Protection
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Bazaarify App Download
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Social Media and Legal Info */}
        <div className="mt-8 text-center">
          <div className="space-x-10 mb-4 flex justify-center ">
            <a href="#" className="">
              <FaFacebook className="text-4xl text-slate-500  hover:text-white " />
            </a>
            <a href="#" className="hover:underline">
              <FaInstagramSquare className="text-4xl text-slate-500  hover:text-white" />
            </a>
            <a href="#" className="hover:underline ">
              <FaLinkedin className="text-4xl text-slate-500 hover:text-white" />
            </a>
          </div>
          <p className="mb-4 text-sm">© 2024 Bazaarify. All Rights Reserved.</p>
          <div className="space-x-4">
            <a href="#" className="hover:underline text-sm">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline text-sm">
              Terms of Use
            </a>
            <a href="#" className="hover:underline text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
