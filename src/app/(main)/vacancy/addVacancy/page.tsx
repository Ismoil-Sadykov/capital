'use client'

import { useAddVacancyMutation } from '@/src/store/api'
import { ArrowLeft, Bold, Heading, Italic, LinkIcon, List, ListOrdered, Underline } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function AddVacancyPage() {
    const router = useRouter()
    const [addVacancy, { isLoading }] = useAddVacancyMutation()

    const [title, setTitle] = useState('')
    const [experience, setExperience] = useState('')
    const [city, setCity] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!title || !experience || !city || !date || !description) {
            toast.error('Заполните все поля❗')
            return
        }

        try {
            await addVacancy({
                title,
                experience,
                city,
                date,
                description,
            }).unwrap()

            toast.success('Вакансия добавлена✅')
            router.push('/vacancy')
        } catch {
            toast.error('Ошибка при добавлении❌')
        }
    }

    return (
        <div className="min-h-screen bg-white flex justify-center py-10">
            <div className="w-full max-w-xl px-4">
                <div className="flex items-center gap-3 mb-8">
                    <Link
                        href="/vacancy"
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-orange-400 text-orange-400"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                    <h1 className="text-lg font-semibold">Добавить вакансию</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        placeholder="Название"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input
                        placeholder="Опыт работы"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                        <option value="">Город</option>
                        <option value="Душанбе">Душанбе</option>
                        <option value="Худжанд">Худжанд</option>
                        <option value="Бохтар">Бохтар</option>
                    </select>
                    <div className="relative">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div>
                        <p className="text-sm font-medium mb-2">Статус</p>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-orange-400 text-orange-500 text-sm">
                                <span className="w-3 h-3 rounded-full border-4 border-orange-400" />
                                Показать
                            </button>

                            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-400 text-sm">
                                <span className="w-3 h-3 rounded-full border border-gray-300" />
                                Скрыть
                            </button>
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-200 text-gray-600">
                            <span className="text-sm">Normal</span>
                            <Bold size={16} />
                            <Italic size={16} />
                            <Underline size={16} />
                            <LinkIcon size={16} />
                            <List size={16} />
                            <ListOrdered size={16} />
                            <Heading size={16} />
                        </div>
                        <textarea
                            placeholder="Описание"
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-40 px-4 py-3 text-sm resize-none focus:outline-none"
                        />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-orange-400 text-white py-3 rounded-full text-sm font-medium hover:bg-orange-500 transition"
                        >
                            {isLoading ? 'Сохранение...' : 'Сохранить'}
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
