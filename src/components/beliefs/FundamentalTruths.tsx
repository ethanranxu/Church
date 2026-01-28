import React from 'react';
import { BookOpen, Wind, Infinity, Heart, UserX, Wine, Frown, PhoneIncoming, Users, Church } from 'lucide-react';

const BeliefCard = ({ icon: Icon, title, description, reference, colorClass = "text-[#1E3A8A]" }: any) => (
    <div className="flex flex-col bg-white dark:bg-[#1a2632] rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
            <Icon size={120} />
        </div>

        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className={`w-6 h-6 ${colorClass} dark:text-blue-400`} />
            </div>
            <h3 className={`text-xl font-bold ${colorClass} dark:text-blue-300`}>{title}</h3>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-justify leading-relaxed tracking-wide text-sm flex-grow mb-6">
            {description}
        </p>

        <div className="text-xs text-gray-400 italic font-medium pt-4 border-t border-gray-50 dark:border-gray-800 h-14 flex items-center">
            {reference}
        </div>
    </div>
);

export default function FundamentalTruths() {
    const beliefs = [
        {
            icon: BookOpen,
            title: "聖經是神所默示的",
            description: "新舊約聖經是上帝所默示無謬誤的話語，明陳上帝完備救人的聖旨，是基督徒信仰與生活最高權威。",
            reference: "( 提后三15-17；帖前二12；彼后一21 )"
        },
        {
            icon: Wind,
            title: "聖靈的施洗",
            description: "眾聖徒應依從聖父的應許，按照主耶穌基督的吩咐，一如初期教會，熱切尋求聖靈與火的施洗，從而得著屬靈的能力。",
            reference: "( 路廿四49；徒一4，8；林前十二1-31 )"
        },
        {
            icon: Infinity,
            title: "獨一真神",
            description: "只有一位永活真神，創造天地的主，人類的救贖者，永恆地以聖父、聖子、聖靈三個不同的位格存在。",
            reference: "( 申六：4；賽四十三：10，11；太廿八：19；路三22 )"
        },
        {
            icon: Heart, // Representing Health Cross / Jesus
            title: "耶穌基督",
            description: "耶穌基督是三位一體獨一真神的第二位，是神的兒子，為擔當世人的罪，在十字架上受苦、受死，第三天從死里復活。",
            reference: "( 太一23；路一31，35；來七26；彼前二22；徒二22，十38 )"
        },
        {
            icon: UserX, // Representing "Saved" or "Volunteer Activism" icon from original
            title: "人類的救恩",
            description: "人得罪得赦免的唯一方法，是藉著悔改和信靠神兒子耶穌基督的寶血。",
            reference: "( 路廿四47；約三3；羅十13-15；弗二8；多二11 )"
        },
        {
            icon: Wine,
            title: "教會的聖禮",
            description: "教會奉行洗禮與聖餐禮。洗禮象徵得新生命；聖餐禮記念主的受死，直等到祂再來。",
            reference: "( 太廿八19；可十六16；徒十47；羅六4；林前十一23-26 )"
        },
        {
            icon: Frown,
            title: "人類墮落",
            description: "人依照神的形像造，但卻自愿陷在罪中，與神分離。人無法靠自己的能力自我救贖。",
            reference: "( 創一26-27，二17，三6；羅五12-19 )"
        },
        {
            icon: Church, // Foundation icon
            title: "教會",
            description: "教會是基督的身體，神藉著聖靈居於其中，從而履行大使命，成全神救贖的計畫。",
            reference: "( 弗一22-23，二22；來十二23 )"
        },
        {
            icon: Users,
            title: "事工",
            description: "神呼召教會，賦予宣揚福音、施行聖禮、宣傳聖道、敬拜神、建立教會、牧養信徒。",
            reference: "( 可十六15-20；約四23-24；弗四11-16 )"
        }
    ];

    return (
        <div className="w-full pt-12 pb-20 px-4 md:px-8 bg-white dark:bg-[#101922]">
            <div className="max-w-[1140px] w-full mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#111418] dark:text-white mb-4">基要真理</h2>
                    <div className="w-12 h-1 bg-[#FBBF24] mx-auto mb-6"></div>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        以圣经为根基，因基督得救，在圣灵里活出教会的使命。
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {beliefs.map((belief, index) => (
                        <BeliefCard key={index} {...belief} />
                    ))}
                </div>
            </div>
        </div>
    );
}
