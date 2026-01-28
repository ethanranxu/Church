import { getDevotions } from "@/app/actions/devotions";
import DevotionsClient from "./DevotionsClient";

export default async function DevotionsPage() {
    const initialDevotions = await getDevotions();

    return (
        <div className="p-6">
            <DevotionsClient initialDevotions={initialDevotions} />
        </div>
    );
}

export const dynamic = "force-dynamic";
