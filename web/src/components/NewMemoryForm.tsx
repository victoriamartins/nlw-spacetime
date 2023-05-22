'use client'

import { Camera } from 'lucide-react'
import { MediaPicker } from './MediaPicker'
import { FormEvent } from 'react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { Bai_Jamjuree as BaiJam } from 'next/font/google'

const baijam = BaiJam({
  subsets: ['latin'],
  weight: '700',
})

export function NewMemoryForm() {
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)
      const uploadResponse = await api.post('/upload', uploadFormData)
      coverUrl = uploadResponse.data.fileUrl
    }

    const token = Cookie.get('token')

    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/')
  }

  return (
    <form
      onSubmit={handleCreateMemory}
      className="flex w-full flex-1 flex-col gap-2"
    >
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm
             text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          anexar mídia
        </label>
        <label
          htmlFor="isPublic"
          className="gap-1.6 flex items-center text-sm text-gray-200
             hover:text-gray-100"
        ></label>
        <div className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700
               text-purple-500"
          />
          <span className="text-sm">tornar memória pública</span>
        </div>
      </div>

      {/* input img with preview */}
      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        placeholder="sinta-se livre para adicionar fotos, vídeos e relatos 
          sobre esta experiência que você quer lembrar para sempre..."
        className="text-large w-full flex-1 resize-none rounded border-0 
          bg-transparent p-0 leading-relaxed text-gray-100 
          placeholder:text-gray-600 focus:ring-0"
      />
      <button
        type="submit"
        className={`self-end rounded-full bg-green-500 px-5 py-3 text-sm font-semibold uppercase leading-none text-gray-950 hover:bg-green-700`}
      >
        Salvar
      </button>
    </form>
  )
}
