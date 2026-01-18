'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import News from '@/src/components/News';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="p-5">
      <div className='flex justify-between items-center mb-[36px]'>
        <p className="text-[36px] font-bold">Новости</p>
        <Link href={"/news/addNews"}>
          <button className='cursor-pointer py-[14px] px-[20px] flex gap-1 rounded-[100px] bg-[#FFA900] text-white'>
            <AddCircleOutlinedIcon />
            Добавить
          </button>
        </Link>
      </div>

      <div className="w-[100px] h-[4px] bg-[#FFA900] mb-[28px]" />

      <div>
        <News />
      </div>
    </div>
  )
}
