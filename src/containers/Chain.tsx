import React, { useEffect, useState, useRef } from 'react'
import HotelCard from '../components/Hotel/HotelCard';
import { HotelData } from '../data/HotelData';
import { i3 } from '../assets/images';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import Template from './Template';


const Chain = () => {
  const [dataBase, setDataBase] = useState<any>(HotelData)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const nameRef = useRef<any>("")

  const newNameRef = useRef<any>("")
  const imageRef = useRef<any>(null)
  const newCityRef = useRef<any>("")
  const newCountryRef = useRef<any>("")
  const newAddressRef = useRef<any>("")


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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

  const { param } = useParams<any>();
  const navigate = useNavigate()


  // logic to get data from local storage
  useEffect(() => {
    const LocalStorageDB: any = localStorage.getItem("hotel_rank_db")
    // if (LocalStorageDB) {
    //   setDataBase(JSON.parse(LocalStorageDB))
    // } else {
    //   localStorage.setItem("hotel_rankb", JSON.stringify(HotelData))
    // }
    console.log(param)

    if (LocalStorageDB && dataBase.length) {
      console.log('Data loaded from localStorage:', JSON.parse(LocalStorageDB));
      setDataBase(JSON.parse(LocalStorageDB));
    } else if (!LocalStorageDB) {
      console.log('Data loaded from localStorage:', JSON.parse(LocalStorageDB));
      localStorage.setItem("hotel_rank_db", JSON.stringify(HotelData));
    }
  }, [])



  // logic to delete a chain
  const DeleteChain = (chainIndex: number) => {
    const updatedList = dataBase.filter((item: {}, index: number) => index !== chainIndex);
    console.log('Updated List:', updatedList);
    setDataBase(updatedList)
    localStorage.setItem("hotel_rank_db", JSON.stringify(updatedList));
    closeDeleteModal()
    navigate("/")
  };
  // logic to update Chain name
  const EditChainName = (index: number,) => {
    const updatedList = [...dataBase];
    const newItem = {
      chain_name: nameRef?.current.value,
      img: dataBase[index].img,
      data: dataBase[index].data
    }

    console.log(newItem)
    updatedList[index] = newItem;
    console.log(updatedList)
    setDataBase(updatedList);
    localStorage.setItem("hotel_rank_db", JSON.stringify(updatedList));
    closeEditModal()
    navigate(`/`)
  };

  const AddNewHotel = (index: any, chain: any) => {

    const newHotel = {

      name: newNameRef.current.value,
      city: newCityRef.current.value,
      country: newCountryRef.current.value,
      address: newAddressRef.current.value,
      image: imageSrc,


    }

    const updatedDataList = [...dataBase[index].data, newHotel];
    console.log(updatedDataList)
    const newItem = {
      chain_name: chain.chain_name,
      img: chain.img,
      data: updatedDataList
    }
    const updatedList = [...dataBase]
    updatedList[index] = newItem;
    console.log(updatedList)

    setDataBase(updatedList);
    localStorage.setItem("hotel_rank_db", JSON.stringify(updatedList));
    closeModal()
    navigate('/')
  }

  const App = () => <div className=''>
    {
      dataBase.map((chain: any, index: any) =>
        chain.chain_name.toLowerCase().trim() === param &&
        (< div className='w-full  lg:m-10 my-14' >
          <div className='flex items-center justify-between lg:mx-5'>
            <h1 className='text-[20px] font-semi-bold lg:text-[40px]'>{chain.chain_name} Hotels</h1>
            <div className='lg:flex items-center'>
              <span className='text-blue-400 cursor-pointer ' onClick={openEditModal}>Edit Chain</span>
              <span className='text-red-300  ml-2 lg:ml-5 lg:mr-10 cursor-pointer' onClick={openDeleteModal}> Delete Chain</span>
            </div>

          </div>

          <p className='text-center lg:text-xl my-5'>Here is a list of our Top Hotels</p>

          <div className='flex flex-wrap items-center'>
            {chain.data.map((hotel: any, indexx: number) => <HotelCard Key={indexx} chain_index={index} name={hotel.name} city={hotel.city} country={hotel.country} address={hotel.address} image={hotel.image} />
            )}
          </div>

          <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
            <h1 className="text-2xl  mb-4">Sure you want to delete <span className='font-bold'>{chain.chain_name}</span> Hotels Chain? </h1>
            <div className='flex items-center text-center justify-between'>
              <span className='text-xl bg-red-600 text-white p-3 rounded-lg w-1/3 cursor-pointer' onClick={() => DeleteChain(index)}>Yes</span>
              <span className='text-xl bg-blue-600 text-white p-3 rounded-lg w-1/3 cursor-pointer' onClick={closeDeleteModal}>No</span>

            </div>
          </Modal>

          <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
            <h1 className="text-2xl  mb-4">Edit <span className='font-bold'>{chain.chain_name}</span> Hotels Chain </h1>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inputField"
              type="text"
              placeholder="Edit name..."
              // onChange={(event) => setNewName(event.target.value)}
              ref={nameRef}
            />
            <div className='flex items-center text-center justify-center'>
              <span className='text-xl bg-blue-600 text-white p-3 rounded-lg w-1/3 cursor-pointer' onClick={() => EditChainName(index)}>Submit</span>

            </div>
          </Modal>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h1 className="text-2xl  mb-4">Add a New Hotel to {chain.chain_name} Hotel Chain  </h1>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inputField"
              type="text"
              placeholder="Edit name..."
              // onChange={(event) => setNewName(event.target.value)}
              ref={newNameRef}
            />

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inputField"
              type="text"
              placeholder="Enter Country"
              // onChange={(event) => setNewName(event.target.value)}
              ref={newCountryRef}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inputField"
              type="text"
              placeholder="Enter city"
              ref={newCityRef}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inputField"
              type="text"
              placeholder="Enter street address"
              ref={newAddressRef}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inputField"
              type="file"
              placeholder="Select an Image"
              ref={imageRef}

              onChange={() => {
                const selectedFile = imageRef.current.files[0];

                if (selectedFile) {
                  const imageBlob = new Blob([selectedFile], { type: selectedFile.type });
                  const imageUrl = URL.createObjectURL(imageBlob);
                  setImageSrc(imageUrl);

                }
              }}

            />

            {imageSrc && <img src={imageSrc} alt="Selected" style={{ width: '64px', height: '64px' }} />}
            <div className='flex items-center text-center justify-center'>
              <span className='text-xl bg-blue-600 text-white p-3 rounded-lg w-1/3 cursor-pointer' onClick={() => AddNewHotel(index, chain)}>Submit</span>

            </div>
          </Modal>

          < div className="w-full lg:w-1/6 h-[280px] rounded overflow-hidden shadow-lg bg-white lg:p-6 lg:m-4" >
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-16 h-16 mx-auto text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <h2 className="text-lg font-semibold mt-4">Add A Hotel</h2>
              <p className="text-gray-500">Click the button below to add a new item.</p>
            </div>
            <div className="mt-6 text-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={openModal}>
                Add Hotel
              </button>
            </div>
          </div>
        </div >


        ))}






  </div >





  return (
    <div className=''>
      <Template App={<App />} />


    </div >
  )
}

export default Chain