/* global require, App, Feeds, PluginHost */

require(['dojo/_base/kernel', 'dojo/ready'], function  (dojo, ready) {
	ready(function() {
		function updateFaviconBadge(unread = 0, fresh = 0) {

			window.requestAnimationFrame(() => {

				const canvas = document.createElement('canvas');
				canvas.width = 16;
				canvas.height = 16;
				if (canvas.getContext) {

					const link = App.find("link[rel='shortcut icon']");

					const ctx = canvas.getContext('2d');
					const img = new Image();
					img.src = 'images/favicon.png';
					img.onload = function() {
						if (unread > 0 || fresh > 0) {

							let bg_color = "#257aa7";
							let count = unread;

							if (fresh > 0) {
								count = fresh;
								bg_color = "#25a738";
							}

							if (count > 99)
								count = 99;

							ctx.fillStyle = bg_color;
							ctx.fillRect(0, 0, 16, 16);

							ctx.fillStyle = 'white';
							ctx.font = 'bold 10px sans-serif';
							ctx.textAlign = 'center';
							ctx.fillText(count, 8, 11);

						} else {
							ctx.drawImage(img, 0, 0, 16, 16);
						}

						link.type = 'image/x-icon';
						link.href = canvas.toDataURL("image/x-icon");
					};
				}
			});
		}

		PluginHost.register(PluginHost.HOOK_COUNTERS_PROCESSED, () => {
			updateFaviconBadge(App.global_unread, Feeds.getUnread(-3, 0));
		});

	});
});
