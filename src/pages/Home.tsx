import {
	IonContent,
	IonHeader,
	IonButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonIcon,
	IonLabel,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonItem,
	IonText,
	IonList,
	IonInput,
	IonRouterLink,
	IonToast,
	useIonViewWillEnter
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
const Home: React.FC = (props: any) => {
	
	useIonViewWillEnter(() => {
		// if(Auth.loggedIn())
		// 	props.history.replace('/etablissements');
	});

	const [showToast1, setShowToast1] = React.useState({
		toastMessage: "",
		toastDisplay : false
	});

	const [formAuth, setFormAuth] = React.useState({
		email: '',
		password: '',
		message: ''
	});

	const onSubmitForm = (e: any)  => {
		e.preventDefault();
		let Auth = new AuthService();
		Auth.login(formAuth.email, formAuth.password)
			.then(res =>{
				props.history.replace('/etablissements');
			})
			.catch(err =>{
				let errorMsg = "";
				if(err.message === "Unauthorized")
				{
					errorMsg = "Accès non autorisé! Identifiants invalides!"
				}
				else{
					errorMsg = err.message;
				}

				setShowToast1({
					toastMessage: errorMsg,
					toastDisplay : true
				});
			})
	};

	const onChangeField = (e: any) => {
		let formValues = formAuth;
		// @ts-ignore
		formValues[e.target.name] = e.target.value;
		setFormAuth(formValues);
	};


	return (
		<IonPage>
			<IonHeader>
				<IonToolbar style={style.bgPrimary}>
					<IonTitle className="ion-text-center ion-padding">
						Accueil
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent >
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

                    <IonCard style={style.transparent}>
                        <IonCardHeader>
                            <IonCardTitle style={style.myColorSuccess}>
	                            <strong>Bienvenue sur Oméni</strong>
                            </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
	                        <IonText color="dark">
		                        <strong>Vous devez être connecté pour accédez à nos
			                        services</strong>
	                        </IonText>
                        </IonCardContent>
                    </IonCard>

                    <IonCard className="ion-padding" style={style.transparent}>
                        <IonCardTitle>
                            <IonTitle className="ion-text-center ion-margin-bottom">
                                <IonLabel>Connexion</IonLabel>
                            </IonTitle>
                        </IonCardTitle>
                        <IonCardContent>
                            <form style={style.form} onSubmit={onSubmitForm}>
                                <IonList lines="full" className="ion-no-margin ion-no-padding">

                                    <IonItem>
                                        <IonLabel position="floating">Email <IonText color="danger">*</IonText></IonLabel>
                                        <IonInput required type={"email"} name={"email"} value={formAuth.email} onIonChange={onChangeField}/>
                                    </IonItem>

                                    <IonItem className="ion-margin-bottom">
                                        <IonLabel position="floating">Mot de passe <IonText color="danger">*</IonText></IonLabel>
                                        <IonInput required type={"password"} name={"password"} value={formAuth.password} onIonChange={onChangeField}/>
                                    </IonItem>

                                    <IonButton expand="full"
                                               // style={{
                                               // 	        color: '#14c280',
	                                           //          '--border-color' : '#14c280',
	                                           //          '--background-activated' : '#28e070'	}}
	                                            color={"success"}
                                               shape="round" fill="outline"
                                               className="ion-margin-top"
                                               type={"submit"}
                                    >
                                        <IonIcon slot="start" name="checkmark-circle-outline"/>
                                        Me connecter
                                    </IonButton>

                                </IonList>
                            </form>
	                        <IonRouterLink routerLink="/inscription">
			                        Nouvel utilisateur? Inscrivez vous
	                        </IonRouterLink><br />

                        </IonCardContent>
                    </IonCard>
			</IonContent>
		</IonPage>
	);
};

export default Home;
