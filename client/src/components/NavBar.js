import React, {useContext} from 'react';
import {Context} from "../index";
import {Navbar, Container, Nav, Button} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to={SHOP_ROUTE} style={{color: 'white', textDecoration: 'none'}}>THLS.RU</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>
                            Панель Администратора
                        </Button>
                        <Button variant={"outline-light"} onClick={logOut} className='ms-2'>
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} onClick={() => navigate(REGISTRATION_ROUTE)}>
                            Регистрация
                        </Button>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)} className='ms-2'>
                            Авторизация
                        </Button>
                    </Nav>}
            </Container>
        </Navbar>
    );
});

export default NavBar;