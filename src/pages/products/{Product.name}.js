import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import styled from 'styled-components';
import { useInViewport } from 'react-in-viewport';
import { graphql } from 'gatsby';
import { useSprings, animated, to } from '@react-spring/web';
import { Heading2, Heading3, Emphasize } from '../../components/headings';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import Lightbox from 'react-image-lightbox';
import useBoolean from '../../components/useBoolean';
import { useFadeIn } from '../../components/useImages';

import 'react-image-lightbox/style.css';
import './lightbox.css';

const StyledHeading2 = styled(Heading2)`
  margin-bottom: 10px;
`;

const ProductMainImage = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const WProduct = styled.article`
  padding: 20px 20px 20px 0;

  p {
    background: #eaeaea;
    padding: 10px 20px;
    margin: 0;
    font-size: 12px;

    &:last-of-type {
      margin-bottom: 20px;
    }
  }
`;

const CertIcons = styled.figure`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  > * {
    margin: 0;
    overflow: hidden;
    width: 50%;
  }

  figcaption {
    padding-bottom: 6px;
    padding-right: 80px;
    padding-left: 10px;
    margin-bottom: 20px;
    position: relative;

    &:after {
      content: '';
      left: 0;
      bottom: 0;
      height: 1px;
      width: 100%;
      background-color: #ddd;
      position: absolute;
    }
  }
`;

const SquareImages = styled.figure`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;

  img {
    border: 1px solid white;
    border-left: none;
    border-top: none;
    width: 130px;
    height: 130px;
    margin: 0;
    background-repeat: no-repeat;
  }
`;

function CertList({ images }) {
  const ref = useRef();
  const { inViewport } = useInViewport(ref);
  const offsetTranslate = useCallback(offset => `translateY(${offset}px)`, []);
  const [springProps, api] = useSprings(images.length, i => ({
    from: {
      opacity: 0,
      offset: 30
    },
    to: {
      opacity: 1,
      offset: 0
    },
    delay: i * 70 + 600
  }));

  useEffect(() => {
    if (inViewport) {
      api.resume();
    } else {
      api.pause();
    }
  }, [inViewport]);

  return (
    <CertIcons ref={ref}>
      {springProps.map(({ offset, opacity }, i) => (
        <animated.div
          key={i}
          src={images[i]}
          style={{
            opacity,
            transform: to([offset], offsetTranslate)
          }}
        >
          <GatsbyImage image={images[i]} />
        </animated.div>
      ))}
    </CertIcons>
  );
}

const WReports = styled.ul`
  font-size: 12px;
  margin-top: 15px;
  color: #a2a2a2;

  .org {
    &::after {
      display: block;
      content: '';
      width: 35px;
      height: 1px;
      background-color: #000;
      margin-top: 10px;
    }
  }

  .org-reports {
    font-size: 14px;
    color: #000;
  }

  .org-report-name {
    margin-bottom: 0;
  }
`;

export default function Product(props) {
  const { product } = props.data;
  const [report, setReport] = useState();
  const [open, setOpen] = useBoolean(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [nextIndex, prevIndex] = useMemo(() => {
    return [(imageIndex + 1) % report?.images.length, (imageIndex + report?.images.length - 1) % report?.images.length];
  }, [imageIndex, report]);
  const squares = useMemo(() => {
    return product.squareImages?.map(img => img.childImageSharp.fluid.src) ?? [];
  }, [product.squareImages]);
  const [refSquare, renderSquares] = useFadeIn(squares);

  return (
    <WProduct>
      <StyledHeading2 secondary={product.name}>{product.zhName}</StyledHeading2>
      <ProductMainImage>
        <GatsbyImage image={getImage(product.heroImage)} alt='' />
      </ProductMainImage>
      {squares.length > 0 && (
        <SquareImages ref={refSquare}>
          {squares.map((img, i) => (
            <animated.img {...renderSquares(i)} />
          ))}
        </SquareImages>
      )}
      {product.description.map((desc, i) => (
        <p key={i}>{desc}</p>
      ))}
      <CertList images={product.cert.map(getImage)} />
      <Heading3>檢驗報告</Heading3>
      <WReports>
        {product.orgs.map((org, i) => (
          <li key={i} className='org'>
            {org.name}
            <ul className='org-reports'>
              {org.reports.map((r, i) => (
                <li
                  key={i}
                  className='org-report-name'
                  onClick={e => {
                    setReport(r);
                    setImageIndex(0);
                    setOpen.on();
                  }}
                >
                  <Emphasize>{r.name}</Emphasize>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </WReports>
      {open && (
        <Lightbox
          imagePadding={0}
          imageTitle={report.name}
          mainSrc={report.images[imageIndex].childImageSharp.fluid.src}
          nextSrc={report.images[nextIndex].childImageSharp.fluid.src}
          prevSrc={report.images[prevIndex].childImageSharp.fluid.src}
          onCloseRequest={setOpen.off}
          onMovePrevRequest={() => setImageIndex(nextIndex)}
          onMoveNextRequest={() => setImageIndex(prevIndex)}
        />
      )}
    </WProduct>
  );
}

export const query = graphql`
  query ($id: String!) {
    product(id: { eq: $id }) {
      name
      zhName
      description
      heroImage {
        childImageSharp {
          gatsbyImageData
        }
      }
      squareImages {
        childImageSharp {
          fluid {
            src
          }
        }
      }
      cert {
        childImageSharp {
          gatsbyImageData
        }
      }
      orgs {
        name
        reports {
          name
          images {
            childImageSharp {
              fluid {
                src
              }
            }
          }
        }
      }
    }
  }
`;
