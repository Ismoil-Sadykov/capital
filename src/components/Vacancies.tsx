'use client'
import { Vacancy } from "../app/types/type"
import { useGetVacanciesQuery } from "../store/api"
import { VacancyCard } from "./VacancyCard"

export default function Vacancies() {
    const { data, isLoading } = useGetVacanciesQuery()

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="flex flex-wrap gap-7 p-5">
            {data?.map((item: Vacancy) => (
                <VacancyCard
                    key={item.id}
                    experience={item.experience}
                    city={item.city}
                    title={item.title}
                    description={item.description}
                />
            ))}
        </div>
    )
}
