import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { VehicleModel } from "../models/vehicleModel";
import { vehicleService } from "../services/VehicleService";
import "./VehiclesList.css"

const VehiclesList: React.FC = () => {

    const [vehicleList, setVehicleList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newVehicle, setNewVehicle] = useState<VehicleModel>(new VehicleModel("", "", "", "", "", 0, "", ""));

    /**
   * Récupère la liste des véhicules depuis le back
   */
    useEffect(() => {
      vehicleService.findAllVehicles().then(data => setVehicleList(data))
    }, []);

    /**
     * Crée un nouveau véhicule
     */
    function confirm() {
      setShowModal(false)
      console.log(newVehicle)
      if (newVehicle){
        vehicleService.createVehicle(newVehicle).then(data => setNewVehicle(data));
        window.location.replace("/vehicles");
      }
    }

    /**
     * Récupère les informations du véhicule à créer
     * @param e les frappes du clavier
     */
    function handleChange (e: any){
        setNewVehicle({...newVehicle, [e.target.name]: e.target.value});
    }

    /**
     * Récupère le type de véhicule à créer
     * @param e le type de véhicule
     */
    function handleChangeType(e: any) {
        newVehicle.genre = e
    }

    /**
     * Récupère l'etat du vehicule à créer
     * @param e l'état du véhicule
     */
    function handleChangeState(e: any) {
        newVehicle.state = e   
    }

    /**
     * Récupère la disponibilité du véhicule à créer
     * @param e la disponibilité du véhicule
     */
    function handleChangeDisponibility(e: any) {
        newVehicle.disponibility = e 
    }

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle className="title">Véhicules</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
          <IonButton className="editButton" onClick={() => setShowModal(true)}>
                  Ajouter véhicule
                </IonButton>
          <IonList>
              {vehicleList.map((vehicle: VehicleModel, index: number) => (
                <IonItem key={index} routerLink={`/vehicle/${vehicle.id}`}>
                  <IonLabel>{vehicle.brand.toUpperCase() + " " + vehicle.model}</IonLabel>
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
                <IonLabel position="stacked">Marque</IonLabel>
                <input name="brand" onChange={handleChange} type="text" placeholder="Marque" />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Modèle</IonLabel>
                <input name="model" onChange={handleChange} type="text" placeholder="Modèle" />
              </IonItem>
              <IonLabel className="selectLabel" position="stacked">Type de véhicule</IonLabel>
              <IonSelect className="vehicleSelect" name="genre" onIonChange={(e) => handleChangeType(e.target.value)} interface="popover" placeholder="Type de véhicule">
                    <IonSelectOption value="Voiture">Voiture</IonSelectOption>
                    <IonSelectOption value="Camionnette">Camionnette</IonSelectOption>
                    <IonSelectOption value="Moto">Moto</IonSelectOption>
                    <IonSelectOption value="Camion">Camion</IonSelectOption>
              </IonSelect>
              <IonItem>
                <IonLabel position="stacked">Immatriculation</IonLabel>
                <input name="immat" onChange={handleChange} type="text" placeholder="Immatriculation" />
              </IonItem>
              <IonLabel className="selectLabel" position="stacked">Etat du véhicule</IonLabel>
              <IonSelect className="vehicleSelect" name="state" onIonChange={(e) => handleChangeState(e.target.value)} interface="popover" placeholder="Etat du véhicule">
                    <IonSelectOption value="A">A</IonSelectOption>
                    <IonSelectOption value="B">B</IonSelectOption>
                    <IonSelectOption value="C">C</IonSelectOption>
                    <IonSelectOption value="D">D</IonSelectOption>
              </IonSelect>
              <IonItem>
                <IonLabel position="stacked">Prix de location</IonLabel>
                <input name="price" onChange={handleChange} type="number" placeholder="Prix de location" />
              </IonItem>
              <IonLabel className="selectLabel" position="stacked">Disponibilité</IonLabel>
              <IonSelect className="vehicleSelect" name="disponibility" onIonChange={(e) => handleChangeDisponibility(e.target.value)} interface="popover" placeholder="Disponibilité">
                    <IonSelectOption value="DISPONIBLE">DISPONIBLE</IonSelectOption>
                    <IonSelectOption value="INDISPONIBLE">INDISPONIBLE</IonSelectOption>
              </IonSelect>
            </IonContent>
          </IonModal>
          </IonContent>
        </IonPage>
      );


}

export default VehiclesList;