define(function(require, exports, module) {
    var $io = function(){return this.init();}
    $io.prototype = {
        init: function () {
            var $self = this;
        },
		getMessage : function(){
			var $self = this;
			$.ajax({
				cache : false,
				url : $self.messageUrl,
				dataType: "json",
				type : "post",
				data :{"timeout":20},
				timeout : 20500,
				success : function(json,textStatus){
					if(json.success){
						window.location.href = json.value;
						return false;
					}
					$self.getMessage();
				},
				error : function(json,textStatus){
					$self.getMessage();
				}			
			});
		}
	}
	module.exports =  new $io();
});