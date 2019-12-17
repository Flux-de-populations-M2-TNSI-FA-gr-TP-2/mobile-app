import {
	IonContent,
	IonHeader,
	IonButton,
	IonButtons,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonIcon,
	IonLabel,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonMenu,
	useIonViewWillEnter, IonCardSubtitle, IonList, IonItem, IonApp
} from '@ionic/react';
import React from 'react';
import AuthService from "../services/AuthService";
import {render} from "react-dom";

const style = {
	bgPrimary: {
		"--ion-background-color": "#3880ff",
		color: "white",
		fontWeight: "bold",
		verticalAlign: "center"
	},
	titleMedium: {
		fontSize: "large",
		fontWeight: "bold"
	},
	root: {
		backgroundImage: "url('assets/img/fond-particules-technologie-abstraite_52683-25766.jpg')",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center top",
		backgroundSize: "cover",

		zIndex: 999,
		height: '100vh'
	},
	transparent: {
		opacity: 0.9,
		backgroundColor: "white"
	},
	form: {
		marginBottom: "3em"
	}
};
const ListeEtablissement: React.FC = (props: any) => {

	const [listeEtablissements, setListeEtablissement] = React.useState();
	let Auth = new AuthService();
	const logoutUser = () => {
		Auth.logout();
		props.history.replace('/accueil');
	};

	useIonViewWillEnter(() => {
		if (!Auth.loggedIn())
			props.history.replace('/accueil');

		try {
			const JWT = `Bearer ${Auth.getToken()}`;

			const queryOptions = {
				headers: new Headers({
					'Authorization': JWT,
					'Content-Type': 'application/json'
				}),
			};

			fetch('https://fluxtnsi.ddns.net/api/location', queryOptions)
				.then(response => {
					return response.json()
				})
				.then(resJson => {
					setListeEtablissement(resJson.data);

				})
				.catch(error => console.log(error));
			// ...
		} catch (e) {
			console.error(e);
		}
	});

	return (
		<IonPage>
			<IonMenu side="start" contentId="main">
				<IonHeader>
					<IonToolbar>
						<IonTitle>Menu</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonList>
						<IonItem routerLink="/etablissements">
							<IonIcon name="home" slot="start"></IonIcon>
							<IonLabel>Etablissements</IonLabel>
						</IonItem>

						<IonItem>
							<IonIcon name="chatbubbles" slot="start"></IonIcon>
							<IonLabel>ABCD</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon name="settings" slot="start"></IonIcon>
							<IonLabel>EFGH</IonLabel>
						</IonItem>
						<IonItem onClick={logoutUser}>
							<IonIcon name="person" slot="start"></IonIcon>
							<IonLabel>Déconnexion</IonLabel>
						</IonItem>
					</IonList>
				</IonContent>
			</IonMenu>

			<IonHeader>

				<IonToolbar style={style.bgPrimary}>

					<IonButtons slot="start">
						<IonMenuButton></IonMenuButton>
					</IonButtons>
					<IonTitle className="ion-text-center ion-padding">
						Etablissements
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent id="main">
				<IonCard style={style.transparent}>
					<IonCardHeader>
						<IonCardTitle color="primary" style={style.titleMedium}>
							Liste des établissements
						</IonCardTitle>
					</IonCardHeader>
				</IonCard>

				{
					listeEtablissements? listeEtablissements.map((elt: any, key: number) => {
						return (
							<IonCard key={key}>
								<img src={ elt.image } alt={"Batiment "+elt.name}/>
								<IonCardHeader>
									<IonCardTitle>{ elt.name } à {elt.address } </IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									{elt.rooms.length} salles.
								</IonCardContent>
							</IonCard>);
					}) : "Aucun établissement"
				}
			</IonContent>
		</IonPage>
	);
};

export default ListeEtablissement;
