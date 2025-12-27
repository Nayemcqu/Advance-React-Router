import { Form, useNavigate,useNavigation,useActionData,redirect,data} from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();

const navigation=useNavigation();
const actionData=useActionData();
const isSubmitting=navigation.state==='submitting';


  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {actionData && actionData.errors && <ul>
        {Object.values(actionData.errors).map(err=><li key={err}>{err}</li>)}
        </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'submitting' : 'save'}</button>
      </div>
    </Form>
  );
}

export async function action({request,params}){
  const datas= await request.formData();
const method=request.method;


const eventData={
title:datas.get('title'),
image:datas.get('image'),
date:datas.get('date'),
description:datas.get('description')
}

let url= 'http://localhost:8080/events';

if(method==='PATCH'){

  const eventId=params.id;
url='http://localhost:8080/events/' +eventId;

}


 const response= await fetch(url,{
method:method,
headers:{
    'Content-type':'application/json'
},
body: JSON.stringify(eventData)
    
})

if(response.status===422){

return response;

}

if(!response.ok){

    throw data({message:'could not save events'},{status:500});

}

return redirect('/events');
}



export default EventForm;
