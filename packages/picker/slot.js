/**
 * 单个 select
 */

export default {
	make (items) {
		let html = items.map((item) => {
			return `<div class="slot-item">${item}</div>`
		}).join("");

		return `<div class="slot">
			<div class="slot-content">${html}</div>
			<div class="picker-highlight"></div>
		</div>`;
	}
}