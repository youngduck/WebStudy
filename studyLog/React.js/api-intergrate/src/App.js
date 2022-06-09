import './App.css';
import Users from './Users'
import { UsersProvider } from './UsersContext';

/*
import UserUseReducer from './UserUseReducer';
import useAsync from './useAsync';
*/



function App() {


  return (
  <>
    {/*<UsersUsestate/>*/}
    {/*<UserUseReducer/>*/}
    <UsersProvider>
      <Users />
    </UsersProvider>

  </>

  );
}

export default App;
