import {fetchGraphQL} from './fetchGraphql';
import { Network, Environment, Store, RecordSource } from 'relay-runtime';
import setupWrapper from './subscriptionFn';

const networkWrapper = () => {
    const network = Network.create(fetchGraphQL, setupWrapper());
    return network;
}

const environment = new Environment({
    network: networkWrapper(),
    store: new Store(new RecordSource())
});

export default environment;
