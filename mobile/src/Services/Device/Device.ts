import { asyncStorageModule } from "../asyncStorage";
import { getUniqueId } from "react-native-device-info";

class Device {
    private _device: string = '';
    private _isFetching = false;
    private static _instance: Device;
    private _deviceAsyncStorageModule = asyncStorageModule<string>('device');

    private constructor() {}

    static get instance() {
        if(!this._instance) {
          this._instance = new Device();
        }
        return this._instance;

    }

    async getDevice() {
        if (!this._device && !this._isFetching) {
            this._isFetching = true;
            let deviceReturn = await this._deviceAsyncStorageModule.getValue();
            if (!deviceReturn) {
                deviceReturn = getUniqueId();
                await this._deviceAsyncStorageModule.setValue(deviceReturn);
            }
            this._device = deviceReturn;
        }
        return this._device
    }
};

export default Device.instance;
