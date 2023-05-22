import Image from 'next/image'
import nlwLogo from '../assets/logo.svg'
import { Bai_Jamjuree as BaiJamFont } from 'next/font/google'
import Link from 'next/link'
const baijam = BaiJamFont({ subsets: ['latin'], weight: '700' })

export function Hero() {
  return (
    <div className="space-y-5">
      <Image src={nlwLogo} alt="Logo da Next Level Week" />

      <div className="max-w-[420px] space-y-1">
        <h1 className="mt-5 text-5xl font-semibold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          {
            'Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo'
          }
        </p>
      </div>
      <Link
        href="/memories/new"
        className={`${baijam.className} inline-block rounded-full bg-green-500 px-5 py-3 text-sm font-semibold uppercase leading-none text-gray-950 hover:bg-green-700`}
      >
        Cadastrar lembrança
      </Link>
    </div>
  )
}
