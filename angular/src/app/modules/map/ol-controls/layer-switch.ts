import Control from 'ol/control/Control';
import LayerGroup from 'ol/layer/Group';

interface Options {
  target?: HTMLElement | string;
}

export class LayerSwitch extends Control {
  constructor(opt_options?: Options) {
    let options = opt_options || {};

    let button = document.createElement('button');
    button.style.width = '105px';
    button.innerHTML = 'Map Switch';

    let element = document.createElement('div');
    element.className = 'ol-unselectable ol-control';
    element.style.right = '0px';
    element.style.bottom = '0px';
    element.style.margin = '5px';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.onSwitch.bind(this), false);
  }

  onSwitch(event: Event) {
    let layers = this.getMap().getLayers().getArray();
    this.getMap().setLayerGroup(
      new LayerGroup({
        layers: [layers[1], layers[0]],
      })
    );
  }
}
