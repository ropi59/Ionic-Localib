import { IonBackButton, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserModel } from "../models/userModel";
import { userService } from "../services/UserService";
import "./VehicleDetails.css"

const UserDetails: React.FC = () => {

    const {id} = useParams() as { id: string };
    const [user, setUser] = useState<UserModel>();
    const [showModal, setShowModal] = useState(false);

    const [presentAlert] = useIonAlert();

    /**
     * Récupère l'utilisateur grâce à son id
     */
    useEffect(() => {
        userService.findUserById(parseInt(id)).then(data => setUser(data))
    })

    /**
   * Enregistre les modifications de l'utilisateur
   */
  function confirm() {
    setShowModal(false)
    if (user){
      userService.updateUser(user.id, user)
      //console.log(user)
      window.location.reload();
    }
  }

    /**
   * Récupère les modifications des inputs
   * @param e l'event de frappe du clavier dans les inputs
   */
  function handleChange (e: any){
    if (user){
      setUser({...user, [e.target.name]: e.target.value});
    }
  }


    /**
     * Supprime un utilisateur
     * @param user l'utilisateur à supprimer
     */
  const deleteUser = (user: any) => {
    if (user) {
      userService.deleteUser(user.id).then(data => setUser(data));
      window.location.replace(`/users`);
    }
  }

    return (
        <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
          <IonTitle className="title">{user?.name + " " + user?.firstName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="card">
        <h3>{user?.name + " " + user?.firstName}</h3>
        <p>email: {user?.email}</p>
        </IonCard>
        <div className="buttonsContainer">
        <IonButton className="editButton" onClick={() => setShowModal(true)}>
                Modifier
              </IonButton>
              <IonButton color="danger" expand="block"
        onClick={() =>
          presentAlert({
            header: 'Voulez vous vraiment supprimer?',
            buttons: [
              {
                text: 'Non',
                handler: () => {
                  
                },
              },
              {
                text: 'OK',
                handler: () => {
                  deleteUser(user);
                },
              },
            ],
          })
        }
      >
        Supprimer l'utilisateur
      </IonButton>
      </div>
        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setShowModal(false)}>Annuler</IonButton>
              </IonButtons>
              <IonTitle>Modifier utilisateur</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirmer
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
          <h5>Identité :</h5>
            <IonItem>
                <IonLabel position="stacked">Nom</IonLabel>
                <input name="name" onChange={handleChange} type="text" placeholder={user?.name} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Prénom</IonLabel>
                <input name="firstName" onChange={handleChange} type="text" placeholder={user?.firstName} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <input name="email" onChange={handleChange} type="text" placeholder={user?.email} />
              </IonItem>
          </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  );
}

export default UserDetails;