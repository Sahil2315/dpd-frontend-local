import { Dialog, DialogHeader, DialogTrigger } from "./ui/dialog"
import type { Feedback, teamMember } from "../types"
import manPic from "../assets/man.jpg"
import ladyPic from "../assets/lady.jpg"
import { DialogClose, DialogContent, DialogDescription, DialogTitle} from '@radix-ui/react-dialog';
import { useEffect, useState } from "react"
import { baseAPI } from "../API"
import FeedbackInfo from "./FeedbackInfo"
import AddFeedback from "./AddFeedback";


const MemberInfo = ({memInfo, manid}: {memInfo: teamMember, manid: number}) => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
      useEffect(() => {
        async function Initialize(){
          let req = await fetch(baseAPI + `/api/fb/getEmpFeedbacks/${memInfo.empid}`, {
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
    <Dialog>
        <DialogTrigger className="flex mt-4 flex-row py-2 text-lg px-4 bg-indigo-500/25 items-center rounded-lg hover:bg-indigo-600/40">
        <img className="w-[60px] rounded-[40%]" src={memInfo.img == "man" ? manPic : ladyPic} alt="memInfo Pic" />
        <span className="ml-12 w-[200px] text-start">{memInfo.name}</span>
        <span className="ml-12 w-[250px] text-start">{memInfo.jobTitle}</span>
        <span className="ml-8 w-[320px] text-start">{memInfo.email}</span>
        <span className="ml-8 w-[150px] text-start">{memInfo.phone}</span>
        </DialogTrigger>
        <DialogContent className="h-full w-full absolute z-50 left-0 top-0 flex justify-center bg-neutral-950/80 backdrop-blur items-center">
            
            <DialogHeader className="w-[60%] h-[400px] p-6 relative overflow-y-auto bg-zinc-900 rounded-lg">
                <DialogClose className="absolute right-3 top-2 py-1 px-4 bg-rose-600/60 rounded-lg hover:bg-rose-600/90">Close</DialogClose>
                <DialogTitle className="text-xl font-semibold">
                    {memInfo.name} - {memInfo.jobTitle}
                </DialogTitle>
                <DialogDescription>
                    <div className="mt-4">
                        <span className="text-lg">Given Feedbacks:</span>
                        {
                            feedbacks.length == 0 ? <div className="mt-4 text-lg">No Feedbacks Given</div> :
                            feedbacks.map((fb, index) => {
                                return(
                                    <FeedbackInfo large={false} key={index} fbInfo={fb} />
                                )
                            })
                        }
                        <AddFeedback manid={manid} memInfo={memInfo} />
                    </div>
                    
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
    )
}

export default MemberInfo