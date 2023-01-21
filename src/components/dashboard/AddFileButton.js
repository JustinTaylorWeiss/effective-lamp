import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Toast, ProgressBar, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { query, orderBy, limit, where, getDocs, doc } from "firebase/firestore";
import { database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../firebase';
import { addDoc, collection, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, updateMetadata, getDownloadURL } from 'firebase/storage';
import { v4 as uuidV4 } from 'uuid';
import { baseRoute } from '../../App';

export const AddFileButton = ({ update }) => {
    const [uploadingFiles, setUploadingFiles] = useState([]);
    const game = "Rimworld"
    const catagory = "Characters"
    const { currentUser } = useAuth();

    const handleUpload = async(e) => {
        const file = e?.target?.files[0] ?? false
        if(!file) return;

        const q = query(
            collection(database, `${game}.${catagory}`), 
            where("name", "==", file?.name ?? ""),
            where("creatorUid", "==", currentUser.uid));
        const snapshot = await getDocs(q);
        if (snapshot.size) return;

        const id = uuidV4();
        setUploadingFiles((prevUploadedFiles) => [
            ...prevUploadedFiles,
            {id: id, name: file.name, progress: 0, error: false}
        ])

        const metadata = {customMetadata:{
            createdBy: currentUser.displayName, creatorUid: currentUser.uid
        }}
        const uploadRef = ref(storage, `${game}/${catagory}/${file.name}`)
        const uploadTask = uploadBytesResumable(uploadRef, file, metadata);

        uploadTask.on("state_chaged", 
            (snapshot) => {
                const progress = snapshot.bytesTransferred / snapshot.totalBytes
                setUploadingFiles((prevUploadedFiles) => (
                    prevUploadedFiles.map((uploadFile) => (
                        uploadFile.id === id 
                        ? {...uploadFile, progress: progress}
                        : uploadFile
                    ))
                ))
            }, 
            () => {
                setUploadingFiles((prevUploadedFiles) => (
                    prevUploadedFiles.map(
                        (uploadFile) => (
                            uploadFile.id === id 
                            ? {...uploadFile, error: true}
                            : uploadFile
                        )
                    )
                ))
            }, 
            async() => {
                setTimeout(() => setUploadingFiles((prevUploadedFiles) => (
                    prevUploadedFiles.filter(
                        (uploadFile) => uploadFile.id !== id)
                )), 1000)

                await getDownloadURL(uploadRef).then((url) => {
                    addDoc(collection(database, `${game}.${catagory}`), {
                        game: game,
                        catagory: catagory,
                        name: file.name,
                        url: url,
                        createdBy: currentUser.displayName,
                        creatorUid: currentUser.uid,
                        createdAt: serverTimestamp(),
                    })
                });
                update();
            }
        )
    }

    return <>
    <label className="btn btn-outline-success btn-m m-0 mr-2">
        <FontAwesomeIcon icon={faFileUpload}/>
        <input type="file" onChange={handleUpload} style={{ opacity: 0, position: "absolute", left: "-9999px"}}/>
    </label>
    {uploadingFiles.length > 0  && ReactDOM.createPortal(
    <div style={{
        position: "absolute",
        bottom: "1rem",
        right: "1rem",
        maxWidth: "250px",
    }}>
    {uploadingFiles.map(
        (file) => <Toast key={file.id} onClose={() => (
            setUploadingFiles((prevUploadedFiles) => (
                prevUploadedFiles.filter(
                    (uploadFile) => uploadFile.id !== file.id)
            ))
        )}>
            <Toast.Header closeButton={file.error} className="d-flex justify-content-between text-truncate w-100 d-block">
                {file.name}
            </Toast.Header>
            <Toast.Body>
                <ProgressBar 
                    animated={!file.error}
                    variant={file.error 
                        ? "danger" 
                        : file.progress * 100 > 99
                        ? "success"
                        :"primary"}
                    now={file.error 
                        ? 100 
                        : file.progress * 100}
                    label={
                        file.error 
                        ? "Error" 
                        : `${Math.round(file.progress * 100)}%`}
                />
            </Toast.Body>
        </Toast>
    )}
    </div>, document.body)}
    </>
}