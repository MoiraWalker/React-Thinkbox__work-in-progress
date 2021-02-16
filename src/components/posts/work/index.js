import React from 'react';
import './index.scss';
import close from '../../../assets/images/close.svg';
import {ReactComponent as Delete} from "../../../assets/images/delete.svg";
import {ReactComponent as Edit} from "../../../assets/images/edit.svg";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {WorkEditForm} from "../../forms/organisms/workEditForm";
import {ExternalLink} from "react-external-link";

export const Work = () => {
    const {id} = useParams();
    const [edit, toggleEdit] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [work, setWork] = useState("");

    const history = useHistory();

    const back = () => {
        history.goBack();
    }

    useEffect(() => {
        getWork();
    }, [setIsUpdated])

    async function getWork() {
        try {
            const result = await axios.get(`http://localhost:8080/api/posts/works/${id}`);
            setWork(result.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteWork(id) {
        try {
            const result = await axios.delete(`http://localhost:8080/api/posts/works/${id}`);
            back();
        } catch (e) {
            console.error(e);
        }
    }

    const editWork = () => {
        toggleEdit(true);
    }

    const onLink = (work) => {
        if ( work.link === "" ) {
            return null
        } else {
            return <ExternalLink href={`https://${work.link}`} />;
        }
    }

    return (
        <div>
            {edit ?
                (<WorkEditForm id={id} setIsUpdated={setIsUpdated} toggleEdit={toggleEdit} title={work.title} description={work.description}></WorkEditForm>)
                :
                (<div className="post__card work">
                    <div className="thought__top">
                        <div className="post__header">
                            <p className="post__title">{work.title}</p>
                            <img onClick={back} src={close} alt="close" className="close"/>
                        </div>
                        <p className="post__des">{work.description}</p>
                        {onLink(work)}
                    </div>
                    <div className="post__footer">
                        <p className="post__label">Work</p>
                        <div className="post__buttons">
                            <Delete className="button__icon" onClick={() => deleteWork(id)}/>
                            <Edit className="button__icon" onClick={editWork}/>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
}
