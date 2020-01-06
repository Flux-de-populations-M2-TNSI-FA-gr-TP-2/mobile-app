import {
	IonContent,
	IonHeader,
	IonButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonIcon,
	IonLabel,
	IonCard,  IonCardTitle, IonCardContent, IonItem, IonText, IonList, IonInput, IonToast
} from '@ionic/react';
import React from 'react';
import axios from 'axios';

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
const Inscription: React.FC = (props: any) => {
	const [signUpForm, setSignUpForm] = React.useState({
		nom : '',
		prenoms: '',
		// username: '',
		email: '',
		passwordFirst: '',
		passwordSecond: ''
	});

	const [showToast1, setShowToast1] = React.useState({
		toastMessage: "",
		toastDisplay : false
	});

	const [showToast2, setShowToast2] = React.useState({
		toastMessage: "",
		toastDisplay : false
	});

	const [submitDisable, setSubmitDisable] = React.useState(false);

	const onSubmitForm = (e: any)  => {
		e.preventDefault();
		if(signUpForm.passwordFirst !== signUpForm.passwordSecond){
			setShowToast1({
				toastMessage: "Les mots de passes ne sont pas identiques.",
				toastDisplay : true
			});
		}
		else{
			setSubmitDisable(true);
			const dataToSubmit = {
				"firstname": signUpForm.prenoms.trim(),
				"lastname": signUpForm.nom.trim(),
				"email": signUpForm.email.trim(),
				// "username": signUpForm.username,
				"password": signUpForm.passwordFirst.trim()
			};

			try {

				axios.post('https://fluxtnsi.ddns.net/api/user/register', dataToSubmit)
					.then(response => {
						console.log(response.data);
						setShowToast2({
							toastMessage: "Votre inscription a bien été prise en compte. Vous pouvez vous connecter à présent",
							toastDisplay : true
						});
						setTimeout(() => {
							props.history.replace('/accueil');
						}, 3000);
					})
					.catch(error => {
						console.log(error);
						setShowToast1({
							toastMessage: error.message,
							toastDisplay: true
						});
					});

			} catch (e) {
				console.error(e);
			}
		}
	};

	const onChangeField = (e: any) => {
		let tmpFormState = signUpForm;
		// @ts-ignore
		tmpFormState[e.target.name] = e.target.value;
		setSignUpForm(tmpFormState);
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
				{/*<IonCard className="ion-no-margin" style={style.root}>*/}
				<IonToast
					isOpen={showToast1.toastDisplay}
					onDidDismiss={() => setShowToast1({
						toastDisplay: false,
						toastMessage: ''
					})}
					message={showToast1.toastMessage}
					duration={4000}
					position="bottom"
					color="danger"
				/>
				<IonToast
					isOpen={showToast2.toastDisplay}
					onDidDismiss={() => setShowToast2({
						toastDisplay: false,
						toastMessage: ''
					})}
					message={showToast2.toastMessage}
					duration={4000}
					position="bottom"
					color="success"
				/>
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
										<IonLabel position="floating">Nom <IonText color="danger">*</IonText></IonLabel>
										<IonInput required type={"text"} name={"nom"} value={signUpForm.nom} onIonChange={onChangeField} />
									</IonItem>

									<IonItem className="ion-margin-bottom">
										<IonLabel position="floating">Prénoms <IonText color="danger">*</IonText></IonLabel>
										<IonInput required type={"text"} name={"prenoms"} value={signUpForm.prenoms} onIonChange={onChangeField}/>
									</IonItem>

									{/*<IonItem className="ion-margin-bottom">*/}
									{/*	<IonLabel position="floating">Username <IonText color="danger">*</IonText></IonLabel>*/}
									{/*	<IonInput required type={"text"} name={"username"} value={signUpForm.username} onIonChange={onChangeField} />*/}
									{/*</IonItem>*/}

									<IonItem className="ion-margin-bottom">
										<IonLabel position="floating">Email <IonText color="danger">*</IonText></IonLabel>
										<IonInput  required type={"email"} name={"email"} value={signUpForm.email} onIonChange={onChangeField}/>
									</IonItem>

									<IonItem className="ion-margin-bottom">
										<IonLabel position="floating">Mot de passe <IonText color="danger">*</IonText> </IonLabel>
										<IonInput required type={"password"} name={"passwordFirst"} value={signUpForm.passwordFirst} onIonChange={onChangeField}/>
									</IonItem>

									<IonItem className="ion-margin-bottom">
										<IonLabel position="floating">Resaisir Mot de passe <IonText color="danger">*</IonText> </IonLabel>
										<IonInput  required type={"password"} name={"passwordSecond"} value={signUpForm.passwordSecond} onIonChange={onChangeField}/>
									</IonItem>

									<IonButton expand="full" shape="round" fill="outline"  color={"success"} className="ion-margin-top" type="submit" disabled={ submitDisable? true : false}>
										<IonIcon slot="start" name="checkmark-circle-outline"/>
										M'inscrire
									</IonButton>

								</IonList>
							</form>
						</IonCardContent>
					</IonCard>
				{/*</IonCard>*/}
			</IonContent>
		</IonPage>
	);
};

export default Inscription;
