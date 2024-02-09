import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getContact } from "../contact";
import { updateContact } from "../contact";

export async function action({ request, params }) {
    let formData = await request.formData();
    return updateContact(params.contactId, {
      favorite: formData.get("favorite") === "true",
    });
  }
  export async function loader({ params }) {
    const contact = await getContact(params.contactId);
    if (!contact) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return { contact };
  }


export default function Contact() {
    const { contact } = useLoaderData();

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
        <Form action="edit">
        <button type="submit">Edit</button>
      </Form>
          <Destroy/>
        </div>
      </div>
    </div>
  );
}
 
function Favorite({ contact }) {
    // yes, this is a `let` for later
    let favorite = contact.favorite;
    const fetcher = useFetcher();
    if (fetcher.formData) {
        favorite = fetcher.formData.get("favorite") === "true";
      }

    return (
        <fetcher.Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}

import PropTypes from 'prop-types';
import Destroy from "./destroy";

Favorite.propTypes = {
    contact: PropTypes.object.isRequired
};

