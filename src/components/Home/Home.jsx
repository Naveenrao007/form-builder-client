import React, { useEffect, useState } from 'react';
import CreateFolderPng from "../../assets/icons/createFolder.png";
import deleteIcon from "../../assets/icons/delete.png";
import plusSign from "../../assets/icons/plus.png";
import style from "./Home.module.css";
import Header from '../Header/Header';
import CreateFolder from "../models/CreateFolder/CreateFolder";
import DeleteModel from '../models/DeleteModel/DeleteModel';
import { createDirectory, getDirectory, deleteDirectory } from '../../Service/Dashboard';
import { toast } from 'react-toastify';
import { groupDirectoriesByOwner } from "../../Helper/helper"
import { data, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { useContext } from 'react';
import { MyContext } from '../../context/Context';
function Home() {
    const { contextdata, setContextData } = useContext(MyContext);

    const [createDirIsOpen, setCreateDirIsOpen] = useState(false);
    const [deleteDirIsOpen, setDeleteDirIsOpen] = useState(false);
    const [selectuser, setSelectuser] = useState([{}])
    const [modalType, setModalType] = useState('folder');
    const [delId, setDelId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dirs, setDirs] = useState([]);
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    const splitDirsByType = (directories) => {
        const files = directories?.filter((dir) => dir.type === 'file');
        const folders = directories?.filter((dir) => dir.type === 'folder');
        setFiles(files);
        setFolders(folders);
    };

    const updateDirs = (newDirs) => {
        setDirs(newDirs);
        splitDirsByType(newDirs);
    };

    const handleFolderSave = async (data) => {
        const dataObj = { name: data, type: modalType };
        try {
            const response = await createDirectory(dataObj);

            if (response.status === 400) {
                toast.error(response.error, { autoClose: 1400 });
                if (["Invalid Token", "User not logged In"].includes(response.error)) {
                    navigate("/signin");
                }
            } else if (response.status === 201) {
                toast.success(response.data.data.message, { autoClose: 1200 });
                setCreateDirIsOpen(false);

                const newDir = response.data.data.data;


                const updatedDirs = [...dirs, newDir];
                updateDirs(updatedDirs);


                setContextData((prev) => ({
                    ...prev,
                    ownedDirectories: [...(prev.ownedDirectories || []), newDir],
                }));
            } else {
                toast.error("Unexpected error occurred", { autoClose: 1400 });
            }
        } catch (err) {
            console.error("Error creating directory:", err);
            toast.error("Something went wrong", { autoClose: 1400 });
        }
    };

    const handleDeleteConfirm = async (id) => {
        const dataObj = { id: id, type: modalType.trim() };
        try {
            const response = await deleteDirectory(dataObj);

            if (response.status === 400) {
                toast.error(response.error, { autoClose: 1400 });
                if (["Invalid Token", "User not logged In"].includes(response.error)) {
                    navigate("/signin");
                }
            } else if (response.status === 200) {
                toast.success(response.data.data.message, { autoClose: 1200 });
                const updatedDirs = dirs.filter((dir) => dir._id !== id);
                updateDirs(updatedDirs);

                setContextData((prev) => ({
                    ...prev,
                    ownedDirectories: updatedDirs,
                }));
            } else if (response.status === 404) {
                toast.error(response.error, { autoClose: 1400 });
            } else {
                toast.error("Unexpected Error", { autoClose: 1400 });
            }
            setDeleteDirIsOpen(false);
        } catch (err) {
            console.error("Error deleting directory:", err);
            toast.error("Something went wrong", { autoClose: 1400 });
        }
    };

    const handleOpen = (type) => {
        setModalType(type);
        setCreateDirIsOpen(true);
    };

    const handleDeleteOpen = (id, type) => {
        setModalType(type.trim());
        setDelId(id);
        setDeleteDirIsOpen(true);
    };

    const handleHome = async () => {
        try {
            const response = await getDirectory();

            if (response.status === 404) {
                toast.error(response.error, { autoClose: 1400 });
                navigate("/signin");
            } else if (response.status === 400) {
                toast.error(response.error, { autoClose: 1400 });
                if (["Invalid Token", "User not logged In"].includes(response.error)) {
                    navigate("/signin");
                }
            } else if (response.status === 200) {
                const directories = response?.data?.ownedDirectories || [];
                setContextData(response?.data || {});

                const sharedUsers = response?.data?.sharedByUsers || [];
                if (sharedUsers.length > 0) {
                    const shareUsersData = sharedUsers[0]?.directories?.map((item) => item.owner) || [];
                    const shareUserData = shareUsersData.filter(
                        (item, index, arr) => arr.findIndex(i => i?.id === item?.id) === index
                    );

                  
                    if (response?.data?.user) {
                        shareUserData.push(response.data.user);
                    }

                    const rawdata = await groupDirectoriesByOwner(sharedUsers[0]?.directories || []);
                    if (response?.data?.user?.id) {
                        rawdata[response.data.user.id] = directories;
                    }

                    setContextData((prev) => ({
                        ...prev,
                        sharedUser: shareUserData,
                        usersDirs: rawdata,
                    }));
                }

                updateDirs(directories);
                setIsLoading(false);



            }
        } catch (error) {
            console.error("Error fetching directories:", error);
            toast.error("Failed to load directories.", { autoClose: 1400 });
        }
    };


    useEffect(() => {
        handleHome();
        handleUser()

    }, []);


    const handleUser = async () => {
        const rawdata = await groupDirectoriesByOwner(contextdata.sharedByUsers[0].directories);
        rawdata[contextdata.user.id] = contextdata.ownedDirectories;
        const updatedContext = { ...contextdata, usersDirs: rawdata };
        setContextData(updatedContext);
    }

    const handleChangeuser = (data) => {
        const showDir = contextdata.usersDirs[data.id] || contextdata?.ownedDirectories
        splitDirsByType(showDir)
    }

    return isLoading ? (<Loading />) : (
        <div>
            <Header changeUser={handleChangeuser} />
            <div className={style.HomeContainer}>
                <div className='width70per m-auto'>
                    <div className={style.foldersParentContainer}>
                        <div className={`cp ${style.CreateFolderDiv}`} onClick={() => handleOpen('folder')}>
                            <img src={CreateFolderPng} alt="CreateFolderPng" /> <p className='white'> Create a folder</p>
                        </div>
                        {folders && folders.map((dir) => (
                            <div className={style.foldersContainer} key={dir._id}>
                                <p className="white">{dir.name}</p>
                                <img className='cp' src={deleteIcon} alt="deleteIcon" onClick={() => handleDeleteOpen(`${dir._id}`, `${dir.type}`)} />
                            </div>
                        ))}
                    </div>

                    <div className={style.fileParentContainer}>
                        <div className={style.typeBotContainer} onClick={() => handleOpen('file')}>
                            <img src={plusSign} alt="plusSign" />
                            <p className='white'>Create a typebot</p>
                        </div>
                        {files && files.map((dir) => (
                            <div className={style.filesContainer} key={dir._id}>
                                <p className="white">{dir.name}</p>
                                <img className={style.fileDeleteDiv} src={deleteIcon} alt="deleteIcon" onClick={() => handleDeleteOpen(`${dir._id}`, `${dir.type}`)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <CreateFolder
                isOpen={createDirIsOpen}
                onClose={() => setCreateDirIsOpen(false)}
                onSave={handleFolderSave}
                type={modalType}
            />
            <DeleteModel
                isOpen={deleteDirIsOpen}
                onClose={() => setDeleteDirIsOpen(false)}
                onConfirm={handleDeleteConfirm}
                id={delId}
                type={modalType}
            />
        </div>
    );
}

export default Home;
