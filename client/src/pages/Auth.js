import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()

    const isLoginPage = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async () => {
        try {
            let userData;
            if (isLoginPage) {
                userData = await login(email, password)
            } else {
                userData = await registration(email, password)
            }
            user.setIsAuth(true)
            user.setUser(userData)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container className='d-flex justify-content-center align-items-center'
                   style={{height: window.innerHeight - 54}}
        >
            <Card className='p-5' style={{width: 600}}>
                <h2 className='m-auto'>{isLoginPage ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='mt-3' placeholder='Введите ваш email...'
                    />
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='mt-3' placeholder='Введите ваш пароль...'
                    />
                    <Card.Body className='mt-3 d-flex justify-content-between p-0'>
                        {
                            isLoginPage ?
                                <div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink></div>
                                :
                                <div>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></div>
                        }

                        <Button
                            onClick={signIn}
                            variant='outline-success'
                        >
                            {isLoginPage ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </Card.Body>
                </Form>
            </Card>

        </Container>
    );
});

export default Auth;