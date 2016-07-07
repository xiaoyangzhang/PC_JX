define(function (require, exports, module) {
	$addcoupon = function () {
		this.init.apply(this, arguments);
	};
	$addcoupon.prototype = {
		init:function(){
		},
		timeFun : function($time1,$time2,time3){
			var datanew1 = startime + " 00:00:00";
			var startime=$time1.val(),endtime=$time2.val();
			var datanew2 = endtime + " 00:00:00";
			var data1 = new Date(datanew1);
			var data2 = new Date(datanew2);
			var val = parseInt(data2.getTime() - data1.getTime())/1000/60/60/24;
			var interval = Math.abs(parseInt(data2.getTime() - data1.getTime())/1000/60/60/24);
			if(startime != "" && endtime != "")
			{
				if(val < 0){
					alert("开始时间必须早于结束时间")
					$time1.val("");
					$time2.val("");
				}
				if(interval>60){
					alert("两者之间应该在60天之内");
					$time1.val("");
					$time2.val("");
				}
			}
			else{
			}
		},
		comperFun : function($time1,$time2){
			var startime=$time1.val(),endtime=$time2.val();
			var datanew1 = startime + " 00:00:00";
			var datanew2 = endtime + " 00:00:00";
			var data1 = new Date(datanew1);
			var data2 = new Date(datanew2);
			var val = parseInt(data2.getTime() - data1.getTime())/1000/60/60/24;
			var interval = Math.abs(parseInt(data2.getTime() - data1.getTime())/1000/60/60/24);
			if(startime != "" && endtime != "")
			{
				if(val < 0){
					alert("使用时间要大于开始的投放时间")
					$time1.val("");
					$time2.val("");
				}
			}
		}
	}
	module.exports = new $addcoupon();
});