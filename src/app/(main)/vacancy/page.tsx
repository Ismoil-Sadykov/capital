import Vacancies from '@/src/components/Vacancies';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Link from 'next/link';

export default function page() {
  return (
    <div className="p-5">
      <div className='flex justify-between items-center mb-[36px]'>
        <p className="text-[36px] font-bold">Вакансии</p>
        <Link href={"/vacancy/addVacancy"}>
          <button className='cursor-pointer py-[14px] px-[20px] flex gap-1 rounded-[100px] bg-[#FFA900] text-white'>
            <AddCircleOutlinedIcon />
            Добавить
          </button>
        </Link>
      </div>
      <div className="w-[100px] h-[4px] bg-[#FFA900] mb-[28px]" />
      <div>
        <Vacancies />
      </div>
    </div>
  )
}
