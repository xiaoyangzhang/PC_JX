	//验证
	var validate = function() {
		//必填属性
		var msg;
		//sku价格和库存格式验证
		if (!skuTableShowFlag) {
			return '您需要选择完整的属性，才能组合成完整的规格信息。';
		}
		$('.price').each(function() {
			if (!$(this).val() || !/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test($(this).val())) {
				msg = '请检查sku价格格式';
			}
		});
		$('.stock').each(function() {
			if (!$(this).val() || !/^(0|[1-9]\d+)$/.test($(this).val())) {
				msg = '请检查sku库存格式';
			}
		});
		if (msg) {
			return msg;
		}
	}

	//递归循环创建itemSkuPVPairList
	var checkboxTrAll = [];
	var temp=[];
	var getTrItem = function(arr,n,parent){
		n=n?n:0;
		parent=parent?parent:0;
		for(var i=0;i<arr[n].length;i++){
			if(parent){
				var isChong=false;
				for(var j=0;j<temp.length;j++){
					if(temp[j]==parent)
						isChong=true;
				}
				if(!isChong){
					temp.push(parent);
				}
			}
			if(n<arr.length-1){
				getTrItem(arr,n+1,arr[n][i]);
			}else{
				//console.log('你要用的结果='+JSON.stringify(temp.concat(arr[n][i])));
				checkboxTrAll.push(temp.concat(arr[n][i]));
//						checkboxTrAll.push((temp.join(',')+','+JSON.stringify(arr[n][i])).split(','));
				if(arr[n].length-1==i)temp.length=0;
			}
		}
	}

	//初始创建数组&新建数组
	var setPropertyAll = function(){
		//设置是否创建数组的flag
		var setNewFlag = false;
		var lengthNum = 1;
		$('.sellProperty').each(function() {
			setNewFlag = true;
			lengthNum = lengthNum * ($(this).find('.skuCheckbox').length)
			if ($(this).find('.skuCheckbox').length < 1) {
				//缺少属性不创建数组
				setNewFlag = false;
			};					
		});	
		if (setNewFlag) {
			//创建checkbox属性二维数组;
			var checkboxAll =[];
			$('.sellProperty').each(function () {
				var checkboxTr = [];
				$(this).find('.skuCheckbox').each(function () {
					var boxProperty ={
						"pId": $(this).closest('.sellProperty').attr("sellPropertyId"),
						"pTxt": $(this).closest('.sellProperty').attr("sellPropertyText"),
						"pType": $(this).closest('.sellProperty').attr("sellPropertyType"),
						"vId": $(this).attr("sellValueId"),
						"vTxt": $(this).attr("sellValueText"),
						"vType":$(this).attr("sellValueType")
					}	
					checkboxTr.push(boxProperty);
				});
				checkboxAll.push(checkboxTr);
			});
//					console.log(checkboxAll)
			//将二维数组重新组合生成新数组checkboxTrAll;
			checkboxTrAll.length = 0;
			getTrItem(checkboxAll);					
			//console.log(JSON.stringify(checkboxTrAll));

			//创建idgroup数组
			var idGroupNumArr = [];
			var trLen = $('.sellProperty').length;
			for (var i =0;i<checkboxTrAll.length;i++) {
				var idGroupNum="";
				for (var j =0;j<trLen;j++) {
					idGroupNum = idGroupNum+"_"+checkboxTrAll[i][j].vId;
				}
				idGroupNumArr.push(idGroupNum);
			};
				
			var newPropertyAll=[];	

			for (var i =0;i<lengthNum;i++) {
				var newTrObj={
					"categoryId": 0,
					"checked": false,
					"id": 0,
					"itemId": 0,
					"itemPrice": 0,
					"idGroup" : idGroupNumArr[i],
					"itemSkuPVPairList": checkboxTrAll[i],
					"modifyStatus": false,
					"outSkuId": 0,
					"price": 0,
					"priceY": 0,
					"property": JSON.stringify(checkboxTrAll[i]),
					"sellerId": 0,
					"spuId": 0,
					"status": 0,
					"stockNum": 0,
					"version": 0
				};
				newPropertyAll.push(newTrObj);
			}
			
			//console.log(JSON.stringify(newPropertyAll))
			//回填数据
			for (var i=0;i<skuPropertyAll.length;i++) {
				for (var j=0;j<newPropertyAll.length;j++) {
					if (skuPropertyAll[i].idGroup == newPropertyAll[j].idGroup) {
						newPropertyAll[j]=skuPropertyAll[i];
						break;
					}
				}
			};
			skuPropertyAll = newPropertyAll;
//					console.log(JSON.stringify(newPropertyAll))
//					console.log(JSON.stringify(skuPropertyAll))
		}			
	}
//			setPropertyAll();

	//构建sku属性数组
	var createSkuProperty = function() {
		//生成sku属性选项数组
		skuProperty = new Array();
		$('.sellProperty').each(function(i) {
			var sku = {
				pId: $(this).attr('sellPropertyId'),
				pTxt: $(this).attr('sellPropertyText'),
				pType: $(this).attr('sellPropertyType'),
				pValue: new Array()
			};
			$(this).find('.skuCheckbox:checked').each(function() {
				sku.pValue.push({
					vId: $(this).attr('sellValueId'),
					vTxt: $(this).attr('sellValueText')
				});
			});
			skuProperty.push(sku);
		});
		//console.log(skuProperty)
	}
	//设置表格是否显示的flag
	var setTableShowFlag = function() {
			//TODO 判断是否生成sku表格
			skuTableShowFlag = true;
			$('.sellProperty').each(function() {
				if ($(this).find('.skuCheckbox:checked').length < 1) {
					//属性没有完全填写不显示表格
					skuTableShowFlag = false;
				}
			});
		}
		//构建生成sku表格
	var createTable = function() {
//				console.log(skuPropertyAll);
		//TODO 先用filter取出显示的sku
		skuPropertyShowAll = skuPropertyAll.filter(function(v) {
				if (v['checked']) {
					return v;
				}
			})
			//计算生成sku表格时各属性td占用的行数
		var tdRowSpanNumArr = new Array(); //sku属性td占的行数
		$('.sellProperty').each(function() {
			tdRowSpanNumArr.push($(this).find('.skuCheckbox:checked').length)
		});

		var len = tdRowSpanNumArr.length;
		for (var i = 0; i < len; i++) {
			if (i === len - 1) {
				tdRowSpanNumArr[i] = 1;
			} else if (i === len - 2) {
				tdRowSpanNumArr[i] = tdRowSpanNumArr[i + 1];
			} else if(i === len - 3){
				tdRowSpanNumArr[i] = tdRowSpanNumArr[i + 1] * tdRowSpanNumArr[i + 2];
			}else{
				tdRowSpanNumArr[i] = tdRowSpanNumArr[i + 1] * tdRowSpanNumArr[i + 2] * tdRowSpanNumArr[i + 3];
			}
		}
		//生成sku表格
		var tableStart = '<table class="table table-bordered tab-sku">' + '<caption><span class="spColor">*</span>活动属性匹配表</caption>' + '<thead>';
		var titleTrBody = '<tr>';
		for (var i = 0; i < skuProperty.length; i++) {
			titleTrBody += '<th><span>' + skuProperty[i]["pTxt"] + '</span></th>';
		}
		titleTrBody += '<th><span>价格</span></th>';
		titleTrBody += '<th><span>库存</span></th>'
		titleTrBody += '</thead>';
		titleTrBody += '</tr>';
		var trBody = '';
		for (var i = 0; i < skuPropertyShowAll.length; i++) {
			trBody += '<tr class="skuTbEdit" skuTrId="' + skuPropertyShowAll[i]['id'] + '">';
			for (var j = 0; j < skuPropertyShowAll[i]['itemSkuPVPairList'].length; j++) {
				if (i % tdRowSpanNumArr[j] === 0) {
					trBody += '<td rowspan="' + tdRowSpanNumArr[j] + '"><span>' + skuPropertyShowAll[i]['itemSkuPVPairList'][j]["vTxt"] + '</span></td>';
				}
			}
			trBody += '<td><input class="price" type="text" value="' + skuPropertyShowAll[i]['priceY'] + '"></td>';
			trBody += '<td><input class="stock" type="text" value="' + skuPropertyShowAll[i]['stockNum'] + '"></td>';
			trBody += '</tr>';
		}
		var talbeEnd = '</table>';
		return tableStart + titleTrBody + trBody + talbeEnd;
	}
	
	$(function() {
		//初始创建表格
		setTableShowFlag();
		if (skuTableShowFlag) {
			createSkuProperty();
			$('.skuTable').html(createTable());
		} else {
			$('.skuTable').html('您需要选择完整的属性，才能组合成完整的规格信息。');
		}
		
		//新增checkbox条目
		$(document).delegate(".btn-add","click",function () {
			var addItemText = $.trim($(this).siblings(".addItemText").val().replace(/[ ]/g,""));
			var checkboxCon = $(this).closest("tr").next("tr").find(".checkbox-con");
			if (!addItemText) {
				layer.msg("请检查输入信息！",{icon:2})
			}else{
				var flag = false;
				checkboxCon.find(".skuCheckbox").each(function () {
					if ($(this).attr("sellValueText")==addItemText) {
						flag = true;
					}
				});
				if (flag) {
					layer.msg("不可重复添加！",{icon:2})
				}else{
					var idNum = 0;
					if (checkboxCon.find(".skuCheckbox").length<1) {
						idNum = 0;
					} else{
						var idNumAr =[];
						checkboxCon.find(".skuCheckbox").each(function () {
							idNum = parseInt($(this).attr("sellValueId"));
							idNumAr.push(idNum);
						});
						Array.min=function(arr){
							    return Math.min.apply(Math,arr);
							}
						idNum = Array.min(idNumAr);
					};
					idNum-=1;
					checkboxCon.append('<span><input type="checkbox" class="skuCheckbox" sellValueId='+idNum+' sellValueText= '+addItemText+ ' sellValueType="1">'+addItemText+'</span>')												
					setPropertyAll();//新增后重建最终数组
//							console.log(skuPropertyAll);
				};
			};
		})				
		
		//修改页时检查sku
		$(document).delegate(".stock", 'change', function() {
			var index = $(this).parents('.skuTbEdit').index();
			var i = 0;
			for (var j = 0; j < skuPropertyAll.length; j++) {
				if (skuPropertyAll[j]['checked']) {
					i += 1;
					if (i == index + 1) {
						skuPropertyAll[j]['stockNum'] = $(this).val();
						skuPropertyAll[j]['modifyStatus'] = true;
					}
				}
			}
		})
		$(document).delegate(".price", 'change', function() {
			var index = $(this).parents('.skuTbEdit').index();
			var i = 0;
			for (var j = 0; j < skuPropertyAll.length; j++) {
				if (skuPropertyAll[j]['checked']) {
					i += 1;
					if (i == index + 1) {
						skuPropertyAll[j]['priceY'] = $(this).val();
						skuPropertyAll[j]['modifyStatus'] = true;
					}
				}
			}
		})

		//重新选择sku
		$(document).delegate(".skuCheckbox","click",function () {
			//TODO 变更前保存编辑结果
			//重新构建skuProperty数组
			createSkuProperty();
			//选中状态
			var checkStatus = $(this).prop("checked");
			//重新计算选中状态
			for (var i = 0; i < skuPropertyAll.length; i++) {
				//sku组合checkStatus
				var checkedStatus1 = true;
				var itemSkuPVPairList = skuPropertyAll[i]['itemSkuPVPairList'];
				for (var j = 0; j < itemSkuPVPairList.length; j++) {
					//sku组合中的属性checkStatus
					var checkedStatus2 = false;
					for (var k = 0; k < skuProperty[j]['pValue'].length; k++) {
						if (itemSkuPVPairList[j]['vId'] == skuProperty[j]['pValue'][k]['vId'] && itemSkuPVPairList[j]['vTxt'] == skuProperty[j]['pValue'][k]['vTxt']) {
							checkedStatus2 = true;
							break;
						}
					}
					if (!checkedStatus2) {
						checkedStatus1 = false;
					}
				}
				skuPropertyAll[i]['checked'] = checkedStatus1;
			}
			//设置表格是否显示的flag
			setTableShowFlag();
			if (skuTableShowFlag) {
				$('.skuTable').html(createTable());
			} else {
				$('.skuTable').html('您需要选择完整的属性，才能组合成完整的规格信息。');
			}
			//console.log(skuPropertyAll);
		});

	});