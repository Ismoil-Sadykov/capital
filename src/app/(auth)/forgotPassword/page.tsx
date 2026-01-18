'use client'

import Image from "next/image";
import logo from '../../../images/image 6.png'


export default function Page() {

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

                <p className="text-center w-[400px] mb-[28px] text-[#111827]">На ваш номер телефона будет отправлен код для подтверждения</p>
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Телефон"
                        className="w-full rounded-full border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />


                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white rounded-full py-2 font-medium hover:bg-orange-600 transition mt-[40px]"
                    >
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    )
}
