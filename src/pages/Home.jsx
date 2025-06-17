import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const Home = () => {
    const [recentQueries, setRecentQueries] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/queries')
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setRecentQueries(sorted.slice(0, 6));
            });
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }}
                modules={[Autoplay]}
                className="rounded-xl overflow-hidden my-4 sm:my-6">
                
                <SwiperSlide>
                    <div className="relative w-full min-h-[250px] max-h-[450px] sm:min-h-[300px] lg:min-h-[400px] bg-cover bg-center" style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1665686310429-ee43624978fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`}}>

                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                        <div className="absolute inset-y-0 left-0 flex items-center px-2 sm:px-4 md:px-6 lg:px-8">
                            <div className="text-white max-w-md sm:max-w-lg space-y-2 sm:space-y-4">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Shop Smarter, Not Harder</h2>
                                <p className="text-sm sm:text-base md:text-lg">Discover what real users recommend — for your next big purchase.</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative w-full min-h-[250px] max-h-[450px] sm:min-h-[300px] lg:min-h-[400px] bg-cover bg-center" style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1722153297252-8fb1645f5bfb?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`}}>

                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                        <div className="absolute inset-y-0 left-0 flex items-center px-2 sm:px-4 md:px-6 lg:px-8">
                            <div className="text-white max-w-md sm:max-w-lg space-y-2 sm:space-y-4">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Compare Before You Buy</h2>
                                <p className="text-sm sm:text-base md:text-lg">See side-by-side recommendations based on your own needs.</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div
                        className="relative w-full min-h-[250px] max-h-[450px] sm:min-h-[300px] lg:min-h-[400px] bg-cover bg-center" style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1524289286702-f07229da36f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`}}>

                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

                        <div className="absolute inset-y-0 left-0 flex items-center px-2 sm:px-4 md:px-6 lg:px-8">

                            <div className="text-white max-w-md sm:max-w-lg space-y-2 sm:space-y-4">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Find the Right Tech for You</h2>
                                <p className="text-sm sm:text-base md:text-lg">Phones, watches, accessories — trusted reviews, real feedback.</p>
                            </div>

                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            <section className="my-8 sm:my-12 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-6 sm:py-8 md:py-12 px-2 sm:px-4 md:px-6 rounded-xl shadow-inner">

                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 mb-4 sm:mb-6 md:mb-10">
                    Recent Queries
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
                    {recentQueries.map(query => (
                        <div key={query._id} className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 hover:shadow-2xl hover:scale-[1.02] transition duration-300 border border-blue-100">

                            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-blue-800">{query.queryTitle}</h3>
                            <p className="text-gray-700 text-xs sm:text-sm md:text-base mb-1">
                                <strong>Product:</strong> {query.productName}
                            </p>
                            <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-4">By {query.userName}</p>

                            <Link
                                to={`/query-details/${query._id}`}
                                className="inline-block text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 px-3 sm:px-4 py-1 sm:py-2 rounded-full hover:brightness-110 transition">View Details →
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-gradient-to-br from-blue-50 to-purple-100 p-4 sm:p-6 md:p-10 rounded-xl my-8 sm:my-12 animate__animated animate__fadeInUp">

                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-4 sm:mb-6 md:mb-10 text-center">How It Works</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-8">
                    <div className="p-3 sm:p-4 md:p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
                        <img src="https://cdn-icons-png.flaticon.com/512/4743/4743097.png" className="w-10 sm:w-12 md:w-16 mx-auto mb-2 sm:mb-4" alt="Step 1" />
                        <h4 className="font-bold text-sm sm:text-base md:text-lg">1. Post a Query</h4>
                        <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">Describe your issue or question about a product.</p>
                    </div>

                    <div className="p-3 sm:p-4 md:p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
                        <img src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png" className="w-10 sm:w-12 md:w-16 mx-auto mb-2 sm:mb-4" alt="Step 2" />
                        <h4 className="font-bold text-sm sm:text-base md:text-lg">2. Get Recommendations</h4>
                        <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">Others recommend better alternatives with reasons.</p>
                    </div>

                    <div className="p-3 sm:p-4 md:p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
                        <img src="https://cdn-icons-png.flaticon.com/512/4436/4436481.png" className="w-10 sm:w-12 md:w-16 mx-auto mb-2 sm:mb-4" alt="Step 3" />
                        <h4 className="font-bold text-sm sm:text-base md:text-lg">3. Decide Smarter</h4>
                        <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">Choose the product that fits you best with real feedback.</p>
                    </div>

                </div>
            </section>

            <section className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 sm:p-6 md:p-10 rounded-xl my-8 sm:my-12 animate__animated animate__fadeInRight">

                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-4 sm:mb-6 md:mb-8 text-center">What Users Say</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 md:gap-8">
                    <div className="bg-white shadow-md p-3 sm:p-4 md:p-6 rounded-lg">
                        <p className="text-gray-700 italic text-xs sm:text-sm md:text-base">“PickBetter helped me avoid a terrible laptop purchase. The community feedback is gold.”</p>
                        <p className="text-right mt-2 sm:mt-4 font-semibold text-blue-600 text-xs sm:text-sm md:text-base">— Rafi, Student</p>
                    </div>

                    <div className="bg-white shadow-md p-3 sm:p-4 md:p-6 rounded-lg">
                        <p className="text-gray-700 italic text-xs sm:text-sm md:text-base">“The product recommendations are practical and based on real problems. Truly helpful!”</p>
                        <p className="text-right mt-2 sm:mt-4 font-semibold text-blue-600 text-xs sm:text-sm md:text-base">— Sarah, Freelancer</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;