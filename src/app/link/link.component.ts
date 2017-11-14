import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  continue() {
    this.router.navigate(['messages']);
  }
}