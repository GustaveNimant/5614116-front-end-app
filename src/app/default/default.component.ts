import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

    constructor(private router: Router) {
	// console.log('Entering in constructor')
    }

    ngOnInit() {
	// console.log('Entering in ngOnInit')
    }
    
    onNavigate(endpoint: string) {
	// console.log('Entering in onNavigate with endpoint ', endpoint)
	this.router.navigate([endpoint]);
    }
}
