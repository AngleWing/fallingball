<?php
	$_topscore='wo';
	$_topplayer='ni';
	//连接数据库
	$con = mysql_connect("localhost","root","root");
	if (!$con)
	  {
	  die('无法连接数据库：' . mysql_error());
	  }

	mysql_select_db("rank", $con);
	//查询分数最高的记录
	$rs = mysql_query("SELECT * FROM ranking order by score DESC limit 1");
	$row2=mysql_fetch_array($rs);
	if(empty($row2)){
		$_topscore="null";
	}
	else {
		$_topscore=$row2['score'];
	}
	
	//查询数据库
	 mysql_query('set names utf8');
	$result = mysql_query("SELECT * FROM ranking order by score DESC");
	$data='[';
	while($row = mysql_fetch_assoc($result))
	  {
		$json=json_encode($row);//获取单个json对象
		$data=$data.$json.',';
	  }
	$data=$data.'{"player":"$_topplayer","score":"$_topscore"}]';
	echo $data;
	
	mysql_close($con);
?>	
