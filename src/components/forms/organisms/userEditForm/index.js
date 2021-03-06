import React from 'react';
import {ButtonWrapper, InputField} from "../../molecules";
import {Button} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import './index.scss';
import axios from "axios";

export const UserEditForm = ({id, email, username, setIsUpdated, toggleEdit}) => {
    const {register, unregister, watch, reset, handleSubmit, ...methods} = useForm({
        defaultValues: {username: username, email: email},
        mode: 'onChange'
    });

    const onError = (errorList) => {
        console.log(errorList)
    }

    async function updateUser(data) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8080/api/users/${id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setIsUpdated(true);
            toggleEdit(false);
        } catch (e) {
            console.log(e);
        }
    }

    const onCancel = () => {
        toggleEdit(false)
    }

    return (
        <div className="user__background--edit">
            <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
                <form onSubmit={handleSubmit(updateUser, onError)}>
                    <h2>Edit user</h2>
                    <div className='form-item'>
                        <InputField
                            name="username"
                            label="User name"
                            type="text"
                            fieldRef={register({
                                required: {
                                    value: true,
                                    message: 'User name is required',
                                }
                            })}
                        />
                    </div>
                    <div className='form-item'>
                        <InputField
                            name="email"
                            label="Email"
                            type="text"
                            fieldRef={register({
                                required: {
                                    value: true,
                                    message: 'Email name is required',
                                },
                            })}
                        />
                    </div>
                    <ButtonWrapper>
                        <Button onClick={updateUser}
                                className="button button__primary button__margin-right">Save</Button>
                        <Button type="button" className="button button__secondary" onClick={onCancel}>Cancel</Button>
                    </ButtonWrapper>
                </form>
            </FormProvider>
        </div>
    );
}


