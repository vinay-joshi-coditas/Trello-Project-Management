import { RouterProvider } from "react-router-dom"
import { routes } from "./routes/router"

const App = () => {
  return (
    <>
      <RouterProvider router={routes} />
    </>    
  )
}

export default App