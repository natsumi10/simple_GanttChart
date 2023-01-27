var Gantt=function(){
	"use strict";
	const t={en:["January","February","March","April","May","June","July","August","September","October","November","December"],zh:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]};
	var e={
		parse(t,e="-",s=/[.:]/){
			if(t instanceof Date)return t;
			if("string"==typeof t){
				let i,n;const a=t.split(" ");
				i=a[0].split(e).map(t=>parseInt(t,10)),
				n=a[1]&&a[1].split(s),i[1]=i[1]-1;
				let o=i;
				return n&&n.length&&(
					4==n.length&&(n[3]="0."+n[3],n[3]=1e3*parseFloat(n[3])),o=o.concat(n)
				),new Date(...o)
			}
		},
		to_string(t,e=!1){
			if(!(t instanceof Date))throw new TypeError("Invalid argument type");
			const i=this.get_date_values(t).map((t,e)=>(1===e&&(t+=1),
			s(t+"",6===e?3:2,"0"))),
			n=`${i[0]}-${i[1]}-${i[2]}`,
			a=`${i[3]}:${i[4]}:${i[5]}.${i[6]}`;
			return n+(e?" "+a:"")
		},
		format(e,i="YYYY-MM-DD HH:mm:ss.SSS",n="en"){
			const a=this.get_date_values(e).map(t=>s(t,2,0)),
			o={
				YYYY:a[0],
				MM:s(+a[1]+1,2,0),
				DD:a[2],
				HH:a[3],
				mm:a[4],
				ss:a[5],
				SSS:a[6],
				D:a[2],
				MMMM:t[n][+a[1]],
				MMM:t[n][+a[1]]
			};
			let r=i;
			const h=[];
			return Object.keys(o).sort(
				(t,e)=>e.length-t.length
			).forEach(t=>{
				r.includes(t)&&(r=r.replace(t,`$${h.length}`),h.push(o[t]))
			}),h.forEach((t,e)=>{
				r=r.replace(`$${e}`,t)
			}),r
		},diff(t,e,s="day"){
			let i,n,a,o,r,h,d;
			return d=(h=(r=(a=(o=(n=(i=t-e)/1e3)/60)/60)/24)/30)/12,s.endsWith("s")||(s+="s"),Math.floor({
				milliseconds:i,seconds:n,minutes:o,hours:a,days:r,months:h,years:d
			}[s])
		},today(){
			const t=this.get_date_values(new Date).slice(0,3);
			return new Date(...t)
		},now:()=>new Date,add(t,e,s){
			e=parseInt(e,10);
			const i=[t.getFullYear()+("year"===s?e:0),
			t.getMonth()+("month"===s?e:0),
			t.getDate()+("day"===s?e:0),
			t.getHours()+("hour"===s?e:0),
			t.getMinutes()+("minute"===s?e:0),
			t.getSeconds()+("second"===s?e:0),
			t.getMilliseconds()+("millisecond"===s?e:0)];
			return new Date(...i)
		},start_of(t,e){
			const s={year:6,month:5,day:4,hour:3,minute:2,second:1,millisecond:0};
			function i(t){
				const i=s[e];
				return s[t]<=i
			}const n=[
				t.getFullYear(),
				i("year")?0:t.getMonth(),
				i("month")?1:t.getDate(),
				i("day")?0:t.getHours(),i("hour")?0:t.getMinutes(),
				i("minute")?0:t.getSeconds(),
				i("second")?0:t.getMilliseconds()
			];
			return new Date(...n)
		},clone(t){
			return new Date(...this.get_date_values(t))
		},get_date_values:t=>[
			t.getFullYear(),
			t.getMonth(),
			t.getDate(),
			t.getHours(),
			t.getMinutes(),
			t.getSeconds(),
			t.getMilliseconds()
		],get_days_in_month(t){
			const e=[31,28,31,30,31,30,31,31,30,31,30,31],
			s=t.getMonth();
			if(1!==s)return e[s];
			const i=t.getFullYear();
			return i%4==0&&i%100!=0||i%400==0?29:28
		}
	};
	function s(t,e,s){
		return t+="",
		e>>=0,
		s=String(void 0!==s?s:" "),
		t.length>e?String(t):((e-=t.length)>s.length&&(s+=s.repeat(e/s.length)),
		s.slice(0,e)+String(t))
	}function i(t,e){
		return"string"==typeof t?(e||document).querySelector(t):t||null
	}function n(t,e){
		/*Start Drawing*/
		const s=document.createElementNS("http://www.w3.org/2000/svg",t);
		for(let t in e)if("append_to"===t){
			e.append_to.appendChild(s)
		}else"innerHTML"===t?s.innerHTML=e.innerHTML:s.setAttribute(t,e[t]);
		return s
	}function a(t,e,s,a){
		const o=function(t,e,s,a,o="0.4s",r="0.1s"){
			const h=t.querySelector("animate");
			if(h)return i.attr(h,{
				attributeName:e,from:s,to:a,dur:o,begin:"click + "+r
			}),t;
			const d=n(
				"animate",
				{
					attributeName:e,
					from:s,to:a,
					dur:o,
					begin:r,
					calcMode:"spline",
					values:s+";"+a,keyTimes:"0; 1",keySplines:(
						p="ease-out",
						{
							ease:".25 .1 .25 1",
							linear:"0 0 1 1",
							"ease-in":".42 0 1 1",
							"ease-out":"0 0 .58 1",
							"ease-in-out":".42 0 .58 1"
						}[p]
					)
				}
			);
			var p;
			return t.appendChild(d),t
		}(t,e,s,a);
		if(o===t){
			const t=document.createEvent("HTMLEvents");
			t.initEvent("click",!0,!0),
			t.eventName="click",
			o.dispatchEvent(t)
		}
	}i.on=((t,e,s,n)=>{
		n?i.delegate(t,e,s,n):(n=s,i.bind(t,e,n))
	}),
	i.off=((t,e,s)=>{
		t.removeEventListener(e,s)
	}),
	i.bind=((t,e,s)=>{
			e.split(/\s+/).forEach(function(e){
				t.addEventListener(e,s)
			})
	}),
	i.delegate=((t,e,s,i)=>{
		t.addEventListener(e,function(t){
				const e=t.target.closest(s);
				e&&(
					t.delegatedTarget=e,
					i.call(this,t,e)
				)
		})
	}),
	i.closest=((t,e)=>e?e.matches(t)?e:i.closest(t,e.parentNode):null),
	i.attr=((t,e,s)=>{
		if(!s&&"string"==typeof e)return t.getAttribute(e);
		if("object"!=typeof e)t.setAttribute(e,s);
		else for(let s in e)i.attr(t,s,e[s])
	});
	class o{
		constructor(t,e){
			this.set_defaults(t,e),
			this.prepare(),
			this.draw(),
			this.bind()
		}set_defaults(t,e){
			this.action_completed=!1,this.gantt=t,this.task=e
		}prepare(){
			this.prepare_values(),this.prepare_helpers()
		}prepare_values(){
			this.invalid=this.task.invalid,
			this.height=this.gantt.options.bar_height,
			this.x=this.compute_x(),
			this.y=this.compute_y(),
			this.corner_radius=this.gantt.options.bar_corner_radius,
			this.duration=e.diff(this.task._end,this.task._start,"hour")/this.gantt.options.step,
			this.width=this.gantt.options.column_width*this.duration,
			this.progress_width=this.gantt.options.column_width*this.duration*(this.task.progress/100)||0,this.group=n("g",{
				class:"bar-wrapper "+(this.task.custom_class||""),"data-id":this.task.id
			}),this.bar_group=n("g",{
					class:"bar-group",append_to:this.group
			}),this.handle_group=n("g",{
					class:"handle-group",append_to:this.group
			})
		}prepare_helpers(){
			SVGElement.prototype.getX=function(){
				return+this.getAttribute("x")
			},SVGElement.prototype.getY=function(){
				return+this.getAttribute("y")
			},SVGElement.prototype.getWidth=function(){
				return+this.getAttribute("width")
			},SVGElement.prototype.getHeight=function(){
				return+this.getAttribute("height")
			},SVGElement.prototype.getEndX=function(){
				return this.getX()+this.getWidth()
			}
		}draw(){
			this.draw_bar(),
			this.draw_progress_bar(),
			this.draw_label(),
			this.draw_resize_handles()
		}draw_bar(){
			this.$bar=n("rect",{
				x:this.x,
				y:this.y,
				width:this.width,
				height:this.height,rx:this.corner_radius,ry:this.corner_radius,class:"bar",append_to:this.bar_group
			}),
			a(this.$bar,"width",0,this.width),
			this.invalid&&this.$bar.classList.add("bar-invalid")
		}draw_progress_bar(){
			this.invalid||(this.$bar_progress=n("rect",{
				x:this.x,
				y:this.y,
				width:this.progress_width,
				height:this.height,
				rx:this.corner_radius,
				ry:this.corner_radius,
				class:"bar-progress",
				append_to:this.bar_group
			}),a(this.$bar_progress,"width",0,this.progress_width))
		}draw_label(){
			n("text",{
				x:this.x+this.width/2,
				y:this.y+this.height/2,
				innerHTML:this.task.name,
				class:"bar-label",
				append_to:this.bar_group
			}),requestAnimationFrame(()=>this.update_label_position())
		}draw_resize_handles(){
			if(this.invalid)return;
			const t=this.$bar;n("rect",{
				x:t.getX()+t.getWidth()-9,
				y:t.getY()+1,
				width:8,
				height:this.height-2,
				rx:this.corner_radius,
				ry:this.corner_radius,
				class:"handle right",
				append_to:this.handle_group
			}),n("rect",{
				x:t.getX()+1,
				y:t.getY()+1,
				width:8,
				height:this.height-2,
				rx:this.corner_radius,
				ry:this.corner_radius,
				class:"handle left",
				append_to:this.handle_group
			}),this.task.progress&&this.task.progress<100&&(this.$handle_progress=n(
				"polygon",{
					points:this.get_progress_polygon_points().join(","),
					class:"handle progress",
					append_to:this.handle_group
				}
			))
		}get_progress_polygon_points(){
				const t=this.$bar_progress;
				return[
					t.getEndX()-5,
					t.getY()+t.getHeight(),
					t.getEndX()+5,
					t.getY()+t.getHeight(),
					t.getEndX(),
					t.getY()+t.getHeight()-8.66
				]
		}bind(){
			this.invalid||this.setup_click_event()
		}setup_click_event(){
			i.on(
				this.group,
				"focus "+this.gantt.options.popup_trigger,
				t=>{
					this.action_completed||(
						this.show_popup(),
						this.gantt.unselect_all(),
						this.group.classList.add("active")
					)
				}
			),i.on(this.group,"dblclick",t=>{
					this.action_completed||this.gantt.trigger_event("click",[this.task])
			})
		}show_popup(){
			if(this.gantt.bar_being_dragged)return;
			const t=e.format(
				this.task._start,"MMM D",this.gantt.options.language
			)+" - "+e.format(
				e.add(this.task._end,-1,"second"),"MMM D",this.gantt.options.language
			);
			this.gantt.show_popup({
				target_element:this.$bar,title:this.task.name,subtitle:t,task:this.task
			})
		}update_bar_position({
			x:t=null,width:e=null
		}){
			const s=this.$bar;if(t){
				if(!this.task.dependencies.map(t=>this.gantt.get_bar(t).$bar.getX()).reduce((e,s)=>t>=s,t))return void(e=null);
				this.update_attr(s,"x",t)
			}e&&e>=this.gantt.options.column_width&&this.update_attr(s,"width",e),
			this.update_label_position(),
			this.update_handle_position(),
			this.update_progressbar_position(),
			this.update_arrow_position()
		}date_changed(){
			let t=!1;
			const{
				new_start_date:s,new_end_date:i
			}=this.compute_start_end_date();
			Number(this.task._start)!==Number(s)&&(t=!0,this.task._start=s),
			Number(this.task._end)!==Number(i)&&(t=!0,this.task._end=i),
			t&&this.gantt.trigger_event("date_change",[this.task,s,e.add(i,-1,"second")])
		}progress_changed(){
			const t=this.compute_progress();
			this.task.progress=t,
			this.gantt.trigger_event("progress_change",[this.task,t])
		}set_action_completed(){
				this.action_completed=!0,
				setTimeout(()=>this.action_completed=!1,1e3)
		}compute_start_end_date(){
			const t=this.$bar,
			s=t.getX()/this.gantt.options.column_width,
			i=e.add(this.gantt.gantt_start,s*this.gantt.options.step,"hour"),
			n=t.getWidth()/this.gantt.options.column_width;
			return{
				new_start_date:i,new_end_date:e.add(i,n*this.gantt.options.step,"hour")
			}
		}compute_progress(){
			const t=this.$bar_progress.getWidth()/this.$bar.getWidth()*100;
			return parseInt(t,10)
		}compute_x(){
			const{step:t,column_width:s}=this.gantt.options,
			i=this.task._start,
			n=this.gantt.gantt_start;
			let a=e.diff(i,n,"hour")/t*s;
			if(this.gantt.view_is("Month")){a=e.diff(i,n,"day")*s/30}return a
		}compute_y(){
			return this.gantt.options.header_height+this.gantt.options.padding+this.task._index*(this.height+this.gantt.options.padding)
		}get_snap_position(t){
			let e,s,i=t;
			return s=this.gantt.view_is("Week")?i-(e=t%(this.gantt.options.column_width/7))+(e<this.gantt.options.column_width/14?0:this.gantt.options.column_width/7):this.gantt.view_is("Month")?i-(e=t%(this.gantt.options.column_width/30))+(e<this.gantt.options.column_width/60?0:this.gantt.options.column_width/30):i-(e=t%this.gantt.options.column_width)+(e<this.gantt.options.column_width/2?0:this.gantt.options.column_width)
		}update_attr(t,e,s){
			return s=+s,isNaN(s)||t.setAttribute(e,s),t
		}update_progressbar_position(){
			this.$bar_progress.setAttribute("x",this.$bar.getX()),
			this.$bar_progress.setAttribute("width",this.$bar.getWidth()*(this.task.progress/100))
		}update_label_position(){
			const t=this.$bar,
			e=this.group.querySelector(".bar-label");
			e.getBBox().width>t.getWidth()?(e.classList.add("big"),
			e.setAttribute("x",t.getX()+t.getWidth()+5)):(e.classList.remove("big"),
			e.setAttribute("x",t.getX()+t.getWidth()/2))
		}update_handle_position(){
			const t=this.$bar;this.handle_group.querySelector(".handle.left").setAttribute("x",t.getX()+1),
			this.handle_group.querySelector(".handle.right").setAttribute("x",t.getEndX()-9);
			const e=this.group.querySelector(".handle.progress");
			e&&e.setAttribute("points",this.get_progress_polygon_points())
		}update_arrow_position(){
			this.arrows=this.arrows||[];
			for(let t of this.arrows)t.update()
		}
	}class r{
		constructor(t,e,s){
			this.gantt=t,
			this.from_task=e,
			this.to_task=s,
			this.calculate_path(),
			this.draw()
		}calculate_path(){
			let t=this.from_task.$bar.getX()+this.from_task.$bar.getWidth()/2;
			const e=()=>this.to_task.$bar.getX()<t+this.gantt.options.padding&&t>this.from_task.$bar.getX()+this.gantt.options.padding;
			for(;e();)t-=10;
			const s=this.gantt.options.header_height+this.gantt.options.bar_height+(
				this.gantt.options.padding+this.gantt.options.bar_height
			)*this.from_task.task._index+this.gantt.options.padding,
			i=this.to_task.$bar.getX()-this.gantt.options.padding/2,
			n=this.gantt.options.header_height+this.gantt.options.bar_height/2+(
				this.gantt.options.padding+this.gantt.options.bar_height
			)*this.to_task.task._index+this.gantt.options.padding,
			a=this.from_task.task._index>this.to_task.task._index,
			o=this.gantt.options.arrow_curve,
			r=a?1:0,
			h=a?-o:o,
			d=a?n+this.gantt.options.arrow_curve:n-this.gantt.options.arrow_curve;
			if(
				this.path=`\n            M ${t} ${s}\n            V ${d}\n            a ${o} ${o} 0 0 ${r} ${o} ${h}\n            L ${i} ${n}\n            m -5 -5\n            l 5 5\n            l -5 5`,
				this.to_task.$bar.getX()<this.from_task.$bar.getX()+this.gantt.options.padding
			){
				const e=this.gantt.options.padding/2-o,
				a=this.to_task.$bar.getY()+this.to_task.$bar.getHeight()/2-h,
				d=this.to_task.$bar.getX()-this.gantt.options.padding;
				this.path=`\n                M ${t} ${s}\n                v ${e}\n                a ${o} ${o} 0 0 1 -${o} ${o}\n                H ${d}\n                a ${o} ${o} 0 0 ${r} -${o} ${h}\n                V ${a}\n                a ${o} ${o} 0 0 ${r} ${o} ${h}\n                L ${i} ${n}\n                m -5 -5\n                l 5 5\n                l -5 5`
			}
		}draw(){
			this.element=n("path",{
				d:this.path,
				"data-from":this.from_task.task.id,
				"data-to":this.to_task.task.id
			})
		}update(){
			this.calculate_path(),
			this.element.setAttribute("d",this.path)
		}
	}class h{
		constructor(t,e){
			this.parent=t,
			this.custom_html=e,this.make()
		}make(){
			this.parent.innerHTML='\n            <div class="title"></div>\n            <div class="subtitle"></div>\n            <div class="pointer"></div>\n        ',
			this.hide(),
			this.title=this.parent.querySelector(".title"),
			this.subtitle=this.parent.querySelector(".subtitle"),
			this.pointer=this.parent.querySelector(".pointer")
		}show(t){
			if(!t.target_element)throw new Error("target_element is required to show popup");
			t.position||(t.position="left");
			const e=t.target_element;
			if(this.custom_html){
				let e=this.custom_html(t.task);
				e+='<div class="pointer"></div>',
				this.parent.innerHTML=e,
				this.pointer=this.parent.querySelector(".pointer")
			}else this.title.innerHTML=t.title,
			this.subtitle.innerHTML=t.subtitle,
			this.parent.style.width=this.parent.clientWidth+"px";
			let s;
			e instanceof HTMLElement?s=e.getBoundingClientRect():e instanceof SVGElement&&(s=t.target_element.getBBox()),
			"left"===t.position&&(
				this.parent.style.left=s.x+(s.width+10)+"px",
				this.parent.style.top=s.y+"px",
				this.pointer.style.transform="rotateZ(90deg)",
				this.pointer.style.left="-7px",
				this.pointer.style.top="2px"
			),
			this.parent.style.opacity=1
		}hide(){
			this.parent.style.opacity=0
		}
	}const d={
		QUARTER_DAY:"Quarter Day",
		HALF_DAY:"Half Day",
		DAY:"Day",
		WEEK:"Week",
		MONTH:"Month",
		YEAR:"Year"
	};
	class p{
		constructor(t,e,s){
			this.setup_wrapper(t),
			this.setup_options(s),
			this.setup_tasks(e),
			this.change_view_mode(),
			this.bind_events()
		}setup_wrapper(t){
			let e,s;
			if(
				"string"==typeof t&&(t=document.querySelector(t)),
				t instanceof HTMLElement
			)s=t,
			e=t.querySelector("svg");
			else{
				if(!(t instanceof SVGElement))throw new TypeError("Frappé Gantt only supports usage of a string CSS selector, HTML DOM element or SVG DOM element for the 'element' parameter");
				e=t
			}e?(this.$svg=e,this.$svg.classList.add("gantt")):this.$svg=n("svg",{
				append_to:s,class:"gantt"
			}),
			this.$container=document.createElement("div"),
			this.$container.classList.add("gantt-container"),
			this.$svg.parentElement.appendChild(this.$container),
			this.$container.appendChild(this.$svg),
			this.popup_wrapper=document.createElement("div"),
			this.popup_wrapper.classList.add("popup-wrapper"),
			this.$container.appendChild(this.popup_wrapper)
		}setup_options(t){
			const e={
				header_height:50,
				column_width:30,
				step:24,
				view_modes:[...Object.values(d)],
				bar_height:20,
				bar_corner_radius:3,
				arrow_curve:5,
				padding:18,
				view_mode:"Day",
				date_format:"YYYY-MM-DD",
				popup_trigger:"click",
				custom_popup_html:null,
				language:"en"
			};
			this.options=Object.assign({},e,t)
		}setup_tasks(t){
			this.tasks=t.map((t,s)=>{
				if(t._start=e.parse(t.start),
				t._end=e.parse(t.end),
				e.diff(t._end,t._start,"year")>10&&(t.end=null),
				t._index=s,
				!t.start&&!t.end){
					const s=e.today();
					t._start=s,
					t._end=e.add(s,2,"day")
				}if(
					!t.start&&t.end&&(t._start=e.add(t._end,-2,"day"))
					,t.start&&!t.end&&(t._end=e.add(t._start,2,"day")),
					e.get_date_values(t._end).slice(3).every(t=>0===t)&&(t._end=e.add(t._end,24,"hour")),
					t.start&&t.end||(t.invalid=!0),
					"string"==typeof t.dependencies||!t.dependencies
				){
					let e=[];
					t.dependencies&&(e=t.dependencies.split(",").map(t=>t.trim()).filter(t=>t)),t.dependencies=e
				}return t.id||(t.id=function(t){
					return t.name+"_"+Math.random().toString(36).slice(2,12)
				}(t)),t
			}),
			this.setup_dependencies()
		}setup_dependencies(){
			this.dependency_map={};
			for(let t of this.tasks)
				for(let e of t.dependencies)
					this.dependency_map[e]=this.dependency_map[e]||[],
					this.dependency_map[e].push(t.id)
		}refresh(t){
			this.setup_tasks(t),
			this.change_view_mode()
		}change_view_mode(t=this.options.view_mode){
			this.update_view_scale(t),
			this.setup_dates(),
			this.render(),
			this.trigger_event("view_change",[t])
		}update_view_scale(t){
			this.options.view_mode=t,t===d.DAY?(
				this.options.step=24,this.options.column_width=38
			):t===d.HALF_DAY?(
				this.options.step=12,this.options.column_width=38
			):t===d.QUARTER_DAY?(
				this.options.step=6,
				this.options.column_width=38
			):t===d.WEEK?(
				this.options.step=168,
				this.options.column_width=140):t===d.MONTH?(
					this.options.step=720,this.options.column_width=120
				):t===d.YEAR&&(
					this.options.step=8760,this.options.column_width=120
				)
		}setup_dates(){
			this.setup_gantt_dates(),
			this.setup_date_values()
		}setup_gantt_dates(){
			this.gantt_start=this.gantt_end=null;
			for(let t of this.tasks){
				(!this.gantt_start||t._start<this.gantt_start)&&(this.gantt_start=t._start),
				(!this.gantt_end||t._end>this.gantt_end)&&(this.gantt_end=t._end);
			}
			this.gantt_start=e.start_of(this.gantt_start,"day"),
			this.gantt_end=e.start_of(this.gantt_end,"day"),
			this.view_is([d.QUARTER_DAY,d.HALF_DAY])?(this.gantt_start=e.add(this.gantt_start,-7,"day"),
			this.gantt_end=e.add(this.gantt_end,7,"day")):this.view_is(d.MONTH)?(this.gantt_start=e.start_of(this.gantt_start,"year"),
			this.gantt_end=e.add(this.gantt_end,1,"year")):this.view_is(d.YEAR)?(this.gantt_start=e.add(this.gantt_start,-2,"year"),
			this.gantt_end=e.add(this.gantt_end,2,"year")):(
				this.gantt_start=e.add(this.gantt_start,-1,"month"),
				this.gantt_end=e.add(this.gantt_end,1,"month")
			)
		}setup_date_values(){
			this.dates=[];
			let t=null;
			for(;null===t||t<this.gantt_end;){
				t=t?this.view_is(d.YEAR)?e.add(t,1,"year"):this.view_is(d.MONTH)?e.add(t,1,"month"):e.add(t,this.options.step,"hour"):e.clone(this.gantt_start),
				this.dates.push(t)
			}
		}bind_events(){
			this.bind_grid_click(),
			this.bind_bar_events()
		}render(){
			this.clear(),
			this.setup_layers(),
			this.make_grid(),
			this.make_dates(),
			this.make_bars(),
			this.make_arrows(),
			this.map_arrows_on_bars(),
			this.set_width(),
			this.set_scroll_position()
		}setup_layers(){
			this.layers={};
			const t=["grid","date","arrow","progress","bar","details"];
			for(let e of t){
				this.layers[e]=n("g",{class:e,append_to:this.$svg})
			}
		}make_grid(){
			this.make_grid_background(),
			this.make_grid_rows(),
			this.make_grid_header(),
			this.make_grid_ticks(),
			this.make_grid_highlights()
		}make_grid_background(){
			const t=this.dates.length*this.options.column_width,
			e=this.options.header_height+this.options.padding+(this.options.bar_height+this.options.padding)*this.tasks.length;
			n("rect",{
				x:0,y:0,
				width:t,
				height:e,
				class:"grid-background",
				append_to:this.layers.grid
			}),
			i.attr(this.$svg,{
				height:e+this.options.padding+100,width:"100%"
			})
		}make_grid_rows(){
			const t=n("g",{append_to:this.layers.grid}),
			e=n("g",{append_to:this.layers.grid}),
			s=this.dates.length*this.options.column_width,
			i=this.options.bar_height+this.options.padding;
			let a=this.options.header_height+this.options.padding/2;
			for(let o of this.tasks){
				n(
					"rect",
					{
						x:0,
						y:a,
						width:s,
						height:i,
						class:"grid-row",
						append_to:t
					}
				),
				n(
					"line",
					{
						x1:0,
						y1:a+i,
						x2:s,
						y2:a+i,
						class:"row-line",
						append_to:e
					}
				),a+=this.options.bar_height+this.options.padding
			}
		}make_grid_header(){
			n(
				"rect",
				{
					x:0,y:0,
					width:this.dates.length*this.options.column_width,
					height:this.options.header_height+10,
					class:"grid-header",
					append_to:this.layers.grid
				}
			)
		}make_grid_ticks(){
			let t=0,
			s=this.options.header_height+this.options.padding/2,
			i=(
				this.options.bar_height+this.options.padding
			)*this.tasks.length;
			for(let a of this.dates){
				let o="tick";
				this.view_is(d.DAY)&&1===a.getDate()&&(o+=" thick"),
				this.view_is(d.WEEK)&&a.getDate()>=1&&a.getDate()<8&&(o+=" thick"),
				this.view_is(d.MONTH)&&(a.getMonth()+1)%3==0&&(o+=" thick"),
				n(
					"path",
					{
						d:`M ${t} ${s} v ${i}`,
						class:o,
						append_to:this.layers.grid
					}
				),
				this.view_is(d.MONTH)?t+=e.get_days_in_month(a)*this.options.column_width/30:t+=this.options.column_width
			}
		}make_grid_highlights(){
			if(this.view_is(d.DAY)){
				n("rect",{
					x:e.diff(e.today(),
					this.gantt_start,"hour")/this.options.step*this.options.column_width,
					y:0,
					width:this.options.column_width,
					height:(
						this.options.bar_height+this.options.padding
					)*this.tasks.length+this.options.header_height+this.options.padding/2,
					class:"today-highlight",
					append_to:this.layers.grid
				})
			}
		}make_dates(){
			for(let t of this.get_dates_to_draw())if(
				n("text",{
					x:t.lower_x,y:t.lower_y,innerHTML:t.lower_text,class:"lower-text",append_to:this.layers.date
				}),
				t.upper_text
			){
				const e=n(
					"text",
					{
						x:t.upper_x,
						y:t.upper_y,
						innerHTML:t.upper_text,
						class:"upper-text",
						append_to:this.layers.date
					}
				);
				e.getBBox().x2>this.layers.grid.getBBox().width&&e.remove()
			}
		}get_dates_to_draw(){
			let t=null;
			return this.dates.map((e,s)=>{
				const i=this.get_date_info(e,t,s);return t=e,i
			})
		}get_date_info(t,s,i){
			s||(s=e.add(t,1,"year"));
			const n={
				"Quarter Day_lower":e.format(t,"HH",this.options.language),
				"Half Day_lower":e.format(t,"HH",this.options.language),
				Day_lower:t.getDate()!==s.getDate()?e.format(t,"D",this.options.language):"",
				Week_lower:t.getMonth()!==s.getMonth()?e.format(
					t,"D MMM",this.options.language
				):e.format(t,"D",this.options.language),
				Month_lower:e.format(t,"MMMM",this.options.language),
				Year_lower:e.format(t,"YYYY",this.options.language),
				"Quarter Day_upper":t.getDate()!==s.getDate()?e.format(
					t,"D MMM",this.options.language
				):"",
				"Half Day_upper":t.getDate()!==s.getDate()?t.getMonth()!==s.getMonth()?e.format(
					t,"D MMM",this.options.language
				):e.format(t,"D",this.options.language):"",
				Day_upper:t.getMonth()!==s.getMonth()?e.format(
					t,"MMMM",this.options.language
				):"",
				Week_upper:t.getMonth()!==s.getMonth()?e.format(
					t,"MMMM",this.options.language
				):"",
				Month_upper:t.getFullYear()!==s.getFullYear()?e.format(
					t,"YYYY",this.options.language
				):"",Year_upper:t.getFullYear()!==s.getFullYear()?e.format(
					t,"YYYY",this.options.language
				):""
			},a={
				x:i*this.options.column_width,
				lower_y:this.options.header_height,
				upper_y:this.options.header_height-25
			},o={
				"Quarter Day_lower":4*this.options.column_width/2,
				"Quarter Day_upper":0,
				"Half Day_lower":2*this.options.column_width/2,
				"Half Day_upper":0,
				Day_lower:this.options.column_width/2,
				Day_upper:30*this.options.column_width/2,
				Week_lower:0,
				Week_upper:4*this.options.column_width/2,
				Month_lower:this.options.column_width/2,
				Month_upper:12*this.options.column_width/2,
				Year_lower:this.options.column_width/2,
				Year_upper:30*this.options.column_width/2
			};
			return{
				upper_text:n[`${this.options.view_mode}_upper`],lower_text:n[`${this.options.view_mode}_lower`],upper_x:a.x+o[`${this.options.view_mode}_upper`],upper_y:a.upper_y,lower_x:a.x+o[`${this.options.view_mode}_lower`],lower_y:a.lower_y
			}
		}make_bars(){
			this.bars=this.tasks.map(t=>{
				const e=new o(this,t);
				return this.layers.bar.appendChild(e.group),
				e
			})
		}make_arrows(){
			this.arrows=[];
			for(let t of this.tasks){
				let e=[];
				e=t.dependencies.map(
					e=>{
						const s=this.get_task(e);
						if(!s)return;
						const i=new r(this,this.bars[s._index],this.bars[t._index]);
						return this.layers.arrow.appendChild(i.element),
						i
					}
				).filter(Boolean),this.arrows=this.arrows.concat(e)
			}
		}map_arrows_on_bars(){
			for(let t of this.bars){
				t.arrows=this.arrows.filter(
				e=>e.from_task.task.id===t.task.id||e.to_task.task.id===t.task.id
				)
			}
		}set_width(){
			const t=this.$svg.getBoundingClientRect().width,
			e=this.$svg.querySelector(".grid .grid-row").getAttribute("width");
			t<e&&this.$svg.setAttribute("width",e)
		}set_scroll_position(){
			const t=this.$svg.parentElement;
			if(!t)return;
			const s=e.diff(
				this.get_oldest_starting_date(),
				this.gantt_start,"hour"
			)/this.options.step*this.options.column_width-this.options.column_width;
			t.scrollLeft=s
		}bind_grid_click(){
			i.on(
				this.$svg,
				this.options.popup_trigger,
				".grid-row, .grid-header",
				()=>{
					this.unselect_all(),
					this.hide_popup()
				}
			)
		}bind_bar_events(){
			let t=!1,e=0,s=0,n=!1,a=!1,o=null,r=[];
			this.bar_being_dragged=null,
			i.on(
				this.$svg,
				"mousedown",
				".bar-wrapper, .handle",
				(h,d)=>{
					const p=i.closest(".bar-wrapper",d);
					d.classList.contains("left")?n=!0:d.classList.contains("right")?a=!0:d.classList.contains("bar-wrapper")&&(t=!0),
					p.classList.add("active"),
					e=h.offsetX,
					s=h.offsetY;
					const _=[
						o=p.getAttribute("data-id"),
						...this.get_all_dependent_tasks(o)
					];
					r=_.map(t=>this.get_bar(t)),
					this.bar_being_dragged=o,
					r.forEach(
						t=>{
							const e=t.$bar;e.ox=e.getX(),
							e.oy=e.getY(),
							e.owidth=e.getWidth(),
							e.finaldx=0
						}
					)
				}
			),
			i.on(this.$svg,"mousemove",s=>{
				if(!(t||n||a))return;const i=s.offsetX-e;s.offsetY;
				r.forEach(
					e=>{
						const s=e.$bar;
						s.finaldx=this.get_snap_position(i),
						n?o===e.task.id?e.update_bar_position(
							{
								x:s.ox+s.finaldx,
								width:s.owidth-s.finaldx
							}
						):e.update_bar_position(
							{
								x:s.ox+s.finaldx
							}
						):a?o===e.task.id&&e.update_bar_position(
							{
								width:s.owidth+s.finaldx
							}
						):t&&e.update_bar_position(
							{
								x:s.ox+s.finaldx
							}
						)
					}
				)
			}),
			document.addEventListener(
				"mouseup",e=>{
					(t||n||a)&&r.forEach(
						t=>t.group.classList.remove("active")
					),
					t=!1,n=!1,a=!1
				}
			),
			i.on(
				this.$svg,"mouseup",t=>{
					this.bar_being_dragged=null,
					r.forEach(
						t=>{
							t.$bar.finaldx&&(t.date_changed(),
							t.set_action_completed())
						}
					)
				}
			),
			this.bind_bar_progress()
		}bind_bar_progress(){
			let t=0,e=0,s=null,n=null,a=null,o=null;
			i.on(
				this.$svg,
				"mousedown",
				".handle.progress",
				(r,h)=>{
					s=!0,
					t=r.offsetX,e=r.offsetY;
					const d=i.closest(".bar-wrapper",h).getAttribute("data-id");
					n=this.get_bar(d),
					a=n.$bar_progress,
					o=n.$bar,
					a.finaldx=0,
					a.owidth=a.getWidth(),
					a.min_dx=-a.getWidth(),
					a.max_dx=o.getWidth()-a.getWidth()
				}
			),i.on(
				this.$svg,"mousemove",e=>{
					if(!s)return;
					let o=e.offsetX-t;
					e.offsetY;
					o>a.max_dx&&(o=a.max_dx),
					o<a.min_dx&&(o=a.min_dx);
					const r=n.$handle_progress;
					i.attr(a,"width",a.owidth+o),
					i.attr(r,"points",n.get_progress_polygon_points()),
					a.finaldx=o
				}
			),i.on(this.$svg,"mouseup",()=>{
				s=!1,
				a&&a.finaldx&&(n.progress_changed(),
				n.set_action_completed())
			})
		}get_all_dependent_tasks(t){
			let e=[],s=[t];
			for(;s.length;){
				const t=s.reduce(
					(t,e)=>t=t.concat(this.dependency_map[e]),[]
				);
				e=e.concat(t),s=t.filter(t=>!s.includes(t))
			}return e.filter(Boolean)
		}get_snap_position(t){
			let e,s,i=t;
			return s=this.view_is(d.WEEK)?i-(
				e=t%(
					this.options.column_width/7
				)
			)+(
				e<this.options.column_width/14?0:this.options.column_width/7
			):this.view_is(d.MONTH)?i-(
				e=t%(this.options.column_width/30)
			)+(
				e<this.options.column_width/60?0:this.options.column_width/30
			):i-(
				e=t%this.options.column_width
			)+(
				e<this.options.column_width/2?0:this.options.column_width
			)
		}unselect_all(){
			[...this.$svg.querySelectorAll(".bar-wrapper")].forEach(
				t=>{
					t.classList.remove("active")
				}
			)
		}view_is(t){
			return"string"==typeof t?this.options.view_mode===t:!!Array.isArray(t)&&t.some(t=>this.options.view_mode===t)
		}get_task(t){
			return this.tasks.find(e=>e.id===t)
		}get_bar(t){
			return this.bars.find(e=>e.task.id===t)
		}show_popup(t){
			this.popup||(this.popup=new h(this.popup_wrapper,this.options.custom_popup_html)),this.popup.show(t)
		}hide_popup(){
			this.popup&&this.popup.hide()
		}trigger_event(t,e){
			this.options["on_"+t]&&this.options["on_"+t].apply(null,e)
		}get_oldest_starting_date(){
			return this.tasks.map(t=>t._start).reduce((t,e)=>e<=t?e:t)
		}clear(){
			this.$svg.innerHTML=""
		}
	}return p.VIEW_MODE=d,p
}();