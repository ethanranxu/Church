"use client";

import React from "react";

export const ScriptureQuote = () => {
    return (
        <div className="w-full bg-white dark:bg-[#101922] py-12">
            <div className="flex justify-center px-4 lg:px-40">
                <div className="w-full max-w-[800px] bg-white dark:bg-[#1a2632] p-8 md:p-10 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-primary/20"></div>
                    <div className="font-serif-content space-y-6 text-gray-800 dark:text-gray-200">
                        <p className="text-xl font-bold text-primary mb-4">
                            哥林後書 9:6-9
                        </p>
                        <div className="text-lg leading-[1.8] space-y-6">
                            <p>
                                「少種的少收，多種的多收」，這話是真的。各人要隨本心所酌定的，不要作難，不要勉強，因為捐得樂意的人是神所喜愛的。
                            </p>
                            <p>
                                神能將各樣的恩惠多多地加給你們，使你們凡事常常充足，能多行各樣善事。
                            </p>
                            <div className="space-y-4 pl-4 border-l-2 border-primary/10">
                                <p className="italic text-gray-700 dark:text-gray-300">
                                    如經上所記：「他施捨錢財，賙濟貧窮，他的仁義存到永遠。」
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
