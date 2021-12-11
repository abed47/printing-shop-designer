import React, { useRef, useState } from "react";
import CanvasComponent from "../../components/canvas";
import ThreeComponent from "../../components/threejs";

const MainComponent = (props: any) => {

    let moveEvent:any = null;
    let mouseUpEvent: any = null;

    const [canvasWidth, setCanvasWidth] = useState<string>((window.innerWidth / 2) + 'px');
    const [threeWidth, setThreeWidth] = useState<string>((window.innerWidth / 2) + 'px');

    const canvasContainerRef = useRef<any>(null);

    const handleLineDragStart = (e: React.MouseEvent) => {
        // console.log(e)
        moveEvent = document.addEventListener('mousemove', handleLineDrag);
        mouseUpEvent = document.addEventListener('mouseup', handleLineDragEnd);
    }

    const handleLineDrag = (e: MouseEvent) => {
        // console.log(e.x, e.pageX, e.cl)
        setCanvasWidth((e.clientX) + 'px')
        setThreeWidth((window.innerWidth - e.clientX) + 'px')
    }

    const handleLineDragEnd = (e: MouseEvent) => {
        console.log(e)
        document.removeEventListener('mousemove', handleLineDrag)
        document.removeEventListener('mouseup', handleLineDragEnd);
        //@ts-ignore
        moveEvent = null;
        mouseUpEvent = null;
    }

    return (
        <div className="main-container">
            <div className="canvas-container" ref={canvasContainerRef} style={{width: canvasWidth}}>
                <CanvasComponent />
            </div>
            <div draggable={false} className="divider" onMouseDown={handleLineDragStart}>H</div>
            <div className="three-container" style={{width: threeWidth}}>
                <ThreeComponent />
            </div>
        </div>
    );
}

export default MainComponent;