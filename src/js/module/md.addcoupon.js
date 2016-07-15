define(function (require, exports, module) {
	$addcoupon = function () {
		this.init.apply(this, arguments);
	};
	$addcoupon.prototype = {
		init:function(){
		},
		timeFun : function($time1,$time2){
			var startime=$time1.val(),endtime=$time2.val();
			var datanew1 = startime + " 00:00:00";
			var datanew2 = endtime + " 00:00:00";
			var data1 = new Date(datanew1).getTime();
			var data2 = new Date(datanew2).getTime();
			var nowdata  = new Date().getTime();
			var day_one = parseInt(nowdata - data1)/1000/60/60/24;
			var day_two = parseInt(nowdata - data2)/1000/60/60/24;
			console.log(day_one);
			var val = parseInt(data2 - data1)/1000/60/60/24;
			var interval = Math.abs(parseInt(data2 - data1)/1000/60/60/24);
			if(startime != "" || endtime != "")
			{
				if(day_one > 1 || day_two > 1){
					alert("投放/使用时间必须选择今天或者以后的时间");
					$time1.val("");
				}
				else if(day_two > 1){
					alert("投放/使用时间必须选择今天或者以后的时间");
					$time2.val("");
				}
				else{
					if(parseInt(data2) > parseInt(data1) && val < 0){
						alert("优惠券投放/使用开始时间必须早于结束时间");
						$time1.val("");
					}
					else if(parseInt(data2) < parseInt(data1)){
						alert("优惠券投放/使用开始时间必须早于结束时间");
						$time2.val("");
					}
					if(parseInt(data2) > parseInt(data1) && interval>60){
						alert("优惠券投放/使用时间不能超过60天");
						$time2.val("");
						
					}
				}
				
			}
			else{
			}
		},
		comperFun : function($time1,$time2){
			var startime=$time1.val(),endtime=$time2.val();
			var datanew1 = startime + " 00:00:00";
			var datanew2 = endtime + " 00:00:00";
			var data1 = new Date(datanew1).getTime();
			var data2 = new Date(datanew2).getTime();
			var val = parseInt(data2 - data1)/1000/60/60/24;
			var interval = Math.abs(parseInt(data2 - data1)/1000/60/60/24);
			if(startime != "" && endtime != "")
			{
				if(parseInt(data2) < parseInt(data1) && val < 0){
					alert("使用时间要大于投放时间");
					$time2.val("");
				}
			}
		}
	}
	module.exports = new $addcoupon();
});