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
function appendSlot (dom, items, slotHeight) {
	let $dom = $(slot.make(items)),
		slotCount = items.length;
	dom.find(".slots").append($dom);
	let state = {}

	draggable($dom[0], {
		start (evt) {
			state = {
				top: evt.pageY,
				left: evt.pageX,
				ts: new Date()
			}
		},
		drag (evt) {
			var y = evt.pageY - state.top;
			state.top = evt.pageY;
			translateElm($dom.find(".slot-content")[0], null, y);
		},
		end (evt) {
			var elm = $dom.find(".slot-content")[0]
			var y = getTranslate(elm);
			var fix = Math.round(y/slotHeight) *slotHeight;

			if (y > 0) {
				fix = 0
			}

			if (y < -slotHeight*(slotCount-1)) {
				fix = -slotHeight*(slotCount-1);
			}
			console.log("fix", y-fix);

			translateElm(elm, null, fix-y);
		}
	})
}

/**
 * 更新 slot
 */
function updateSlot (dom, index, item) {

}

/**
 * 获取 Y 位移
 */
function getTranslate (elm) {
	var st = window.getComputedStyle(elm, null).transform,
		reg = /matrix\(.*, (-?\d+(\.?\d+?)?)\)/;
	return parseInt(st.match(reg)[1]);
}

/**
 * 设置元素translate
 */
function translateElm(elm, x, y) {
	var translateY = getTranslate(elm) + parseInt(y);
	elm.style.transform = `translate3d(0px, ${translateY}px, 0px)`;
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
		this.config = Object.assign({
			slotHeight: 40
		}, config);

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
			appendSlot.call(this, this.dom, item.values, this.config.slotHeight);
			// initSlot(this.dom, index, item);
		})
	}

	update() {

	}
}
