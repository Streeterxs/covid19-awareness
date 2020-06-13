import { graphql, Disposable, requestSubscription } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

import environment from '../../Relay/environment';

const covidPositionSubscription = graphql `
    subscription CovidPositionsSubscription($clientSubscriptionId: String) {
        CovidPositionsSubscription(input: {clientSubscriptionId: $clientSubscriptionId}) {
            covidPosition {
                lat
                lon
                covidSituation
                createdAt
                updatedAt
            }
        }
    }
`;

const covidPositionSubscriptionModule = () => {
    let objDisposable: Disposable | null;
    const dispose = () => {if(objDisposable) objDisposable.dispose()};

    const subscribe = () => {
        objDisposable = requestSubscription(
            environment,
            generateSubscriptionConfig()    
        )
    }

    const generateSubscriptionConfig = (): GraphQLSubscriptionConfig<any> => ({
        subscription: covidPositionSubscription,
        variables: {
            clientSubscriptionId: 1
        },
        onNext: (response: any) => {
            console.log('response ws CovidPosition!', response)
        }
    });

    return {
        dispose,
        subscribe
    }
};

export default covidPositionSubscriptionModule;
