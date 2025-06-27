import { useLocation } from "react-router-dom"
import manPic from "../assets/man.jpg"
import ladyPic from "../assets/lady.jpg"
import { useEffect, useState } from "react"
import { baseAPI } from "../API"
import type { teamMember } from "@/types"
import MemberInfo from "./MemberInfo"

const MngrHome = () => {
  const {state} = useLocation()
  const [photo, setPhoto] = useState(manPic)
  if (state.img == "woman"){
    setPhoto(ladyPic)
  }
  const teamName = state.team
  const [mangTeam, setTeam] = useState<teamMember[]>([])
  useEffect(() => {
    async function Initialize() {
      const req = await fetch( baseAPI + `/api/mang/getTeam/${teamName}`, {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json'
        }
      })
      const resp = await req.json()
      console.log(resp)
      setTeam(resp)
    }
    Initialize()
  }, [])
  return (
    <div className="w-full h-full flex flex-row">
      <div className="flex flex-col flex-1 h-full justify-center items-center">
        <img className="w-[300px] rounded-full" src={photo} alt="Man Photo" />
        <span className="mt-12 text-3xl font-semibold">{state.name}</span>
        <div className="flex flex-col mt-6 text-lg">
          <span className="mt-2">Email - {state.email}</span>
          <span className="mt-2">Phone - {state.phone}</span>
          <span className="mt-2">Team - {state.team}</span>
          <span className="mt-2">Role - Team Manager</span>
        </div>
      </div>
      <div className="flex flex-col flex-2 justify-center px-2">
        <div className="flex flex-col w-full h-[80%] bg-black/30 p-4 rounded-lg">
          <span className="w-full mb-4 text-2xl font-semibold">Your Team:</span>
          {
            mangTeam.map((member, index) => {
              return(
                <MemberInfo manid={state.manid} key={index} memInfo={member} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default MngrHome