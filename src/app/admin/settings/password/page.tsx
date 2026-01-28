import { Metadata } from "next";
import PasswordClient from "./PasswordClient";

export const metadata: Metadata = {
    title: "修改密碼 | 後臺管理",
    description: "修改您的管理員賬號密碼",
};

export default function PasswordPage() {
    return <PasswordClient />;
}
