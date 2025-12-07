import { MessageCircle } from "lucide-react"

function Logo() {
  return (
      <div className="mb-4 flex items-center justify-start gap-2">
            <MessageCircle className="size-9 text-primary"/>
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary tracking-wider'>
              ChatBuddy</span>
          </div>
  )
}

export default Logo
