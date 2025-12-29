import Header from "@/components/Header"

function layout( {children} : {children:React.ReactNode} ) {

  return (
    <div className="flex flex-col pt-16">
      <Header/>
      {children}
    </div>
  )
}

export default layout
