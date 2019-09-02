import Vuex from "vuex";
import {ModuleA} from "./module_a.js";
import {ModuleB} from "./module_b.js";

export default function NewStore() {
	return new Vuex.Store({
		modules: {
			a: ModuleA,
			b: ModuleB
		}
	});
}

