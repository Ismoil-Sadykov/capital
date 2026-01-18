'use client'

import Image from "next/image";
import logo from '../../images/image 6.png'
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded">
              <Image src={logo} alt="logo" />
            </div>
            <span className="font-bold text-lg">КАПИТАЛ-Т</span>
          </div>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Телефон"
            className="w-full rounded-full border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              className="w-full rounded-full border border-gray-200 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <span
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer select-none"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          <Link href={'/forgotPassword'}>
            <button className="text-sm text-orange-500 cursor-pointer hover:underline mb-4">
              Забыли пароль?
            </button>
          </Link>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white rounded-full py-2 font-medium hover:bg-orange-600 transition"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}
