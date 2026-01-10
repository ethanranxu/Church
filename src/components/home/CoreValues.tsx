import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const VALUES = [
    {
        icon: "diversity_3",
        title: "團契生活",
        description: "我們重視肢體間的連結，透過小組與聚會，學習彼此相愛，互相扶持，在主裡成為一家人。",
        color: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
        icon: "auto_stories",
        title: "聖經教導",
        description: "扎根於神的話語，透過主日講道、查經班與門徒訓練，使信徒生命成熟，活出基督的樣式。",
        color: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
        icon: "volunteer_activism",
        title: "社區服事",
        description: "走出教會四牆，關懷社區需要，以實際行動分享神的愛，作光作鹽，榮神益人。",
        color: "bg-blue-50 dark:bg-blue-900/20",
    },
];

export const CoreValues = () => {
    return (
        <Section className="bg-white dark:bg-[#101922]">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        我们的核心价值
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        在愛中建立團契，在真理中彼此教導，在社區中熱心服事
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {VALUES.map((value) => (
                        <div
                            key={value.title}
                            className="bg-background-light dark:bg-[#1a2634] px-6 py-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-800 text-center group"
                        >
                            <div className={`w-16 h-16 mx-auto ${value.color} rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform`}>
                                <span className="material-symbols-outlined !text-4xl">{value.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
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
