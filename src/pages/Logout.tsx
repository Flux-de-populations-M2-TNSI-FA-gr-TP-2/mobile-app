import {
	IonPage,
	useIonViewWillEnter,
} from '@ionic/react';
import React from 'react';
import AuthService from "../services/AuthService";

const Logout: React.FC = (props: any) => {

	let Auth = new AuthService();

	useIonViewWillEnter(() => {
		Auth.logout();
		props.history.replace('/accueil');
	});

	return (
		<IonPage/>
	);
};

export default Logout;
