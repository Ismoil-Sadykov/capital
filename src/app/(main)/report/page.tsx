'use client'

import { useState } from 'react'

import { useGetPartnerApplicationsQuery, useGetVacancyApplicationsQuery } from '@/src/store/api'
import ApplicationsTable from '@/src/components/ApplicationPage'

export default function ApplicationsPage() {
    const [tab, setTab] = useState<'partners' | 'vacancies'>('partners')

    const partners = useGetPartnerApplicationsQuery()
    const vacancies = useGetVacancyApplicationsQuery()

    const data =
        tab === 'partners' ? partners.data : vacancies.data

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Заявки</h1>

                <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
                    <button
                        onClick={() => setTab('partners')}
                        className={`cursor-pointer px-4 py-2 rounded-full text-sm ${tab === 'partners'
                            ? 'bg-white shadow font-medium'
                            : 'text-gray-500'
                            }`}
                    >
                        На партнёрство
                    </button>

                    <button
                        onClick={() => setTab('vacancies')}
                        className={`cursor-pointer px-4 py-2 rounded-full text-sm ${tab === 'vacancies'
                            ? 'bg-white shadow font-medium'
                            : 'text-gray-500'
                            }`}
                    >
                        На вакансии
                    </button>
                </div>
            </div>
            <ApplicationsTable data={data} />
        </div>
    )
}
