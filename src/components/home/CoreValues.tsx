import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const VALUES = [
    {
        icon: "diversity_3",
        title: "團契生活",
        description: "我們重視肢體間的連結，透過小組與聚會，學習彼此相愛，互相扶持，在主裡成為一家人。",
        color: "bg-blue-50 dark:bg-blue-900/20",
        borderColor: "border-t-blue-500",
        iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
        icon: "auto_stories",
        title: "聖經教導",
        description: "扎根於神的話語，透過主日講道、查經班與門徒訓練，使信徒生命成熟，活出基督的樣式。",
        color: "bg-amber-50 dark:bg-amber-900/20",
        borderColor: "border-t-amber-500",
        iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
        icon: "volunteer_activism",
        title: "社區服事",
        description: "走出教會四牆，關懷社區需要，以實際行動分享神的愛，作光作鹽，榮神益人。",
        color: "bg-emerald-50 dark:bg-emerald-900/20",
        borderColor: "border-t-emerald-500",
        iconColor: "text-emerald-600 dark:text-emerald-400",
    },
];

export const CoreValues = () => {
    return (
        <Section className="bg-white dark:bg-[#101922] py-12 md:py-12">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#111418] dark:text-white mb-4">
                        我们的核心价值
                    </h2>
                    <Container className="max-w-[1134px]">
                        <div className="w-12 h-1 bg-[#FBBF24] mx-auto mb-6"></div>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            在愛中建立團契，在真理中彼此教導，在社區中熱心服事
                        </p>
                    </Container>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6  max-w-[1158px] mx-auto">
                    {VALUES.map((value) => (
                        <div
                            key={value.title}
                            className={`bg-background-light dark:bg-[#1a2634] px-6 py-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border-t-4 ${value.borderColor} border-x border-b border-gray-100 dark:border-gray-800 text-center group hover:-translate-y-1`}
                        >
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center ${value.iconColor} group-hover:scale-110 transition-transform`}>
                                    <span className="material-symbols-outlined !text-4xl">{value.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white m-0">{value.title}</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
