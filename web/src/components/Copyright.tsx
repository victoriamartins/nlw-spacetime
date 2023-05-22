import { Roboto_Flex } from 'next/font/google'

const roboto = Roboto_Flex({ subsets: ['latin'], variable: '--font-roboto' })

export function Copyright() {
  return (
    <div
      className={`text-sn leading-relaxed text-gray-200 ${roboto.className}`}
    >
      Feito com 💜 no NLW da{' '}
      <a
        href="https://rocketseat.com.br"
        className="underline hover:text-purple-300"
        target="_blank"
        rel="noreferrer"
      >
        Rocketseat
      </a>
    </div>
  )
}
