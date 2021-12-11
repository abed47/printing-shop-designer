import { CanvasHTMLAttributes, useLayoutEffect, useState, useEffect, Fragment, useRef } from "react";
// import { RoughCanvas } from "roughjs/bin/canvas";
// import { RoughGenerator } from "roughjs/bin/generator";
//@ts-ignore
// import rough from 'roughjs/bundled/rough.esm';
import Konva from "konva";
import { Stage, Rect, Layer, Text, Transformer } from "react-konva";

// const generator:RoughGenerator = rough.generator();

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }:any) => {
    const shapeRef = useRef();
    const trRef:any = useRef();
  
    useEffect(() => {
      if (isSelected) {
        // we need to attach transformer manually
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    }, [isSelected]);
  
    return (
      <Fragment>
        <Rect
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          draggable
          onDragEnd={(e:any) => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={(e:any) => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node:any = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
  
            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }}
        />
        {isSelected && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox:any, newBox:any) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </Fragment>
    );
};

const initialRectangles = [
    {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      fill: 'red',
      id: 'rect1',
    },
    {
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      fill: 'green',
      id: 'rect2',
    },
];

const stackEx: Array<Array<{x: number, y: number, width: number, height: number, fill: string, id: string, border: number}>> = [
    [
        {
            x: 50,
            y: 50,
            width: 20,
            height: 50,
            fill: 'blue',
            id: 'rect1',
            border: 1
        },
        {
            x: 70,
            y: 50,
            width: 200,
            height: 50,
            fill: 'red',
            id: 'rect2',
            border: 2
        },
        {
            x: 270,
            y: 50,
            width: 20,
            height: 50,
            fill: 'green',
            id: 'rect3',
            border: 1
        }
    ],
    [
        {
            x: 50,
            y: 100,
            width: 20,
            height: 50,
            fill: 'olive',
            id: 'rect1',
            border: 1
        },
        {
            x: 70,
            y: 100,
            width: 200,
            height: 50,
            fill: 'teal',
            id: 'rect2',
            border: 2
        },
        {
            x: 270,
            y: 100,
            width: 20,
            height: 50,
            fill: 'antiquewhite',
            id: 'rect3',
            border: 1
        }
    ],
    [
        {
            x: 50,
            y: 150,
            width: 20,
            height: 50,
            fill: 'cadetblue',
            id: 'rect1',
            border: 1
        },
        {
            x: 70,
            y: 150,
            width: 200,
            height: 50,
            fill: 'red',
            id: 'rect2',
            border: 2
        },
        {
            x: 270,
            y: 150,
            width: 20,
            height: 50,
            fill: 'green',
            id: 'rect3',
            border: 1
        }
    ]
]

const CanvasComponent = (props: any) => {

    const [rectangles, setRectangles] = useState(stackEx);
    const [changeHistory, setChangeHistory] = useState([stackEx]);
    const [selectedId, selectShape] = useState(null);

    useLayoutEffect(() => {
        
    });

    const removePx:(s:string) => number = s => {
        if(!s) return 0;

        return +s.replaceAll(/px/ig,'');
    }

    const checkDeselect = (e: any) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          selectShape(null);
        }
    };

    const handleItemClick = (e:number, parent_index: number) => {
        let newSize:any = prompt('new size?', '50');
        let oldArr = [...rectangles];
        setChangeHistory([...changeHistory, oldArr])
        let newArr = [...rectangles];
        newSize = newSize?.replace(/[a-z]/ig, '');
        newSize = +newSize;
        newArr[parent_index][e].width = newSize;
        
        let offset = 50;
        for(let i = 0; i < newArr[parent_index].length; i++){
            newArr[parent_index][i].x = offset;
            offset += newArr[parent_index][i].width;
        }
        setRectangles(newArr);
    }

    return (
        <div className="canvas-wrapper">
            {/* @ts-ignore */}
            <Stage onMouseDown={checkDeselect} onTouchStart={checkDeselect} width={removePx(props.canvasWidth)}  height={removePx(props.canvasHeight)} style={{background: '#554f4750'}} >
                <Layer>

                    {
                        rectangles.map((parent_node, parent_index) => {
                            return parent_node.map((item, index) => {
                                return <Rect 
                                    key={index} 
                                    width={item.width} 
                                    height={item.height} 
                                    fill={item.fill} 
                                    x={item.x}
                                    y={item.y}
                                    onClick={() => handleItemClick(index, parent_index)}
                                    />
                            })
                        })
                    }
                    

{/* {rectangles.map((rect:any, i) => {
          return (
            <Rectangle
              key={i}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => {
                selectShape(rect.id);
              }}
              onChange={(newAttrs:any) => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setRectangles(rects);
              }}
            />
          );
        })} */}
                </Layer>
            </Stage>
        </div>
    );
}

export default CanvasComponent;