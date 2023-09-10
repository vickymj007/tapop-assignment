import Auth from "./layouts/auth/Auth";
import User from "./layouts/user/User";
import {RouterProvider, createBrowserRouter,createRoutesFromElements,Route} from 'react-router-dom'

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={<User/>}/>
    <Route path="/auth" element={<Auth/>}/>
  </Route>
))

function App() {

  return (

    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
