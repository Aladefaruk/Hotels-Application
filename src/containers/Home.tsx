import React, { useEffect, useState } from 'react'
import { HotelData } from '../data/HotelData';
import Template from './Template';
import { Link } from "react-router-dom";


const Home = () => {

    const [dataBase, setDataBase] = useState<any>(HotelData)


    // logic to get data from local storage
    useEffect(() => {
        const LocalStorageDB: any = localStorage.getItem("hotel_rank_db")

        if (LocalStorageDB && dataBase.length >= 0) {
            console.log('Data loaded from localStorage:', JSON.parse(LocalStorageDB));
            setDataBase(JSON.parse(LocalStorageDB));
        } else if (!LocalStorageDB) {
            console.log('Data loaded from localStorage:', JSON.parse(LocalStorageDB));

            localStorage.setItem("hotel_rank_db", JSON.stringify(HotelData));
        }
    }, [])




    const App = () => {
        return (
            <div className='w-full text-center'>

                <h1 className=' text-2xl lg:text-5xl '>Hi there &#128512;, Welcome to <span className='font-bold'>Hotel Rankings</span></h1>
                <p className='text-lg lg:text-2xl my-3'>Cllick on each chain to see our wonderful hotel option</p>
                <div className='flex items-center flex-wrap my-10 justify-center'>
                    {
                        dataBase?.map((data: any, index: number) =>
                            <Link to={`/chain/${data.chain_name.toLowerCase()}`}>
                                <div className='transition duration-300 transform hover:scale-105 w-64 h-64 mx-5 my-14' key={index}>
                                    <div className={`relative w-full h-full bg-cover bg-center bg-opacity-100 border-2   rounded-lg rounded-b-none hover:bg-opacity-0 `}  >
                                        <img
                                            alt="listing"
                                            src={data.img}
                                            className="object-cover h-full w-full group-hover:scale-110 transition"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center  text-[grey] text-2xl font-bold opacity-0 hover:opacity-100 transition duration-300">
                                            {data.chain_name} Chain
                                        </div>
                                        <div className='border-2 p-5 cursor-pointer border-[grey]  rounded-lg rounded-t-none mb-3 text-black  bg-[grey] w-66 opacity-60'>
                                            Check out Hotels listed under {data.chain_name}!
                                        </div>
                                    </div>
                                    
                                </div>
                            </Link >

                        )
                    }</div>
            </div >)
    }


    return (
        <div className='w-full'>
            <Template App={<App />} />
        </div>
    )
}


export default Home