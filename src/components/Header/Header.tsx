import React, { useState, useRef, useEffect } from 'react';
import { HotelData } from '../../data/HotelData';
import Modal from '../Modal';
import { useParams } from 'react-router';
import { useNavigate, Link } from 'react-router-dom';
const Header = () => {


  const [dataBase, setDataBase] = useState<any>(HotelData)
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const nameRef = useRef<any>("")


  const imageRef = useRef<any>(null)
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const { param } = useParams();
  const navigate = useNavigate()


  useEffect(() => {
    return () => {
      // Cleanup function to revoke the Blob URL when the component is unmounted
      URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);


  useEffect(() => {
    const LocalStorageDB: any = localStorage.getItem("hotel_rank_db")


    if (LocalStorageDB && dataBase.length) {
      console.log('Data loaded from localStorage:', JSON.parse(LocalStorageDB));
      setDataBase(JSON.parse(LocalStorageDB));
    } else if (!LocalStorageDB) {
      console.log('Data loaded from localStorage:', JSON.parse(LocalStorageDB));
      localStorage.setItem("hotel_rank_db", JSON.stringify(HotelData));
    }
  }, [])

  const AddChain = () => {
    const newItem = {
      chain_name: nameRef?.current.value,
      img: imageSrc,
      data: []
    }

    console.log(newItem)
    const updatedList = [...dataBase, newItem];
    setDataBase(updatedList);          // Update the state with the new list
    localStorage.setItem("hotel_rank_db", JSON.stringify(updatedList));
    closeModal()
    navigate('/')
    window.location.reload()
  }



  return (
    <div className="fixed w-full bg-white z-20 shadow-md flex items-center justify-between py-5 top-0 px-7 lg:px-40">
      <Link to='/'> <h1 className='text-[14px] lg:text-[24px] font-bold text-black-500 cursor-pointer'> Hotel Rankings</h1></Link>
      <div className='p-1 lg:px-5 lg:py-2 rounded-md bg-[#A145E9] text-[#fff] cursor-pointer font-bold text-md lg:text-lg hidden lg:flex' onClick={() => openModal()}>Add a New Chain +</div>
      <div className='p-3 py-1 lg:px-3 lg:py-2 rounded-md bg-[#A145E9] text-white cursor-pointer font-bold text-2xl lg:hidden' onClick={() => openModal()}> +</div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1 className="text-3xl  font-bold mb-4 ">Add New Chain +  </h1>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="inputField"
          type="text"
          placeholder="Enter Name"
          ref={nameRef}
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
          <span className='text-xl bg-[#A145E9] text-white p-3 rounded-lg w-1/3 cursor-pointer' onClick={() => AddChain()}>Submit</span>

        </div>



      </Modal>
    </div>
  )
}
export default Header;
