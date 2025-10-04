import { useState, useEffect } from 'react';
import '../assets/Popupform.css';
interface PopupProps{
   show:boolean,
   onClose:()=>void,
  label?:string,
  message?:string
}
export default function Popup({ show, onClose, label, message }: PopupProps) {
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        if (show) {
            // Trigger animation on mount
            setTimeout(() => {
                setShowAnimation(true);
            }, 40); // slight delay to allow DOM paint
        } else {
            // Trigger animation on unmount
            setShowAnimation(false);
        }
    }, [show]);

    if (!show && !showAnimation) return null;

    const handleAnimationEnd = () => {
        if (!show) {
            setShowAnimation(false); // Ensure cleanup after animation ends
        }
    };

    return (
        <>
            <div
                className={`PopupOverlay ${showAnimation ? 'show' : ''}`}
                onAnimationEnd={handleAnimationEnd}
            />
          <div className={`Popupform ${showAnimation ? 'show' : ''}`}>
  <i className="fi fi-tr-circle-xmark close-icon" onClick={onClose}></i>
  
  <div className="popup-content">
  <h2>🎉 {label}</h2>
   
    <p>{message}</p>
  </div>
</div>

        </>
    );
}