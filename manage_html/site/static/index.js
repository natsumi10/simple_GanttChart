
window.onload = function() {
  // タスクを用意
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
  
  // gantt をセットアップ
  var gantt = new Gantt("#gantt", tasks, {
    // ダブルクリック時
    on_click: (task) => {
      console.log(task.description);
    },
    // 日付変更時
    on_date_change: (task, start, end) => {
      console.log(`${task.name}: change date`);
    },
  });
};
