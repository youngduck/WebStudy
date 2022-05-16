import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper'
import Counter from './Counter'
import './App.css'


function App() {
  const name = 'react'
  {/*inline_css => camelCase */}
  const style = {
    backgroundColor:'black',
    color:'aqua',
    fontSize:24,//기본 단위 px
    padding:'1rem'
  }
  return (
      <>
        <Hello name ="react" color = "red"/> 
        <div style ={style}>
          {name}!
        </div>
        <div className="gray-box"></div>
        <Wrapper>
          <Hello name = 'lion' color='teal' isSpecial={true}></Hello>
          <Hello color='pink'/>
        </Wrapper>
        <Counter>

        </Counter>
      </>

  );
}

export default App;
