import './index.scss';
import React, { useState } from 'react';
import {Button} from "../forms/atoms/button";


export const AccountInfo = ({ setActiveComponent  })  => {

    const editUser = () => {
        setActiveComponent('edit');
    }

    const changePassword = () => {
        setActiveComponent('password');
    }

    return (
        <div className="account">
            <div className="account__data">
                <div className="account__item">
                    <p className="account__label">Username</p>
                    <p className="account__info">MoiraWalker</p>
                </div>
                <div className="account__item">
                    <p className="account__label">Email</p>
                    <p className="account__info">moira.walker@test.nl</p>
                </div>
            </div>
            <div className="account__edit-wrapper">
                <div className="account__edit" onClick={editUser}>Edit account</div>
                <div className="account__edit" onClick={changePassword}>Change password</div>
            </div>
            <Button className="button button__primary account__button-wrapper">Log out</Button>
        </div>
    );
}


