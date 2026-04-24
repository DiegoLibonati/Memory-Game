// interface DefaultProps {
//   className?: string | undefined;
//   children?: string | undefined;
// }

export interface CardProps {
  id: string;
  name: string;
  imgSrc: string;
  onClick: (e: MouseEvent, id: string) => void;
}
