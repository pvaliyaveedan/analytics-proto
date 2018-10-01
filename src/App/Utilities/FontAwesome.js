import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faWheelchair, faClipboardCheck, faUserSecret, faLayerGroup, faCrosshairs,faSearch,faUser } from "@fortawesome/free-solid-svg-icons";
library.add(faWheelchair);
library.add(faClipboardCheck);
library.add(faUserSecret);
library.add(faLayerGroup);
library.add(faCrosshairs);
library.add(faSearch);
library.add(faUser);



dom.watch(); // This will kick off the initial replacement of i to svg tags and configure a MutationObserver
