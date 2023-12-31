import Link from 'next/link'
import { useRouter } from 'next/router'
import MenuIcon from '../icons/menu.svg'
import XIcon from '../icons/x.svg'
import { VALID_TAGS } from '~/constants/tags'
import { Search } from './search'

type NavProps = {
  open: boolean
  onToggle: () => void
}

export const Nav: React.FC<NavProps> = ({ open, onToggle }) => {
  const router = useRouter()
  const path = router.asPath
    .replace(/\/$/, '')
    .replace(/\?.*$/, '')
    .replace(/\#.*$/, '')

  return (
    <>
      <nav className="flex flex-wrap items-stretch gap-4">
        <Link
          href="/"
          className="print-exact group bg-black px-3 py-2 leading-snug text-white dark:bg-white dark:text-black"
        >
          <span className="group-hover:hidden">r.c.p.s</span>
          <span className="hidden group-hover:inline">recipes</span>
        </Link>

        <div className="hidden flex-wrap items-center gap-4 md:flex">
          {VALID_TAGS.map(tag => (
            <Link
              key={tag.value}
              href={`/${tag.value}`}
              className="font-semibold underline hover:text-red-600"
              title={tag.name}
            >
              {tag.short}
            </Link>
          ))}
        </div>

        <div className="flex flex-1 flex-wrap items-stretch justify-end gap-4">
          <button
            className="flex items-center justify-center self-center p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 print:hidden md:hidden"
            onClick={onToggle}
          >
            {open ? (
              <XIcon className="h-6 w-6 text-current" />
            ) : (
              <MenuIcon className="h-6 w-6 text-current" />
            )}
          </button>

          <Search className="hidden print:hidden md:flex" />

          <a
            className="hidden self-center text-sm print:block"
            href={`https://rcps.io${path}`}
          >
            rcps.io{path}
          </a>
        </div>
      </nav>

      {open && (
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto text-center text-lg font-semibold">
            {VALID_TAGS.map(tag => (
              <Link
                key={tag.value}
                href={`/${tag.value}`}
                title={tag.name}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {tag.name}
              </Link>
            ))}
          </div>
          <Search expanded className="flex print:hidden" inputClassName="p-3" />
        </div>
      )}
    </>
  )
}
