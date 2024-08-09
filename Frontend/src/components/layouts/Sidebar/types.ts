export interface IProps {
  menus: Array<{
    label: string;
    children: Array<{
      path: string;
      label: string;
      icon: any;
    }>;
  }>;
}
