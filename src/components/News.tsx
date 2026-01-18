'use client'

import Image from "next/image"
import { useGetPostsQuery } from "../store/api"
import { EyeOff, Newspaper, Pencil, Trash2 } from "lucide-react"
import { PostCardSkeleton } from "./Loading"


export default function News() {
    const { data, isLoading } = useGetPostsQuery()

    const showSkeleton = isLoading && !data

    return (
        <div>
            <div className="flex gap-[28px] justify-between p-5 flex-wrap">
                {showSkeleton
                    ? Array.from({ length }).map((_, i) => (
                        <PostCardSkeleton key={i} />
                    ))
                    : data?.map((user) => {
                        return (
                            <div className="w-[360px] rounded-2xl bg-white shadow-md overflow-hidden mb-7" key={user.id}>
                                <div className="relative h-[200px] w-full">
                                    <Image
                                        src={user.image}
                                        alt={user.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium">
                                        <Newspaper />
                                        {user.date}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="mb-2 text-xl font-bold">{user.title}</h3>
                                    <p className="mb-4 text-sm text-gray-600">
                                        {user.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <button className="flex items-center gap-1 text-orange-500 font-medium">
                                            Подробнее
                                            <span className="text-lg">›</span>
                                        </button>
                                        <div className="flex gap-2">
                                            <button className="h-9 w-9 rounded-full border flex items-center justify-center text-gray-500">
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
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
