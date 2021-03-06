import React from 'react';
import { ButtonWrapper, InputField } from "../../molecules";
import { Button } from '../../atoms';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import './index.scss';
import axios from "axios";
import { NavLink } from "react-router-dom";
import { LinkWrapper } from "../../molecules/linkWrapper";

export const RegisterForm = () => {
    const {register, unregister, handleSubmit, ...methods} = useForm({
        mode: 'onChange'
    });
    const [createUserSuccess, setCreateUserSuccess] = useState(false);
    const [error, setError] = useState('');

    async function onSubmit(data) {
        setError('');
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', data);
            if (response.status === 200) {
                setCreateUserSuccess(true);
            }
        } catch (e) {
            if (e.message.includes('400')) {
                setError('Username and or email adress are already in use');
            } else {
                setError('Something went wrong, please try again');
            }
        }
    }

    return (
        <div>
            {createUserSuccess ? (
                <div className="success__wrapper">
                    <h2>Account registered succesfully! 🥳</h2>
                    <p className="success__message">Click
                        <NavLink className="success__message link" activeClassName="link--active" to="/login">here</NavLink>to log in</p>
                </div>
            ) : (
                <FormProvider {...methods} register={register} handleSubmit={handleSubmit}>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-wrapper">
                                <h2>Register</h2>
                                <div className='form-item'>
                                    <InputField
                                        name="username"
                                        label="Username"
                                        type="text"
                                        fieldRef={register({
                                            required: {
                                                value: true,
                                                message: 'First name is required',
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
                                            pattern: {
                                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                message: 'The given email adress is not valid'
                                            }
                                        })}
                                    />
                                </div>
                                <div className='form-item'>
                                    <InputField
                                        name="password"
                                        label="Password"
                                        type="password"
                                        fieldRef={register({
                                            required: {
                                                value: true,
                                                message: 'Password name is required',
                                            },
                                            pattern: {
                                                // value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}$/,
                                                value: true,
                                                message: 'Password is not strong enough. Password should contain, special character, capital letter, number and have a minimum length of 8 characters.'
                                            }
                                        })}
                                    />
                                </div>
                                {error && <p className="error-message">{error}</p>}
                                <ButtonWrapper>
                                    <Button>Create account</Button>
                                </ButtonWrapper>
                            <LinkWrapper>
                                <p>Already have an account? Click
                                    <NavLink to="/login" className="link">here</NavLink>
                                    to login.
                                </p>
                            </LinkWrapper>
                            </div>
                        </form>
                    </div>
                </FormProvider>
            )}
        </div>
    );
}


