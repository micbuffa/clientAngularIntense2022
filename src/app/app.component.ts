import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  loggedInUIState = false;

  ngOnInit(): void {
    this.loggedInUIState = this.authService.loggedIn;
  }

  loginButtonColor = "primary";

  title = 'Application de gestion des assignments';
  constructor(
    public authService: AuthService,
    private router: Router,
    private assignmentsService: AssignmentsService
  ) {}

  oldLoginFunction() {
    if (!this.authService.loggedIn) {
      console.log("Je n'étais pas connecté, je suis maintenant loggé");
      this.authService.oldLogInFunction();
      this.loginButtonColor = "warn";
      this.loggedInUIState = !this.loggedInUIState;
    } else {
      console.log("J'étais  connecté, je suis maintenant déloggé");
      this.authService.logOut();
      this.loginButtonColor = "primary";
      //this.router.navigate(['/home']);
      this.loggedInUIState = !this.loggedInUIState;
    }
  }

  logout() {
    console.log("J'étais  connecté, je suis maintenant déloggé");
    this.authService.logOut();
    this.loginButtonColor = "primary";
    this.loggedInUIState = !this.loggedInUIState;
    this.router.navigate(['/home']);
  }

  remplirBD() {
    //this.assignmentsService.peuplerBD();

    this.assignmentsService.peuplerBDAvecForkJoin().subscribe(() => {
      console.log('LA BASE EST ENTIEREMENT REMPLIE AVEC LES DONNEES DE TEST');

      // replaceUrl = true = force le refresh, même si
      // on est déjà sur la page d’accueil
      this.router.navigate(['/home'], { replaceUrl: true });
    });
  }
}
