import { VehicleModel } from "../models/vehicleModel";


const URL : string = "http://localhost:8080/vehicles";

class VehicleService {

    /**
     * Fonction pour récupérer tous les véhicules
     * @returns la liste de tous les véhicules
     */
    findAllVehicles = () => {
        return fetch(URL)
        .then(response => response.json())
    }

    /**
     * fonction pour récupérer un véhicule par son id
     * @param id :number l'id du véhicule à chercher
     * @returns le véhicule avec l'id donné en paramètre
     */
    findVehicleById = (id : number) => {
        return fetch(`${URL}/${id}`, {
            method: "GET",
        }).then(response => response.json())
    }

    /**
     * fonction pour créer un véhicule
     * @param user les information du véhicule à créer (genre, marque, modele...)
     * @returns un nouveau véhicule
     */
    createVehicle = (vehicle : VehicleModel) => {
        return fetch(URL, {
            method: "POST",
            body: JSON.stringify(vehicle),
            headers: { "content-type": "application/json" }
        }).then((res) => res.json())
    }
    
    /**
     * fonction pour supprimer un vehicule par son id
     * @param id :number l'id du vehicule à supprimer
     * @returns ok si le vehicule a été supprimé
     */
    deleteVehicle = (id : number) => {
        return fetch(`${URL}/${id}`, {
            method: "DELETE",
        }).then(res => res.json())
    }

    /**
     *  fonction pour mettre à jour les informations d'un vehicule
     * @param id : number l'id du vehicule à mettre à jour
     * @param user les informations du vehicule à modifier (genre, marque, modele...)
     * @returns le vehicule avec ses informations mises à jour
     */
    updateVehicle = (id :number, vehicle : VehicleModel) => {
        return fetch(`${URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(vehicle),
            headers: { "content-type": "application/json"}
        }).then(res => res.json())
    }

}

/**
 * Singleton du vehicleService
 */
export const vehicleService = Object.freeze(new VehicleService());