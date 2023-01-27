window.onload = function(){
	var tasks = [
	{
		id: 'id1',
		name: 'Shot A',
		description: 'The task of shot A',
		start: '2023-01-22',
		end: '2023-01-27',
		progress: 100,
	},
	{
		id: 'id2',
		name: 'Shot B',
		description: 'The task of shot B',
		start: '2023-01-27',
		end: '2023-02-03',
		progress: 100,
	},
	];
	var gantt = new Gantt("#gantt", tasks)
}