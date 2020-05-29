import config from "../config";
import { RequestParameters, Variables } from "relay-runtime";


async function fetchGraphQL(request: RequestParameters, variables: Variables) {

    const response = await fetch(config.GRAPHQL_URL as string, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            query: request.text,
            variables
        })
    });

    return await response.json();
}

export {
    fetchGraphQL
}