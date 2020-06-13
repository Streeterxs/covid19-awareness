import { Disposable } from 'relay-runtime/lib/util/RelayRuntimeTypes';
import { SubscriptionClient, Observer } from 'subscriptions-transport-ws';

import { ExecutionResult } from 'graphql';
import { Observable, Subscribable, GraphQLResponse, SubscribeFunction } from 'relay-runtime';
import { RelayObservable } from 'relay-runtime/lib/network/RelayObservable';
import { Device } from '../Services';

type DeviceCallback = (device: string) => void
const setupWrapper = () => {
    const deviceFounder = (async (callback: DeviceCallback) => {
        const device = await Device.getDevice()
        callback(device);
    });
    const setupSubscription: SubscribeFunction = (operation, variables) => {
        let subscriptionClient = new SubscriptionClient(
            'ws://localhost:3333/subscriptions',
            {
                reconnect: true,
                connectionParams: {
                authorization: ''
                },
                reconnectionAttempts: 0
            },
        );

        deviceFounder((device) => {
            subscriptionClient = new SubscriptionClient(
                'ws://localhost:3333/subscriptions',
                {
                    reconnect: true,
                    connectionParams: {
                        authorization: device
                    },
                    reconnectionAttempts: 0
                },
            );
        });
    
        const query = operation.text;
        const client = subscriptionClient.request({ query: query!, variables });

        let subscription: any;
        const subscribable = {
            subscribe: (observer: Observer<ExecutionResult>) => {
                if (!subscription) {
                    subscription = client.subscribe({
                        next: result => {
                            if (observer.next) observer.next({ data: result.data });
                        },
                        complete: () => {
                            if (observer.complete) observer.complete();
                        },
                        error: error => {
                            if (observer.error) observer.error(error);
                        }
                    });
                }
            return {
                    unsubscribe: () => {
                        if (subscription) {
                            subscriptionClient.close();
                            subscription.unsubscribe();
                        }
                    }
                }
        }
    };
    
        return (Observable.from(subscribable as Subscribable<ExecutionResult>) as RelayObservable<GraphQLResponse> | Disposable);
    }

    return setupSubscription;
}

export default setupWrapper;
