import '../assets/hero3.css'
export default function ProductMain(){
    return(



        <div id="ProductMain" className="ProductMain">
          <div className="FlexRow">
            <span>\products</span>
            <div className='FlexRow'style={{gap:'3%'}}>
                <div className="ProductButton">
                    <span className="smallerfont">
                    <i className="fi fi-tr-circle-1"></i>
                    </span>
                    Best Sellers
                </div>
                <div className="ProductButton notselected">
                    <span className="smallerfont">
                    <i className="fi fi-tr-circle-2"></i>
                    </span>
                    Best Sellers
                </div>
                <div className="ProductButton notselected">
                    <span className="smallerfont">
                    <i className="fi fi-tr-circle-3"></i>
                    </span>
                    Best Sellers
                </div>
            </div>
          </div>

          <div className='FlexCol Text'>
          <span className="SubTitle relative inline-flex items-center justify-center">
  SHOP OUR BEST SELLERS
  <span className="absolute w-60 h-20 rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#14B8A6] opacity-20 blur-[20px] pointer-events-none z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
</span>

            

            <span className='BigTitle'>
  Clinically proven,
  <span className="circle-image">
    <img src="src/assets/images/flower1-removebg-preview.png" alt="leaf" />
  </span>
  traceable and advanced botanical formulas
  <span className="circle-image">
  <img src="src/assets/images/flower6-removebg-preview.png" alt="leaf" />
  </span>
  that transform the state of your skin
</span>

          </div>

          <div className='products'>
            <div className='FlexCol mainbig'>
            <div className='mainproduct1' style={{backgroundImage: "url('src/assets/images/productmain1.jpg')"}}>
            <div className='flexend'>
               <div className='circle'>
               <i className="fi fi-tc-shopping-cart" ></i>
               </div>
               </div>
               <div className='buynow'>
                <span className='buynowtext'>
                  Buy Now
                  <div className='circle'>
               
               <i className="fi fi-ts-arrow-right" style={{color:'black',fontSize:'1vw'}}></i>
               </div>
                </span>
                <div className='circle buynowprice'  style={{fontFamily:'sans-serif'}}>32.3 <span style={{fontFamily:'sans-serif'}}>$</span></div>
               </div>
            </div>
            <div className='productinfo'>
                <span>
                  BB CREAM <br />
                  <span className='secondary'>
                    <span className='circle2' style={{background:'blue'}}></span>
                  Face cream
                  </span>
                
                </span>
                <span className='secondary'>
                  60ml
                </span>
            </div>
            </div>
            <div className='FlexCol mainbig'>
            <div className='mainproduct1' style={{backgroundImage: "url('src/assets/images/productmain5.jpg')"}}>
            <div className='flexend'>
               <div className='circle'>
               <i className="fi fi-tc-shopping-cart" ></i>
               </div>
               </div>
               <div className='buynow'>
                <span className='buynowtext'>
                  Buy Now
                  <div className='circle'>
               
               <i className="fi fi-ts-arrow-right" style={{color:'black',fontSize:'1vw'}}></i>
               </div>
                </span>
                <div className='circle buynowprice'  style={{fontFamily:'sans-serif'}}>32.3 <span style={{fontFamily:'sans-serif'}}>$</span></div>
               </div>
            </div>
            <div className='productinfo'>
                <span>
                  BB CREAM <br />
                  <span className='secondary'>
                    <span className='circle2'></span>
                  Face cream
                  </span>
                
                </span>
                <span className='secondary'>
                  60ml
                </span>
            </div>
            </div>
            <div className='FlexCol mainbig'>
            <div className='mainproduct1' style={{backgroundImage: "url('src/assets/images/productmain2.jpg')"}}>
            <div className='flexend'>
               <div className='circle'>
               <i className="fi fi-tc-shopping-cart" ></i>
               </div>
               </div>
               <div className='buynow'>
                <span className='buynowtext'>
                  Buy Now
                  <div className='circle'>
               
               <i className="fi fi-ts-arrow-right" style={{color:'black',fontSize:'1vw'}}></i>
               </div>
                </span>
                <div className='circle buynowprice'  style={{fontFamily:'sans-serif'}}>32.3 <span style={{fontFamily:'sans-serif'}}>$</span></div>
               </div>
            </div>
            <div className='productinfo'>
                <span>
                  BB CREAM <br />
                  <span className='secondary'>
                    <span className='circle2' style={{background:'pink'}}></span>
                  Face cream
                  </span>
                
                </span>
                <span className='secondary'>
                  60ml
                </span>
            </div>
            </div>
          </div>
        </div>
    );
}