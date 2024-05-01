import { MenuItemModel } from "./menu-item";
import { UserModel } from "./user-model";

export interface SiteSettings {
    menu: MenuItemModel[],
    user?: UserModel
}
