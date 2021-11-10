<?php
class Favicon_Unread extends Plugin {

	function about() {
		return array(1.0,
			"Shows unread/fresh articles count in a favicon",
			"fox");
	}

	function init($host) {
	}

	function get_js() {
		return file_get_contents(__DIR__ . "/init.js");
	}

	function api_version() {
		return 2;
	}
}
