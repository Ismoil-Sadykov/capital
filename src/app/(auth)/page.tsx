'use client'

import Image from "next/image";
import logo from '../../images/image 6.png'
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

export default function Page() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !password) {
      toast.error("Заполните телефон и пароль❗");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3001/users?phoneNumber=${phone}&password=${password}`
      );

      const data = await res.json();

      if (data.length > 0) {
        localStorage.setItem("user", JSON.stringify(data[0]));
        toast.success("Успешный вход ✅");
        router.push("/news");
      } else {
        toast.error("Неверный телефон или пароль❌");
      }
    } catch (error) {
      toast.error("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

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

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-full border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full border border-gray-200 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <span
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer select-none"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>
          
            <button className="text-sm text-orange-500 cursor-pointer hover:underline mb-4">
              Забыли пароль?
            </button>
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-full py-2 font-medium transition flex items-center justify-center gap-2
              ${loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"}
              `}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Вход...
              </>
            ) : (
              "Войти"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
