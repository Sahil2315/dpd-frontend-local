import { useLocation } from "react-router-dom"
import manPic from "../assets/man.jpg"
import ladyPic from "../assets/lady.jpg"
import { useEffect, useState } from "react"
import { baseAPI } from "../API"
import type { Feedback } from "../types"
import FeedbackInfo from "./FeedbackInfo"

const EmpHome = () => {
  const {state} = useLocation()
  let [photo, setPhoto] = useState(manPic)
  if(state.img == "woman"){
    setPhoto(ladyPic)
  }
  const empid = state.empid
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  useEffect(() => {
    async function Initialize(){
      let req = await fetch(baseAPI + `/api/fb/getEmpFeedbacks/${empid}`, {
        'method': "GET",
        'headers':{
          'Content-Type': 'application/json'
        }
      })
      let resp = await req.json()
      setFeedbacks(resp.reverse())
    }
    Initialize()
  }, [])

  return (
    <div className="w-full h-full flex flex-row">
      <div className="flex flex-col flex-1 items-center justify-center">
        <img className="w-[300px] rounded-full" src={photo} alt="Man Photo" />
        <span className="mt-8 text-2xl font-semibold">{state.name}</span>
        <div className="flex flex-col mt-4 text-md">
          <span>Email - {state.email}</span>
          <span>Phone - {state.phone}</span>
          <span>Current Address - {state.currentAddress}</span>
          <span>Permanent Address - {state.permanentAddress}</span>
          <span>Department - {state.department}</span>
          <span>Role - {state.jobTitle}</span>
          <span>Team - {state.team}</span>
        </div>
      </div>
      <div className="flex flex-col items-center px-2 justify-center flex-2">
        <div className="flex flex-col w-full h-[80%] bg-black/30 p-4 rounded-lg">
          <span className="w-full mb-4 text-2xl font-semibold">Feedback Received:</span>
          {
          feedbacks.map((fb, index) => {
            return(
              <FeedbackInfo key={index} large={true} fbInfo={fb} />
            )
          })
        }
        </div>
      </div>
    </div>
  )
}

export default EmpHome