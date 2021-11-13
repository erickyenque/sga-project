import StorageEnum from "../types/enumeration/StorageEnum";
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
class Storage {

    private static INSTANCE: Storage = new Storage();

    public static getInstance() {
        return Storage.INSTANCE;
    }

    private constructor() { }

    public setItem(key: StorageEnum, item: any){
        localStorage.setItem(key.getKey(), item);
    }
    
    public getItem(key: StorageEnum){
        return localStorage.getItem(key.getKey());
    }

    public removeItem(key: StorageEnum){
        return localStorage.removeItem(key.getKey());
    }
}

export default Storage;