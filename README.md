This App focus on help people to identify and avoid locations where has a high concentration of people with Covid-19's suspects and confirmed cases.

## Mobile

The mobile part is a React-Native project with Relay to consume GraphQL Backend. The user must choose a current Covid-19 status (confirmed, suspect or negative) to track your current position and subscribe to any new Backend's updates.

## Backend

For the backend, we have a GraphQL serve with mutation to update context user's location. A query to deliver to client all Positions (without update subscription at first). And a subscription to deliver those positions updates. These GraphQL combinations was thinked to a Relay Client. And for persistent data structure, we have a mongoDB and mongoose ORM.