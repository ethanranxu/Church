import React from 'react';
import { Church, Users, Building, PartyPopper } from 'lucide-react'; // Approximating Material Symbols

export default function HistoryTimeline() {
    return (
        <div className="flex flex-1 justify-center py-20 px-4 md:px-8 bg-[#F9FAFB] dark:bg-[#101922]">
            <div className="flex flex-col max-w-[1140px] w-full gap-24">
                <section>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] dark:text-blue-300 mb-4">教會歷史沿革</h2>
                        <div className="w-12 h-1 bg-[#FBBF24] mx-auto"></div>
                    </div>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#1E3A8A] to-[#1E3A8A] opacity-20 hidden md:block"></div>

                        <div className="flex flex-col gap-12 relative">

                            {/* 2003 Item */}
                            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                <div className="w-full md:w-[45%] order-2 md:order-1">
                                    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-2xl shadow-md border-l-4 border-[#1E3A8A]">
                                        <h3 className="text-2xl font-black text-[#1E3A8A] dark:text-blue-400 mb-3">2003年</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-justify leading-relaxed tracking-wide">
                                            紐西蘭奧克蘭長堤基督教會是由龔偉鴻牧師於2003年領受從神而來的異象與使命後，在美國台福總會以及柑縣台福基督教會的支持下所創辦並在其中牧養。
                                        </p>
                                    </div>
                                </div>
                                <div className="z-10 bg-[#1E3A8A] text-white p-3 rounded-full mb-6 md:mb-0 order-1 md:order-2">
                                    <Church className="w-8 h-8" />
                                </div>
                                <div className="w-full md:w-[45%] order-3">
                                    <img alt="2003 Church Founding" className="w-full h-48 object-cover rounded-2xl shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqc2vAwttQBPf7gM_O_PwkUHsRZYSvrhlvHZvrhwgrjApk-7SjVTWifd-nzkKXsWvmf94LWn-6WHF6xmeUDJqcdqr33JPcAXDC6BeG4oRLaCXMfCpjLjz0dH0N29BnUbF4o8LfKMJiOVD5oHF_BlCtS17YA-vcx4fgd-fCNIJiRRlrnnO2fkPfqoFVhzga9JzyyRwpNzryRStl5Ss4O2uUAY9GNWzjw7lFBvCtL80-aysSd9TbDh-LPbCWoCtOX0AAcdHtEavwDqM" />
                                </div>
                            </div>

                            {/* 2015 Item (Right Aligned Text) */}
                            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                <div className="w-full md:w-[45%] order-3 md:order-1">
                                    <img alt="2015 Mission" className="w-full h-48 object-cover rounded-2xl shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjhvZ-NLHWYYUC0MqzvpMlLzjsAecqFQJmsbQbs6KfSiJo_Zq6ASR20iTMKTNuvgRlJ3OaD2jR3PH8YfkPZWx4p1ZRsI7vk_FsoRD0Qet_n3TWkjA7SI-5LaFHq7R3nEu--iv3Ff4xSAsVccN7BDCQG5OW3qRA73U7ooBZrjzOWPMOFCWK2AuKXTG2bOG_HD-KfYBAktfjMWSo7U6IJM72luEahTw850-X_tVMm1KIeILcdZpZm7khwiZP6Yz7OM-udtpHo3r2FaA" />
                                </div>
                                <div className="z-10 bg-[#FBBF24] text-[#1E3A8A] p-3 rounded-full mb-6 md:mb-0 order-1 md:order-2">
                                    <Users className="w-8 h-8" />
                                </div>
                                <div className="w-full md:w-[45%] order-2 md:order-3">
                                    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-2xl shadow-md border-r-4 border-[#FBBF24]">
                                        <h3 className="text-2xl font-black text-[#1E3A8A] dark:text-blue-400 mb-3">2015年</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-justify leading-relaxed tracking-wide">
                                            在奧克蘭木槿灣地區成立「木槿灣基督教會」，落實「廣傳福音、開拓植堂、拓展神的國度」之託付。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 2019 Item */}
                            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                <div className="w-full md:w-[45%] order-2 md:order-1">
                                    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-2xl shadow-md border-l-4 border-[#1E3A8A]">
                                        <h3 className="text-2xl font-black text-[#1E3A8A] dark:text-blue-400 mb-3">2019年</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-justify leading-relaxed tracking-wide">
                                            在奧克蘭長灣地區成立「長灣基督教會」，繼續為主擴張境界，在基督的名未被稱過的地方紮根。
                                        </p>
                                    </div>
                                </div>
                                <div className="z-10 bg-[#1E3A8A] text-white p-3 rounded-full mb-6 md:mb-0 order-1 md:order-2">
                                    <Building className="w-8 h-8" />
                                </div>
                                <div className="w-full md:w-[45%] order-3">
                                    <img alt="2019 Expansion" className="w-full h-48 object-cover rounded-2xl shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqWUUJi8rRiZnP4IPz4pQZk5bcY4ETZfDcMlF5MI6wtjT1oexEMAOOVwM0DUjGY8x4VbAz439YKGCH5Ew3Y2n1dWhg0ARuqiQ6ZYegHOeU_L8fc5Vw-nJBfiAd-dV_YkgLMNI2UUjm7Sg-IKgrQUvUXwKMOe-NF9cZT1bXSlxePD2aHZCQvTnxUjdHfUEsMaqQMZYHC567TPIYGa9BIPil4QgPcQeifK6JSzt9QhxW8bNoM2F4ZokVfzY_hDL5kT3oZmzNuAkN1Ds" />
                                </div>
                            </div>

                            {/* 2023 Item (Right Aligned) */}
                            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                <div className="w-full md:w-[45%] order-3 md:order-1">
                                    <img alt="2023 New Chapter" className="w-full h-48 object-cover rounded-2xl shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWAPx2X3tClQ5wjc9lmLfYdp3NaXXiPHGsjJk-ISieZCUrr1ueECoHQ2KI-L7YRh-YBpExV8D1x-HadIjEbS4csVBCm3-xAy86bNXxBUSPEa1Fcu3iNlwyfq0girYIP29Zfvi4rVQ9wWIWc_ozpPYdqi9uzJQVTMaZaymn0QcHX921Go8u3MOC_LSddQ-GX2Qe2k3IhmUMVLmf15q595C-l5F7Sgm3-FAcD0vH5xXaGTxK5U7lgMBnoRB5iB4yQd49Jbz1jBwDLdI" />
                                </div>
                                <div className="z-10 bg-[#FBBF24] text-[#1E3A8A] p-3 rounded-full mb-6 md:mb-0 order-1 md:order-2">
                                    <PartyPopper className="w-8 h-8" />
                                </div>
                                <div className="w-full md:w-[45%] order-2 md:order-3">
                                    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-2xl shadow-md border-r-4 border-[#FBBF24]">
                                        <h3 className="text-2xl font-black text-[#1E3A8A] dark:text-blue-400 mb-3">2023年</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-justify leading-relaxed tracking-wide">
                                            成立二十週年之際，決議加入「長堤牧養系統」，由牧者團隊帶領，正式於10月22日開始全新篇章。
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Detailed History Text */}
                    <div className="mt-16 bg-gradient-to-br from-blue-50 to-white dark:from-[#1E3A8A]/10 dark:to-[#1a2632] p-8 md:p-12 rounded-3xl border border-blue-100 dark:border-blue-800 shadow-sm">
                        <div className="max-w-4xl mx-auto space-y-6">
                            <p className="text-gray-700 dark:text-gray-200 text-lg text-justify indent-[2em] leading-relaxed tracking-wider">
                                紐西蘭奧克蘭長堤基督教會是由龔偉鴻牧師於2003年領受從神而來的異象與使命後，在美國台福總會以及柑縣台福基督教會的支持下所創辦並在其中牧養。在2003年至2023年，這二十年期間，龔牧師忠心地遵行上帝的託付，在基督的名未被稱過的地方「廣傳福音、開拓植堂、拓展神的國度。」
                            </p>
                            <p className="text-gray-700 dark:text-gray-200 text-lg text-justify indent-[2em] leading-relaxed tracking-wider">
                                如今，至2023年10月為此，長堤基督教會在龔牧師的帶領之下，已為主開拓兩間教會，分別是於2015年在奧克蘭木槿灣地區成立「木槿灣基督教會」以及於2019年在奧克蘭長灣地區成立「長灣基督教會」。
                            </p>
                            <p className="text-gray-700 dark:text-gray-200 text-lg text-justify indent-[2em] leading-relaxed tracking-wider">
                                龔牧師在2023年長堤基督教會成立二十週年之際，為整體教會立下三大目標：（1）活潑感人的主日崇拜與講道（2）家庭小組的牧養關懷系統（3）教會整體傳福音的動力並決議採用以「牧者團隊」的體制帶領全體教會一同繼續前進。這牧養體制不但符合紐西蘭當地的教會文化，也能提供實際的牧養需要與關懷幫助會友一同在神的家中茁壯成長。
                            </p>
                            <p className="text-gray-700 dark:text-gray-200 text-lg text-justify indent-[2em] leading-relaxed tracking-wider">
                                基於此體制與美國台福總會相左，在經過牧者團隊的深思熟慮後決定於2023年10月22日正式離開美國台福總會體制，並加入「長堤牧養系統」藉著聖靈的引領由牧者團隊選出合神心意、願意絕對順服上帝且具有屬靈權柄的基督徒領袖和牧者團隊一同牧養長堤基督教會。
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
