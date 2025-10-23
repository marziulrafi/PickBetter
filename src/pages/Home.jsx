import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Stats from '../components/Stats';
import { toast } from 'react-toastify';

const Home = () => {
    const [recentQueries, setRecentQueries] = useState([]);

    useEffect(() => {

        const fetchRecentQueries = async () => {
            try {

                const res = await fetch('https://pick-better-server.vercel.app/queries/recent');

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();

                setRecentQueries(data);
            } catch (error) {
                console.error('Error fetching recent queries:', error);

            }
        };

        fetchRecentQueries();
    }, []);

    const copyQueryLink = async (queryId) => {
        const queryUrl = `${window.location.origin}/query-details/${queryId}`;
        try {
            await navigator.clipboard.writeText(queryUrl);
            toast.success('Query link copied to clipboard!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (err) {
            console.error('Failed to copy: ', err);
            toast.error('Failed to copy link', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Autoplay]}
                className="rounded-xl overflow-hidden my-4 sm:my-6">

                <SwiperSlide>
                    <div className="relative w-full min-h-[250px] max-h-[450px] sm:min-h-[300px] lg:min-h-[400px] bg-cover bg-center" style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1665686310429-ee43624978fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
                    }}>

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
                        backgroundImage: `url('https://images.unsplash.com/photo-1722153297252-8fb1645f5bfb?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
                    }}>

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
                            backgroundImage: `url('https://images.unsplash.com/photo-1524289286702-f07229da36f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
                        }}>

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

            <section className="my-8 sm:my-12 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 py-6 sm:py-8 md:py-12 px-2 sm:px-4 md:px-6 rounded-xl shadow-inner transition-colors duration-300">

                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-300 dark:to-purple-300 mb-4 sm:mb-6 md:mb-10">
                    Recent Queries
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recentQueries.length > 0 ? (
                        recentQueries.slice(0, 4).map(query => (
                            <div
                                key={query._id}
                                className="bg-white dark:bg-gray-700 flex flex-col justify-between rounded-2xl shadow-lg p-4 hover:shadow-2xl transition duration-300 border border-blue-100 dark:border-gray-600 h-full"
                            >
                                <div>
                                    <img
                                        src={query.imageUrl || "https://via.placeholder.com/300x200.png?text=No+Image"}
                                        alt={query.queryTitle}
                                        className="w-full h-40 object-cover rounded-lg mb-3"
                                    />

                                    <h3 className="text-base sm:text-lg font-bold text-blue-800 dark:text-blue-200 mb-1">
                                        {query.queryTitle}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                                        {query.reason?.slice(0, 80)}...
                                    </p>

                                    <p className="text-gray-400 dark:text-gray-400 text-xs mb-3">
                                        Product: <span className="font-medium text-gray-600 dark:text-gray-300">{query.productName}</span>
                                    </p>
                                </div>

                                <div className="flex gap-2 mt-auto">
                                    <Link
                                        to={`/query-details/${query._id}`}
                                        className="flex-1 text-center text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full hover:brightness-110 transition"
                                    >
                                        Details
                                    </Link>
                                    
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">No recent queries available.</p>
                    )}
                </div>

                <div>
                    <Link to='/queries' className='text-center flex justify-center mt-6 btn text-xl font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -mb-2'>See All</Link>
                </div>
            </section>



            <section className="bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-4 sm:p-6 md:p-10 rounded-xl my-8 sm:my-12 animate__animated animate__fadeInUp transition-colors duration-300" data-aos="zoom-in">

                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-300 mb-4 sm:mb-6 md:mb-10 text-center">How It Works</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-8">
                    <div className="p-3 sm:p-4 md:p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition">
                        <img src="https://cdn-icons-png.flaticon.com/512/4743/4743097.png" className="w-10 sm:w-12 md:w-16 mx-auto mb-2 sm:mb-4" alt="Post a Query" />
                        <h4 className="font-bold text-sm sm:text-base md:text-lg dark:text-white">1. Post a Query</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">Describe your issue or question about a product.</p>
                    </div>

                    <div className="p-3 sm:p-4 md:p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition">
                        <img src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png" className="w-10 sm:w-12 md:w-16 mx-auto mb-2 sm:mb-4" alt="Get Recommendations" />
                        <h4 className="font-bold text-sm sm:text-base md:text-lg dark:text-white">2. Get Recommendations</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">Others recommend better alternatives with reasons.</p>
                    </div>

                    <div className="p-3 sm:p-4 md:p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition">
                        <img src="https://cdn-icons-png.flaticon.com/512/4436/4436481.png" className="w-10 sm:w-12 md:w-16 mx-auto mb-2 sm:mb-4" alt="Decide Smarter" />
                        <h4 className="font-bold text-sm sm:text-base md:text-lg dark:text-white">3. Decide Smarter</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">Choose the product that fits you best with real feedback.</p>
                    </div>

                </div>
            </section>


            <Stats />

            <section className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-4 sm:p-6 md:p-10 rounded-xl my-8 sm:my-12 animate__animated animate__fadeInRight transition-colors duration-300">

                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-300 mb-4 sm:mb-6 md:mb-8 text-center">What Users Say</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 md:gap-8">
                    <div className="bg-white dark:bg-gray-700 shadow-md p-3 sm:p-4 md:p-6 rounded-lg transition-colors duration-300">
                        <p className="text-gray-700 dark:text-gray-300 italic text-xs sm:text-sm md:text-base">"PickBetter helped me avoid a terrible laptop purchase. The community feedback is gold."</p>
                        <p className="text-right mt-2 sm:mt-4 font-semibold text-blue-600 dark:text-blue-400 text-xs sm:text-sm md:text-base">— Hassan, Student</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700 shadow-md p-3 sm:p-4 md:p-6 rounded-lg transition-colors duration-300">
                        <p className="text-gray-700 dark:text-gray-300 italic text-xs sm:text-sm md:text-base">"The product recommendations are practical and based on real problems. Truly helpful!"</p>
                        <p className="text-right mt-2 sm:mt-4 font-semibold text-blue-600 dark:text-blue-400 text-xs sm:text-sm md:text-base">— Sarah, Freelancer</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;