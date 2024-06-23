import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import Home from './pages/home/home';
import NavbarLoggedOut from './components/navbar/NavbarLoggedOut';
import 'bootstrap/dist/js/bootstrap'
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/js/bootstrap.bundle';
import Signup from './pages/inscription/SignUp';
import NavbarLoggedUserIn from './components/navbar/NavbarLoggedUserIn';
import NavbarLoggedAdminIn from './components/navbar/NavbarLoggedAdminIn';
import { useState } from 'react';
import LogOut from './pages/logout/LogOut';
import EventListCard from './components/evenement/event-list';
import EventDetailPage from './pages/event/event-view/event-details.jsx';
import ViewProfil from './pages/profil/view-profil/ViewProfil';
import ChangePasswordPage from './pages/profil/edit-password/EditPassword';
import TicketList from './pages/profil/list-ticket/list-ticket';
import UserList from './pages/users/user-list/user-list';
import CGU from './components/politique/cgu';
import Footer from './components/footer/footer';
import UserEdit from './pages/users/user-edit/user-edit';
import UserTicketList from './pages/users/user-ticket-list/user-ticket-list';
import CategoryList from './pages/category/category-list/category-list';
import CategoryEdit from './pages/category/category-edit/category-edit';
import CategoryCreate from './pages/category/category-create/category-create';
import EventListByIdCategory from './pages/category/category-list-event/category-list-event';
import EventList from './pages/event/event-list/event-list';
import EventCreate from './pages/event/event-create/event-create';
import EventEdit from './pages/event/event-edit/event-edit';
import EventSubscriptionList from './pages/event/event-subscription-list/event-subscription-list';
import UserCreate from './pages/users/user-create/user-create';
import NotFound from './pages/404/404.jsx'
import './App.css';


function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    setIsLoggedIn(!!role);
  }, []);

  return (
    <Router>

      <div>
      {userRole === 'ADMIN' && isLoggedIn ? (<NavbarLoggedAdminIn /> ) 
      : userRole === 'USER' && isLoggedIn ? (<NavbarLoggedUserIn />) 
      : (<NavbarLoggedOut /> )}
      <Routes>
        <Route path="/" element={<Home />} />
     
        <Route path="/connection" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/inscription" element={<Signup/>} />
        <Route path="/deconnexion" element={<LogOut setIsLoggedIn={setIsLoggedIn}/>} />
     
        <Route path="/evenements" element={<EventListCard/>} />
        <Route path="/evenements/details/:eventId" element={<EventDetailPage/>} />
     
        {isLoggedIn && (
        <>
        <Route path="/user/profil" element={ <ViewProfil /> } />
        <Route path="/user/profil/password" element={<ChangePasswordPage/> } />
        <Route path="/user/profil/tickets" element={<TicketList />} />
        </>
        )}     
       
        {userRole === 'ADMIN' && isLoggedIn && (
            <>
              <Route path="/admin/user-list" element={<UserList />} />
              <Route path="/admin/user-create" element={<UserCreate />} />
              <Route path="/admin/user-edit/:id" element={<UserEdit />} />
              <Route path="/admin/user-edit/ticket-list/:id" element={<UserTicketList />} />

              <Route path="/admin/category-list" element={<CategoryList />} />
              <Route path="/admin/category-edit/:id" element={<CategoryEdit />} />
              <Route path="/admin/category-create" element={<CategoryCreate />} />
              <Route path="/admin/category-list-event/:id" element={<EventListByIdCategory />} />

              <Route path="/admin/event-list" element={<EventList />} />
              <Route path="/admin/event-create" element={<EventCreate />} />
              <Route path="/admin/event-edit/:id" element={<EventEdit />} />
              <Route path="/admin/event-edit/subscription-list/:id" element={<EventSubscriptionList />} />
            </>
          )}


        <Route path="/conditions-utilisation" element={<CGU />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      {<Footer/>}
      </div>
    </Router>
  );
}

export default App;
