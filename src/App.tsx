import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonContent,
    IonHeader, IonIcon,
    IonItem, IonLabel,
    IonList,
    IonMenu, IonPage,
    IonRouterOutlet,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

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
import Inscription from "./pages/Inscription";
import ListeEtablissement from "./pages/ListeEtablissements";
import ViewEtablissement from "./pages/ViewEtablissement";

const App: React.FC = () => (
  <IonApp>
      <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/accueil" component={Home} exact={true} />
        <Route path="/etablissements" component={ListeEtablissement} exact={true} />
        <Route path="/consulter/etablissement/:id" component={ViewEtablissement} exact={true} />
          <Route path="/inscription" component={Inscription} exact={true}/>
          <Route exact path="/" render={() => <Redirect to="/accueil" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
