define(function (require, exports, module) {
	$editer = require("editer"),
	
	$test = function () {
		this.init.apply(this, arguments);
	};
	$test.prototype = {
		init:function(){
			alert("an");
			$editer.distanceFun();
		}
	}
	module.exports = new $test();
});