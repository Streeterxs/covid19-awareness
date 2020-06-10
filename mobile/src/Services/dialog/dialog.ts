// @ts-ignore
import DialogAndroid from 'react-native-dialogs';

const dialogModule = () => {
    
    const showDialogAndroid = async () => {
        const { action } = await DialogAndroid.alert('Title', 'Message');
        switch (action) {
          case DialogAndroid.actionPositive:
              console.log('positive!')
              break;
          case DialogAndroid.actionNegative:
              console.log('negative!')
              break;
          case DialogAndroid.actionNeutral:
              console.log('neutral!')
              break;
          case DialogAndroid.actionDismiss:
              console.log('dismissed!')
              break;
        }
    }

    return {
        showDialogAndroid
    }
}

export default dialogModule;