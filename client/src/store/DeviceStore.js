import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [
            // {id: 1, name: 'Телефоны'},
            // {id: 2, name: 'Планшеты'},
            // {id: 3, name: 'Ноутбуки'},
            // {id: 4, name: 'Наушники'},
        ]
        this._brands = [
            // {id: 1, name: 'Samsung'},
            // {id: 2, name: 'Apple'},
            // {id: 3, name: 'Xiaomi'},
            // {id: 4, name: 'Honor'},
            // {id: 5, name: 'Realme'},
        ]
        this._devices = [
            // {id: 1, name: 'iPhone 11', price: 39500, rating: 5, img: 'https://thls.ru/uploads/product/1200/1280/snimo33k.JPG'},
            // {id: 2, name: 'iPhone 13', price: 52000, rating: 5, img: 'https://thls.ru/uploads/product/1500/1597/0a0711c55579bb72a00f023072779b22267f3cc9b9c0b23fe51d3beba843c1ed.jpg'},
            // {id: 3, name: 'AirPods Pro 2', price: 16200, rating: 4, img: 'https://thls.ru/uploads/product/1800/1892/snimo66k.JPG'},
            // {id: 4, name: 'AirPods 3', price: 13400, rating: 5, img: 'https://thls.ru/uploads/product/1800/1809/snimo4444k.JPG'},
            // {id: 5, name: 'Galaxy Tab S8', price: 99500, rating: 4, img: 'https://thls.ru/uploads/product/1700/1789/snivvvmok.JPG'},
            // {id: 6, name: 'Mi Pad 5', price: 35500, rating: 5, img: 'https://thls.ru/uploads/product/1700/1781/snimvyvvok.JPG'},
        ]
        this._selectedType = {}
        this._selectedBrand = {}
        makeAutoObservable(this)
    }

    setBrands(brands) {
        this._brands = brands
    }

    setTypes(types) {
        this._types = types
    }

    setDevices(device) {
        this._devices = device
    }

    setSelectedType(type) {
        this._selectedType = type
    }

    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }


    get brands() {
        return this._brands
    }

    get types() {
        return this._types
    }

    get devices() {
        return this._devices
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedBrand() {
        return this._selectedBrand
    }
}