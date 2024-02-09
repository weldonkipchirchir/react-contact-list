import { Form, redirect } from "react-router-dom";
import { deleteContact } from "../contact";

export async function action({ params }) {
    // TODO: Define deleteContact function
    await deleteContact(params.contactId);
    return redirect("/");
}


export default function Destroy(){

   
    return(
        <>
        
      <Form
        method="post"
        action="destroy"
        onSubmit={(event) => {
          if (
            !confirm(
              "Please confirm you want to delete this record."
            )
          ) {
            event.preventDefault();
          }
        }}
      >
        <button type="submit">Delete</button>
      </Form>   
      </>
    )
}