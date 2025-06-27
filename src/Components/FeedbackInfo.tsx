import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import type { Feedback } from "../types"
import { DialogHeader } from "./ui/dialog"

const FeedbackInfo = ({fbInfo, large}: {fbInfo: Feedback, large: boolean}) => {
    if(large){
        return(
            <Dialog>
                <DialogTrigger className="flex mt-2 flex-row py-2 px-4 bg-indigo-500/25 w-[100%] rounded-lg hover:bg-indigo-600/40">
                    <span>{fbInfo.created_at.slice(0, 10)} - {fbInfo.created_at.slice(11, 16)}</span>
                    <span className="ml-10 text-start truncate w-[150px]">Overall - {fbInfo.overall}</span>
                    <span className="ml-6 text-start truncate w-[370px]">{fbInfo.strengths}</span>
                    <span className="ml-8 text-start truncate w-[370px]">{fbInfo.suggested_improvements}</span>
                </DialogTrigger>
                <DialogContent className="w-full h-full absolute top-0 left-0 bg-black/50 flex justify-center items-center backdrop-blur">
                    <DialogHeader className="w-[80%] h-[300px] bg-zinc-900 p-4 rounded-lg relative">
                        <DialogClose className="absolute right-3 top-2 py-1 px-4 bg-rose-600/60 rounded-lg outline-none hover:bg-rose-600/90">X</DialogClose>
                        <DialogTitle className="text-2xl font-semibold">Feedback Information</DialogTitle>
                        <DialogDescription>
                            <div className="flex flex-col text-lg">
                                <div className="flex flex-row mt-3">
                                    <span>{fbInfo.created_at.slice(0,10) } - {fbInfo.created_at.slice(11,16) }</span>
                                    <span className="ml-6"> Overall - <span className={fbInfo.overall == "Positive" || fbInfo.overall == "positive" ? "text-emerald-400" : fbInfo.overall == "Negative" || fbInfo.overall == "negative" ? "text-rose-600" : "text-amber-400"}>{fbInfo.overall}</span></span>
                                </div>
                                <div className="mt-4">
                                    <span>Strengths - {fbInfo.strengths}</span>
                                </div>
                                <div className="mt-4">
                                    <span>Areas to Improve - {fbInfo.suggested_improvements}</span>
                                </div>
                                <div className="flex flex-row flex-wrap mt-6 text-[15px]">
                                    {
                                        fbInfo.tags.map((tag, index) => {
                                            return((
                                                <span className={index != 0 ? "px-2 py-1 bg-indigo-500/70 ml-4 rounded-lg" : "px-2 py-1 bg-indigo-500/70 rounded-lg"} key={index} >{tag}</span>
                                            ))
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
  return (
    <Dialog>
        <DialogTrigger className="flex mt-2 flex-row py-2 px-4 bg-indigo-500/25 w-[100%] text-sm rounded-lg hover:bg-indigo-600/40">
            <span>{fbInfo.created_at.slice(0, 10)} - {fbInfo.created_at.slice(11, 16)}</span>
            <span className="ml-10 text-start truncate w-[120px]">Overall - {fbInfo.overall}</span>
            <span className="ml-6 text-start truncate w-[320px]">{fbInfo.strengths}</span>
            <span className="ml-8 text-start truncate w-[320px]">{fbInfo.suggested_improvements}</span>
        </DialogTrigger>
        <DialogContent className="w-full h-full absolute top-0 left-0 bg-black/50 z-70 flex justify-center items-center backdrop-blur">
            <DialogHeader className="w-[80%] h-[70%] bg-zinc-900 p-4 rounded-lg relative">
                <DialogClose className="absolute right-3 top-2 py-1 px-4 bg-rose-600/60 rounded-lg outline-none hover:bg-rose-600/90">X</DialogClose>
                <DialogTitle className="text-2xl font-semibold">Feedback Information</DialogTitle>
                <DialogDescription>
                    <div className="flex flex-col text-lg">
                        <div className="flex flex-row mt-3">
                            <span>{fbInfo.created_at.slice(0,10) } - {fbInfo.created_at.slice(11,16) }</span>
                            <span className="ml-6"> Overall - <span className={fbInfo.overall == "Positive" || fbInfo.overall == "positive" ? "text-emerald-400" : fbInfo.overall == "Negative" || fbInfo.overall == "negative" ? "text-rose-600" : "text-amber-400"}>{fbInfo.overall}</span></span>
                        </div>
                        <div className="mt-4">
                            <span>Strengths - {fbInfo.strengths}</span>
                        </div>
                        <div className="mt-4">
                            <span>Areas to Improve - {fbInfo.suggested_improvements}</span>
                        </div>
                        <div className="flex flex-row flex-wrap mt-6 text-[15px]">
                            {
                                fbInfo.tags.map((tag, index) => {
                                    return((
                                        <span className={index != 0 ? "px-2 py-1 bg-indigo-500/70 ml-4 rounded-lg" : "px-2 py-1 bg-indigo-500/70 rounded-lg"} key={index} >{tag}</span>
                                    ))
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

export default FeedbackInfo