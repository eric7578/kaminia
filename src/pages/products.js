import React, { useCallback, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useInViewport } from 'react-in-viewport';
import { useSprings, animated, to } from '@react-spring/web';
import { Heading1, Heading2, Emphasize } from '../components/headings';

import p1 from '../static/Organic Extra Virgin Olive Oil/p1.png';
import p1FOSFA from '../static/Organic Extra Virgin Olive Oil/FOSFA/FOSFA_Organic-1.jpg';
import p1SGS from '../static/Organic Extra Virgin Olive Oil/SGS/FA_2015_41815-1.jpg';
import p1SkyLab from '../static/Organic Extra Virgin Olive Oil/SkyLab/17deg_1.jpg';
import p1FDA from '../static/Organic Extra Virgin Olive Oil/FDA.jpg';
import p1Import from '../static/Organic Extra Virgin Olive Oil/import_cert.jpg';

import p2 from '../static/PDO Extra Virgin Olive Oil/p2.png';

import p3 from '../static/Unrippened Extra Virgin Olive Oil/p3.png';

import p4 from '../static/Extra Virgin Olive Oil/p4.png';

import p5 from '../static/Fleur de sel/p5.png';
import p5_2 from '../static/Fleur de sel/p5-2.jpg';
import p5_3 from '../static/Fleur de sel/p5-3.jpg';
import p5_4 from '../static/Fleur de sel/p5-4.jpg';

import agr from '../static/cert/agr.png';
import csi from '../static/cert/csi.png';
import dio from '../static/cert/dio.png';
import eu from '../static/cert/eu.png';
import fda from '../static/cert/fda.png';
import fos from '../static/cert/fos.png';
import iaf from '../static/cert/iaf.png';
import ooc from '../static/cert/ooc.png';
import pdo from '../static/cert/pdo.png';
import sgs from '../static/cert/sgs.png';
import tuv from '../static/cert/tuv.png';
import slmed from '../static/cert/sl-med.png';
import { useFadeIn } from '../components/useImages';

const ProductMainImage = animated(styled.img`
  margin: 20px auto;
  display: block;
`);

const ProductBlock = styled.article`
  padding-right: 20px;
  margin-bottom: 80px;
`;

const CertIcons = styled.figure`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  img {
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
    delay: i * 70
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
        <animated.img
          key={i}
          src={images[i]}
          style={{
            opacity,
            transform: to([offset], offsetTranslate)
          }}
        />
      ))}
    </CertIcons>
  );
}

export default function Products() {
  const [refP5, renderP5] = useFadeIn([p5, p5_2, p5_3, p5_4]);

  return (
    <>
      <Heading1>產品介紹</Heading1>

      <ProductBlock>
        <Heading2 secondary='Organic Extra Virgin Olive Oil'>有機特級冷壓初榨橄欖油</Heading2>
        <ProductMainImage src={p1} />
        <p>
          產自斯巴達的泰格脫山區(Taitegos)，泰格脫山是希臘的第三高山，當地種植的安辛諾尼亞橄欖樹
          皆有數百年高齡，果實大小中等呈紫蘿藍色，成熟速度最慢，收穫季節在十二月底一月初，具有清新果香和和大量的多酚。橄欖的收成純以手工，生產製程完全合乎
          <Emphasize>歐盟有機食品認證</Emphasize>過程，不論生產和收穫過程不使用任何殺蟲劑、除草劑或化學肥料。
        </p>
        <p>
          安辛諾尼亞在手工收穫集中後，必須送至當地農會指定的有機橄欖油冷壓機具，製成後放入鋼桶靜待香氣風味成熟。有機橄欖油不同於傳統橄欖油之處就在於每一步驟都由化學檢測嚴密監控，而不是老師傅的經驗傳承，必須經過歐盟有機認證的嚴密管理，在現代化的機具監測下及最嚴格的生產標準與追蹤系統。鮮甜、雅緻、清澈的口感是最高品質有機橄欖油的保證。
        </p>
        <CertList images={[agr, dio, fda, sgs, fos, tuv, csi]} />
      </ProductBlock>

      <ProductBlock>
        <Heading2 secondary='Extra Virgin Olive Oil'>原產地保證特級冷壓初榨橄欖油</Heading2>
        <ProductMainImage src={p2} />
        <p>
          產自於希臘南端伯羅奔尼薩半島，克羅尼奇
          (Koroneiki)橄欖有別於一般橄欖的翠綠色，呈現深棕色或深紫色淚珠形狀，果實小而柔軟是皇家等級的橄欖品種。皇家克羅尼奇橄欖必須以人工採集，石磨成泥後放入棕櫚樹葉編織成的袋子冷榨出清澈的橄欖油。
        </p>
        <p>
          9公斤的橄欖才可以榨出1公升的橄欖油，這種古老且傳統的製作方法源自1885年，至今仍是當地最高級橄欖油的製成方式，滋味香醇雅致清澈金黃的橄欖油與新鮮淡雅的芳香是希臘古老的傳統風味。其遠近馳名的橄欖品種只種植在歐盟卡拉馬塔(Kalamata)農業保護區，當地無汙染的天然環境並維持當地微氣候傳統耕作製作方式，
          <Emphasize>歐盟原產地保護認證</Emphasize>是世界上最嚴格的產品認證（Protected Designated Origins, PDO）。
        </p>
        <CertList images={[pdo, agr, dio, fda, sgs, slmed, fos, tuv, csi]} />
      </ProductBlock>

      <ProductBlock>
        <Heading2 secondary='Unrippened Extra Virgin Olive Oil'>早熟成特級冷壓初榨橄欖油</Heading2>
        <ProductMainImage src={p3} />
        <p>
          產自於伯羅奔尼撒半島最南端的瑪尼(Mani)
          山區，本區的老橄欖樹生長在夏季燥熱缺水且冬季酷寒下雪的環境，粗放野耕的麻尼亞塔奇(Maniataki)橄欖是希臘稀少特有的品種。果實圓而結實，成熟時便會被山上的野鳥啄光，因此只能在果實還未成熟時手工摘採，斯巴達人堅信其果實具有更強韌的生命力。
        </p>
        <p>
          當地以強悍的民風、陡峭狹窄的山道而著名，海風為橄欖帶來了豐富的營養，特殊的風土條件造就卡米尼使用未熟成的橄欖榨油的傳統。手採的青澀橄欖以傳統低溫的方式冷榨出清澈翠綠色的橄欖油，酸價僅有0.2，富含維生素E及抗氧化多酚。希臘油農通常都會把這寶貴的橄欖油留給自己使用，渾厚的果實清香與獨特辛澀的口感榮獲「2013洛杉磯世界初榨橄欖油大賽金牌」。
        </p>
        <CertList images={[fda, sgs, slmed, fos, tuv, csi, ooc]} />
      </ProductBlock>

      <ProductBlock>
        <Heading2 secondary='Extra Virgin Olive Oil'>傳統特級冷壓初榨橄欖油</Heading2>
        <ProductMainImage src={p4} />
        <p>
          產自希臘南部拉克尼亞區，來自泰戈特山脈滿山數百年高齡原生橄欖樹，果實圓大含油量豐富，成熟速度緩慢。「Extra
          Virgin Olive
          Oil」特級冷壓初榨橄欖油裡最高等級，香味與營養成份最豐富的品質。歐盟嚴格管控收穫與製程的每一步驟，採摘24小時內以傳統冷壓(Cold
          Press）方式壓榨，完全不能添加與使用任何化學成分與方式，天然的冷壓初榨橄欖油會自然散發淡淡水果香氣，略帶苦味及刺激感，酸價低於0.8、發煙點為攝氏190~210度，適合各種食材的烹調。
        </p>
        <CertList images={[fda, sgs, slmed, fos, tuv, iaf]} />
      </ProductBlock>

      <ProductBlock>
        <Heading2 secondary='Fleur de sel'>鹽之花</Heading2>

        <div ref={refP5}>
          <ProductMainImage {...renderP5(0)} />
          <SquareImages>
            <animated.img {...renderP5(1)} />
            <animated.img {...renderP5(2)} />
            <animated.img {...renderP5(3)} />
          </SquareImages>
        </div>
        <p>
          鹽之花是手工採集的海鹽。鹽農必須非常小心地用木鋤輕輕在天然鹽鹵表面採集，如果動作不純熟，會把表面的海鹽拌入鹽田底層，與一般的海鹽混合而產生浪費。因為這項採集過程極度要求高超的技術與耗費人力，且世界上只有法國、西班牙、葡萄牙和希臘可以生產鹽之花，所以向來珍貴。卡米尼亞傳統希臘鹽之花，產於伯羅奔尼撒半島的拉克尼亞地區，千年來採集鹽之花的方式都沒有改變，堅持手工，使用木製工具，在夏日的十二點到四點最高溫時採集，地中海強烈的日照和傳統工藝保存了鹽之花的原始風貌，百分之百取自愛琴海水，創造出卓越的品質。在古代希臘，鹽之花一向由少女採集，這寫是希臘少女做為奉獻給她們守護神最崇高的禮物，所以在希臘鹽之花被稱為「處女之鹽」。
        </p>
        <CertList images={[slmed, fos]} />
      </ProductBlock>
    </>
  );
}
