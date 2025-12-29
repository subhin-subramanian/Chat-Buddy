import { MessageCircle } from "lucide-react"
import Link from "next/link"

function  Logo() {
  
  return (
    <Link href='/' className="flex items-center gap-2">
      <MessageCircle className="size-9 text-primary"/>
      <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary tracking-wider'>
        ChatBuddy</span>
    </Link>
  )
}

export default Logo
