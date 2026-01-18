'use client';

import { useAddNewsMutation } from '@/src/store/api';
import {
    ArrowLeft,
    Bold,
    Italic,
    Underline,
    Link as LinkIcon,
    List,
    ListOrdered,
    Heading,
    Download,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AddNewsPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [addNews, { isLoading }] = useAddNewsMutation();

    const router = useRouter()

    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !date || !image) {
            toast.error("Заполните все поля");
            return;
        }

        await addNews({
            title,
            description,
            date,
            image,
        });
        toast.success("Товар успешно добавлен✅")
        router.push("/news");
    };


    return (
        <div className="min-h-screen bg-white flex justify-center py-10">
            <div className="w-full max-w-2xl px-4">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-orange-400 text-orange-400">
                        <Link href={"/news"}>
                            <ArrowLeft size={18} />
                        </Link>
                    </div>
                    <h1 className="text-xl font-semibold">Добавить новость</h1>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Название"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input
                        type="text"
                        placeholder="Краткое описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <div className="relative">
                        <input
                            type="date"
                            placeholder="Дата публикации"
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
                            className="w-full h-40 px-4 py-3 text-sm resize-none focus:outline-none"
                        />
                    </div>
                    <div className="border border-dashed border-gray-300 rounded-xl py-10 flex flex-col items-center justify-center text-center text-gray-500">
                        <label className="cursor-pointer">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-3 hover:bg-orange-200 transition">
                                <Download size={20} />
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        handleImageUpload(e.target.files[0]);
                                    }
                                }}
                            />
                        </label>
                        {image && (
                            <img
                                src={image}
                                alt="preview"
                                className="w-[100px] mx-auto"
                            />
                        )}
                        <p className="font-medium text-sm">Загрузить фото</p>
                        <p className="text-xs text-gray-400 mt-1">
                            Размер файла не более 5 MB
                        </p>
                    </div>
                    <div className="flex gap-4 pt-4 items-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 cursor-pointer bg-orange-400 text-white py-3 rounded-full font-medium hover:bg-orange-500 transition"
                        >
                            {isLoading ? "Сохранение..." : "Сохранить"}
                        </button>
                        <Link href={"/news"}>
                            <button className="text-orange-500 font-medium cursor-pointer">
                                Отмена
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
