export interface MenuItemModel {
    title: string;
    link: string;
    icon?: string;
    isexternal?: boolean;
    menuitems?: MenuItemModel[];
  }
  