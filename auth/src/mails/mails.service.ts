import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const sendgridMail = require('@sendgrid/mail');

@Injectable()
export class MailsService {
    constructor(
        private readonly configServices: ConfigService,
    ){
        try{
            sendgridMail.setApiKey(configServices.get('SENDGRID_API_KEY'));
            //sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)
        }catch(erreur){
            throw new Error(`Une erreur d'intégration de sendGridMail est survenue !`);
        }
    }

    async sendMail(email: string, subject: string, body: string){
        try {
            const sending = await sendgridMail.send({
                from: {
                    email: this.configServices.get('SENDGRID_FROM'),
                    name: "SYSGEHOP",
                },
                to: email,
                subject: subject,
                html: body,
            })
            return sending;
        } catch (error) {
            return error;
        }
    }

    async sendLoginDetails(email: string, password: string, nomComplet: string){
        const subject = "COORDONNEES DE CONNEXION";
        const body = `<p> 
                  <br/> Bonjour ${nomComplet}!
                  <br/> Nous tenons à vous informer que vous avez été ajouté en tant qu'admin du portail Web de gestion des abonnés de la REGIDESO
                  <br/>Voici les coordonnées de connexion: <br/> username: <strong> ${email}<strong/><br/> mot de passe: <strong> ${password}<strong/>
                  <br/>Veuillez en faire bon usage comme la confidentialité l'exige !
                <br><br>Cordialement, REGIDESO-SUBSCRIBER</p>`
        return await this.sendMail(email, subject, body)
    }

    async sendConfirmationCodeMail(email: string, code: string) {
        const subject = "CONFIRMATION DU COMPTE";
        const html = `<p> 
                  <br/> Bonjour !
                  <br/> Merci de bien vouloir créer un compte d'abonnement à la REGIDESO.
                  <br/>Travaillez de manière ergonomique et faites vos choix d'abonnement selon votre préférence
                  en explorant le plein potentiel de la plateforme.<br/> Voici le code de vérification de votre adresse mail: <br/><strong> ${code}<strong/>
                <br><br>Cordialement, REGIDESO-SUBSCRIBER</p>`
        return await this.sendMail(email, subject, html);
    }

    async sendLoginDetailsPatient(email: string, password: string, nomComplet: string){
        const subject = "COORDONNEES DE CONNEXION";
        const body = `<p> 
                  <br/> Bonjour ${nomComplet}!
                  <br/> Nous tenons à vous informer qu'un compte vous a été créé en tant que patient dans le système SYSGEHOP
                  <br/>Voici les coordonnées de connexion: <br/> username: <strong> ${email}<strong/><br/> mot de passe: <strong> ${password}<strong/>
                  <br/>Veuillez en faire bon usage comme la confidentialité l'exige !
                <br><br>Cordialement, SYSGEHOP</p>`
        return await this.sendMail(email, subject, body)
    }
}