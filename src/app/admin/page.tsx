import { Users, BookOpen, Eye, Activity } from "lucide-react";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { getUsersCount } from "@/app/actions/users";
import { getDevotionsCount } from "@/app/actions/devotions";
import { fetchTodayVisitCount, fetchTodayUniqueVisitorCount } from "@/app/actions/log";

export default async function AdminDashboardPage() {
    // Fetch real data in parallel
    const [userCount, devotionCount, visitCount, uniqueVisitors] = await Promise.all([
        getUsersCount(),
        getDevotionsCount(),
        fetchTodayVisitCount(),
        fetchTodayUniqueVisitorCount()
    ]);

    const stats = [
        { name: '總用戶數', value: userCount.toString(), change: '管理员', changeType: 'neutral', icon: Users },
        { name: '靈修文章', value: devotionCount.toString(), change: '总计', changeType: 'neutral', icon: BookOpen },
        { name: '用户访问', value: uniqueVisitors.toString(), change: '今日', changeType: 'neutral', icon: Activity },
        { name: '页面访问', value: visitCount.toLocaleString(), change: '今日', changeType: 'increase', icon: Eye },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">儀表板</h1>
                <p className="text-sm text-gray-500">歡迎回來，今日概覽。</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.name} className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                        <dt>
                            <div className="absolute rounded-md bg-emerald-500/10 p-3">
                                <stat.icon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
                            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                {stat.change}
                            </p>
                        </dd>
                    </div>
                ))}
            </div>

            <ActivityFeed />
        </div>
    );
}
