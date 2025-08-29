import { useState, type ChangeEvent, type FormEvent } from "react"
import '../index.css'
import { supabase } from "../lib/supabase"

interface quoteType {
    statement: string
}

function Quote(){

    const [ quote , setQuote] = useState<quoteType>({
        statement: ''
    })

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>)=>{
        const {name, value} = e.target
        setQuote((prev)=>({
            ...prev,
            [name]: value
        }))
    }


    const handleSubmit = async (e: FormEvent) =>{
        e.preventDefault()
        console.log(quote)
        try {
            const {data: { session } } = await supabase.auth.getSession();
            if(!session){
                throw new Error('You must be logged in to add a quote')
            }
           
            const {data, error} = await supabase 
                .from('Quotes')
                .insert(
                    [
                        { 
                            statement: quote.statement, 
                            user_id: session.user.id, // convert this to a uuid
                        }
                    ])
                .select();

            if(error){
                throw error
            }
            console.log("Quote added successfully:", data)
            setQuote({ statement: '' })
           
        } catch (error: any) {
            console.error('Error adding quote to the table', error)
        }
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <h1>create quote</h1>
            <div className="textarea-container">
                <label htmlFor="statement">statement</label>
                <textarea 
                    name="statement" 
                    id="statement" 
                    cols={80} 
                    rows={9}
                    maxLength={250}
                    autoFocus
                    wrap="hard"
                    value={quote.statement}
                    onChange={handleChange}
                    required
                    >
                </textarea>
            </div>
            <div className="post-btn">
                <button>post Quote</button>
            </div>
        </form>
    )
}

export default Quote