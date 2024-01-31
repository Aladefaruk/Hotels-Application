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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6009 6.02148C11.8452 6.02148 12.0435 6.21974 12.0435 6.46403C12.0435 6.70832 11.8452 6.90658 11.6009 6.90658H9.39465C7.86991 6.90658 6.88509 7.951 6.88509 9.5672V14.473C6.88509 16.0892 7.86991 17.1337 9.39465 17.1337H14.6014C16.1262 17.1337 17.1116 16.0892 17.1116 14.473V12.0962C17.1116 11.852 17.3098 11.6537 17.5541 11.6537C17.7984 11.6537 17.9967 11.852 17.9967 12.0962V14.473C17.9967 16.5937 16.6318 18.0188 14.6014 18.0188H9.39465C7.36422 18.0188 5.99998 16.5937 5.99998 14.473V9.5672C5.99998 7.4465 7.36422 6.02148 9.39465 6.02148H11.6009ZM16.7402 6.53991L17.4583 7.25803C17.8082 7.60735 18.0006 8.07173 18 8.56621C18 9.06069 17.8076 9.52448 17.4583 9.87321L13.0275 14.304C12.7023 14.6292 12.2692 14.8085 11.809 14.8085H9.59858C9.47939 14.8085 9.36491 14.7602 9.28171 14.6746C9.19851 14.5896 9.15308 14.4746 9.15603 14.3548L9.21149 12.1249C9.22271 11.6812 9.4015 11.264 9.71541 10.9495L14.1256 6.53991C14.8467 5.82003 16.0191 5.82003 16.7402 6.53991ZM13.7623 8.15434L10.3415 11.5756C10.1886 11.7284 10.1019 11.9314 10.0966 12.1467L10.0523 13.9234H11.809C12.0332 13.9234 12.2433 13.8367 12.402 13.678L15.8435 10.2355L13.7623 8.15434ZM14.7511 7.16598L14.3878 7.52828L16.469 9.61004L16.8328 9.24715C17.0146 9.06541 17.1149 8.82348 17.1149 8.56621C17.1149 8.30835 17.0146 8.06583 16.8328 7.88409L16.1147 7.16598C15.7388 6.79128 15.1275 6.79128 14.7511 7.16598Z" fill="black" />
                        </svg>
                    </div>

                    <div className="absolute top-3 left-3  bg-white rounded-full p-1 cursor-pointer"
                        onClick={() => openDeleteModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M17.0211 9.75354C17.0211 9.75354 16.6369 14.5194 16.414 16.527C16.3078 17.4858 15.7156 18.0477 14.7454 18.0654C12.8992 18.0986 11.0508 18.1007 9.20535 18.0618C8.27198 18.0427 7.6896 17.4738 7.58558 16.5319C7.36126 14.5067 6.97914 9.75354 6.97914 9.75354" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18 7.46893H6" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.6877 7.46892C15.1322 7.46892 14.6539 7.07619 14.5449 6.53202L14.373 5.67154C14.2668 5.27456 13.9073 5 13.4976 5H10.5022C10.0925 5 9.73302 5.27456 9.62688 5.67154L9.45492 6.53202C9.34595 7.07619 8.86759 7.46892 8.3121 7.46892" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
                    <span className='text-xl bg-[#A145E9] text-white p-3 rounded-lg w-1/3 cursor-pointer' onClick={() => EditModal(Key)}>Submit</span>

                </div>
            </Modal>
        </div>
    );
};

export default HotelCard;
