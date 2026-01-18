'use client'

import BrowserUpdatedOutlinedIcon from '@mui/icons-material/BrowserUpdatedOutlined';
import { Application } from '../app/types/type'

type Props = {
  data?: Application[]
}

export default function ApplicationsTable({ data }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="grid grid-cols-6 text-sm text-gray-400 px-4 py-3">
        <p>ФИО</p>
        <p>Телефон</p>
        <p>Email</p>
        <p>Название компании</p>
        <p>Дата</p>
        <p className="text-center">Предложение</p>
      </div>

      <div className="divide-y">
        {data?.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-6 items-center px-4 py-4 text-sm"
          >
            <p className="font-medium">{item.fullName}</p>
            <p>{item.phone}</p>
            <p>{item.email}</p>
            <p>{item.company}</p>
            <p>{item.date}</p>

            <div className="flex justify-center">
              <button className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 cursor-pointer">
                <BrowserUpdatedOutlinedIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
