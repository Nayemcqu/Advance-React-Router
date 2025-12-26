import { Link } from "react-router-dom";

const Dummy_Events=[
{
id:'e1',
title:'some event'
},
{
id:'e2',
title:'another event'
}
]

function EventsPage(){

return <>
<h1>EventsPage</h1>;
<ul>
    {Dummy_Events.map((event)=><li key={id}>

<Link>{event.title}</Link>
    </li>)}

</ul>


   </>
    

}

export default EventsPage;