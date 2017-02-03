/**
 * 调用代码
 */
import $ from "jquery";
import { Picker } from "./packages/picker";

$(() => {
	let $demo = $("#demo1");
	let $picker = new Picker($demo, {
		slots: [{
			values: ["2012", "2013", "2014", "2015"]
		}, {
			values: ["01", "02"]
		}],
		onChange (data, evt) {
			console.log("changed: ", data);
		}
	});
	console.log("picker: ", $picker);
})