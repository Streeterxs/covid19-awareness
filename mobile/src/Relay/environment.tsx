import {fetchGraphQL} from './fetchGraphql';
import { Network, Environment, Store, RecordSource } from 'relay-runtime';

const network = Network.create(fetchGraphQL);

const environment = new Environment({
    network,
    store: new Store(new RecordSource())
});

export default environment;
