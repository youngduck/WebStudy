import React,{useRef,useState,useMemo,useCallback} from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList'
import CreateUser from './CreateUser';
import './App.css'


function App() {
  const name = 'react'

  //css
  const style = {
    backgroundColor:'black',
    color:'aqua',
    fontSize:24,//기본 단위 px
    padding:'1rem'
  }

  //user추가 구현
  const [users,setUsers] = useState([
    {
        id:1,
        username:'velopert',
        email:'public.velopert@gmail.com',
        active:true
    },
    {
        id:2,
        username:'tester',
        email:'tester@example.com',
        active:false
    },
    {
        id:3,
        username:'liz',
        email:'liz@xample.com',
        active:false
    },
  ])
  
  const nextId = useRef(4)

  const[inputs,setInputs]=useState({
    username:'',
    eamil:''
  })

  const {username,email}=inputs

  const onChange = useCallback(
    e=>{
      const {name,value}=e.target
      setInputs({...inputs,
      [name]:value})
    },[inputs]
  )

  const onCreate=useCallback(()=>{
      const user = {
        id:nextId.current,
        username,
        email,
      }

      setUsers([...users,user])
      setInputs({
        username:'',
        email:''
      })

      nextId.current+=1
  },[users,username,email])
  //user추가 구현 종료


  //user제거 구현
  /*user.id가 파라미터로 일치하지 않는 원소만 추출해서
  새로운 배열을 만듬*/
  const onRemove =useCallback((id)=>{
    setUsers(users.filter(user=>user.id !== id))
  },[users])

  //user수정 구현
  const onToggle = useCallback(id =>{
    setUsers(users.map(user=>
      user.id === id ? {...user, active: !user.active} : user
    ))
  },[users])

  const countActiveUsers=(users)=>{
    console.log('활성 사용자 수를 세는중...')
    return users.filter(user=>user.active).length
  }
  
  const count = useMemo(()=>countActiveUsers(users),[users])
  
  
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
        <Counter/>
        <InputSample/>
        <CreateUser 
          username={username} 
          email={email}
          onChange={onChange}
          onCreate={onCreate}
        />
        <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
        <div>활성 사용자 수 {count}</div>
      </>

  );
}

export default App;
