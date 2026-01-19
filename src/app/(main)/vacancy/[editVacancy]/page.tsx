'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ArrowLeft } from 'lucide-react'
import { useUpdateVacancyMutation } from '@/src/store/api'
import { Vacancy } from '@/src/app/types/type'

export default function EditVacancy() {
    const params = useParams()
    const id = params.editVacancy as string
    const router = useRouter()
    const [updateVacancy] = useUpdateVacancyMutation()

    const [formData, setFormData] = useState<Vacancy>({
        id: '',
        title: '',
        description: '',
        city: '',
        experience: '',
    })

    useEffect(() => {
        if (!id) return

        const getById = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:3001/vacancies/${id}`
                )
                setFormData(data)
            } catch (error) {
                console.error(error)
            }
        }

        getById()
    }, [id])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await updateVacancy({
                id,
                data: formData,
            }).unwrap()

            toast.success('Вакансия успешно отредактирована')
            router.push('/vacancy')
        } catch {
            toast.error('Ошибка при сохранении')
        }
    }

    return (
        <div className="min-h-screen bg-white flex justify-center py-10">
            <div className="w-full max-w-2xl px-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-8">
                    <Link
                        href="/vacancy"
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-orange-400 text-orange-400"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                    <h1 className="text-xl font-semibold">
                        Редактировать вакансию
                    </h1>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Название вакансии"
                        className="w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400"
                    />

                    <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Город"
                        className="w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400"
                    />

                    <input
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Опыт работы"
                        className="w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400"
                    />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Описание вакансии"
                        className="w-full h-40 rounded-xl border px-4 py-3 text-sm resize-none focus:ring-2 focus:ring-orange-400"
                    />

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-orange-400 text-white py-3 rounded-full text-sm font-medium hover:bg-orange-500"
                        >
                            Сохранить
                        </button>

                        <Link
                            href="/vacancy"
                            className="flex-1 text-center border border-orange-400 text-orange-400 py-3 rounded-full text-sm font-medium"
                        >
                            Отмена
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
