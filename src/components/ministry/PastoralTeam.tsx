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
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuABUTJLO0re_DHeJGd4Y4vp5UZMof3fuiY27twdMuUU51Mg86L002pEqtdorNuRwWXFt7eh2vk6NsrhJVMxqTKvPBBlBNtvoLPxgCPOs9c4so9D4CWcic-XplXqzhnU9fSdJhckJQgoxaU7TrhxPK9M5xraeuqqOTTm-G_TCpLPhROYpAalaFWmHoyO4inr4cZmLx9yWWrIzgJMk1hV5oP5A6oTDMzz_DVT-PqsBqgxQlYnP8EdqFYMV731BcTo4gOVL2M0X4JoKrE")`
                    }}
                ></div>
                <div className="md:w-3/5 p-8 flex flex-col justify-center gap-4">
                    <div>
                        <div className="flex items-baseline gap-3 mb-1">
                            <h3 className="text-2xl font-bold text-[#111418] dark:text-white">龔偉鴻 牧師</h3>
                        </div>
                        <p className="text-primary font-bold">主任牧師</p>
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

            {/* Secondary Pastors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pastor 2 */}
                <div className="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800">
                    <div
                        className="aspect-[16/10] w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCE_AnSPPcPFZt-284OpNZvw4tY51F6L3ChjBPjC_FS-UlfCAE5pyRi_9GH_VYmdqc5UftU97cezf2sKNMxtEPaC4G2NsAaWULl1U5tkVvUQHPTfwjvhRpW_zujN2io1K75-8y_W7WAh9D6a7IZq3rqpNVGvtHXLUgkwoG7xNTOwhMJK3WizO5JX7XC-4cU70u4c-fkk7DvrK1i8Ygz5w0aB-Bf0CvtEw9MtorKOiZrq8r9U4ubL7xounCrPfE7hWtmW6f4NPx2e74")`
                        }}
                    ></div>
                    <div className="p-6 flex flex-col gap-3">
                        <div>
                            <h3 className="text-xl font-bold text-[#111418] dark:text-white">*** 牧師</h3>
                            <p className="text-primary font-medium">兒童與家庭事工</p>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            專注於兒童主日學與家庭輔導，他深信信仰傳承是家庭最重要的資產。
                        </p>
                    </div>
                </div>

                {/* Pastor 3 */}
                <div className="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800">
                    <div
                        className="aspect-[16/10] w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCE_AnSPPcPFZt-284OpNZvw4tY51F6L3ChjBPjC_FS-UlfCAE5pyRi_9GH_VYmdqc5UftU97cezf2sKNMxtEPaC4G2NsAaWULl1U5tkVvUQHPTfwjvhRpW_zujN2io1K75-8y_W7WAh9D6a7IZq3rqpNVGvtHXLUgkwoG7xNTOwhMJK3WizO5JX7XC-4cU70u4c-fkk7DvrK1i8Ygz5w0aB-Bf0CvtEw9MtorKOiZrq8r9U4ubL7xounCrPfE7hWtmW6f4NPx2e74")`
                        }}
                    ></div>
                    <div className="p-6 flex flex-col gap-3">
                        <div>
                            <h3 className="text-xl font-bold text-[#111418] dark:text-white">*** 傳道</h3>
                            <p className="text-primary font-medium">青少年事工</p>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            帶領我們的青少年團契，充滿活力地引導年輕一代認識上帝並建立正確的價值觀。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
