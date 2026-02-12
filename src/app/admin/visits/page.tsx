import { Metadata } from 'next';
import VisitsClient from './VisitsClient';

export const metadata: Metadata = {
    title: '預約參訪管理 | 教會後臺',
    description: '管理預約參訪記錄',
};

export default function VisitsPage() {
    return <VisitsClient />;
}
