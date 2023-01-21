// import React, { useState } from 'react';
// import { Button, Modal, Form } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
// import { database } from '../../firebase';
// import { useAuth } from '../../contexts/AuthContext';
// import { addDoc, collection, updateDoc, serverTimestamp } from 'firebase/firestore';

// export const AddFolderButton = () => {
//     const [open, setOpen] = useState(false);
//     const [name, setName] = useState("");
//     const { currentUser } = useAuth();
//     const openModal = () => setOpen(true);
//     const closeModal = () => setOpen(false);

//     async function handleSubmit(e) {
//         e.preventDefault();

//         const docRef = await addDoc(collection(database, "Characters"), {
//             name: name,
//             file: "dogwater",
//             userId: currentUser.uid,
//             createdAt: serverTimestamp()
//         });

//         setName("");
//         closeModal();
//     }

//     return <>
//         <Button onClick={openModal} variant="outline-success">
//             <FontAwesomeIcon icon={faFolderPlus}/>
//         </Button>
//         <Modal show={open} onHide={closeModal}>
//             <Form onSubmit={handleSubmit}>
//                 <Modal.Body>
//                     <Form.Group>
//                         <Form.Label>Folder Name</Form.Label>
//                         <Form.Control type="text" required value={name}
//                         onChange={(e) => setName(e.target.value)}/>
//                     </Form.Group>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={closeModal}>Close</Button>
//                     <Button type="submit" variant="success" onClick={closeModal}>Add Folder</Button>
//                 </Modal.Footer>
//             </Form>
//         </Modal>
//     </>
// }

