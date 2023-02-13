window.onload = function(){
	
	const gantt = new Gantt("#gantt", task_data);
	const gantt_2 = new Gantt("#gantt_2", task_data);
	let test_log = gantt.t;
	console.log(test_log);
	
	//console.log (task_data[0]);
	function move_scroll_x(){
		/*Get x positon of today-highlight in rect */
		let tmp_rect = document.querySelector("#gantt > g.grid > rect.today-highlight");
		let x_value_today = tmp_rect["x"]["animVal"]["value"];
		let element = document.querySelector(".gantt_chart_table");
		let row_x = 38;
		let mergin = row_x * 1;
		//element.scrollLeft = x_value_today - mergin;
		
		let tmp_test = gantt.bars[0].x
		element.scrollLeft = tmp_test - mergin;

		let element_2 = document.querySelector(".gantt_chart_table_2");
		//element_2.scrollLeft = x_value_today - mergin;
		element_2.scrollLeft = tmp_test - mergin;

		

		console.log("tmp_test:",tmp_test);
		console.log(gantt);
	}
	


	/*Start dynamic task table here.*/
	let header = [];
	function createTable(task_data){
		for( let key in task_data[0]){
			//console.log("key is :"+key)
			header.push(key)
		}
		let table = document.querySelector('table.d_table');
		let row = table.insertRow(-1);
		let th0 = document.createElement("th");
		row.appendChild(th0);
		th0.innerHTML=" ";
		th0.width = 30;

		for(let i=0; i<header.length; i++){
			let th = document.createElement("th");
			row.appendChild(th);
			th.innerHTML=header[i];
			//console.log("key is :"+header[i])
			th.width = 100;
		}
		table.width = 30 + 100*header.length;
		//table.width = 100*header.length;

		
		
		for( let r=0; r<task_data.length; r++){
			//console.log(item)
			let row = table.insertRow(-1);
			let cell1 = row.insertCell(-1);
			cell1.className = 'item';
			cell1.innerHTML = (r+1);

			for(c=0; c<header.length; c++){
				let tmp_header = header[c];
				let tmp_value = task_data[r][tmp_header];
				//console.log("key is :"+tmp_header);
				//console.log("value is :"+tmp_value);
				//console.log("c is :"+c)
				let cell = row.insertCell(-1);
				cell.className = 'value';
				cell.setAttribute('contenteditable','true');
				cell.setAttribute('id','R'+r+'C'+c);
				cell.innerText = (tmp_value)
			}

		}
	}
		
	createTable(task_data);
	/* Run move_scroll_x function.*/
	let scroll_pos = move_scroll_x()

}

