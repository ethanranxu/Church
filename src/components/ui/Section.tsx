import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

export const Section = ({ children, className, ...props }: SectionProps) => {
    return (
        <section className={cn("py-16 md:py-20", className)} {...props}>
            {children}
        </section>
    );
};
