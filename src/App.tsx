import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { carSportOutline, ellipse, peopleCircleOutline, receiptOutline, square, triangle } from 'ionicons/icons';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import VehiclesList from './pages/VehiclesList';
import VehicleDetails from './pages/VehicleDetails';
import UsersList from './pages/UsersList';
import UserDetails from './pages/UserDetails';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/vehicles">
            <VehiclesList />
          </Route>
          <Route path="/vehicle/:id" component={VehicleDetails}>
          </Route>
          <Route exact path="/users">
            <UsersList />
          </Route>
          <Route path="/user/:id" component={UserDetails}>
          </Route>
          <Route exact path="/">
            <Redirect to="/Vehicles" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Vehicules" href="/vehicles">
            <IonIcon icon={carSportOutline}/>
            <IonLabel>Véhicules</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Users" href="/users">
            <IonIcon icon={peopleCircleOutline} />
            <IonLabel>Clients</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Rentals" href="/rentals">
            <IonIcon icon={receiptOutline} />
            <IonLabel>Locations</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
