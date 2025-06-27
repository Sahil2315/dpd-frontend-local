import { baseAPI } from "../API"
import { useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Toggle } from "./ui/toggle"
import LargeLoader from "./LargeLoader"

const Login = () => {
  const navigate = useNavigate()
  const [managerLogin, toggleManager] = useState<boolean>(false)
  const [uName, setUname] = useState<string>("")
  const [pWord, setPword] = useState<string>("")
  const [loading, toggleLoading] = useState<boolean>(false)
  async function LoginSubmit() {
    if (uName && pWord){
      toggleLoading(true)
      const req = await fetch(baseAPI + `/api/${managerLogin ? "mang" : "emp"}/login`, {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
          'username': uName,
          'password': pWord
        })
      })
      const resp = await req.json()
      console.log(resp)
      toggleLoading(false)
      if(resp.login == "successful"){
        if(managerLogin){
          navigate("/manager", {
            state: resp.userdata
          })  
        }
        else{
          navigate("/employee", {
            state: resp.userdata
          })
        }
      }
      else{
        toast("Invalid Credentials! Please Try Again", {
          style:{
            background: "black",
            color: "rgba(255,150,150,0.8)",
            borderColor: "rgba(255,100,100,0.5)",
            fontSize: 16
          }
        })
        setPword("")
        setUname("")
      }
    }
    else{
      toast("Fields Cannot be Left Empty!", {
        style:{
          background: "black",
          color: "rgba(255,150,150,0.8)",
          borderColor: "rgba(255,100,100,0.5)",
          fontSize: 16
        }
      })
    }
  }
  return (
    <div className="w-full h-full">
      <div className="flex flex-row w-full h-full">
        <div className="flex-1 h-full flex flex-col justify-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl">Login</span>
            <Toggle pressed={managerLogin} onPressedChange={(val) => toggleManager(val)} className={managerLogin ? 'bg-indigo-600/80 hover:bg-indigo-500/80 mt-4' : 'hover:bg-indigo-600/60 mt-4'} aria-label="manager-toggle">Manager Login</Toggle>
            <span className="mt-4">{managerLogin ? "Login as a Manager" : "Login as an Employee"}</span>
            <span className="mt-8 w-[80%] text-2xl">Username</span>
            <input value={uName} onChange={(e) => setUname(e.target.value)} className="w-[80%] border-gray-400/40 border-2 rounded-lg text-xl py-1 px-2 mt-2" type="text" />
            <span className="mt-8 w-[80%] text-2xl">Password</span>
            <input value={pWord} onChange={(e) => setPword(e.target.value)} className="w-[80%] border-gray-400/40 border-2 rounded-lg text-xl py-1 px-2 mt-2" type="password" />
            <button className="mt-8 bg-indigo-700/50 px-4 py-1 rounded-lg text-lg hover:bg-indigo-700/70" onClick={LoginSubmit}>Login</button>
          </div>
        </div>
        <div className="px-8 flex-2 flex flex-col justify-center items-center">
          <div className="flex flex-col border-l-2 py-8 border-gray-500 justify-center items-center">
            <span className="text-3xl">DPDZero Feedback System</span>
            <p className="w-[83%] mt-12 text-lg">This Feedback System serves as a dedicated internal platform that facilitates continuous feedback exchange between managers and their team members. Designed with simplicity, security, and approachability in mind, it empowers individuals at all levels to share insights, recognize strengths, and identify areas for improvement.</p>
            <p className="w-[83%] mt-8 text-lg">To see the working of this application, continue with the Login Process. For Convenience and Ease-Of-Use, there is an Autofill Feature for filling up the User Details Automatically.</p>
            <p className="w-[83%] mt-8 text-lg">This Application is hosted using Vercel for the Frontend (ReactJS) part of the Application and using AWS EC2 for hosting the Backend (Python - FastAPI) part of the Application. The Docker files could be used to run the backend on any machine but then, the React App should also be locally hosted in order to work properly together. <br /> For that, There will be a React App specifically for Local Hosting  in the GitHub Repo - <a href="https://github.com/Sahil2315/dpd-frontend-local" target="_blank" className="px-2 py-1 rounded-lg bg-indigo-600/40 text-[16px] hover:bg-indigo-600/60" rel="noopener noreferrer">DPDZero Task</a> along with all the required instructions for hosting the frontend app.</p>
          </div>
        </div>
      </div>
      <LargeLoader visible={loading} />
    </div>
  )
}

export default Login