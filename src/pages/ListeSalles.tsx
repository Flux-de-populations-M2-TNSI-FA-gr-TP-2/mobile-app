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
	IonCardContent,
	useIonViewWillEnter,
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
const ListeSalles: React.FC = (props: any) => {

	const [listeSalles, setListeSalle] = React.useState();
	let Auth = new AuthService();
	// const logoutUser = () => {
	// 	Auth.logout();
	// 	props.history.replace('/accueil');
	// };

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

			fetch('https://fluxtnsi.ddns.net/api/room', queryOptions)
				.then(response => {
					return response.json()
				})
				.then(resJson => {
					console.log(resJson.data)
					setListeSalle(resJson.data);

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
						Liste des salles
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonCard style={style.transparent}>
					<IonCardHeader>
						<IonCardTitle color="primary" style={style.myColorSuccess}>
							Liste des salles
						</IonCardTitle>
					</IonCardHeader>
				</IonCard>

				{
					listeSalles? listeSalles.map((elt: any, key: number) => {
						return (
							<IonCard key={key} routerLink={"/view/salle/"+elt.id}>
								{/*<img src={ elt.image } alt={"Batiment "+elt.name}/>*/}
								<IonCardHeader>
									<IonCardTitle>{ elt.name } à l'étage {elt.floor } </IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									{/*{elt.rooms.length} salles.*/}
								</IonCardContent>
							</IonCard>);
					}) : "Aucune salle pour cet établissement"
				}
			</IonContent>
		</IonPage>
	);
};

export default ListeSalles;
