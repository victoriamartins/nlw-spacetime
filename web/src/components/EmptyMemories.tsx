export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center p-16">
      <p className="w-[360px] text-center leading-relaxed">
        {' '}
        {/* Reading relaxed deixa um espaço bom para a line hight */}
        Você ainda não registrou nenhuma lembrança, comece a{' '}
        <a href="" className="underline hover:text-gray-50">
          criar agora
        </a>
        !
      </p>
    </div>
  )
}
