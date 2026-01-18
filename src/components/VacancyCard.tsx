'use client'

import { MapPin, Trash2, EyeOff, Pencil } from 'lucide-react'

type Props = {
    experience: string
    city: string
    title: string
    description: string
}

export function VacancyCard({
    experience,
    city,
    title,
    description,
}: Props) {
    return (
        <div className="w-[360px] rounded-2xl bg-white p-5 shadow-md">
            <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-sm text-white">
                    {experience}
                </span>

                <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <MapPin size={16} />
                    {city}
                </div>
            </div>

            <h3 className="mb-2 text-xl font-bold">{title}</h3>

            <p className="mb-4 text-gray-500 text-sm line-clamp-3">
                {description}
            </p>

            <div className="flex items-center justify-between">
                <button className="flex items-center gap-1 text-orange-500 font-medium">
                    Подробнее <span className="text-lg">›</span>
                </button>

                <div className="flex gap-2">
                    <button className="h-9 w-9 rounded-full border flex items-center justify-center text-gray-400">
                        <Trash2 size={18} />
                    </button>
                    <button className="h-9 w-9 rounded-full border flex items-center justify-center text-orange-500">
                        <Pencil size={18} />
                    </button>
                    <button className="h-9 w-9 rounded-full border flex items-center justify-center text-orange-500">
                        <EyeOff size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}
