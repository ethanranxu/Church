import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "link";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

export const Button = ({
    children,
    className,
    variant = "primary",
    size = "md",
    ...props
}: ButtonProps) => {
    const variants = {
        primary: "bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-xl",
        secondary: "bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white",
        ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300",
        link: "text-primary hover:underline font-medium p-0",
    };

    const sizes = {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-sm font-bold",
        lg: "px-8 py-3 text-base font-bold",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-lg transition-all gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
                variants[variant],
                variant !== "link" && sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
