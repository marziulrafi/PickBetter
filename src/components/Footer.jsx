import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-10 px-6 sm:px-12 mt-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                <div>
                    <h2 className="text-2xl font-bold text-white">PickBetter</h2>
                    <p className="mt-3 text-sm text-gray-400">
                        Your trusted place to get the best recommendations from real people.
                        Share, explore, and pick better every time!
                    </p>
                </div>


                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                        <li><Link to="/queries" className="hover:text-white transition">Queries</Link></li>
                        <li><Link to="/add-query" className="hover:text-white transition">Add Query</Link></li>
                        <li><Link to="#" className="hover:text-white transition">About Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><Link to="#" className="hover:text-white transition">Contact</Link></li>
                        <li><Link to="#" className="hover:text-white transition">FAQs</Link></li>
                        <li><Link to="#" className="hover:text-white transition">Terms & Conditions</Link></li>
                        <li><Link to="#" className="hover:text-white transition">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/marziulkarim" target="_blank" className="bg-gray-700 hover:bg-blue-500 p-3 rounded-full transition"><FaFacebookF /></a>
                        <a href="https://www.linkedin.com/in/marziulkarim/" target="_blank" className="bg-gray-700 hover:bg-sky-400 p-3 rounded-full transition"><FaLinkedinIn /></a>
                        <a href="https://x.com/_marziul_" target="_blank" className="bg-gray-700 hover:bg-blue-700 p-3 rounded-full transition"><FaTwitter /></a>
                    </div>
                </div>

            </div>

            <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} PickBetter. All rights reserved.
            </div>
        </footer>
    );
}
