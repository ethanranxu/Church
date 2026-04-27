import { getBulletins } from "@/app/actions/bulletins";
import BulletinsClient from "./BulletinsClient";

export default async function BulletinsPage() {
    const initialBulletins = await getBulletins();

    return (
        <div className="p-6">
            <BulletinsClient initialBulletins={initialBulletins} />
        </div>
    );
}

export const dynamic = "force-dynamic";

