"use client"
import { eventBus } from "@/utils/helper/eventBus"
import { getSearchResult } from "@/utils/helper/network"
import { ChangeEvent, useState } from "react"
import Button from "../button/Button"

function Input() {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)


    const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setValue(value)
        console.log(value);


    }

    const submitHandler = async () => {
        setLoading(true)
        const data = await getSearchResult(value)
        // console.log(data, 'data');

        if (data?.length > 0) {
            eventBus.dispatch('search', { searchData: data })

            setLoading(false)
        } else {
            setTimeout(() => {
                setLoading(false)
                setError('No search result found')
            }, 60 * 1000)
        }
    }


    return (
        <div className="z-50 fixed bottom-0 my-7  left-2/4 -translate-x-1/2">

            {value.length > 0 && <h5 className="text-[red] text-xl mb-3 text-center" >{error}</h5>}
            <div className="flex gap-3 justify-center ">
                <input type="text" className="px-10 text-xl rounded-md text-[black] " placeholder="Enter search text" onChange={e => onChangeHandle(e)} />
                <Button loading={loading} lable={"search"} buttonStyle=" rounded-md text-[white] bg-[blue] font-bold text-xl px-7 w-36 flex justify-center items-center" action={submitHandler} />
            </div>
        </div>

    )
}

export default Input