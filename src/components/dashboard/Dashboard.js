import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AddFolderButton } from './AddFolderButton';
import { AddFileButton } from './AddFileButton';
import { Card, Button, Alert, Container } from 'react-bootstrap';
import { collection, query, orderBy, limit, where, getDocs, doc } from "firebase/firestore";
import { database } from '../../firebase';
import { File } from './File';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const ContainerGrid = styled.div`
    display: grid;
    padding-top: 20px;
    grid-template-rows: repeat(${(props) => Math.floor(props.grabLimit/props.rowSize)+1}, 200px);
    grid-template-columns: repeat(${(props) => props.rowSize}, 200px);
    place-items: center;
    grid-gap: 20px;
    `;

export const Dashboard = () => {
    const [docs, updateDocs] = useState([]);
    const [loading, updateLoading] = useState(true);
    const [toggle, updateToggle] = useState(true);

    const refresh = () => updateToggle((prevToggle) => !prevToggle);

    const game = "Rimworld"
    const catagory = "Characters"

    const rowSize = 5;
    const grabLimit = 25;

    const fetchDocs = async() => {
        updateLoading(true);
        const q = query(collection(database, `${game}.${catagory}`), orderBy("createdAt"), limit(20));
        const snapshot = await getDocs(q);
        updateDocs(
            snapshot.docs.map((doc) => doc._document.data.value.mapValue.fields)
        );
        updateLoading(false);
    }

    useEffect(() => {
        fetchDocs()
    },[toggle]);

    return <div className="d-flex justify-content-center">
        <ContainerGrid grabLimit={grabLimit} rowSize={rowSize}>
            {docs.map(
                (file, i) => <File key={`file-${i}`} file={file}/>
            )}
        </ContainerGrid>
        { ReactDOM.createPortal(<AddFileButton update={refresh}/>, document.getElementById("Navbar-Nav")) }
    </div>
}