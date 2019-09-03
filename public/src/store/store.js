import Vuex from "vuex";
import {Menu} from "./menu.js";

export default function NewStore() {
	return new Vuex.Store({
		modules: {
			menu: Menu
		}
	});
}

