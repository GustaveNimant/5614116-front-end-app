import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Thing } from '../models/Thing.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class StuffService {

    uri = 'http://localhost:3000/api/all-stuff';

    constructor(private http: HttpClient) {}

    private stuff: Thing[];
    public stuff$ = new Subject<Thing[]>();
    
    getStuff() {
	// console.log('Entering in getStuff');
	this.http.get(this.uri).subscribe(
	    (stuff: Thing[]) => {
		if (stuff) {
		    this.stuff = stuff;
		    this.emitStuff();
		}
	    },
	    (error) => {
		console.log('Erreur dans getStuff ', error);
      }
    );
  }

  emitStuff() {
    this.stuff$.next(this.stuff);
  }

  getThingById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.uri + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewThing(thing: Thing) {
    return new Promise((resolve, reject) => {
      this.http.post(this.uri, thing).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewThingWithFile(thing: Thing, image: File) {
    return new Promise((resolve, reject) => {
      const thingData = new FormData();
      thingData.append('thing', JSON.stringify(thing));
      thingData.append('image', image, thing.title);
      this.http.post(this.uri, thingData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyThing(id: string, thing: Thing) {
    return new Promise((resolve, reject) => {
      this.http.put(this.uri + id, thing).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyThingWithFile(id: string, thing: Thing, image: File | string) {
    return new Promise((resolve, reject) => {
      let thingData: Thing | FormData;
      if (typeof image === 'string') {
        thing.imageUrl = image;
        thingData = thing;
      } else {
        thingData = new FormData();
        thingData.append('thing', JSON.stringify(thing));
        thingData.append('image', image, thing.title);
      }
      this.http.put(this.uri + id, thingData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteThing(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.uri + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
