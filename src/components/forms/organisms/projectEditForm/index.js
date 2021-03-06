import React from 'react';
import {ButtonWrapper, InputField} from "../../molecules";
import {Button} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import {SelectBox} from "../../molecules";
import {SelectOption} from "../../atoms";
import './index.scss';
import axios from "axios";

export const ProjectEditForm = ({id, title, toggleEdit, setIsUpdated, setAccess}) => {
    const {register, unregister, watch, reset, handleSubmit, ...methods} = useForm({
        defaultValues: {title: title},
        mode: 'onChange'
    });

    const onError = (errorList) => {
        console.log(errorList)
    }

    async function updateProject(data) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8080/api/projects/${id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setIsUpdated(true);
            toggleEdit(false);
            setAccess(data.access);
        } catch (e) {
            console.log(e);
        }
    }

    const onCancel = () => {
        toggleEdit(false);
    }

    return (
        <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
            <form onSubmit={handleSubmit(updateProject, onError)}>
                <h2>Edit project</h2>
                <div className='form-item'>
                    <InputField
                        name="title"
                        label="Project title"
                        type="text"
                        fieldRef={register({
                            required: {
                                value: true,
                                message: 'Title name is required',
                            }
                        })}
                    />
                </div>
                <div className='form-item'>
                    <SelectBox
                        name="access"
                        label="Accessability"
                        id="access"
                        fieldRef={register({
                            required: {
                                value: true,
                                message: 'Title name is required',
                            }
                        })}

                    >
                        <SelectOption name="private" value="Private">Private</SelectOption>
                        <SelectOption name="public" value="Public">Public</SelectOption>
                    </SelectBox>
                </div>
                <ButtonWrapper>
                    <Button onClick={updateProject}
                            className="button button__primary button__margin-right">Save</Button>
                    <Button type="button" className="button button__secondary" onClick={onCancel}>Cancel</Button>
                </ButtonWrapper>
            </form>
        </FormProvider>
    );
}


