/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './Register.css';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useForm from '../../utils/Validation';
import { connect } from 'react-redux';
import { register, hideResMessage } from '../../redux/actions';

function Register({
    handleRegister,
    responseMessage,
    isLoading,
    hideResMessage
}) {
    const { values, handleChange, errors, isValid, resetForm } = useForm();
    const history = useHistory();

    useEffect(() => {
        hideResMessage();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const { name, email, password } = values;

        handleRegister(name, email, password, resetForm);
        history.push('/movies')
    }

    return (
        <div className="register">
            <Link className="register__logo button" to="/">
                <img
                    className="register__logo button"
                    alt="лого"
                    src={logo}
                />
            </Link>
            <h2 className="register__greeting">Добро пожаловать!</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <label className="register__input-label" htmlFor="name">
                    Имя
                </label>
                <input
                    type="text"
                    className={`register__input ${
                        errors.name && 'register__input_error'
                    }`}
                    id="name"
                    name="name"
                    minLength="2"
                    maxLength="30"
                    required
                    onChange={handleChange}
                    value={values.name || ''}
                />
                <span className="register__input-error">
                    {errors.name}
                </span>

                <label className="register__input-label" htmlFor="email">
                    E-mail
                </label>
                <input
                    type="email"
                    className={`register__input ${
                        errors.email && 'register__input_error'
                    }`}
                    id="email"
                    name="email"
                    required
                    onChange={handleChange}
                    value={values.email || ''}
                />
                <span className="register__input-error">
                    {errors.email}
                </span>

                <label
                    className="register__input-label"
                    htmlFor="password"
                >
                    Пароль
                </label>
                <input
                    type="password"
                    className={`register__input ${
                        errors.password && 'register__input_error'
                    }`}
                    id="password"
                    name="password"
                    required
                    onChange={handleChange}
                    value={values.password || ''}
                />
                <span className="register__input-error">
                    {errors.password}
                </span>

                <span className="register__response-error">
                    {responseMessage}
                </span>
                <button
                    className={`register__submit button ${
                        (!isValid || isLoading) &&
                        'register__submit_disabled'
                    }`}
                    type="submit"
                    disabled={(!isValid || isLoading) && true}
                >
                    {isLoading ? 'Регистрация....' : 'Зарегистрироваться'}
                </button>
                <p className="register__to-login">
                    Уже зарегистрированы?
                    <Link to="/signin" className="register__to-login-link">
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    );
}

const mapDispatchToProps = {
    handleRegister: register,
    hideResMessage
};

const mapStateToProps = state => ({
    isLoading: state.app.isLoading,
    responseMessage: state.app.resMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
