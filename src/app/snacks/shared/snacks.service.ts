
import {throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core'
import {ISnackList, ISnack, IAvailableSize} from './snack.model'
import {Observable} from 'rxjs/RX'
import {Http, Response, Headers, RequestOptions} from '@angular/http'

@Injectable()
export class SnacksService {
    baseUrl: String = '/api/snacks';
    snacksList: ISnackList[]
    constructor(private http: Http) {}
    getMenu(): Observable<ISnackList[]> {
        return this.http.get(`${this.baseUrl}`).pipe(map((response: Response) => {
            return <ISnackList[]>response.json();
        }),catchError(this.handleError),);
    }

    // getSnackSizes(snackType: string, snackName: string) {
    //     return this.getSnacks(snackType).snacks.find(snack => snack.name.includes(snackName)).availableSizes
    // }
    // getSnackPrice(snackType: string, snackName: string, size: string) {
    //     return  this.getSnacks(snackType).snacks.find(snack =>
    //         snack.name.includes(snackName)).availableSizes.find(as => as.size.includes(size)).price
    // }
    getSnackSizes(snackType: string, snackName: string) {
        // let snacks: ISnack[]
        // this.getSnacks(snackType).subscribe((snack) => { snacks = <ISnack[]>snack
        //     console.log('snacks', snack)
        //     return snacks.find(sk => sk.name.includes(snackName)).availableSizes
        // })
        if (this.snacksList) {
            return this.snacksList.find(slst => slst.snacksType === snackType).snacks.find(snack =>
                snack.name === snackName).availableSizes
        }
        return []
       // return null
    }
    getSnackPrice(snackType: string, snackName: string, size: string) {
        // let snacks: ISnack[]
        if (this.snacksList) {
            return this.snacksList.find(slst => slst.snacksType === snackType).snacks.find(snack =>
                snack.name === snackName).availableSizes.find(sizes => sizes.size === size).price
        }
        return 0
        // this.getSnacks(snackType).subscribe((snack) => { snacks = <ISnack[]>snack })
        // return  snacks.find(snack =>
        //     snack.name.includes(snackName)).availableSizes.find(as => as.size.includes(size)).price
    }
    getSnacks(snackType: string): any {
        if (this.snacksList) {
            return this.snacksList.find(snack => snack.snacksType.toLocaleUpperCase().includes(snackType.toLocaleUpperCase())).snacks
        } else {
            return this.http.get(this.baseUrl + '/' + snackType).pipe(map((response: Response) => {
                        // console.log(response)
                        return <ISnack[]>response.json();
                    }),catchError(this.handleError),)
        }
    }
    private handleError(error: Response) {
        console.log('api error')
        return observableThrowError(error.statusText);
    }
}
const SNACKS: ISnackList[] = [
    {
        imageUrl: '../assets/images/burger.png',
        snacksType: 'Burger',
        snacks: [
            { id: 1,
              name: 'Broadway Chicken', imageUrl: '../assets/images/burgers/broadway-chicken.jpg' ,
              availableSizes: [
                  {size: 'Medium', price: 200},
                  {size: 'Large', price: 300}
                ]
            },
            { id: 2,
                name: 'Brooklyn Classic', imageUrl: '../assets/images/burgers/brooklyn-classic.jpg' ,
                availableSizes: [
                    {size: 'Medium', price: 175},
                    {size: 'Large', price: 300}
                ]
            },
            { id: 3,
                name: 'Manhatten Grilled Chicken', imageUrl: '../assets/images/burgers/manhatten-grilled-chicken.jpg' ,
                availableSizes: [
                    {size: 'Small', price: 200},
                    {size: 'Medium', price: 300}]
            },
            { id: 4,
                name: 'Soho Grande', imageUrl: '../assets/images/burgers/soho-grande.jpg' ,
                availableSizes: [
                    {size: 'Large', price: 200}
                ]
            },
            { id: 5,
                name: 'Wall Street Beef', imageUrl: '../assets/images/burgers/wall-street-beef.jpg' ,
                availableSizes: [
                    {size: 'Small', price: 175},
                    {size: 'Medium', price: 200},
                    {size: 'Large', price: 300}
                ]
            }
        ]
    },
    {
        imageUrl: '../assets/images/pizza.jpg',
        snacksType: 'Pizza',
        snacks: [
            {id: 1,
              name: 'Bacon', imageUrl: '../assets/images/pizzas/bacon.jpg',
              availableSizes: [
                    {size: 'Medium', price: 200},
                    {size: 'Large', price: 300}
              ]
            },
            {id: 2,
                name: 'Chili Pepper', imageUrl: '../assets/images/pizzas/chili-pepper.jpg',
                availableSizes: [
                    {size: 'Small', price: 175},
                    {size: 'Medium', price: 250}
                ]
              },
              {id: 3,
                name: 'Mozzorella', imageUrl: '../assets/images/pizzas/mozzorella.jpg',
                availableSizes: [
                    {size: 'Medium', price: 250},
                    {size: 'Large', price: 300}
                ]
              },
              {id: 4,
                name: 'Mushrooms', imageUrl: '../assets/images/pizzas/mushrooms.jpg',
                availableSizes: [
                    {size: 'Small', price: 300},
                    {size: 'Large', price: 400}
                ]
              },
              {id: 5,
                name: 'Salami', imageUrl: '../assets/images/pizzas/salami.jpg',
                availableSizes: [
                    {size: 'Medium', price: 125},
                    {size: 'Large', price: 200}
                ]
              },
              {id: 6,
                name: 'Shrimp', imageUrl: '../assets/images/pizzas/shrimp.jpg',
                availableSizes: [
                    {size: 'Small', price: 100},
                    {size: 'Medium', price: 150}
                ]
              },
              {id: 7,
                name: 'Vegeterian', imageUrl: '../assets/images/pizzas/veg.jpg',
                availableSizes: [
                    {size: 'Medium', price: 150},
                    {size: 'Large', price: 200}
                ]
              }
        ]
    },
    {
        imageUrl: '../assets/images/chinese.jpg',
        snacksType: 'Chinese',
        snacks: [{id: 1,
            name: 'Manchurian',  imageUrl: '../assets/images/chinese/manchurian.jpg',
            availableSizes: [
                {size: 'Half', price: 50},
                {size: 'Full', price: 90}
              ]
          },
          {id: 2,
              name: 'Chow Mein',  imageUrl: '../assets/images/chinese/chow-mein.webp',
              availableSizes: [
                {size: 'Half', price: 125},
                {size: 'Full', price: 200}
              ]
            },
            {id: 3,
              name: 'Momo',  imageUrl: '../assets/images/chinese/momo.jpg',
              availableSizes: [
                  {size: 'Half', price: 35},
                  {size: 'Full', price: 60}
              ]
            }
      ]
    },
    {
        imageUrl: '../assets/images/chaat.jpg',
        snacksType: 'Chaats',
        snacks: [{id: 1,
              name: 'Bhel Puri',  imageUrl: '../assets/images/chaats/bhel-puri.jpg',
              availableSizes: [
                  {size: 'Medium', price: 25},
                  {size: 'Large', price: 50}
                ]
            },
            {id: 2,
                name: 'Dahi Puri',  imageUrl: '../assets/images/chaats/dahi-puri.jpg',
                availableSizes: [
                    {size: 'Regular', price: 30}
                ]
              },
              {id: 3,
                name: 'Pani Puri',  imageUrl: '../assets/images/chaats/pani-puri.jpg',
                availableSizes: [
                    {size: 'Regular', price: 30}
                ]
              },
              {id: 4,
                name: 'Samosa',  imageUrl: '../assets/images/chaats/samosa.jpg',
                availableSizes: [
                    {size: 'Regular', price: 25}
                ]
              }
        ]

    }

]
