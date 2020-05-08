import React, { useEffect, useContext } from 'react';
import { footOpenFn } from 'common';
import { Store } from 'store';

const Footer = () => {
  const {footEl} = useContext(Store);
  // const [isFootOpen, setFootOpen] = useState(false);

  useEffect(() => {
    const footEvenFn = footOpenFn(footEl.current);
    return () => {
      if (footEvenFn) {
        footEvenFn.destroy();
      }
    };
  });

  return (
    <footer id="footer" ref={footEl}>
      <span className="fInfoBtn">
        <button type="button">Information</button>
      </span>
      <div className="fInfo">
        <div className="fInfoL">
          We dream, explore and create progressive design
        </div>
        <div className="fInfoR">
          <p className="infoTit">디자인 스튜디오 | 더그래픽노블스<br></br>
          The Graphic Novels</p>
          <p>
            A. 서울시 광진구 자양로 214 4F 04976 <br></br>
            / 214, Jayang-ro, Gwangjin-gu, Seoul, Republic of Korea
          </p>
          <p>T. 02-455-9199 <br></br>
          E. the-gn@the-gn.com</p>
        </div>
        <p className="copyright">ⓒ The Graphic Novels All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
