import {
	IonContent,
	IonHeader,
	IonButtons,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	useIonViewWillEnter, IonGrid, IonRow, IonCol, IonCardContent,
} from '@ionic/react';
import React from 'react';
import AuthService from "../services/AuthService";

const style = {
	bgPrimary: {
		"--ion-background-color": "#14c280",
		color: "white",
		fontWeight: "bold",
		verticalAlign: "center"
	},
	myColorSuccess : {
		color: "#14c280",
		fontSize: "medium",
		fontWeight: "bold"
	},

	myColorDanger : {
		color: "#c25657",
		fontSize: "medium",
		fontWeight: "bold"
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
const ViewSalle: React.FC = (props: any) => {

	const [etablissement, setEtablissement] = React.useState();

	let Auth = new AuthService();
	const id = props.match.params.id;

	// const logoutUser = () => {
	// 	Auth.logout();
	// 	props.history.replace('/accueil');
	// };

	useIonViewWillEnter(() => {
		if (!Auth.loggedIn())
			props.history.replace('/accueil');

		if(!id){
			props.history.replace('/etablissements');
		}

		try {
			const JWT = `Bearer ${Auth.getToken()}`;

			const queryOptions = {
				headers: new Headers({
					'Authorization': JWT,
					'Content-Type': 'application/json'
				}),
			};

			fetch('https://fluxtnsi.ddns.net/api/room/'+id, queryOptions)
				.then(response => {
					return response.json()
				})
				.then(resJson => {
					console.log("reponse api")
					console.log(resJson)

					setEtablissement(resJson.data);

				})
				.catch(error => console.log(error));
			// ...
		} catch (e) {
			console.error(e);
		}
	});

	return (
		<IonPage>
			<IonHeader>

				<IonToolbar style={style.bgPrimary}>

					<IonButtons slot="start">
						<IonMenuButton></IonMenuButton>
					</IonButtons>
					<IonTitle className="ion-text-center ion-padding">
						Salle { etablissement? etablissement.name : '' }
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonCard style={style.transparent}>
					<IonCardHeader>
						<IonCardTitle color="primary" style={style.myColorSuccess}>
							Informations en temps réel de { etablissement? etablissement.name : '' } situé à l'étage { etablissement? etablissement.floor : '' }
						</IonCardTitle>
					</IonCardHeader>
				</IonCard>

				<IonGrid>
					<IonRow>
						<IonCol size="12">
							<IonCard>
								<IonCardHeader className="ion-text-center">
										Personnes
								</IonCardHeader>
								<IonCardContent className="ion-text-center">
									75
								</IonCardContent>
							</IonCard>
						</IonCol>
						<IonCol size="12">
							<IonCard>
								<IonCardHeader className="ion-text-center">
									Humidité
								</IonCardHeader>
								<IonCardContent className="ion-text-center">
									48%
								</IonCardContent>
							</IonCard>
						</IonCol>
						<IonCol size="12">
							<IonCard>
								<IonCardHeader className="ion-text-center">
									Température
								</IonCardHeader>
								<IonCardContent className="ion-text-center">
									20° Cel
								</IonCardContent>

							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default ViewSalle;
