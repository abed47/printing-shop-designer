import { Canvas, useFrame } from '@react-three/fiber'
// import { OrbitControls } from 'drei'
import {  Plane, OrbitControls } from '@react-three/drei';
import { DoubleSide, Mesh } from 'three';
import { Ref, useEffect, useRef } from 'react';
// import { ambient } from 'three';


const Box = () => {
    return <mesh>
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color="red" />
    </mesh>
}

const Side = ({position, sizes, color, side, wireframe, son} : {position: [number, number, number], sizes: [number, number, number?], color: string, side?:any, wireframe: boolean, son?:any}) => {
    const sideRef = useRef<Mesh>(null);

    useEffect(() => {
        if(son === 1 && sideRef.current){
            sideRef.current.rotation.x = 1.5
            sideRef.current.rotation.y = 0
            sideRef.current.position.setZ(-.25)
            sideRef.current.position.setX(.5)
            sideRef.current.position.setY(.25)
        }
        // if(son === 2 && sideRef.current){
        //     sideRef.current.rotation.x = 1
        //     sideRef.current.rotation.y = 0
        //     sideRef.current.position.setZ(-.25)
        //     sideRef.current.position.setX(.5)
        //     sideRef.current.position.setY(.25)
        // }
    }, []);

    //@ts-ignore
    // useFrame(() => {
    //     if(sideRef?.current?.rotation?.x) sideRef.current.rotation.x = sideRef.current.rotation.y += 0.1
    //     console.log(sideRef)
    // })
    
    return <mesh position={position} ref={sideRef}>
        <planeGeometry attach="geometry" args={sizes} />
        {
        side ? 
        <meshBasicMaterial color={color} wireframe={true} side={side}/> : 
        <meshBasicMaterial color={color} wireframe={wireframe} /> }
    </mesh>
}
  
const ThreeComponent = (props:any) => {


    // const fold = () => {
    //     new Tween
    // };

    return (
        <div style={{height: window.innerHeight}} className="three-wrapper">
        <Canvas>
            <group>
            <Side sizes={[.5,.5]} position={[-0.5,0,0]} color="blue" wireframe={true} />
            <Side sizes={[.5,.5]} position={[0,-0.5,0]} color="blue" wireframe={true} />
            <Side sizes={[.5,.5]} position={[0.5,0,0]} color="blue" wireframe={true} son={2} />
            <Side sizes={[.5,.5]} position={[-0.5,-0.5,0]} color="blue" wireframe={true}  />
            <Side sizes={[.5,.5]} position={[-0.5,0.5,0]} color="red" side={DoubleSide} wireframe={true} son={1} />
            {/* <Box /> */}
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 15, 10]} angle={0.3} />
            <OrbitControls />
            </group>
        </Canvas>
        </div>
    );
}

export default ThreeComponent;