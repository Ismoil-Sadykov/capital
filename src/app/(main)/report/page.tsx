'use client'

import { useState } from 'react'

import { useGetPartnerApplicationsQuery, useGetVacancyApplicationsQuery } from '@/src/store/api'
import ApplicationsTable from '@/src/components/ApplicationPage'

export default function ApplicationsPage() {
    const [tab, setTab] = useState<'partners' | 'vacancies'>('partners')

    const partners = useGetPartnerApplicationsQuery()
    const vacancies = useGetVacancyApplicationsQuery()

    const data = tab === 'partners' ? partners.data : vacancies.data

    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
                <p className="text-2xl md:text-3xl font-bold text-center md:text-left">
                    Заявки
                </p>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-full w-full md:w-auto">
                    <button
                        onClick={() => setTab('partners')}
                        className={`flex-1 md:flex-none px-4 py-2 rounded-full text-sm transition${tab === 'partners' ? 'bg-white shadow font-medium' : 'text-gray-500'}`}
                    >
                        На партнёрство
                    </button>
                    <button
                        onClick={() => setTab('vacancies')}
                        className={`flex-1 md:flex-none px-4 py-2 rounded-full text-sm transition ${tab === 'vacancies' ? 'bg-white shadow font-medium' : 'text-gray-500'}`}
                    >
                        На вакансии
                    </button>
                </div>
            </div>
            <ApplicationsTable data={data} />
        </div>
    )
}
