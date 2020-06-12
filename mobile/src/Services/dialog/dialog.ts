// @ts-ignore
import DialogAndroid from 'react-native-dialogs';
import { ToastAndroid } from 'react-native';

export type OnSituationReport = {
    (covidSituation: string): void
}

const dialogModule = () => {
    
    const showDialogAndroid = async (onSituationReport: OnSituationReport) => {
        const { selectedItem } = await DialogAndroid.showPicker('Report your Covid Condition: ', null, {
            type: DialogAndroid.listRadio,
            selectedId: 'diseased',
            items: [
                {label: 'Diseased Confirmed', id: 'diseased'},
                {label: 'Diseased Suspect', id: 'suspect'},
                {label: 'Negative', id: 'negative'}
            ]
        });
        switch (selectedItem?.id) {
            case 'diseased':
                await onSituationReport(selectedItem.id);
                console.log('diseased!')
                break;
            case 'suspect':
                await onSituationReport(selectedItem.id);
                console.log('suspect!')
                break;
            case 'negative':
                await onSituationReport(selectedItem.id);
                console.log('negative!')
                break;
            default:
                ToastAndroid.show(
                    'Report your situation to track your position.',
                    ToastAndroid.LONG,
                );
                console.log('default!');
                break;
        }
    }

    return {
        showDialogAndroid
    }
}

export default dialogModule;