import {redirect,useRouteLoaderData,data,Await} from 'react-router-dom'
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';


function EventDetailPage(){

const {events,event}=useRouteLoaderData('event-detail');

return <>

<Suspense fallback={<p>lOADING...</p>}>
<Await resolve={event}>
{loadEvent=> <EventItem event={loadEvent}/>}
</Await>
</Suspense>
<Suspense fallback={<p>Loading...</p>}>
<Await resolve={events}>
  {loadEvent=> <EventsList events={loadEvent}/>}
</Await>
</Suspense>

</> 

   
    

}

export default EventDetailPage;


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

async function loadEvent(id) {
  const response=await fetch('http://localhost:8080/events/' + id);  

if(!response.ok){
throw new Response(JSON.stringify({message:'could not fetch data'}),{status:500});

}

else{
  const resData = await response.json();
    // Your backend returns { events: [...] }, so return just the array
    return resData.event;  
}

}

export async function loader({request,params}) {
 
   const id= params.id;
 
return data({
event:await loadEvent(id),
events:loadEvents()

})

} 

export async function action({params,request}){

const eventId=params.id;
  const response=await fetch('http://localhost:8080/events/'+eventId,
 {
  method:request.method,
}
  );

if(!response.ok){
throw new Response(JSON.stringify({message:'could not delete data'}),{status:500});

}

return redirect('/events');

}