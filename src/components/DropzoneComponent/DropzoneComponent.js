import { useCallback, useEffect, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import PropTypes from 'prop-types'

import attach_icon from './../../assets/icons/attach-file-icon.svg'

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#eeeeee',
    borderStyle: '',
    backgroundColor: '#F5F5F5',
    color: '#bdbdbd',
    transition: 'border .3s ease-in-out',
}

const activeStyle = {
    borderColor: '#2196f3',
}

const acceptStyle = {
    borderColor: '#00e676',
}

const rejectStyle = {
    borderColor: '#ff1744',
}

function DropzoneComponent({ files, setFiles }) {
    const onDrop = useCallback((acceptedFiles) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        )
    }, [])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: '.txt, .doc, .docx, .pdf',
    })
    // txt,doc,docx,pdf
    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    )

    const thumbs = files.map((file) => (
        <div key={file.name}>
            <p>{file.name}</p>
            {/* <img
        src={file.preview}
        alt={file.name}
      /> */}
        </div>
    ))

    // clean up
    useEffect(
        () => () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview))
        },
        [files]
    )

    return (
        <section>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <div className="d-flex ">
                    <img
                        className="attach_icon"
                        alt="Поле заполнено"
                        src={attach_icon}
                    />
                    <p>выберите или перетащите файл</p>
                </div>
            </div>
            <aside>{thumbs}</aside>
        </section>
    )
}

DropzoneComponent.propTypes = {
    files: PropTypes.array,
    setFiles: PropTypes.func,
}

export default DropzoneComponent
