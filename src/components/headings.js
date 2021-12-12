import React, { useRef, useEffect } from 'react';
import { useInViewport } from 'react-in-viewport';
import styled, { keyframes } from 'styled-components';
import clsx from 'clsx';
import useBoolean from './useBoolean';

const heading1TextCliip = keyframes`
  from {
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
`;

const heading1OuterLeft = keyframes`
  from {
    transform: translateX(10%);
  }
  to {
    transform: none;
  }
`;

const heading1InnerLeft = keyframes`
  from {
    transform: translateX(-10%);
  }
  to {
    transform: none;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const emphasizeBlock = keyframes`
  0% {
    width: 0%;
    left: 0;
  }
  50% {
    width: 100%;
    left: 0;
  }
  100% {
    width: 0%;
    left: 100%;
  }
`;

export const Heading1 = styled.h3`
  letter-spacing: 5px;
  padding: 25px 0;
`;

const WHeading2 = styled.div`
  padding-bottom: 20px;
  position: relative;
  visibility: hidden;

  &::after {
    content: '';
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    width: 30px;
    height: 2px;
    background: #000;
  }

  .primary {
    margin: 0;
    font-size: 20px;
    padding-top: 5px;
  }

  .secondary {
    margin: 10px 0 0 0;
    font-size: 16px;
  }

  .title-inner {
    display: inline-block;
  }

  &.active {
    visibility: visible;
    animation: ${heading1OuterLeft} 350ms 350ms ease both;

    .primary {
      animation: ${heading1InnerLeft} 350ms 350ms ease both,
        ${heading1TextCliip} 350ms 0s cubic-bezier(0.5, 0, 0.1, 1) both;
    }

    .secondary {
      animation: ${heading1TextCliip} 350ms 0s cubic-bezier(0.5, 0, 0.1, 1) both;
    }
  }
`;

export function Heading2({ className, children, secondary }) {
  const ref = useRef();
  const { inViewport } = useInViewport(ref);
  const [active, setActive] = useBoolean(inViewport);

  useEffect(() => {
    if (!active && inViewport) {
      const id = setTimeout(() => {
        setActive.on();
      }, 500);
      return () => {
        clearTimeout(id);
      };
    }
  }, [inViewport, active]);

  return (
    <WHeading2 ref={ref} className={clsx(className, { active })}>
      <div className='title-inner'>
        <h2 className='primary'>{children}</h2>
        {secondary && <h3 className='secondary'>{secondary}</h3>}
      </div>
    </WHeading2>
  );
}

const WHeading3 = styled.div`
  position: relative;
  display: flex;
  align-items: baseline;

  &::after {
    background-color: #000;
    display: block;
    content: '';
    height: 1px;
    width: 1px;
    margin-left: 10px;
    transition: transform 9000ms;
    transform-origin: left center;
    transform: scaleX(0);
  }

  &.active {
    &::after {
      transform: scaleX(2000);
    }
  }

  h4 {
    font-size: 20px;
    margin: 0;
    padding-top: 5px;
    padding-bottom: 15px;
  }
`;

export function Heading3({ children }) {
  const ref = useRef();
  const { inViewport } = useInViewport(ref);

  return (
    <WHeading3 ref={ref} className={clsx({ active: inViewport })}>
      <h4>{children}</h4>
    </WHeading3>
  );
}

const WEmphasize = styled.span`
  display: inline;
  position: relative;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: #000;
    width: 0%;
  }

  a {
    padding: 0;
  }

  &.active {
    &::after {
      animation: ${emphasizeBlock} 800ms cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards;
    }

    a {
      opacity: 0;
      animation: ${fadeIn} 800ms 500ms forwards;
    }
  }
`;

export function Emphasize({ children, ...rest }) {
  const ref = useRef();
  const { inViewport } = useInViewport(ref);

  return (
    <WEmphasize ref={ref} className={inViewport ? 'active' : null}>
      <a {...rest}>{children}</a>
    </WEmphasize>
  );
}
