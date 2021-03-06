import { createDefaultMenuInfo } from './models/menu-info'
import MenuManager from './menu-manager'

export default {
    bind: function (el:HTMLElement, binding:any) {
        new MenuManager(el,
            binding?.value?.value,
            "click",
            binding?.value?.menuInfo ?? createDefaultMenuInfo());
    }
}
