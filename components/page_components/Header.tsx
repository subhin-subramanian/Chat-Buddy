'use client'

import { Button } from '../ui/button'
import { useTheme } from 'next-themes'

function Header() {
    const {theme,setTheme} = useTheme();
  return (
    <div>
        <Button onClick={()=>setTheme(theme === "dark" ? "light" : "dark")}></Button>
      Header
    </div>
  )
}

export default Header
