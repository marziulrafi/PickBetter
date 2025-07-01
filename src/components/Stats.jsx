import React from "react";
import CountUp from 'react-countup';

const Stats = () => {
    return (
        <div id="about" className="text-center my-16 px-4 flex flex-col items-center text-base-content">

            <div className="max-w-3xl mb-10">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-indigo-700">
                    Shop Smarter, Together.
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">

                <div className="bg-indigo-100 dark:bg-indigo-900 px-8 py-10 rounded-2xl flex flex-col gap-2 text-left shadow hover:shadow-md transition">
                    <h1 className="text-[3rem] font-extrabold text-indigo-700 dark:text-white">
                        <CountUp duration={4} enableScrollSpy scrollSpyDelay={200} end={5200} />+
                    </h1>
                    <p className="font-medium text-lg text-indigo-800 dark:text-gray-300">Queries Solved</p>
                </div>

                <div className="bg-pink-100 dark:bg-pink-900 px-8 py-10 rounded-2xl flex flex-col gap-2 text-left shadow hover:shadow-md transition">
                    <h1 className="text-[3rem] font-extrabold text-pink-600 dark:text-white">
                        <CountUp duration={4} enableScrollSpy scrollSpyDelay={200} end={11200} />+
                    </h1>
                    <p className="font-medium text-lg text-pink-800 dark:text-gray-300">User Recommendations</p>
                </div>

                <div className="bg-green-100 dark:bg-green-900 px-8 py-10 rounded-2xl flex flex-col gap-2 text-left shadow hover:shadow-md transition">
                    <h1 className="text-[3rem] font-extrabold text-green-700 dark:text-white">
                        <CountUp duration={4} enableScrollSpy scrollSpyDelay={200} end={35} />+
                    </h1>
                    <p className="font-medium text-lg text-green-900 dark:text-gray-300">Experts Contributed</p>
                </div>
            </div>
        </div>
    );
};

export default Stats;
