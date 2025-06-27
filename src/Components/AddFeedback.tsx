import { Dialog, DialogClose, DialogTrigger,DialogContent} from "@radix-ui/react-dialog"
import type { tagInfo, teamMember } from "../types"
import { DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { useEffect, useState } from "react"
import { baseAPI } from "../API"
import { toast } from "sonner"
import  Loader  from "./Loader"

const AddFeedback = ({memInfo, manid}: {memInfo: teamMember, manid: number}) => {
    const [tags, setTags] = useState<tagInfo[]>([])
    useEffect(() => {
        async function Init(){
            let req = await fetch(baseAPI + "/api/fb/getAllTags")
            let resp = await req.json()
            setTags(resp)
        }
        Init()
    }, [])
    let [selectedSet, changeSelected] = useState<Set<number>>(new Set())
    const [overall, setOverall] = useState<string>("")
    const [strength, setStrength] = useState<string>("")
    const [improvements, setImprovements] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    async function submit() {
        if(loading){
            toast(`Wait for the Previous Request to complete`, {
                style:{
                    backgroundColor: "black",
                    color: "rgba(255,120, 120, 0.6)",
                    fontSize: 16
                }
            })
        }
        if(overall && strength && improvements){
            if (selectedSet.size == 0){
                toast("Select at least one tag")
            }
            else{
                setLoading(true)
                const req = await fetch(baseAPI + `/api/fb/addFeedback`, {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    'body': JSON.stringify({
                        'empid': memInfo.empid,
                        'manid': manid,
                        'overall': overall,
                        'strengths': strength,
                        'improvements': improvements,
                        'tags': [ ...selectedSet]
                    })
                })
                const resp = await req.json()
                if(resp.success){
                    toast(`Successfully Added Feedback for ${memInfo.name}`, {
                        style:{
                            backgroundColor: "black",
                            color: "green",
                            fontSize: 16
                        }
                    })
                    changeSelected(new Set())
                    setImprovements("")
                    setStrength("")
                    setOverall("")
                    setLoading(false)
                }
            }
        }
        else{
            toast("All Values are necessary", {
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
    <Dialog>
        <DialogTrigger className="bg-zinc-400 text-black py-1 opacity-50 px-2 z-50 rounded-lg mt-4 hover:opacity-80"> + Add Feedback</DialogTrigger>
        <DialogContent className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 backdrop-blur">
            <DialogHeader className="w-[80%] relative h-[80%] bg-zinc-900 rounded-lg p-4">
                <DialogClose className="absolute top-2 right-3 px-3 py-1 bg-rose-600/60 hover:bg-rose-600/90 rounded-lg">X</DialogClose>
                <DialogTitle className="text-xl">
                    Add New Feedback for {memInfo.name} - {memInfo.jobTitle}
                </DialogTitle>
                <DialogDescription className="flex flex-row">
                    <div className="flex flex-col flex-3 pr-4">
                        <span className="text-lg mt-3 w-full">Description:</span>
                        <input value={overall} onChange={(e) => setOverall(e.target.value)} type="text" className="py-1 px-2 rounded-lg text-lg border-slate-500/30 border mt-4" placeholder="Overall Sentiment"/>
                        <input value={strength} onChange={(e) => setStrength(e.target.value)} type="text" className="py-1 px-2 rounded-lg text-lg border-slate-500/30 border mt-4" placeholder="Strengths" />
                        <input value={improvements} onChange={(e) => setImprovements(e.target.value)} type="text" className="py-1 px-2 rounded-lg text-lg border-slate-500/30 border mt-4" placeholder="Areas for Improvement" />
                        <button onClick={submit} className="py-1 px-3 ml-2 text-lg rounded-lg mt-4 self-center bg-indigo-600/40 w-max hover:bg-indigo-600/70">{loading ? <Loader /> : "Submit"}</button>
                    </div>
                    <div className="flex-2 flex flex-col">
                        <span className="text-lg mt-3">Tags:</span>
                        <div className="flex flex-row flex-wrap">
                            {
                                tags.map((tg, tind) => {
                                    return(
                                        <button onClick={() => {
                                            if(selectedSet.has(tg.tagid)){
                                                const newSet = new Set(selectedSet)
                                                newSet.delete(tg.tagid)
                                                changeSelected(newSet)
                                            }
                                            else{
                                                changeSelected(prev => new Set(prev).add(tg.tagid))
                                            }
                                        }} className={`py-1 px-2 ml-2 rounded-lg ml-2 mt-2 ${selectedSet.has(tg.tagid) ? "bg-indigo-600/70" : "bg-indigo-600/20 hover:bg-indigo-600/50"}`} key={tind}>{tg.tagname}</button>
                                    )
                                })
                            }
                        </div> 
                    </div>
                    
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
)
}

export default AddFeedback