'use client'

import Image from "next/image"
import { useDeleteNewsMutation, useGetPostsQuery } from "../store/api"
import { EyeOff, Newspaper, Pencil, Trash2 } from "lucide-react"
import { PostCardSkeleton } from "./Loading"
import toast from "react-hot-toast"
import Link from "next/link"


export default function News() {
    const { data, isLoading } = useGetPostsQuery()
    const [deleteNews] = useDeleteNewsMutation();

    const handleDelete = async (id: string) => {
        if (!confirm("Вы уверены, что хотите удалить новость?")) return;

        try {
            await deleteNews(id).unwrap();
            toast.success("Новость удалена ✅");
        } catch {
            toast.error("Ошибка при удалении");
        }
    };

    const showSkeleton = isLoading && !data
    const SKELETON_COUNT = 6;

    return (
        <div>
            <div className="flex gap-[28px] justify-between p-5 flex-wrap">
                {showSkeleton
                    ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                        <PostCardSkeleton key={i} />
                    ))
                    : data?.map((user) => {
                        return (
                            <div className="w-[360px] rounded-2xl bg-white shadow-md overflow-hidden mb-7" key={user.id}>
                                <div className="relative h-[200px] w-full">
                                    {user.image && (
                                        <Image
                                            src={user.image}
                                            alt={user.title}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
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
                                            <button onClick={() => handleDelete(user.id)}
                                                className="cursor-pointer h-9 w-9 rounded-full border flex items-center justify-center text-gray-500">
                                                <Trash2 size={18} />
                                            </button>
                                            <button className="cursor-pointer h-9 w-9 rounded-full border flex items-center justify-center text-orange-500">
                                                <Link href={`/news/${user.id}`}>
                                                    <Pencil size={18} />
                                                </Link>
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
