import {
  LoginWithAuth,
  RegisterWithAuth,
  authDomainStore,
  authUiStore,
  withAuth,
  Auth
} from "./auth-service/auth-service";
import { crudDomainStore, withCrud } from "./crud-service/crud-service";
import { Crud } from "./crud-service/crud-container";
import { Viz } from "./viz-service/viz-service";
import { Kb } from "./kb-service/kb-service";
import { Socket, socketDomainStore } from "./socket-service/socket-service";
import {
  Admin,
  withAdmin,
  adminDomainStore
} from "./admin-service/admin-service";
import { Media, mediaDomainStore } from "./media-service/media-service";
import { formsDomainStore } from "./forms-service/forms-service";
import { Forms } from "./forms-service/forms-container";
import {
  Settings,
  settingsDomainStore
} from "./settings-service/settings-service";
import {
  Notification,
  notificationDomainStore
} from "./notification-service/notification-service";
import { Game, gameDomainStore } from "./game-service/game-service";
export {
  LoginWithAuth,
  RegisterWithAuth,
  authDomainStore,
  authUiStore,
  withAuth,
  Auth,
  Crud,
  crudDomainStore,
  withCrud,
  Socket,
  socketDomainStore,
  Admin,
  withAdmin,
  adminDomainStore,
  Media,
  mediaDomainStore,
  Forms,
  formsDomainStore,
  Notification,
  notificationDomainStore,
  Game,
  gameDomainStore,
  Viz,
  Kb
};
