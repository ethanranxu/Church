import React from 'react';

export default function PastoralTeam() {
    return (
        <section className="flex flex-col gap-8">
            {/* Section Title */}
            <div className="flex flex-col items-center text-center gap-2 mb-4">
                <h2 className="text-[#111418] dark:text-white text-3xl md:text-4xl font-bold leading-tight">牧養團隊</h2>
                <div className="h-1 w-20 bg-primary rounded-full mt-2"></div>
            </div>

            {/* Main Pastor Card */}
            <div className="flex flex-col md:flex-row bg-white dark:bg-[#1a2632] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                <div
                    className="md:w-2/5 min-h-[320px] bg-cover bg-top"
                    style={{
                        backgroundImage: `url("/images/pastor-david-kung.jpg")`
                    }}
                ></div>
                <div className="md:w-3/5 p-8 flex flex-col justify-center gap-4">
                    <div>
                        <div className="flex items-baseline gap-3 mb-1">
                            <h3 className="text-2xl font-bold text-[#111418] dark:text-white">龔偉鴻 牧師</h3>
                        </div>
                        <p className="text-primary font-bold">長堤基督教會主任牧師</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        龔牧師於2003年領受從神而來的異象與使命後創立長堤基督教會，擁有豐富的牧養經驗與神學背景。他致力於推動以聖經為中心的講道與門徒訓練，渴望看見每一位信徒都能在真理中成長，活出基督的樣式。
                    </p>
                    <div className="pt-4 mt-auto">
                        <a
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors cursor-pointer"
                            href="#"
                        >
                            <span className="material-symbols-outlined">mail</span>
                            <span>聯絡牧師</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Pastor Ni Gengzhong Card */}
            <div className="flex flex-col md:flex-row bg-white dark:bg-[#1a2632] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                <div
                    className="md:w-2/5 min-h-[320px] bg-cover bg-top"
                    style={{
                        backgroundImage: `url("/images/ni-gengzhong.jpg")`
                    }}
                ></div>
                <div className="md:w-3/5 p-8 flex flex-col justify-center gap-4">
                    <div>
                        <div className="flex items-baseline gap-3 mb-1">
                            <h3 className="text-2xl font-bold text-[#111418] dark:text-white">倪耿忠 牧師</h3>
                        </div>
                        <p className="text-primary font-bold">長灣基督教會駐堂牧師</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        倪牧師委身於福音事工多年，擁有深厚的聖經造詣與牧養熱忱。他專注於家庭牧養與宣教推展，致力於引領信徒在日常生活中實踐信仰，建立活潑且充滿愛的屬靈生命。
                    </p>
                    <div className="pt-4 mt-auto">
                        <a
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors cursor-pointer"
                            href="#"
                        >
                            <span className="material-symbols-outlined">mail</span>
                            <span>聯絡牧師</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Preachers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Preacher 1 */}
                <div className="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800">
                    <div
                        className="aspect-[16/10] w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url("/images/assets/pastoral-team-2.jpg")`
                        }}
                    ></div>
                    <div className="p-6 flex flex-col gap-3">
                        <div>
                            <h3 className="text-xl font-bold text-[#111418] dark:text-white text-center">*** 傳道</h3>
                            <p className="text-primary font-medium text-center">事工方向</p>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center">
                            傳道的簡短介紹，描述其在教會中的服事領域與異象。
                        </p>
                    </div>
                </div>

                {/* Preacher 2 */}
                <div className="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800">
                    <div
                        className="aspect-[16/10] w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url("/images/assets/pastoral-team-2.jpg")`
                        }}
                    ></div>
                    <div className="p-6 flex flex-col gap-3">
                        <div>
                            <h3 className="text-xl font-bold text-[#111418] dark:text-white text-center">*** 傳道</h3>
                            <p className="text-primary font-medium text-center">事工方向</p>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center">
                            傳道的簡短介紹，描述其在教會中的服事領域與異象。
                        </p>
                    </div>
                </div>

                {/* Preacher 3 */}
                <div className="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800">
                    <div
                        className="aspect-[16/10] w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url("/images/preacher-zhong.png")`
                        }}
                    ></div>
                    <div className="p-6 flex flex-col gap-3">
                        <div>
                            <h3 className="text-xl font-bold text-[#111418] dark:text-white text-center">鍾學謙傳道</h3>
                            <p className="text-primary font-medium text-center">長堤基督教會青年傳道</p>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center">
                            傳道的簡短介紹，描述其在教會中的服事領域與異象。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
