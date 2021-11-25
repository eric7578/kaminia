import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import useBoolean from './useBoolean';
import { desktop } from './rwd';

import './normalize.css';

export const Context = createContext();

const Wrapper = styled.div`
  display: flex;
  transition: transform 0.2s;
  width: calc(160vw);
  transform: translateX(${props => (props.menuOpened ? 0 : '-60vw')});

  nav {
    height: 100vh;
    width: 60vw;
  }

  main {
    flex: 1;
  }

  ${desktop} {
    width: calc(100vw + 420px);
    transform: translateX(${props => (props.menuOpened ? 0 : '-420px')});

    nav {
      width: 420px;
    }
  }
`;

const MenuButton = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 70px;
  height: 70px;

  svg {
    transform: scale(0.6) translate(0, -30%);
  }

  .line {
    fill: none;
    stroke: black;
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
  const { brightness } = useSpring({
    brightness: menuOpened ? 0.3 : 1
  });

  return (
    <>
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
      <Wrapper menuOpened={menuOpened}>
        <nav>
          <div className='contact'>
            <h2>
              騰森實業股份有限公司
              <br />
              Tessen Enterprise Co. Ltd.
            </h2>
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
          <ul>
            <li>
              關於我們
              <ul>
                <li>有機特級冷壓初榨橄欖油</li>
                <li>原產地保證特級冷壓初榨橄欖油</li>
                <li>早熟成特級冷壓初榨橄欖油</li>
                <li>傳統特級冷壓初榨橄欖油</li>
              </ul>
              <ul>
                <li>鹽之花</li>
              </ul>
            </li>
            <li>
              產品介紹
              <ul>
                <li>D.I.O.歐盟有機食品檢驗認證</li>
                <li>P.D.O認證「原產地名稱保護」</li>
              </ul>
              <ul>
                <li>有機特級冷壓初榨橄欖油</li>
                <li>原產地保證特級冷壓初榨橄欖油</li>
                <li>早熟成特級冷壓初榨橄欖油</li>
                <li>傳統特級冷壓初榨橄欖油</li>
                <li>鹽之花</li>
                <li>玻璃瓶檢測</li>
                <li>瓶蓋檢測</li>
                <li>錫桶檢測</li>
                <li>希臘卡米尼橄欖油莊園</li>
                <li>騰森實業股份有限公司</li>
              </ul>
              <ul>
                <li>希臘卡米尼橄欖油莊園</li>
                <li>騰森實業股份有限公司</li>
              </ul>
            </li>
            <li>品質認證</li>
          </ul>
        </nav>
        <animated.main
          style={{
            filter: brightness.to(b => `brightness(${b})`)
          }}
        >
          <Context.Provider value={{ menuOpened }}>{children}</Context.Provider>
        </animated.main>
      </Wrapper>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
