import { Users, BookOpen, Eye, Activity } from "lucide-react";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { getUsersCount } from "@/app/actions/users";
import { getDevotionsCount } from "@/app/actions/devotions";
import { fetchTodayVisitCount, fetchTodayUniqueVisitorCount } from "@/app/actions/log";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { DashboardStats } from "@/components/admin/DashboardStats";

import { GlobalVisitsMap } from "@/components/admin/GlobalVisitsMap";

export default async function AdminDashboardPage() {
    // Fetch real data in parallel
    const [userCount, devotionCount, visitCount, uniqueVisitors] = await Promise.all([
        getUsersCount(),
        getDevotionsCount(),
        fetchTodayVisitCount(),
        fetchTodayUniqueVisitorCount()
    ]);

    return (
        <div className="space-y-8">
            <DashboardHeader />

            <DashboardStats
                userCount={userCount}
                devotionCount={devotionCount}
                visitCount={visitCount}
                uniqueVisitors={uniqueVisitors}
            />

            {/* Global Visits Map */}
            <GlobalVisitsMap />

            <ActivityFeed />
        </div>
    );
}
