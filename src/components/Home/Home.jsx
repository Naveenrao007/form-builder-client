import React, { useState } from 'react'
import CreateFolderPng from "../../assets/icons/createFolder.png"
import plusSign from "../../assets/icons/plus.png"
import style from "./Home.module.css"
import Header from '../Header/Header'
import CreateFolder from '../models/CreateFolder/CreateFolder'
import { createDirectory } from '../../Service/Dashboard'
import { toast } from 'react-toastify'

function Home() {
    const [createFolderIsOpen, setCreateFolderIsOpen] = useState(false);

    const handleOpen = () => {
        setCreateFolderIsOpen(true)
    }
    const handleFolderSave = (data) => {
        const dataObj = { name: data, type: "folder" }

        const response = createDirectory(dataObj)
console.log("err",response.error);
console.log("d");

       

        if (response.status === 400) {
            toast.error(response.error.message, {
                autoClose: 1400,
            });
        } else if (response.status === 201) {


            toast.success(response.data.message, { autoClose: 1200 });

        } else if (response.status === 500) {

            toast.error("Internal server error");
        } else if (response.status === 404) {
            toast.error("Url is incorrect");
        }


    }
    return (
        <div>

            <Header />
            <div className={style.HomeContainer}>
                <div className='width70per m-auto'>

                    <div className='pdtop2rem' >
                        <div className={` cp ${style.CreateFolderDiv}`} onClick={handleOpen} >
                            <img src={CreateFolderPng} alt="CreateFolderPng" />  <p className='white'> Create a folder</p>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className={style.typeBotContainer}>
                        <img src={plusSign} alt="plusSign" />
                        <p className='white'>Create a typebot</p>
                    </div>
                </div>
            </div>
            <CreateFolder
                isOpen={createFolderIsOpen}
                onClose={() => setCreateFolderIsOpen(false)}
                onSave={handleFolderSave}
            />

        </div>
    )
}

export default Home