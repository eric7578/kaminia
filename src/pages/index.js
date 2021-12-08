import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { useTransition, animated } from '@react-spring/web';
import Seo from '../components/seo';
import useLayoutState from '../components/useLayoutState';
import { desktop } from '../components/rwd';
import dio from '../static/cert-dio.png';
import eu from '../static/cert-eu.png';
import pdo from '../static/cert-pdo.png';
import pdo2 from '../static/cert-pdo2.png';

const indexBackgroundQuery = graphql`
  query {
    bg: allImageSharp(filter: { original: { src: { regex: "/^/static/index/" } } }) {
      nodes {
        original {
          src
        }
      }
    }
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh + 70px);
`;

const Background = animated(styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`);

const Article = styled.article`
  position: absolute;
  right: 0;
  top: 100vh;
  padding: 30px;
  background: #fff;
  width: calc(100vw - 70px);

  h3 {
    letter-spacing: 5px;
    font-weight: bold;
    width: 100%;
  }

  section {
    padding: 10px;
  }

  ${desktop} {
    display: flex;
    flex-wrap: wrap;

    section {
      width: 50%;
    }
  }
`;

const TitleBlock = styled.div`
  padding-right: 45px;
  padding-top: 10px;
  margin: 0;
  min-width: 200px;
  float: left;

  h4,
  h5 {
    margin: 0;
  }

  h5 {
    margin-top: 10px;
  }
`;

const CertIcons = styled.figure`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 0;

  img {
    margin: 0;
    border-radius: 100px;
    overflow: hidden;
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

export default function IndexPage() {
  const { bg } = useStaticQuery(indexBackgroundQuery);

  const { menuOpened } = useLayoutState();
  const [index, setIndex] = useState(0);
  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 3000 }
  });

  useEffect(() => {
    if (!menuOpened) {
      const tm = setInterval(() => {
        setIndex(state => (state + 1) % bg.nodes.length);
      }, 4000);
      return () => clearTimeout(tm);
    }
  }, [menuOpened, bg.nodes.length]);

  return (
    <>
      <Seo title='Home' />
      <CarouselWrapper>
        {transitions((style, i) => {
          const {
            original: { src }
          } = bg.nodes[i];
          return (
            <Background
              style={{
                ...style,
                backgroundImage: `url(${src})`
              }}
            />
          );
        })}
      </CarouselWrapper>
      <Article>
        <h3>KAMINIA的堅持</h3>
        <section>
          <TitleBlock>
            <h4>希臘品質的驕傲</h4>
          </TitleBlock>
          <p>
            希臘的品質來自於對傳統的堅持與自信。希臘的農業傳統根源於其土壤及氣候的風土條件，巴爾幹半島的最南端的天然優勢造就了希臘橄欖油的卓越品質。希臘從遠古至今都與橄欖樹連結，希臘是次於義大利和西班牙的橄欖油生產國，但是其品質是世界上橄欖油愛好者所公認；而希臘橄欖油生產量雖然不是世界第一，但是其初榨橄欖油（Extra
            Virgin Olive Oil）的產量卻是世界第一（百分之七十的希臘橄欖油為初榨橄欖油或更高等級）
            而其酸度都在千分之八以下。
          </p>
          <p>
            我們的家族在希臘斯巴達地區從事橄欖的培植和生產已有兩百年的歷史。「地中海飲食法」的傳統從先祖的記憶中代代相傳下來，我們極度重視家族傳統品質的維繫，但是我們也沿用現代科技以加強橄欖油的品質維持和品質控制。卡米尼公司創辦人Ioannis
            Anagnostopoulos先生就是秉持這樣的信念，用家族的農業品質之遺緒創立本公司，他執著於橄欖的栽種和生產初榨橄欖油，他自年少就在祖父母嚴格的監督下開始學習地中海農業的生產技術，因此他在斯巴達的農產品的品質可以被全世界的消費者分享。
          </p>
        </section>
        <section>
          <TitleBlock>
            <h4>D.I.O.歐盟有機食品檢驗認證</h4>
            <h5>Organic Food</h5>
          </TitleBlock>
          <p>
            有機特級初榨橄欖油是目前全球最高等級的橄欖油。有機食品這一詞是從英文Organic Food 直譯過來的。
            按照國際有機農業生產標準，在生產過程中不使用化學肥料、農藥、生長調節劑和畜禽飼料添加劑等物質，不採用基因工程技術，而是採用傳統自然耕作方式和生態學原理而獲得的農副產品及其加工品，經合法的、獨立的有機食品認證機構認證後稱為有機食品。有機食品生產和加工過程中必須建立嚴格的質量管理體系、生產過程控制體系和追踪體系。
          </p>
          <CertIcons>
            <figcaption>D.I.O Organic Food License</figcaption>
            <img src={dio} alt='D.I.O' />
            <img src={eu} alt='European League' />
          </CertIcons>
        </section>
        <section>
          <TitleBlock>
            <h4>P.D.O認證原產地名稱保護</h4>
            <h5>Protected Designation of Origin</h5>
          </TitleBlock>
          <p>
            P.D.O在歐洲是最嚴格的認證方式。產品必須遵守指定產區的傳統製法，並遵循歐盟最嚴格的指令(2568/91
            EU)。其規定包括指定的原產地得天獨厚的無汙染地理、氣候、空氣與水源，獨特地理區域、當地的生產方式等，對於品種、農藝及指定的傳統製法等所有製程都有嚴格的規定。僅針對「特級初榨」(Extra
            Virgin)類別。P.D.O.產品的建立，是為了支持那些選擇採取傳統方式及維持當地氣候(micro-climate)的生產者。P.D.O.等級只能通過歐盟認證後註冊取得，是一個特殊的認證產權，用來證明歐盟食品或農產品出產的地方。橄欖油的色澤可能為翠綠色到金黃色不等，消費者應該注意品牌標示上的說明，最應該留意的是：裝瓶日期和保存期限、酸度、產區、每公升合理的售價和生產公司的資訊。
          </p>
          <CertIcons>
            <figcaption>P.D.O License</figcaption>
            <img src={pdo} alt='p.d.o' />
            <img src={pdo2} alt='p.d.o' />
          </CertIcons>
        </section>
      </Article>
    </>
  );
}
