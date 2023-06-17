// Routing
import { createBrowserRouter,createRoutesFromElements, RouterProvider, Route ,Routes} from "react-router-dom";
import RootLayout from './Layouts/RootLayout';
import ReactDOM from 'react-dom/client';

// State
import { Provider } from 'react-redux';
import store from './State/store';

// Pages
import RegisterPage from"./Pages/RegisterPage"
import ProfilePage from './Pages/ProfilePage'
import SearchPage from './Pages/SearchUsers'
import FolderPage from './Pages/FolderPage'
import EventsPage from "./Pages/EventsPage"
import NotesPage from './Pages/NotesPage' 
import HomePage from './Pages/HomePage';
import React from 'react';

// CSS
import './CSS/appLayout.css'
import './index.css'
// Color Themes
import './CSS/coolLayout.css'
import './CSS/warmLayout.css'

const router = createBrowserRouter(
  createRoutesFromElements((
    <Route path='/' element={<RootLayout/>}>
      <Route path='/' element = {<HomePage/>} />
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path="/events"element={<EventsPage/>}/>
      <Route path="/notes"element={<NotesPage/>}/>
      <Route path='/folders' element={<FolderPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path="/contacts" element={<SearchPage/>}/>
    </Route>
  ))
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

