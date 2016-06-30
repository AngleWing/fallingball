<?php
//接收参数
$playerName=$_POST['player'];  
$score=$_POST['score'];  

//连接数据库
$con = mysql_connect("localhost","root","root");
if (!$con)
{
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("rank", $con);
$result = mysql_query("SELECT * FROM ranking where player='$playerName'");
if($playerName==''){
	echo "namenull";
		
}else if($row = mysql_fetch_array($result)){
	echo "namedouble";
}else{
	//插入数据
	mysql_query('set names utf8');
	$sql="INSERT INTO ranking(player, score)VALUES('$playerName','$score')";
	if (!mysql_query($sql,$con))
	  {
		die('Error: ' . mysql_error());
	  }
}
	mysql_close($con);
?>