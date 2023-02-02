import { UserModel } from "../models/userModel";
import axios from 'axios';

const URL : string = "http://localhost:8080/users";

class UserService {

    /**
     * Fonction pour récupérer tous les utilisateurs
     * @returns la liste de tous les utilisateurs
     */
    findAllUser = () => {
        return fetch(URL)
        .then(response => response.json())
    }

    /**
     * fonction pour récupérer un utilisateur par son id
     * @param id :number l'id de l'utilisateur à chercher
     * @returns l'utilisateur avec l'id donné en paramètre
     */
    findUserById = (id : number) => {
        return fetch(`${URL}/${id}`, {
            method: "GET",
        }).then(response => response.json())
    }

    /**
     * fonction pour créer un utilisateur
     * @param user les information de l'utilisateur à créer (nom, prenom, email)
     * @returns un nouvel utilisateur
     */
    createUser = (user : UserModel) => {
        return fetch(URL, {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "content-type": "application/json" }
        }).then((res) => res.json())
    }
    
    /**
     * fonction pour supprimer un utilisateur par son id
     * @param id :number l'id de l'utilisateur à supprimer
     * @returns ok si l'utilisateur a été supprimé
     */
    deleteUser = (id : number) => {
        return fetch(`${URL}/${id}`, {
            method: "DELETE",
        }).then(res => res.json())
    }

    /**
     *  fonction pour mettre à jour les informations d'un utilisateur
     * @param id : number l'id de l'utilisateur à mettre à jour
     * @param user les informations de l'utilisateur à modifier (nom, prenom, email)
     * @returns l'utilisateur avec ses informations mises à jour
     */
    updateUser = (id :number, user : UserModel) => {
        return axios.put(`${URL}/${user.id}`, user);
    }

}

/**
 * Singleton du userService
 */
export const userService = Object.freeze(new UserService());