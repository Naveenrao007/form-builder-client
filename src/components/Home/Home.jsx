import React, { useState } from 'react'
import CreateFolderPng from "../../assets/icons/createFolder.png"
import plusSign from "../../assets/icons/plus.png"
import style from "./Home.module.css"
import Header from '../Header/Header'
import Sharemodel from '../models/ShareModel/Sharemodel'
import CreateFolder from '../models/CreateFolder/CreateFolder'

function Home() {
    const [createFolderIsOpen, setCreateFolderIsOpen] = useState(false);
  
    const handleOpen = () => {
        setCreateFolderIsOpen(true)
    }
    const handleSave = (data) => {
        console.log(data);

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
                onSave={handleSave}
            />
            
        </div>
    )
}

export default Home