/* global require, App, Feeds, PluginHost */

require(['dojo/_base/kernel', 'dojo/ready'], function  (dojo, ready) {
	ready(function() {
		function updateFaviconBadge(unread = 0, fresh = 0) {

			const canvas = document.createElement('canvas');
			canvas.width = 72;
			canvas.height = 72;
			if (canvas.getContext) {

				const link = App.find("link[rel='shortcut icon']");

				const ctx = canvas.getContext('2d');
				const img = new Image();
				img.src = 'images/favicon.png';
				img.onload = function() {
					if (unread > 0 || fresh > 0) {

						let bg_color = "#257aa7";
						let count = unread;
						let font_size = "42px";

						if (fresh > 0) {
							count = fresh;
							bg_color = "#3ea447";
						}

						if (count > 99) {
							count = "∞";
							font_size = "52px";
						}

						ctx.fillStyle = bg_color;
						ctx.fillRect(0, 0, 72, 72);

						ctx.fillStyle = 'white';
						ctx.font = `bold ${font_size} Segoe UI, sans-serif`;
						ctx.textAlign = 'center';
						ctx.fillText(count, 36, 50);

					} else {
						ctx.drawImage(img, 0, 0, 72, 72);
					}

					link.type = 'image/x-icon';
					link.href = canvas.toDataURL("image/x-icon");
				};
			}
		}

		PluginHost.register(PluginHost.HOOK_COUNTERS_PROCESSED, () => {
			updateFaviconBadge(App.global_unread, Feeds.getUnread(-3, 0));
		});

	});
});
