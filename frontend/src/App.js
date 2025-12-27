import { loader as eventsLoader } from './pages/Events';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import HomePage from './pages/Home';
import EventsPage from './pages/Events';
import EventDetailPage, {loader as eventDetailLoader,action as deleteEventAction} from './pages/EventDetail';
import NewEventPage, { action as newEventAction } from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';
import ErrorPage from './pages/Error';
import {action as manipulateEventAction} from './components/EventForm'
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
function App() {

const router=createBrowserRouter([{
path:'/', element:<RootLayout/>,errorElement:<ErrorPage/>,children:[
{ index:true, element:<HomePage/>,
},
 { path:'events', element:<EventsRootLayout/>, children:[
{ index:true, element:<EventsPage/>, loader:eventsLoader
},
{path:':id',id:'event-detail', loader:eventDetailLoader, children:[
{ index:true, element:<EventDetailPage/>,action:deleteEventAction},

{ path:'edit', element:<EditEventPage/>,action:manipulateEventAction
}
]},

{ path:'new', element:<NewEventPage/>, action:manipulateEventAction,
},

]

  },
 {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },

]
}
 
]);

  return <RouterProvider router={router}>
 <div>


 </div>
  </RouterProvider>
  
 
}

export default App;
