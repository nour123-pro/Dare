import { useRef, useEffect } from "react";
import "../assets/UnderHero.css";

import CircleType from "circletype";
export default function UnderHero(){
    const textRef = useRef(null);

    useEffect(() => {
      new CircleType(textRef.current).radius(300);
    }, []);
    return(
 



        <div className="UnderHero">

            <div className="UnderHeroCircle">
            <div ref={textRef} className="UnderHeroCircleText">
                <span>FROM 
                <span>✈️</span>
                    KOREA <span style={{ fontFamily: `'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif` }}>
  🇰🇷
</span>
  <span>📍🇱🇧</span> TO BEIRUT,FROM SOEUL STREETS TO THE CISOR OF LEBANON</span>
               
            </div>
            </div>
        </div>
    );
}