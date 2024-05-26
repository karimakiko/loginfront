import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './componenet/home/Home.jsx';
import Login from './componenet/LoginForm/Login.jsx';
import List from './componenet/list/List.jsx';
import Single from './componenet/Single/Single.jsx';
import New from './componenet/new/New.jsx';
import Form from './componenet/form/Form.jsx';
import ListAbs from './componenet/listAbs/listAbs.jsx';
import DemandeAcc from './componenet/ListDemandesAcc/DemandeAcc.jsx';
import DemandeRef from './componenet/ListDemandesRef/DemandeRef.jsx';
import NewAbs from './componenet/NewAbs/NewAbs.jsx';
import FormAbs from './componenet/formAbs/formAbs.jsx';
import SingleAbs from './componenet/SingleAbs/SingleAbs.jsx';
import  PrivateRoutes  from './componenet/LoginForm/PrivateRoutes.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/">
            <Route path="home" element={<Home />} />
            <Route path="users">
              <Route path="Edit/:userId" element={<Form />} />
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>
            <Route path="Demandes">
              <Route path="Absence">
                <Route path="Edit/:userId" element={<FormAbs />} />
                <Route path=":code" element={<SingleAbs />} />
                <Route index element={<ListAbs />} />
                <Route path="new" element={<NewAbs />} />
                <Route path="DemandesAccpted" element={<DemandeAcc />} />
                <Route path="DemandesRefused" element={<DemandeRef />} />
              </Route>
            </Route>
            </Route>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;
