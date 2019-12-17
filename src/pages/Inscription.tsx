import {
	IonContent,
	IonHeader,
	IonButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonIcon,
	IonLabel,
	IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonText, IonList, IonInput, IonRouterLink
} from '@ionic/react';
import React from 'react';

const style = {
	bgPrimary: {
		"--ion-background-color": "#3880ff",
		color: "white",
		fontWeight: "bold",
		verticalAlign: "center"
	},
	titleMedium: {
		fontSize: "medium",
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
	transparent : {
		opacity: 0.9,
		backgroundColor: "white"
	},
	form : {
		marginBottom: "3em"
	}
};
const Inscription: React.FC = () => {
	const onSubmitForm = (e: any)  => {
		e.preventDefault();
		alert("hello world");
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar style={style.bgPrimary}>
					<IonTitle className="ion-text-center ion-padding">
						Créer un compte
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent >
				<IonCard className="ion-no-margin" style={style.root}>
					<IonCard className="ion-padding" style={style.transparent}>
						<IonCardTitle>
							<IonTitle className="ion-text-center ion-margin-bottom">
								<IonLabel>Inscription</IonLabel>
							</IonTitle>
						</IonCardTitle>
						<IonCardContent>
							<form style={style.form} onSubmit={onSubmitForm}>
								<IonList lines="full" className="ion-no-margin ion-no-padding">

									<IonItem>
										<IonLabel position="floating">Nom</IonLabel>
										<IonInput></IonInput>
									</IonItem>

									<IonItem className="ion-margin-bottom">
										<IonLabel position="floating">Prénoms </IonLabel>
										<IonInput></IonInput>
									</IonItem>

									<IonItem className="ion-margin-bottom">
										<IonLabel position="floating">Username </IonLabel>
										<IonInput></IonInput>
									</IonItem>

									<IonItem className="ion-margin-bottom">
										<IonLabel position="floating">Email</IonLabel>
										<IonInput></IonInput>
									</IonItem>

									<IonItem className="ion-margin-bottom">
										<IonLabel position="floating">Password</IonLabel>
										<IonInput></IonInput>
									</IonItem>

									<IonButton expand="full" shape="round" fill="outline" className="ion-margin-top">
										<IonIcon slot="start" name="checkmark-circle-outline"/>
										M'inscrire
									</IonButton>

								</IonList>
							</form>
						</IonCardContent>
					</IonCard>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default Inscription;
