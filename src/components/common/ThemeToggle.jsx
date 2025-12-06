import { useEffect, useState } from 'react'
import { Moon } from 'lucide-react'
import { Sun } from 'lucide-react'

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('nebula-theme') || 'nebula-dark'
  )

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('data-mode', theme)
    localStorage.setItem('nebula-theme', theme)
  }, [theme])

  return (
    <button
      onClick={() =>
        setTheme((prev) =>
          prev === 'nebula-light' ? 'nebula-dark' : 'nebula-light'
        )
      }
      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
      title="Toggle Theme"
    >
      {theme === 'nebula-light' ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  )
}

export default ThemeToggle
