import { useState, useEffect } from "react"
import Payments from "../../../components/dashboard.user.components/Payments"
import Header from "../../../components/dashboard.admin.components/Header"

export default function PaymentsPage() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("dark-mode") === "true"
  )

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add("dark")
      localStorage.setItem("dark-mode", "true")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("dark-mode", "false")
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode((dm) => !dm)
 

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      <div
        className={`flex-1 flex flex-col transition-all duration-300`}
      >
        <Header
          darkMode={darkMode}
          setDarkMode={toggleDarkMode}
  
        />

        <main className="flex-1 p-0 pl-0 space-y-2 transition-all duration-200">
          <Payments />
        </main>
      </div>
    </div>
  )
}
