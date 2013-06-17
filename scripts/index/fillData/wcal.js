// JavaScript Document
function WCal(op){
	var f = function(){},o=this;
	var date = new Date();
	date=[date.getFullYear(),date.getMonth()+1,date.getDate()];
	var div  = document.createElement('div');
    div.id = op.eleID;   
	if(op.element){
		this.G(op.element).appendChild(div);
	}else{
		document.body.appendChild(div);
	}

    
	//配置项
	this.op = {
        eleID  : op.eleID,
        posEle :  op.posEle,
		element : op.element,					//显示日历的元素，默认插入body
		date : op.date || date,					//用于显示"今天"的日期
		today : op.today || date,
		count : op.count || 1,					//显示月份的个数
		between : op.between || [0,99999999],	//可以选择日期的区间
		input : this.G(op.input) || null,		//绑定input
		position : this.G(op.position),			//判断日历应该显示的位置
		onStart : op.onStart || f,				//初始化完成回调
		onShow: op.onShow || f,					//显示时调用
		onHide: op.onHide || f,					//隐藏时调用
		onSelectDay : op.onSelectDay || f,		//选择日期时调用
		onChange : op.onChange || f,			//日期有变化的时候调用
		toInput : op.toInput,					//如用户自定义toInput函数，则不会执行默认的this.toInput,参数(date,week)
		formInput : op.formInput				//自定义fromInput，参数为input
	};
	this.cache = {								//缓存一些结点引用和值
		cal : div,								//包容整个日历的结点
		input : this.op.input,
		position : this.op.position || this.op.input,
		date : this.date(this.op.date),
		cur_date : [0,0,1],						//当前显示的月份
		count : this.op.count,					
		between:this.op.between,				//可用日历范围
		iframeHeight : null,					//iframe高度，用来遮住select
		iframeWidth : null,						//iframe宽度
		cells:[],								//缓存日期单元格结点引用
		heads:[],								//缓存月份标题结点
		btns:[]									//控制按钮
	};	

	if(this.cache.input){						
		this.addEvent(document.body,'click',function(e){
			o.hide();
            if(o.op.input.parentNode){
                o.op.input.parentNode.style.border = "1px solid #b1b1b1";
            }
		});
        var _ele_all = document.body.getElementsByTagName("*");
        for(var i=0;i<_ele_all.length;i++){
            var _ele_i = _ele_all[i];
            if(_ele_i.nodeType != 1){
                continue;
            }
            if(_ele_all[i].className == 'container'){
                this.addEvent(_ele_i,'click',function(e){});
            }
        }


		this.addEvent(this.cache.cal,'click',function(e){
			return false;
		},true);

        //this.addEvent(this.cache.cal,'touchstart',function(e){
			//e.stopPropagation();
		//},true);

		var f =function(){
			if(o.op.formInput){
				o.op.formInput.call(o,o.cache.input);
			}else{
				o.formInput.call(o,o.cache.input);
			}
		};
		o.addEvent(o.cache.input,['click'],f,true);
		this.hide();							//如果绑定了input，则先把日历隐藏一下
	}

	this.op.onStart.call(this,this.cache.cal);	//调用onStart,传入日历的结点引用作为参数,this为实例

	this.initHtml();
}

WCal.prototype = {
	conf:{
		day_text:['日','一','二','三','四','五','六'],	//周几
		cal_text:['年','月','日'],						//年月日
		cal_class:'op_cal',								//最外层结点className
		month_class_pre : 'op_mon_pre',					//每个月份的日历className前缀
		month_class : 'op_mon',							//月份className
		day_class:['op_mon_pre_month','op_mon_cur_month','op_mon_next_month','op_mon_today','op_mon_day_hover','op_mon_day_selected','op_mon_day_disabled'],//上月、本月、下月、今天、鼠标移上、选中、不可选状态的className
		btn_class:['op_btn_pre_month','op_btn_next_month']	//按钮的className
	},
	IE:/msie/.test(navigator.userAgent.toLowerCase()) && !/opera/.test(navigator.userAgent.toLowerCase()),
	G:function(id){										//G
		if(typeof id == 'string')
			return document.getElementById(id);
		return id;
	},
	hasClass:function(v,cName){							//是否有className
		var cs = v.className.split(/s+/);
		for(var i=0;i<cs.length;i++){
			if(cName == cs[i]) return true;
		}
		return false;
	},
	addClass:function(v,cName){							//增加className
		if(!this.hasClass(v,cName)){
			if(v.className==''){
				v.className=cName;
			}else{
				v.className += ' '+cName;
			}
		}
	},
	removeClass:function(v,cName){						//删除className
		var cs = v.className.split(/\s+/);
		for(var i=0;i<cs.length;i++){
			if(cName == cs[i]){
				cs.splice(i,1);
			};
		}
		v.className = cs.join(' ');
	},
	each:function(o,fn){								//each
		for(var i=0,l=o.length;i<l;i++){
			fn.apply(o[i],[i,o[i]]);
		}
	},

	addEvent:function(el, eventName,fn,cb){
		var f = function(e){
			e = window.event || e;
			if(cb){
				if(e.stopPropagation) e.stopPropagation();
				else e.cancelBubble = true;
			}
			fn.call(el,e);
		};
		var a = [].concat(eventName);
		this.each(a,function(i,eName){
			if(document.attachEvent) el.attachEvent('on'+eName,f);
			else el.addEventListener(eName,f,false);
		});
	},

	days: function(date){								//取得传入的日期的一个月日期数组，包括三个小数组：上月、本月、下月日期
		date = this.date(date);
		var y,m,pre_m,pre_d,next_m,Ms,Me,Mn,l,weeks,days=[[],[],[]];
		y = date[0];
		m = date[1];
		Ms = new Date(y,m-1,0);
		Me = new Date(y,m,0);
		Mn = new Date(y,m,1);
		l = Me.getDate();
		pre_m = Ms.getMonth()+1;
		pre_d = Ms.getDate();
		next_m = Mn.getMonth()+1;
		y = Me.getFullYear();
		m = Me.getMonth()+1;
		var y1=Ms.getFullYear(),y2=Mn.getFullYear();
		for(var i=Ms.getDay();i>=0;i--,pre_d--){
			days[0].unshift([y1,T(pre_m),T(pre_d)].join(''));
		}
		for(var i=1;i<=l;i++){
			days[1].push([y,T(m),T(i)].join(''));
		}
		for(var i=1,j=Me.getDay(),k=(days[0].length+days[1].length<36)?14-j:7-j;i<k;i++){
			days[2].push([y2,T(next_m),T(i)].join(''));
		}
		return days;

		function T(n){return ('0'+n).slice(-2);}
	},

	date : function(date){		//格式化一下日期的参数，变成数组形式
		if(typeof date == "string" || typeof date == "number"){
			date = date.toString().match(/^(\d+)(\d\d)(\d\d)$/);
			date.shift();
		}
		var d = new Date(date[0],date[1]-1,date[2]);
		return [d.getFullYear(),d.getMonth()+1,d.getDate()];
	},

	initHtml:function(){		//初始化日历的html
		var html=['<table cellspacing="0" class="',this.conf.cal_class,'"><tr>'];
		for(var i=0;i<this.cache.count;i++){
			html.push('<td class="',this.conf.month_class_pre,i+1,'">',
				'<div class="',this.conf.month_class,'"><h5>',
				i == 0 ? ('<span class="'+this.conf.btn_class[0]+'"></span>') : '',
				i == (this.cache.count-1) ? ('<span class="'+this.conf.btn_class[1]+'"></span>') : '',
				'<strong></strong></h5><table width="100%" cellspacing="0"><tr>'
			);

			for(var m=0;m<7;m++){
				html.push('<th>',this.conf.day_text[m],'</th>');
			}

			html.push('</tr>');

			for(var j=0;j<6;j++){
				html.push('<tr>');
				for(var k=0;k<7;k++){
					html.push('<td week="',k,'"></td>');
				}
				html.push('</tr>');
			}
			
			html.push('</table></div></td>');
		}

		html.push('</tr></table>');
		
		//缓存主要的dom结点引用
		var c = this.cache;
		c.cal.innerHTML = html.join('');
		this.each(c.cal.getElementsByTagName('td'),function(i,td){
			if(td.getAttribute('week'))
				c.cells.push(td);
		});

		this.each(c.cal.getElementsByTagName('strong'),function(i,h5){
			c.heads.push(h5);
		});

		this.each(c.cal.getElementsByTagName('span'),function(i,span){
			c.btns.push(span);
		});

		this.setHtml(this.cache.date.concat());				//复制一下数组，要不就引用了 +_+
		this.setEvent();
	},

	setHtml:function(date){		//设置整个日历的html
		var days = [], cursor = 0 , c = this.cache, o = this;
		date = this.date(date);
		c.cur_date[0] = date[0];
		c.cur_date[1] = date[1];
		var tdate = o.date(o.op.today);
		tdate = ''+tdate[0]+('0'+tdate[1]).slice(-2)+('0'+tdate[2]).slice(-2);
		for(var i=0;i<c.count;i++){
			days.push(this.days([c.cur_date[0],c.cur_date[1]+i,1]));
		}
		for(var j=0;j<c.count;j++){
			var ymd = days[j][1][0].toString().match(/^(\d+)(\d\d)(\d\d)$/);
			c.heads[j].innerHTML = ymd[1]+o.conf.cal_text[0]+ymd[2]+o.conf.cal_text[1];
			for(var k=0;k<3;k++){
				for(var m=0;m<days[j][k].length;m++){
					var td = c.cells[cursor];
					td.innerHTML = days[j][k][m].toString().slice(-2)-0;
					td.setAttribute('date',days[j][k][m].toString());
					td.className = this.conf.day_class[k];
					if(days[j][k][m] == tdate){
						o.addClass(td,o.conf.day_class[3]);
					}
					if(days[j][k][m]<c.between[0] || days[j][k][m]>c.between[1]){
						o.addClass(td,o.conf.day_class[6]);
					}
					cursor++;
				}
			}
		}
		this.op.onChange.call(this);
	},

	setEvent : function(){		//增加事件
		var cName = this.conf.day_class;
		var o = this;
		var fn = {
			'normal' : {
				'mouseover' : function(){
					o.addClass(this,cName[4]);
				},

				'mouseout' : function(){
					o.removeClass(this,cName[4]);
				},

				'click' : function(date,week){
					if(o.cache.selected){
						o.removeClass(o.cache.selected,cName[5]);
					}
					o.cache.selected = this;
					o.addClass(this,cName[5]);
					if(o.cache.input){
						if(o.op.toInput){
							o.op.toInput.call(o,date,week);
						}else{
							o.toInput.call(o,date,week);
						}
					}
					o.op.onSelectDay.call(o,date,week);
				}
			},

			'disable' : {
				'mouseover' : function(){
					return false;
				},

				'mouseout' : function(){
					return false;
				},

				'click' : function(date,week){
					return false;
				}
			},
			'btn' : {
				0 : function(){
					o.preMonth();
				},

				1 : function(){
					o.nextMonth();
				}
			}
		};

		//按钮
		this.each(this.cache.btns,function(i,btn){
			btn.onclick = function(){
				fn['btn'][i].call(btn);
			};
		});


		//每个日期事件
		this.each(this.cache.cells,function(i,td){
			td.onmouseover = function(){
				fn[getStatus(td)].mouseover.call(td);
			};

			td.onmouseout = function(){
				fn[getStatus(td)].mouseout.call(td);
			};

			td.onclick=function(){
				var date = td.getAttribute('date')-0,
				week = td.getAttribute('week')-0;
				fn[getStatus(td)].click.call(td,date,week);
			};
		});

		function getStatus(td){
			var date = td.getAttribute('date')-0;
			return (date<=o.cache.between[1] && date>=o.cache.between[0]) ? 'normal' : 'disable';
		}
	},

	//显示
	show:function(){
		this.cache.cal.style.display = 'block';
		var c = this.cache;
		if(this.op.posEle){
			//var style = {position:'absolute',zIndex:'10'};
			/*var p = c.position,
				x = p.offsetLeft,
				y = p.offsetTop + p.offsetHeight;
			while((p = p.offsetParent)){
				var s = styleValue(p, 'position');
				if(s == 'relative' || s == 'absolute'){
					break;
				}
				x += p.offsetLeft;
				y += p.offsetTop;
			}*/
			//for(var i in style){
				//c.cal.style[i] = style[i];
			//}
			//c.iframeHeight = this.cache.cal.offsetHeight;
			//c.iframeWidth = this.cache.cal.offsetWidth;
			//var iframe = c.cal.getElementsByTagName('iframe')[0];
			//iframe.style.height = c.iframeHeight + 'px';
			//iframe.style.width = c.iframeWidth + 'px';
            c.cal.className = "wcalBox";
            c.cal.style.left = 0  + 'px';
			c.cal.style.top =  getPos(this.op.posEle).top + 42 + 'px';

		}
		this.op.onShow.call(this,this.cache.cal);
		function styleValue(el, key){
			if(el.currentStyle){
				return el.currentStyle[key];
			}else{
				return document.defaultView.getComputedStyle(el,null)[key];
			}
		}
	},

	//隐藏
	hide:function(){
		this.cache.cal.style.display = 'none';
		this.op.onHide.call(this,this.cache.cal);
	},

	nextMonth:function(){
		this.cache.cur_date[1] ++;
		this.setHtml(this.cache.cur_date);
	},

	preMonth:function(){
		this.cache.cur_date[1] --;
		this.setHtml(this.cache.cur_date);
	},

	nextYear:function(){
		this.cache.cur_date[0] ++;
		this.setHtml(this.cache.cur_date);
	},

	preYear:function(){
		this.cache.cur_date[0] --;
		this.setHtml(this.cache.cur_date);
	},

	setBetween:function(b){
		this.cache.between = b;
		this.setHtml(this.cache.cur_date);
	},

	isCurMonth:function(date){
		var date = this.date(date);
		if(this.cache.cur_date[0]==date[0] && this.cache.cur_date[1]==date[1])
			return true;
		return false;
	},

	//对某一天进行设置
	setDay:function(date, opt){
		var td = null;
//		if(!this.isCurMonth(date)){
//			this.setHtml(date);
//		}
		date = [].concat(date);
		this.each(date,function(i,v){
			date[i] = v.toString();
		});
		var tds = this.cache.cells;
		for(var i=0,l=tds.length;i<l;i++){
			for(var j=0;j<date.length;j++){
				if(tds[i].getAttribute('date') == date[j]){
					if(this.hasClass(tds[i],this.conf.day_class[1])){
						td = tds[i];
						//fn.call(this,td);
						this.addClass(td,'op_cell_seledted');
					}
				}
			}
		};
	},

	//日历值传入input
	toInput:function(date,week){
		var input = this.cache.input;
		date = date.toString().match(/^(\d+)(\d\d)(\d\d)$/);
		//var value = date[1]+'-'+date[2]+'-'+date[3]+'('+'周'+this.conf.day_text[week]+')';
		var value = date[1]+'-'+date[2]+'-'+date[3];
		if(input.tagName.toLowerCase() == 'input'){
			input.value = value;
		}else{
			input.innerHTML = value;
		}
		this.hide();
	},

	//从input传到日历
	formInput : function(input){
		var s,c=this.cache;
		if(input.tagName.toLowerCase()=='input'){
			s = input.value;
		}else{
			s = input.innerHTML;
		}
		var date = s.match(/^(\d+)-(\d\d)-(\d\d)/);
		if(date && date.length==4){
			date.shift();
			if(!this.isCurMonth(date)){
				this.setHtml(date);
			}
		}
		this.show();
	}
};