import { CanvasHTMLAttributes, useLayoutEffect, useState } from "react";
// import { RoughCanvas } from "roughjs/bin/canvas";
// import { RoughGenerator } from "roughjs/bin/generator";
//@ts-ignore
// import rough from 'roughjs/bundled/rough.esm';
import Konva from "konva";
import { Stage, Rect, Layer, Text } from "react-konva";

// const generator:RoughGenerator = rough.generator();

const CanvasComponent = (props: any) => {

    useLayoutEffect(() => {
        
    })

    return (
        <div className="canvas-wrapper">
            <Stage width={500} height={500}>
                <Layer>
                    <Rect 
                        fill="red"
                        height={20}
                        width={20}
                        draggable={true}
                        onClick={e => console.log('hello')}
                    />
                </Layer>
            </Stage>
        </div>
    );
}

export default CanvasComponent;