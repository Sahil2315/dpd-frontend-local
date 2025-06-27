export type Feedback = {
    created_at: string
    suggested_improvements: string
    overall: string
    strengths: string
    tags: string[]
}

export type teamMember = {
    name: string
    email: string
    phone: string
    img: string
    jobTitle: string
    empid: number
}

export type tagInfo = {
    tagid: number
    tagname: string
}