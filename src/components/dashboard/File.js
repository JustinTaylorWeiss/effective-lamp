import { faFile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

export const File = ({ file }) => (
    <a href={file.url.stringValue} className="d-flex justify-content-center align-items-center btn btn-outline-dark text-truncate" style={{ height: "200px", width: "200px" }}>
        <FontAwesomeIcon icon={faFile} style={{ marginRight: "5%" }}/>
        {file.name.stringValue}
    </a>
);
