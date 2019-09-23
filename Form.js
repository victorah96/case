import React, {Component} from 'react'
import axios from 'axios'
import './App.css'
class Form extends Component {
    constructor(props){
        super(props);
        this.state = {name: "" , email:"", phone:"",areacode:"",comment:"", 
            nameError:"", emailError:"", phoneError:"",areacodeError:"", success:""
        }

    }
    handlerUserInput = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }
    validate = () => {
        //initialiserer verdiene til feilmeldingene 
        let nameError = ""; 
        let phoneError= ""; 
        let areacodeError = ""; 
        let emailError = "";
        let valid = true; 
      //  let regex = [a-zA-Z]+(?:(?:\. |[' ])[a-zA-Z]+)*;
        //Jeg prøvde å søke opp en smartere måte å sjekke om hvert objekt er tomt på ved å bruke filter() men fikk det ikke helt til..Jeg er klar over at denne algoritmen ikke er så effektiv
        //men er enda veldig ny på JavaScript så blir forhåpentligvis mye flinkere om et år :)
       if(!this.state.name) { //Sjekker om navn er oppgitt i det heletatt. Prøver å implementere en forEach løkke og ser om det går bra
            nameError = "Du må oppgi navn"; 
            this.setState({nameError : nameError})
            valid = false;
        }
       else if(!isNaN(this.state.name)) { //Sjekker om oppgitt navn er tall 
            nameError = "Navn kan ikke inneholde tall"
            this.setState({nameError :nameError})
            valid = false;
        }
        else if(this.state.name.trim().split(" ").length < 2) { //Sjekker om både fornavn og etternavn er oppgitt
            nameError = "Vennligst oppgi fullt navn med mellomrom i mellom."; 
            this.setState({nameError:nameError})
            valid=false;       
        }
      // else if(this.state.name.match(regex) {
      //      nameError = "Navn kan ikke inneholde spesialtegn"
        //    this.setState({nameError})
          //  valid=false;
      //  }
       if(this.state.name.length!= 0){ //Oppdaterer dersom denne feilen er fikset
            this.setState({nameError})
        }


        if(!this.state.email) { //Sjekker om email er oppgitt i det heletatt
            emailError = "Du må oppgi e-post adressen din"; 
            this.setState({emailError : emailError})
            valid = false;
        }
        else if(!this.state.email.includes("@")) { //Kunne eventuelt sjekket om e-posten inneholder gyldig landskode og gyldig domene ved å sammenligne verdien med en liste
            emailError = "Du mangler en '@' i mailen din. Formatet skal være noe@domene.landskode."
            this.setState({emailError : emailError})
            valid = false;
        }
        else if(this.state.email.split("@").length != 2) {
            emailError = "Feil format på e-mail. Du mangler noe etter '@'. Formatet skal være på noe@domene.landskode"
            this.setState({emailError: emailError})
            valid = false;
        }
        else if(this.state.email.split("@")[1].split(".").length !=2){
            emailError ="Feil format etter '@'. Forventer domene.landskode"
            this.setState({emailError:emailError})
            valid = false;
        }

        if(this.state.email.length != 0) {
            this.setState({emailError})
        }
        if(!this.state.areacode) { //Sjekker om postnummer er oppgitt i det heletatt. 
            areacodeError = "Du må oppgi postnummer"; 
            this.setState({areacodeError : areacodeError})
            valid = false;
        }
        else if(this.state.areacode.toString().length!= 4 ){ //Sjekker om lengden er akkurat lik 4 
            areacodeError = "Postnummer må ha 4 sifre."
            this.setState({areacodeError: areacodeError})
            valid=false;
        }
        if(this.state.areacode.toString().length != 0){
            this.setState({areacodeError})
        }
        if(!this.state.phone) { //Sjekker om telefonnummer er oppgitt i det heletatt. 
            phoneError = "Du må oppgi telefonnummeret ditt"; 
            this.setState({ phoneError: phoneError})
            valid=false;
        }

        else if (isNaN(this.state.phone)) { //Sjekker om telefonnummer som er oppgitt ikke er tall
            phoneError = "Telefonnummer er nødt til å være tall. Du har ikke oppgitt tall."
            this.setState({phoneError : phoneError})
            valid=false;
        }
        else if (this.state.phone.toString().length != 8) {
            phoneError = "Telefonnummer må være på 8 sifre."
            valid=false;
        }
        if (this.state.phone.toString().length != 0){
            this.setState({phoneError:phoneError})
        }
        return valid; 
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const isValid = this.validate(); 
        let sucess = "Ingeting";
        if (isValid) {
            console.log(this.state); //for min egen del 
            this.setState({nameError:""})
            this.setState({emailError:""})
            this.setState({areacodeError:""})
            this.setState({phoneError:""})
            this.setState({success: "Sendingen ble vellykket!"}) //Setter suksess melding

           // axios.post('https://heksemel.no/case/submit.php',this.state); //Post request til linken. Men jeg får ikke denne til å fungere...Får opp at det er blokkert av CORS policy
            
        }
        else{
        this.setState({success : ""}) //Meningen er å sette sucess meldingen til en tom streng neste gang koden oppdager noe feil i et av feltene. Men får ikke helt det jeg vil ha, sucessmelding fra forrige runde beholdes likevel.
        console.log("Noe gikk galt..");
    }
    }
    
    render() {

        return(
        <div > 
            <form className="text-center"onSubmit={this.handleSubmit}>
                <legend>Informasjon</legend> 
                <div style={{color:"white", fontSize:"large", backgroundColor:"green"}}>{this.state.success}</div> <br></br>
                <label>Navn:</label> <br></br>
                <input type="text" name = "name" placeholder="Ola Nordmann" value= {this.state.name} onChange={this.handlerUserInput}/>
                <div style={{color:"red"}}>{this.state.nameError}</div>
                <br></br>
                <label>E-post:</label><br></br>
                <input type="text" name="email" placeholder="ola.nordmann@gmail.com" value={this.state.email} onChange={this.handlerUserInput}/>
                <div style={{color : "red"}}>{this.state.emailError}</div>
                <br></br>
                <label>Telefon:</label> <br></br>
                <input type="tel" name = "phone" placeholder= "XXX XX XXX" value={this.state.phone} onChange={this.handlerUserInput}/>
                <div style={{color:"red"}}> {this.state.phoneError} </div>
                <br></br>
                <label>Postnummber:</label> <br></br>
                <input type="number" name="areacode" placeholder="1234" value={this.state.areacode} onChange={this.handlerUserInput}/>
                <div style = {{color : "red"}}> {this.state.areacodeError}</div>
                <br></br>
                <label>Kommentar:</label> <br></br>
                <textarea name = "comment" placeholder="Noen kommentarer du vil legge inn..?" value={this.state.comment} onChange={this.handlerUserInput}></textarea>
                <br></br>
                <button className="btn btn-info" type="submit">Send inn!</button>
            </form>
        </div>
        

    );
        }

}
export default Form;
