/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './Profile.css';
import { useState } from 'react';
import useForm from '../../utils/Validation';
import { connect } from 'react-redux';
import { changeUserInfo, logout, hideResMessage } from '../../redux/actions';

function Profile({
    logout,
    changeUserInfo,
    responseMessage,
    user,
    isLoading,
    hideResMessage
}) {
    const { values, handleChange, errors, isValid, resetForm } = useForm();
    const [isNameNew, setIsNameNew] = useState(false);
    const [isEmailNew, setIsEmailNew] = useState(false);

    useEffect(() => {
        hideResMessage();
    }, []);

    function select(e) {
        const input = e.target;

        const type = input.type;
        input.type = 'text';
        input.setSelectionRange(999, 999);
        input.type = type;
    }

    function onChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        if (name === 'name') {
            value !== user.name ? setIsNameNew(true) : setIsNameNew(false);
        } else {
            value !== user.email
                ? setIsEmailNew(true)
                : setIsEmailNew(false);
        }

        handleChange(e);
    }

    function handleProfileChange() {
        const email = values.email || user.email;
        const name = values.name || user.name;

        changeUserInfo(email, name, resetForm);
    }

    return (
        <div className="profile">
            <h2 className="profile__greeting">{`Привет, ${user.name}!`}</h2>
            <form className="profile__data-container">
                <div className="profile__data-item">
                    Имя
                    <input
                        minLength="2"
                        maxLength="30"
                        type="text"
                        name="name"
                        autoComplete="off"
                        className="profile__user-data"
                        defaultValue={user.name}
                        onClick={select}
                        onChange={e => {
                            onChange(e);
                        }}
                        required
                    />
                </div>
                <span className="profile__input-error">{errors.name}</span>
                <div className="profile__data-item">
                    E-mail
                    <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        className="profile__user-data"
                        defaultValue={user.email}
                        onClick={select}
                        onChange={e => {
                            onChange(e);
                        }}
                        required
                    />
                </div>
                <span className="profile__input-error">
                    {errors.email}
                </span>
                <span
                    className={`profile__response-message ${
                        responseMessage.err
                            ? ''
                            : 'profile__response-message_succ'
                    }`}
                >
                    {responseMessage}
                </span>
            </form>

            <div className="profile__buttons">
                <button
                    type="button"
                    onClick={handleProfileChange}
                    disabled={
                        isValid && (isNameNew || isEmailNew) && !isLoading
                            ? false
                            : true
                    }
                    className={`profile__edit-button ${
                        isValid && (isNameNew || isEmailNew) && !isLoading
                            ? ''
                            : 'profile__edit-button_disabled'
                    }`}
                >
                    {isLoading ? 'Сохранение....' : 'Редактировать'}
                </button>
                <button
                    type="button"
                    className="profile__logout-button"
                    onClick={() => logout()}
                >
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    changeUserInfo,
    logout,
    hideResMessage,
};

const mapStateToProps = state => ({
    isLoading: state.app.isLoading,
    responseMessage: state.app.resMessage,
    user: state.user.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
