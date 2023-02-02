import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { UserModel } from "../models/userModel";
import { userService } from "../services/UserService";
import "./VehiclesList.css"

const UsersList: React.FC = () => {

    const [userList, setUserList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState<UserModel>(new UserModel("", "", ""));

    /**
   * Récupère la liste des utilisateurs depuis le back
   */
    useEffect(() => {
      userService.findAllUser().then(data => setUserList(data))
    }, []);

    /**
     * Crée un nouvel utilisateur
     */
    function confirm() {
      setShowModal(false)
      console.log(newUser)
      if (newUser){
        userService.createUser(newUser).then(data => setNewUser(data));
        window.location.replace("/users");
      }
    }

    /**
     * Récupère les informations de l'utilisateur à créer
     * @param e les frappes du clavier
     */
    function handleChange (e: any){
        setNewUser({...newUser, [e.target.name]: e.target.value});
    }


    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle className="title">Clients</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
          <IonButton className="editButton" onClick={() => setShowModal(true)}>
                  Ajouter utilisateur
                </IonButton>
          <IonList>
              {userList.map((user: UserModel, index: number) => (
                <IonItem key={index} routerLink={`/user/${user.id}`}>
                  <IonLabel>{user.name.toUpperCase() + " " + user.firstName}</IonLabel>
                </IonItem>
              ))}
            </IonList>
            <IonModal isOpen={showModal}>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={() => setShowModal(false)}>Annuler</IonButton>
                </IonButtons>
                <IonTitle>Ajouter</IonTitle>
                <IonButtons slot="end">
                  <IonButton strong={true} onClick={() => confirm()}>
                    Confirmer
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonItem>
                <IonLabel position="stacked">Nom</IonLabel>
                <input name="name" onChange={handleChange} type="text" placeholder="Nom" />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Prénom</IonLabel>
                <input name="firstName" onChange={handleChange} type="text" placeholder="Prénom" />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">email</IonLabel>
                <input name="email" onChange={handleChange} type="text" placeholder="email" />
              </IonItem>
            </IonContent>
          </IonModal>
          </IonContent>
        </IonPage>
      );


}

export default UsersList;