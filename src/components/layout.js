import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled, { css, ThemeProvider } from 'styled-components';
import useBoolean from './useBoolean';
import theme from './theme';

import './normalize.css';

export const Context = createContext();

const MENU_BUTTON_SIZE = 50;

const NavLink = styled(Link).attrs({
  activeClassName: 'active'
})`
  display: block;
  padding: 4px 0 4px 4px;
  position: relative;

  &.active {
    &::before {
      content: '';
      position: absolute;
      width: 30px;
      height: 1px;
      top: 0;
      bottom: 0;
      left: -35px;
      margin: auto;
      background-color: #ccc;
    }
  }
`;

const Nav = styled.nav`
  height: 100vh;
  position: fixed;
  top: 0;
  width: 60vw;
  background-color: #ccc;
  color: white;
  transition: transform 300ms;
  transform: translateX(${props => (props.menuOpened ? 0 : '-60vw')});
  font-size: 14px;
  z-index: ${props => props.theme.zIndex.nav};

  .nav-inner {
    padding: 80px 20px 20px 20px;
    background-color: #666;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    transition: left 500ms;
    left: ${props => (props.menuOpened ? 0 : -100)}%;
    overflow: hidden;
    width: 100%;
  }

  h2 {
    font-size: 14px;
    padding-left: 4px;
    line-height: 30px;
  }

  address {
    font-size: 12px;
    position: absolute;
    bottom: 0;
    padding: 20px;
    left: 0;
  }

  ul {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 5px;
    padding-bottom: 10px;
    margin: 10px 0 0 0;
    list-style-type: none;
  }
`;

const Main = styled.main`
  transition: transform 0.2s;
  transform: translateX(${props => (props.menuOpened ? '50vw' : 0)});
  font-size: 14px;
  padding-left: 70px;
  position: absolute;
`;

const MenuButton = styled.button`
  background-color: ${props => (props.menuOpened ? '#666' : 'white')};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  position: fixed;
  left: 0;
  top: 0;
  z-index: ${props => props.theme.zIndex.fab};
  width: ${MENU_BUTTON_SIZE}px;
  height: ${MENU_BUTTON_SIZE}px;
  transition: 0.3s;

  &:hover {
    background-color: #666;

    .line {
      stroke: white;
    }
  }

  svg {
    position: absolute;
    transform-origin: center center;
    transform: scale(0.8);
    width: 70%;
    height: 70%;
  }

  .line {
    fill: none;
    stroke: ${props => (props.menuOpened ? 'white' : 'black')};
    stroke-width: 6;
    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);

    &:nth-of-type(1) {
      stroke-dasharray: 60 207;

      ${props =>
        props.menuOpened &&
        css`
          stroke-dasharray: 90 207;
          stroke-dashoffset: -134;
        `}
    }

    &.line:nth-of-type(2) {
      stroke-dasharray: 60 60;

      ${props =>
        props.menuOpened &&
        css`
          stroke-dasharray: 1 60;
          stroke-dashoffset: -30;
        `}
    }

    &.line:nth-of-type(3) {
      stroke-dasharray: 60 207;

      ${props =>
        props.menuOpened &&
        css`
          stroke-dasharray: 90 207;
          stroke-dashoffset: -134;
        `}
    }
  }
`;

export default function Layout({ children }) {
  const [menuOpened, setMenuOpened] = useBoolean(false);

  return (
    <ThemeProvider theme={theme}>
      <MenuButton menuOpened={menuOpened} onClick={setMenuOpened.toggle}>
        <svg width={100} height={100} viewBox='0 0 100 100'>
          <path
            className='line'
            d='M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058'
          />
          <path className='line' d='M 20,50 H 80' />
          <path
            className='line'
            d='M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942'
          />
        </svg>
      </MenuButton>
      <Nav menuOpened={menuOpened}>
        <div className='nav-inner'>
          <h2>
            騰森實業股份有限公司
            <br />
            Tessen Enterprise Co. Ltd.
          </h2>
          <ul>
            <li>
              <NavLink to='/'>關於我們</NavLink>
            </li>
            <li>
              <NavLink to='/products'>產品介紹</NavLink>
            </li>
            <li>
              <NavLink to='/quality-certification'>品質認證</NavLink>
            </li>
          </ul>
          <address>
            40044 台中市中區大誠街1號2F
            <br />
            Taichung City 40044, ROC (Taiwan) 2F., No.1, Dacheng St., Central Dist.
            <br />
            C：(+886)968-872768
            <br />
            T：(+886)4222-37728
            <br />
            F：(+886)4222-51240
            <br />
            V：53404001
            <br />
            E：richardtseng7@gmail.com
            <br />曾 彥 清 Yen-Ching Tseng
          </address>
        </div>
      </Nav>
      <Main menuOpened={menuOpened}>
        <Context.Provider value={{ menuOpened }}>{children}</Context.Provider>
      </Main>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
