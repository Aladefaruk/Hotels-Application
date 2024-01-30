/** @format */

import React, { useEffect, useState, useRef } from 'react'
import { HotelData } from '../../data/HotelData';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';


interface HotelCardProps {
    name?: String;
    city?: String;
    country?: String;
    address?: String;
    chain_name?: String;
    chain_index?: any;
    Key?: any;
    image: any;
}

const HotelCard: React.FC<HotelCardProps> = ({ name, Key, chain_index, city, country, image, address }) => {
    const [dataBase, setDataBase] = useState<any>(HotelData)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const nameRef = useRef<any>("")
    const cityRef = useRef<any>("")
    const countryRef = useRef<any>("")
    const addressRef = useRef<any>("")


    const navigate = useNavigate()

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    useEffect(() => {
        return () => {
            // Cleanup function to revoke the Blob URL when the component is unmounted
            URL.revokeObjectURL(imageSrc);
        };
    }, [imageSrc]);

    // logic to get data from local storage
    useEffect(() => {
        const LocalStorageDB: any = localStorage.getItem("hotel_rank_db")
        if (LocalStorageDB && dataBase.length) {
            console.log('Data loaded from localStorage:', JSON.parse(LocalStorageDB));
            setDataBase(JSON.parse(LocalStorageDB));
        } else if (!LocalStorageDB) {
            console.log('Data loaded from localStorage:', JSON.parse(LocalStorageDB));
            localStorage.setItem("hotel_rank_db", JSON.stringify(HotelData));
        }
    }, [isDeleteModalOpen])

    const openEditModal = () => {
        setEditModalOpen(true)
    };

    const closeEditModal = () => {
        setEditModalOpen(false)
    };
    const openDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    };
    const DeleteChain = (hotelIndex: number) => {
        console.log(chain_index, hotelIndex)
        const updatedDataList = dataBase[chain_index].data.filter((item: {}, index: number) => index !== hotelIndex);
        const chainUpdate = {
            chain_name: dataBase[chain_index].chain_name,
            img: dataBase[chain_index].img,
            data: updatedDataList
        }



        const updatedList = [...dataBase];
        updatedList[chain_index] = chainUpdate;    // Replace the item at the specified index

        console.log('Updated data List:', updatedDataList);
        console.log('Updated List:', updatedList);
        setDataBase(updatedList)
        localStorage.setItem("hotel_rank_db", JSON.stringify(updatedList));
        closeDeleteModal()
        navigate('/')
    };



    const EditModal = (index: number,) => {

        const hotelUpdate = {

            name: nameRef.current.value,
            city: cityRef.current.value,
            country: countryRef.current.value,
            address: addressRef.current.value,
            image: dataBase[chain_index].data[index].image,


        }
        const updatedList = [...dataBase];


        updatedList[chain_index].data[index] = hotelUpdate;

        setDataBase(updatedList);
        localStorage.setItem("hotel_rank_db", JSON.stringify(updatedList));
        closeEditModal()
        navigate(`/`)
    };



    return (
        <div className=" cursor-pointer w-full lg:w-1/6 m-4 group ">
            <div className="flex flex-col w-full text-left">
                <div
                    className="aspect-square w-full relative overflow-hidden rounded-xl"
                >
                    <img
                        alt="listing"
                        src={image}
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3  bg-white rounded-full p-1 cursor-pointer " onClick={() => openEditModal()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <g clip-path="url(#clip0_3256_14543)">
                                <path
                                    d="M7.33301 2.66421H4.53301C3.4129 2.66421 2.85285 2.66421 2.42503 2.8822C2.0487 3.07395 1.74274 3.37991 1.55099 3.75623C1.33301 4.18406 1.33301 4.74411 1.33301 5.86421V11.4642C1.33301 12.5843 1.33301 13.1444 1.55099 13.5722C1.74274 13.9485 2.0487 14.2545 2.42503 14.4462C2.85285 14.6642 3.4129 14.6642 4.53301 14.6642H10.133C11.2531 14.6642 11.8132 14.6642 12.241 14.4462C12.6173 14.2545 12.9233 13.9485 13.115 13.5722C13.333 13.1444 13.333 12.5843 13.333 11.4642V8.66421M5.33299 10.6642H6.44935C6.77547 10.6642 6.93853 10.6642 7.09198 10.6274C7.22803 10.5947 7.35809 10.5408 7.47739 10.4677C7.61194 10.3853 7.72724 10.27 7.95785 10.0394L14.333 3.66421C14.8853 3.11193 14.8853 2.2165 14.333 1.66421C13.7807 1.11193 12.8853 1.11193 12.333 1.66421L5.95783 8.03938C5.72723 8.26998 5.61193 8.38528 5.52947 8.51983C5.45637 8.63913 5.40249 8.76919 5.36983 8.90524C5.33299 9.05869 5.33299 9.22175 5.33299 9.54787V10.6642Z"
                                    stroke="#A2A9AA"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_3256_14543">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>

                    <div className="absolute top-3 left-3  bg-white rounded-full p-1 cursor-pointer"
                        onClick={() => openDeleteModal()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M6 2H10M2 4H14M12.6667 4L12.1991 11.0129C12.129 12.065 12.0939 12.5911 11.8667 12.99C11.6666 13.3412 11.3648 13.6235 11.0011 13.7998C10.588 14 10.0607 14 9.00623 14H6.99377C5.93927 14 5.41202 14 4.99889 13.7998C4.63517 13.6235 4.33339 13.3412 4.13332 12.99C3.90607 12.5911 3.871 12.065 3.80086 11.0129L3.33333 4M6.66667 7V10.3333M9.33333 7V10.3333"
                                stroke="#D11111"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {name}                </div>

                <div className="font-light text-neutral-500">
                    {address}                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">{city}, {country}</div>
                </div>

            </div>

            <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
                <h1 className="text-2xl  mb-4">Sure you want to delete <span className='font-bold'>{name} Hotel</span> from this  Chain? </h1>
                <div className='flex items-center text-center justify-between'>
                    <span className='text-xl bg-red-600 text-white p-3 rounded-lg w-1/3 cursor-pointer' onClick={() => DeleteChain(Key)}>Yes</span>
                    <span className='text-xl bg-blue-600 text-white p-3 rounded-lg w-1/3 cursor-pointer' onClick={closeDeleteModal}>No</span>

                </div>
            </Modal>

            <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                <h1 className="text-2xl  mb-4">Edit <span className='font-bold'>{name}</span>  </h1>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="inputField"
                    type="text"
                    placeholder="Edit name..."
                    // onChange={(event) => setNewName(event.target.value)}
                    ref={nameRef}
                />

                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="inputField"
                    type="text"
                    placeholder="Enter Country"
                    // onChange={(event) => setNewName(event.target.value)}
                    ref={countryRef}
                />
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="inputField"
                    type="text"
                    placeholder="Enter city"
                    ref={cityRef}
                />
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="inputField"
                    type="text"
                    placeholder="Enter street address"
                    ref={addressRef}

                />

                <div className='flex items-center text-center justify-center'>
                    <span className='text-xl bg-blue-600 text-white p-3 rounded-lg w-1/3 cursor-pointer' onClick={() => EditModal(Key)}>Submit</span>

                </div>
            </Modal>
        </div>
    );
};

export default HotelCard;
