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
            <div className='w-full text-center'  >

                <h1 className=' text-2xl lg:text-5xl '>Hi there &#128512;, Welcome to <span className='font-bold'>Hotel Rankings</span></h1>
                <p className='text-lg lg:text-2xl my-3'>Cllick on each chain to see our wonderful hotel option</p>
                <div className='flex items-center flex-wrap my-10 justify-center'>
                    {
                        dataBase?.map((data: any, index: number) =>
                            <Link to={`/chain/${data.chain_name.toLowerCase()}`}>
                                <div className='transition duration-300 transform hover:scale-105 w-60 h-70 mx-5 my-14' key={index}>
                                    <div className={`relative w-full h-full bg-cover bg-center bg-opacity-100 border-2   rounded-lg rounded-b-none hover:bg-opacity-0 `}  >
                                        <img
                                            alt="listing"
                                            src={data.img}
                                            className="object-cover h-full w-full group-hover:scale-110 transition"
                                        />
                                        <div className="absolute  bottom-5 left-5 flex items-center justify-center  text-white text-sm h-14 rounded-md mx-auto w-5/6 font-bold  transition duration-300" style={{
                                            background: "rgba(255, 255, 255, 0.40)"
                                        }}>
                                            Hotels listed under {data.chain_name}!
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