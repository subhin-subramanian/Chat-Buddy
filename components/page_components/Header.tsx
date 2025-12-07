'use client'

import { useTheme } from 'next-themes'

function Header() {
    const {theme,setTheme} = useTheme();
  return (
    <div>
        
      Header
    </div>
  )
}

export default Header
