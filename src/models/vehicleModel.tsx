export class VehicleModel {

    id!: number
    genre: string
    brand: string
    model: string
    immat: string
    state: string
    price: number
    disponibility: string
    vehiclePic: string


    constructor(genre: string, brand: string, model: string, immat: string, state: string, price: number, disponibility: string, vehiclePic: string) {
        this.genre = genre;
        this.brand = brand;
        this.model = model;
        this.immat = immat;
        this.state = state;
        this.price = price;
        this.disponibility = disponibility;
        this.vehiclePic = vehiclePic;
    }
}