import React from 'react';
import logo from '../../assets/logo.svg'
import {
    Container,
    Header,
    LogImg,
    Title,
    MenuItemLink,
    MenuContainer
} from './style';

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp
} from 'react-icons/md';


const Aside: React.FC = () => {
    return (
        <Container>
            <Header>
                <LogImg src={logo} alt="Logo Minha Carteira" />
                <Title>Minha Carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href="https://www.google.com">
                    <MdDashboard/>
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href="https://www.google.com">
                    <MdArrowUpward/>
                    Entradas
                </MenuItemLink>

                <MenuItemLink href="https://www.google.com">
                    <MdArrowDownward/>
                    Saídas
                </MenuItemLink>

                <MenuItemLink href="https://www.google.com">
                    <MdExitToApp/>
                    Sair
                </MenuItemLink>
            </MenuContainer>
        </Container>

    );
}

export default Aside;