import Link from "next/link";
import Hour from "@/components/hour";
import NextDay from "@/components/nextDay";
import { useRouter } from "next/router";
export default function Detail() {
    const router = useRouter();
    const { day, country } = router.query;
    return (
        <div className="w-[414px] h-auto px-[30px] m-auto pt-[55px]">
            <Link href="/">
                <img src="/arrow2.png" alt="arrow_two" className="w-[32px] h-[32px] mb-[51px]" />
            </Link>
            <div className="flex items-center justify-between mb-[32px]">
                <p className="font-overpass font-black text-white text-[24px]">Today</p>
                <p className="font-medium text-[18px] text-white font-overpass">Sep, 12</p>
            </div>
            <div className="flex justify-between mb-[51px]">
                <Hour hour={15}></Hour>
                <Hour hour={16}></Hour>
                <Hour hour={17}></Hour>
                <Hour hour={18}></Hour>
            </div>
            <div>
                <div className="flex items-center justify-between mb-[32px]">
                    <p className="font-overpass font-black text-white text-[24px]">Next Forecast</p>
                    <img src="/calendar.png" className="w-[24px] h-auto" />
                </div>
                <NextDay></NextDay>
                <NextDay></NextDay>
                <NextDay></NextDay>
                <NextDay></NextDay>
                <NextDay></NextDay>
            </div>
        </div>
    );
}
