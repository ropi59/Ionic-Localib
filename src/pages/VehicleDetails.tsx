import { IonBackButton, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { VehicleModel } from "../models/vehicleModel";
import { vehicleService } from "../services/VehicleService";
import "./VehicleDetails.css"

const VehicleDetails: React.FC = () => {

    const {id} = useParams() as { id: string };
    const [vehicle, setVehicle] = useState<VehicleModel>();
    const [showModal, setShowModal] = useState(false);

    const [presentAlert] = useIonAlert();

    /**
     * Récupère le véhicule grâce à son id
     */
    useEffect(() => {
        vehicleService.findVehicleById(parseInt(id)).then(data => setVehicle(data))
    })

    /**
   * Enregistre les modifications du véhicule
   */
  function confirm() {
    setShowModal(false)
    if (vehicle){
      vehicleService.updateVehicle(vehicle.id, vehicle).then(data => setVehicle(data))
      console.log(vehicle)
      //window.location.reload();
    }
  }

    /**
   * Récupère les modifications des inputs
   * @param e l'event de frappe du clavier dans les inputs
   */
  function handleChange (e: any){
    if (vehicle){
      setVehicle({...vehicle, [e.target.name]: e.target.value});
    }
  }

  /**
     * Récupère le type de véhicule à modifier
     * @param e le type de véhicule
     */
  function handleChangeType(e: any) {
    if (vehicle) vehicle.genre = e
}

/**
 * Récupère l'etat du vehicule à modifier
 * @param e l'état du véhicule
 */
function handleChangeState(e: any) {
    if (vehicle) vehicle.state = e   
}

/**
 * Récupère la disponibilité du véhicule à modifier
 * @param e la disponibilité du véhicule
 */
function handleChangeDisponibility(e: any) {
    if (vehicle) {
        setVehicle(vehicle.disponibility = e) 
    }
}

    /**
     * Supprime un véhicule
     * @param vehicle le vehicule à supprimer
     */
  const deleteVehicle = (vehicle: any) => {
    if (vehicle) {
      vehicleService.deleteVehicle(vehicle.id).then(data => setVehicle(data));
      window.location.replace(`/vehicle/${vehicle.id}`);
    }
  }

    return (
        <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
          <IonTitle className="title">{vehicle?.brand + " " + vehicle?.model}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="card">
        <h3>{vehicle?.brand + " " + vehicle?.model}</h3>
        <p>Type: {vehicle?.genre}</p>
        <span>Immatriculation:</span><span className="immat"> {vehicle?.immat}</span>
        <h5>Etat: {vehicle?.state}</h5>
        <h2>Prix: {vehicle?.price}€</h2>
        <h3 className="disponibility">{vehicle?.disponibility}</h3>
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
                  deleteVehicle(vehicle);
                },
              },
            ],
          })
        }
      >
        Supprimer le véhicule
      </IonButton>
      </div>
        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setShowModal(false)}>Annuler</IonButton>
              </IonButtons>
              <IonTitle>Modifier véhicule</IonTitle>
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
                <IonLabel position="stacked">Marque</IonLabel>
                <input name="brand" onChange={handleChange} type="text" placeholder={vehicle?.brand} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Modèle</IonLabel>
                <input name="model" onChange={handleChange} type="text" placeholder={vehicle?.model} />
              </IonItem>
              <IonLabel position="stacked">Type de véhicule</IonLabel>
              <IonSelect className="vehicleSelect" name="genre" onIonChange={(e) => handleChangeType(e.target.value)} interface="popover" placeholder={vehicle?.genre}>
                    <IonSelectOption value="Voiture">Voiture</IonSelectOption>
                    <IonSelectOption value="Camionnette">Camionnette</IonSelectOption>
                    <IonSelectOption value="Moto">Moto</IonSelectOption>
                    <IonSelectOption value="Camion">Camion</IonSelectOption>
              </IonSelect>
              <IonItem>
                <IonLabel position="stacked">Immatriculation</IonLabel>
                <input name="immat" onChange={handleChange} type="text" placeholder={vehicle?.immat} />
              </IonItem>
              <IonLabel position="stacked">Etat du véhicule</IonLabel>
              <IonSelect className="vehicleSelect" name="state" onIonChange={(e) => handleChangeState(e.target.value)} interface="popover" placeholder={vehicle?.state}>
                    <IonSelectOption value="A">A</IonSelectOption>
                    <IonSelectOption value="B">B</IonSelectOption>
                    <IonSelectOption value="C">C</IonSelectOption>
                    <IonSelectOption value="D">D</IonSelectOption>
              </IonSelect>
              <IonItem>
                <IonLabel position="stacked">Prix de location</IonLabel>
                <input name="price" onChange={handleChange} type="number" placeholder="Nouveau prix" />
              </IonItem>
              <IonLabel position="stacked">Disponibilité</IonLabel>
              <IonSelect className="vehicleSelect" name="disponibility" onIonChange={(e) => handleChangeDisponibility(e.target.value)} interface="popover" placeholder={vehicle?.disponibility}>
                    <IonSelectOption value="DISPONIBLE">DISPONIBLE</IonSelectOption>
                    <IonSelectOption value="INDISPONIBLE">INDISPONIBLE</IonSelectOption>
              </IonSelect>
          </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  );
}

export default VehicleDetails;