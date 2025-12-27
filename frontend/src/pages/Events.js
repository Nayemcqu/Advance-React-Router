import { useLoaderData,data, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
  const {events}=useLoaderData();


  return( 
 <Suspense fallback={<p>Loading...</p>}>
 <Await resolve={events}>
    {(loadEvents)=><EventsList events={loadEvents}/>}
  </Await>
  </Suspense>
)}

export default EventsPage;

async function loadEvents(){

    const response = await fetch('http://localhost:8080/events')
      if (!response.ok) {
   // return {isError:true, message:'could not fetch data'};
throw new Response(JSON.stringify({message:'could not fetch events'}),{status:500,})
} else {
      const resData = await response.json();
    // Your backend returns { events: [...] }, so return just the array
    return resData.events;  
      ;
      }

}

export  function loader(){
return data({
    events:loadEvents()
})

};