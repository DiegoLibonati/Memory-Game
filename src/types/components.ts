export interface Component {
  cleanup?: () => void;
}

export interface CardComponent extends Component, HTMLButtonElement {}
