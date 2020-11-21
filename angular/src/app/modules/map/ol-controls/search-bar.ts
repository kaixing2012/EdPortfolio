import Control from 'ol/control/Control';

import { fromLonLat as LngLat } from 'ol/proj'

import { MapService } from '../map.service';


interface Options {
    mapService?: MapService
    target?: HTMLElement | string;
}

export class SearchBar extends Control {
    private mapService: MapService;
    private inputBox: HTMLInputElement;

    constructor(opt_options?: Options) {
        let options = opt_options || {};

        let input = document.createElement('input');
        input.style.width = '280px'
        input.style.height = '30px'
        input.placeholder = 'Please, enter country name to get to capital';
        input.setAttribute('list', "placeNames")

        let element = document.createElement('div');
        element.className = 'ol-unselectable ol-control';
        element.style.left = "50%"
        element.style.transform = "translateX(-50%)"
        element.style.marginTop = "5px"
        element.appendChild(input);

        options.mapService.getCountryNames().subscribe(
            (data: any) => {
                let datalist = document.createElement("datalist")
                datalist.id = "placeNames"

                data.forEach((element: string) => {
                    let option = document.createElement("option")
                    option.style.fontSize = "18px"
                    option.style.marginBottom = "5px"
                    option.value = element;

                    datalist.appendChild(option)
                });

                element.appendChild(datalist)
            },
            err => {

            }
        )

        super({
            element: element,
            target: options.target
        })

        this.inputBox = input
        this.mapService = options.mapService

        input.addEventListener('keyup', this.onKeyup.bind(this), false);
    };

    onKeyup(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.mapService.getCountryByName(this.inputBox.value).subscribe(
                (data: any) => {
                    this.getMap().getView().setCenter(
                        LngLat([data.CapitalLongitude, data.CapitalLatitude])
                    )
                    this.getMap().getView().setZoom(12)
                },
                err => {

                }
            )
        }
    }
}
