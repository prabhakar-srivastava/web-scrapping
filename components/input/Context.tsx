"use client"
import { eventBus } from '@/utils/helper/eventBus'
import { scrapping } from '@/utils/helper/network'
import React, { useEffect, useState } from 'react'
import Loader, { TYPE } from '../button/Loader'

function Context() {
    const [listData, setListData] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        eventBus.on('search', (data: any) => {
            // setContext(data?.searchData)
            if (data?.searchData) {
                getScraper(data?.searchData)

            }
        })
    }, [])

    // useEffect(() => {
    //     getScraper()

    // }, [context])


    const getScraper = async (context: any) => {
        setLoading(true)
        try {
            const data = Promise.all(context?.map(async (element: any) => await scrapping(element?.link)))
            context?.map(async (element: any) => await scrapping(element?.link));
            if (data) {
                data.then((val) => {
                    // console.log(val, 'val');
                    setListData(val)
                    setLoading(false)
                }).catch((err) => {
                    setLoading(false)
                    setError(err)
                })
            }

        } catch (error) {
            console.log(error, 'error getScraper');
            setLoading(false)
            setError('Error scrapping url: ' + error)

        }

    }


    return loading ? (
        <div className='flex flex-col lg:flex-row justify-center items-center py-7 px-4 lg:px-0 gap-3'>
            <Loader type={TYPE.WHITE} loaderHeight={50} loaderWidth={50} />
            <h5 className=' text-base text-[white] lg:text-xl'>
                Please wait... while scraping your query...
            </h5>
        </div>
    ) : (
        <div className='flex flex-col gap-14 my-10'>
            {error?.length > 0 && (
                <div className='flex flex-col lg:flex-row justify-center text-[red] items-center py-7 px-4 '>
                    {error}
                </div>
            )}
            {!error?.length && listData.length > 0 && listData?.map((items: any, index: number) => {
                const link = items?.["resolved-url"]
                console.log(items?.["resolved-url"], "urls");

                return <div key={index} className='text-[white]'>
                    <a className='text-[#6f6fff] underline underline-offset-4' href={`${link}`} target='_blank'>{link}</a>
                    <p className='mt-3'>{items?.body?.text}</p>
                </div>
            })}
        </div>
    )
}

export default Context