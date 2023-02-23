# simple_GanttChart
CSVファイルを読み込みデータベース化し、そのデータを元にガントチャートを作成するツールです。

編集不可で高速なタスクリストと、編集可能で動的なタスクリストの二つを作成し社内Web上に表示します。

※社外利用及び外部公開用での実装は想定しておりませんのでご注意下さい。

Frappe Gantt を使用しております。
：https://frappe.io/gantt


## 重要ファイル及びフォルダの説明

- flask_main.py ： メイン関数はここにあります。

      __main__ ： Flaskを実行し、Webアプリを作成します。

      settings() ： ガントチャートやタスク表制作に必要なデータを取り出し、listに纏めそのlistを返します。

      index() ： settings関数から受け取ったリストデータと共にFlaskを利用してWebページを生成します。


- simple_GanttChart.py ： flask_main.pyファイル内のsettings関数から呼び出されます。

      read_csv_file() ： CSVファイルを読み取り、SimpleGanttクラスのインスタンスとして纏め、そのインスタンスを返します。

      get_task_database() ： read_csv_file関数を呼び出し、受け取ったインスタンスデータをリストへ纏めます。


- manage_html フォルダ ： Flaskではなく、htmlファイルとして出力したい場合はこちらのフォルダ内のcreate_html.pyを使用します。


- templates フォルダ ： Flask起動時に利用。テンプレートhtmlが入っています。


- static フォルダ ： Flask起動時に利用。CSS及びJavaScript、Jsonファイルが入っています。



### 今後予定している追加実装。

- CSVファイルのダウンロード機能の実装

- Django を用いたデータベース連携機能の実装（別リポジトリにて作成予定）


### 将来的な展望

- ShotGrid REST APIを用いたShotGridとの連携


##
以下は実際に表示されるWebページのスクリーンショットになります。


![Test Image 1](/image/simple_gantt_chart_main_v01.png)

