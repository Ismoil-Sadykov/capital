'use client'

import BrowserUpdatedOutlinedIcon from '@mui/icons-material/BrowserUpdatedOutlined'
import { Application } from '../app/types/type'

type Props = {
  data?: Application[]
}

export default function ApplicationsTable({ data }: Props) {
  return (
    <>
      <div className="hidden md:block bg-white rounded-2xl p-4 shadow-sm">
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
                <button className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                  <BrowserUpdatedOutlinedIcon fontSize="small" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden space-y-4">
        {data?.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <p className="font-semibold text-base">{item.fullName}</p>
              <button className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                <BrowserUpdatedOutlinedIcon fontSize="small" />
              </button>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Телефон:</span> {item.phone}</p>
              <p><span className="font-medium">Email:</span> {item.email}</p>
              <p><span className="font-medium">Компания:</span> {item.company}</p>
              <p><span className="font-medium">Дата:</span> {item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}