require("./style.styl");
import slot from "./slot";
import modal from "../modal";
import draggable from "./draggable";
import $ from "jquery";

const ua = navigator.userAgent;
window.$ = $;

// 设备判断 
function isAndroid () {
	return /[Android|Adr]/.test(ua);
}

function isiOS () {
	return /[iPhone|iPad]/.test(ua);
}

function isMobile () {
	return /AppleWebKit.*Mobile.*/.test(ua)
}

const template = `
	<div class="picker-item">
		<div class="header">
			<span class="action">取消</span>
			<span class="action blue">确认</span>
		</div>
		<div class="slots">
		</div>
	</div>
`;

/**
 * 设置 slot，使div能够拖动
 * @param  {object} dom  dom 节点
 * @param  {string} item 
 */
function appendSlot (dom, item) {
	let $dom = $(item);
	dom.find(".slots").append($dom);

	let state = {}

	draggable($dom.find(".slot-content")[0], {
		start (evt) {
			state = {
				top: event.pageY,
				left: event.pageX,
				ts: new Date()
			}
		},
		drage (evt) {
			var y = evt.pageY - state.top;
			state.top = evt.pageY;
			translateElm($dom, null, y);
		},
		end (evt) {
			console.log("end");
		}
	})
}

/**
 * 更新 slot
 */
function updateSlot (dom, index, item) {

}

/**
 * 设置元素translate
 */
function translateElm(elm, x, y) {

}

export class Picker {
	/**
	 * 初始化方法
	 * @param  {object} dom    dom节点
	 * @param  {object} config 配置 [slots|onchange]
	 */
	constructor (dom, config) {
		// 设置template
		dom.html(template);
		
		this.dom = dom;
		this.config = Object.assign({}, config);

		if (config.slots && config.slots instanceof Array) {
			this.setup();
		} else {
			throw "'slots configuration can't be null'";
		}
	} 

	setup () {
		let slots = this.config.slots;
		slots.forEach((item, index) => {
			// 初始化单个slot
			appendSlot(this.dom, slot.make(item.values));
			// initSlot(this.dom, index, item);
		})
	}

	update() {

	}
}
