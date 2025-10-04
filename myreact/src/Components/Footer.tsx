import '../assets/footer.css'; // make sure you create this file for styles

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          <i className="fi fi-rr-copyright"></i> {new Date().getFullYear()} SKCARE. All rights reserved.
          <br />
      
        <div className="footer-links">
          <a >About</a>
          <a >Contact</a>
          <a >Privacy</a>
        </div>
        Coded by 
        <span style={{margin:'13px'}}>
            
          <a href="https://itsnourwithu.netlify.app/" target="_blank" rel="noopener noreferrer" style={{fontFamily:'Monkey'}}>NOUR</a>
        </span>
        with love 
        <i className="fi fi-rr-heart" style={{ color: 'pink', margin: '0 5px' }}></i> 
        and coffee 
        <i className="fi fi-rr-coffee" style={{ marginLeft: '5px',color:'brown' }}></i>
        </p>
       
      </div>
    </footer>
  );
}
