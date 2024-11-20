import { CornersIn, CornersOut } from 'phosphor-react';
import React, { useState } from 'react';

const FullscreenComponent: React.FC = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            enterFullscreen();
        } else {
            exitFullscreen();
        }
    };

    const enterFullscreen = () => {
        const element = document.documentElement; // Fullscreen the entire document
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if ((element as any).mozRequestFullScreen) { // Firefox
            (element as any).mozRequestFullScreen();
        } else if ((element as any).webkitRequestFullscreen) { // Chrome, Safari, and Opera
            (element as any).webkitRequestFullscreen();
        } else if ((element as any).msRequestFullscreen) { // IE/Edge
            (element as any).msRequestFullscreen();
        }
        setIsFullscreen(true);
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if ((document as any).mozCancelFullScreen) { // Firefox
            (document as any).mozCancelFullScreen();
        } else if ((document as any).webkitExitFullscreen) { // Chrome, Safari, and Opera
            (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) { // IE/Edge
            (document as any).msExitFullscreen();
        }
        setIsFullscreen(false);
    };

    return (
        <button className='cursor-pointer outline-none border-0' onClick={toggleFullscreen}>
            {isFullscreen ? <CornersIn size={32} color="#635FC7" /> : <CornersOut size={32} color="#635FC7" />}
        </button>
    );
};

export default FullscreenComponent;
