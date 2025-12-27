import Header from "@/components/page_components/Header"

function layout( {children} : {children:React.ReactNode} ) {

  return (
    <div className="flex flex-col pt-16">
      <Header/>
      {children}
    </div>
  )
}

export default layout
