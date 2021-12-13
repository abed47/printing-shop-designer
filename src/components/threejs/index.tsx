import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from 'drei'
import {  Plane, OrbitControls } from '@react-three/drei';

const Box = () => {
    return <mesh>
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
}
  
const ThreeComponent = (props:any) => {
    return (
        <div className="three-wrapper">
            <Canvas>
      {/* <ambientLight /> */}
      {/* <pointLight position={[10, 10, 10]} /> */}
      {/* <Plane args={[2, 2]} /> */}
      <Box/>
      <Box />
      <OrbitControls />
    </Canvas>
        </div>
    );
}

export default ThreeComponent;