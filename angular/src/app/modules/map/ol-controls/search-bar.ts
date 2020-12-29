import Control from 'ol/control/Control';

import { fromLonLat as LngLat } from 'ol/proj';

import { AppService } from 'src/app/app.service';
import { WonderService } from 'src/app/shared/services/wonder/wonder.service';

interface Options {
  wonderService: WonderService;
  appService: AppService;
  target?: HTMLElement | string;
}

export class SearchBar extends Control {
  private _appService: AppService;
  private _wonderService: WonderService;
  private _inputBox: HTMLInputElement;

  constructor(opt_options?: Options) {
    let options = opt_options as Options;

    let input = document.createElement('input');
    input.style.width = '160px';
    input.style.height = '30px';
    input.style.marginRight = '2px';
    input.placeholder = 'Select one wonder';
    input.setAttribute('list', 'dataNames');

    let searchBtn = document.createElement('button');
    searchBtn.innerHTML = '<i class="fas fa-search-location"></i>';
    searchBtn.style.height = '33px';
    searchBtn.style.width = '33px';
    searchBtn.style.margin = 'auto';

    let element = document.createElement('div');
    element.className = 'ol-unselectable ol-control';
    element.style.display = 'flex';
    element.style.left = '50%';
    element.style.transform = 'translateX(-50%)';
    element.style.marginTop = '5px';

    element.appendChild(input);
    element.appendChild(searchBtn);

    options.wonderService
      .getWonderList(options.appService.getUseMockeService())
      .subscribe(
        (dataList: any[]) => {
          let datalist = document.createElement('datalist');
          datalist.id = 'dataNames';

          dataList.forEach((data: any) => {
            let option = document.createElement('option');
            option.style.fontSize = '18px';
            option.style.marginBottom = '5px';
            option.value = data.name;
            option.setAttribute('data-value', data.id);

            datalist.appendChild(option);
          });

          element.appendChild(datalist);
        },
        (err) => {
          console.log(err);
        }
      );

    super({
      element: element,
      target: options.target,
    });

    this._inputBox = input;
    this._wonderService = options.wonderService;
    this._appService = options.appService;

    input.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.navigateToLocation();
      }
    });
    searchBtn.addEventListener('click', (event: MouseEvent) => {
      this.navigateToLocation();
    });
  }

  navigateToLocation() {
    if (this._inputBox.value) {
      let datalist = document.querySelectorAll(
        `#${this._inputBox.getAttribute('list')} option`
      );

      datalist.forEach((element) => {
        if (element.getAttribute('value') === this._inputBox.value) {
          this._wonderService
            .getWonderDetail(
              element.getAttribute('data-value') as string,
              this._appService.getUseMockeService()
            )
            .subscribe(
              (data: any) => {
                this.getMap()
                  .getView()
                  .setCenter(LngLat([data.lng, data.lat]));
                this.getMap().getView().setZoom(12);
              },
              (err) => {
                console.log(err);
              }
            );
        }
      });
    } else {
      alert('Please, select your wonder place');
    }
  }
}
