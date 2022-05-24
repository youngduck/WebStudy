import React,{useContext} from 'react'
import {UserDispatch} from './App'

const User=React.memo(
    function User({user}){

        const dispatch = useContext(UserDispatch)

        const style ={
            cursor:'pointer',
            color:user.active ? 'green' : 'black'
        }
    
        return(
            <div>
                <b style ={style} onClick={()=>{dispatch({type:'TOGGLE_USER',id:user.id})}}>{user.username}</b><span>({user.email})</span>
                <button onClick={()=>{dispatch({type:'REMOVE_USER',id:user.id})}}>삭제</button>
            </div>
        )
    }
)

function UserList({users}){
    
    return( 
    //리액트에서 배열 렌더링시 key 라는 props를 설정해줘야함
    <div>
       {users.map(user=>
           <User user={user} key={user.id}/> 
       )}
    </div>
    )}

export default React.memo(UserList)