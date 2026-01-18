import { BriefcaseBusiness, Newspaper, TicketsPlane } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <nav className="flex items-center gap-8 md:hidden justify-center fixed bottom-0 left-0 w-full z-50 bg-white/40 backdrop-blur-md py-2">
            <Link href={"/news"} className="flex flex-col items-center justify-center active:text-[#FFA900] font-semibold">
                <Newspaper />
                <span>Новости</span>
            </Link>
            <Link href={"/vacancy"} className="flex flex-col items-center justify-center active:text-[#FFA900] font-semibold">
                <BriefcaseBusiness />
                <span>Вакансии</span>
            </Link>
            <Link href={"/report"} className="flex flex-col items-center justify-center active:text-[#FFA900] font-semibold">
                <TicketsPlane />
                <span>Заявки</span>
            </Link>
        </nav>
    )
}
