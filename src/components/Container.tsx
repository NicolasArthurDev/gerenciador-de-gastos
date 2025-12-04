import { Children } from "react"


const Container = ({children}) => {
  return (
    <>
      <div className="max-lg pr-6 pl-6">
        {children}
      </div>
    </>
  )
}

export default Container