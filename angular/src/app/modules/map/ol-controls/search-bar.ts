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
  private appService: AppService;
  private wonderService: WonderService;
  private inputBox: HTMLInputElement;

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

    this.inputBox = input;
    this.wonderService = options.wonderService;
    this.appService = options.appService;

    input.addEventListener('keyup', this.onSearch.bind(this), false);
    // input.addEventListener('focusout', this.onSearch.bind(this), false);
    // searchBtn.addEventListener('click', this.onSearch.bind(this), false);
  }

  onSearch(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.type === 'click') {
      if (this.inputBox.value) {
        let datalist = document.querySelectorAll(
          `#${this.inputBox.getAttribute('list')} option`
        );

        datalist.forEach((element) => {
          if (element.getAttribute('value') === this.inputBox.value) {
            this.wonderService
              .getWonderDetail(
                element.getAttribute('data-value') as string,
                this.appService.getUseMockeService()
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
}
