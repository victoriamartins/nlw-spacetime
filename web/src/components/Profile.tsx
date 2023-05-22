import { getUser } from '@/lib/auth'
import Image from 'next/image'

export function Profile() {
  const { name, avatarUrl } = getUser()
  return (
    <div className="flex items-center gap-3 text-left transition-colors">
      {/* Profile Icon; the width is the size it is uploaded not shown */}
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt=""
        className="h-10 w-10 rounded-full"
      />

      {/* Profile text */}
      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <a
          href="/api/auth/logout"
          className="block text-xs text-purple-700 hover:text-purple-300"
        >
          Quero sair
        </a>
      </p>
    </div>
  )
}
