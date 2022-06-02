import React,{useReducer,useMemo,} from 'react';

import UserList from './UserList'
import CreateUser from './CreateUser';
import produce from 'immer'
import './App.scss'
import Button from './components/Button'

const countActiveUsers=(users)=>{
  console.log('활성 사용자 수를 세는중...')
  return users.filter(user=>user.active).length
}

const initialState={
  inputs:{
    username:'',
    email:''
  },
  users:[{
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
},]
}

function reducer(state,action){
  switch(action.type){
    case 'CREATE_USER':
      return ({
        users:state.users.concat(action.user)
      })

    case 'TOGGLE_USER':
      return (
        produce(state,draft=>{
          const user = draft.users.find(user=>user.id===action.id)
          user.active=!user.active
        })
      )
    case 'REMOVE_USER':
      return (
        produce(state,draft=>{
          const index = draft.users.findIndex(user=>user.id===action.id)
          draft.users.splice(index,1)
        })
      )

    default :
      return state  
  }
}

export const UserDispatch = React.createContext(null)

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  
  const {users}=state;
  
 const count = useMemo(()=>countActiveUsers(users),[users])
  
  return (
      <UserDispatch.Provider value = {dispatch}>
        <CreateUser />
        <UserList users={users} />
        <div>활성사용자 수 : {count}</div>
        <div className='App'>
          <div className='buttons'>
            <Button size="large" onClick={()=>console.log("클릭됬다!")} outline>BUTTON</Button>
            <Button>BUTTON</Button>
            <Button size={"small"}>BUTTON</Button>
          </div>
          <div className='buttons'>
          <Button size={"large"} color={"pink"}>BUTTON</Button>
            <Button color={"pink"}>BUTTON</Button>
            <Button size={"small"} color={"pink"}>BUTTON</Button>
          </div>
          <div className='buttons'>
          <Button size={"large"} color={"gray"}>BUTTON</Button>
            <Button color={"gray"}>BUTTON</Button>
            <Button size={"small"} color={"gray"} outline>BUTTON</Button>
          </div>
          <div className='buttons'>
          <Button size={"large"} color={"gray"} fullwidth>BUTTON</Button>
            <Button color={"pink"} fullwidth>BUTTON</Button>
            <Button size={"small"} color={"blue"} outline fullwidth>BUTTON</Button>
          </div>
        </div>
      </UserDispatch.Provider>

  );
}

export default App;
