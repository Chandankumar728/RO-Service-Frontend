import { Outlet } from "react-router-dom"

export default function AdminLayout() {
  return (
   <>
    <div>
        <h1>Header</h1>
    </div>
    <Outlet/>
    <div>
        <h1>Footer</h1>
    </div>
   </>
  )
}
