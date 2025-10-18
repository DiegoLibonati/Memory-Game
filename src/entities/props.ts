interface DefaultProps {
  className?: string;
  children?: string;
}

export interface CardProps {
  id: string;
  name: string;
  imgSrc: string;
  onClick: (e: MouseEvent, id: string) => void;
}
