'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
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
} from 'lucide-react'
import { useUpdateNewsMutation } from '@/src/store/api'

export default function Edit() {
  const { editNews } = useParams()
  const id = editNews as string
  const router = useRouter()
  const [updateNews] = useUpdateNewsMutation()

  const [formData, setFormData] = useState<{
    title: string
    description: string
    image: string | null
  }>({
    title: '',
    description: '',
    image: null,
  })

  useEffect(() => {
    const getById = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/news/${id}`
        )

        setFormData({
          title: data.title ?? '',
          description: data.description ?? '',
          image: data.image || null,
        })
      } catch (error) {
        console.error(error)
      }
    }

    if (id) getById()
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result as string,
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { data: existing } = await axios.get(
        `http://localhost:3001/news/${id}`
      )

      await updateNews({
        id,
        data: {
          ...existing,
          ...formData,
        },
      }).unwrap()

      toast.success('Новость успешно отредактирована')
      router.push('/news')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-white flex justify-center py-10">
      <div className="w-full max-w-2xl px-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 flex items-center justify-center rounded-full border border-orange-400 text-orange-400">
            <Link href="/news">
              <ArrowLeft size={18} />
            </Link>
          </div>
          <h1 className="text-xl font-semibold">
            Редактировать новость
          </h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Название"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="text"
            name="description"
            placeholder="Краткое описание"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
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
              name="description"
              value={formData.description}
              onChange={handleChange}
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
                    handleImageUpload(e.target.files[0])
                  }
                }}
              />
            </label>
            {formData.image && (
              <img
                src={formData.image}
                alt="Превью новости"
                className="w-[100px] mx-auto mb-2"
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
              className="flex-1 bg-orange-400 text-white py-3 rounded-full text-sm font-medium hover:bg-orange-500 transition"
            >
              Сохранить
            </button>

            <Link
              href="/news"
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
