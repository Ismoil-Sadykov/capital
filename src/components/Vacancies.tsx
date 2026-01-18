'use client'
import toast from "react-hot-toast";
import { Vacancy } from "../app/types/type"
import { useDeleteVacancyMutation, useGetVacanciesQuery } from "../store/api"
import { EyeOff, MapPin, Pencil, Trash2 } from "lucide-react";

export default function Vacancies() {
    const { data, isLoading } = useGetVacanciesQuery()
    const [deleteVacancy] = useDeleteVacancyMutation();

    const handleDelete = async (id: string) => {
        if (!confirm("Вы уверены, что хотите удалить вакансию?")) return;

        try {
            await deleteVacancy(id).unwrap();
            toast.success("Вакансия удалена ✅");
        } catch {
            toast.error("Ошибка при удалении");
        }
    };

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="flex flex-wrap gap-7 p-5">
            {data?.map((item: Vacancy) => {
                return (
                    <div key={item.id} className="w-[360px] rounded-2xl bg-white p-5 shadow-md">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="rounded-full bg-slate-900 px-3 py-1 text-sm text-white">
                                {item.experience}
                            </span>

                            <div className="flex items-center gap-1 text-gray-400 text-sm">
                                <MapPin size={16} />
                                {item.city}
                            </div>
                        </div>

                        <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                        <p className="mb-4 text-gray-500 text-sm line-clamp-3">
                            {item.description}
                        </p>

                        <div className="flex items-center justify-between">
                            <button className="flex items-center gap-1 text-orange-500 font-medium">
                                Подробнее <span className="text-lg">›</span>
                            </button>

                            <div className="flex gap-2">
                                <button onClick={() => handleDelete(item.id)}
                                    className="cursor-pointer h-9 w-9 rounded-full border flex items-center justify-center text-gray-400">
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
            })}
        </div>
    )
}
