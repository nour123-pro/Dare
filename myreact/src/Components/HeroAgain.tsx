import '../assets/woww.css'
export default function HeroWow(){
    return(
       <div className="wow">

        <div className='space'>
            <span className='TextHero1'>Take Controll </span>
            <div className='producthero2'>
                <span >
                   
                    <img src="src/assets/images/jar2-removebg-preview.png" alt="" />
                    </span>
            </div>
            <div className='producthero3'>
                <span >
                <img src="src/assets/images/Untitled_design__2_-removebg-preview.png" alt="" />
               
                </span>
            </div>
            <div className='producthero4'>
                <span >
                <img src="src/assets/images/Untitled_design-removebg-preview.png" alt="" />
                </span>
            </div>
            <span className='TextHero2'> Of You
            
                
                r Skin</span>
        </div>

        <div className='textleftbottom'>
        We believe that, everybody has a beautiful skin. <br /> And with the help of our products, your can take controll of your skin.
        </div>

        <div className="social-iconshero">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter social-icon"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram social-icon"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook social-icon"></i>
            </a>
        </div>

        <div className='mouseicon'>
            
            <i className="fi fi-tr-chevron-double-down"></i>
        </div>
       
       </div>
    );
}