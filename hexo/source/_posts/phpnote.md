---
title: php常用代码段
author: 余晖残影
tags: 
  - php
categories: 
  - 语言
  - php
  - 代码段便签
description: PHP常用代码段记录
date: 
---
## PHP常用代码段记录
### url封装请求(包含post,get等格式)
```php
function MyCurl($url,$data,$method = 'GET',$type='json',$headers=[]){
    try{
        //初始化
        $ch = curl_init();
        $headers[] =  "cache-control: no-cache";
        $contentType = [
            'form-data' => 'Content-Type: multipart/form-data',
            'json'      => 'Content-Type: application/json',
        ];
        if($method == 'GET'){
            if($data){
                $querystring = http_build_query($data);
                $url = $url.'?'.$querystring;
            }
        }
        $headers[] = $contentType[$type];

        // 请求头，可以传数组
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_HTTPHEADER,$headers);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);         // 执行后不直接打印出来
        if($method == 'POST'){
            if($type=='json'){
                $data = json_encode($data);
            }
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST,'POST');     // 请求方式
            curl_setopt($ch, CURLOPT_POST, true);               // post提交
            curl_setopt($ch, CURLOPT_POSTFIELDS,$data);                 // post的变量
        }
        if($method == 'PUT'){
            curl_setopt ($ch, CURLOPT_CUSTOMREQUEST, "PUT");
            curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
        }
        if($method == 'DELETE'){
            curl_setopt ($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
            curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
        }
        curl_setopt($ch, CURLOPT_TIMEOUT, 1000);  // 最大执行时间
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);  // 最大执行时间
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 跳过证书检查
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // 不从证书中检查SSL加密算法是否存在
        curl_setopt($ch, CURLOPT_SSLVERSION, 4);
//        curl_setopt($ch, CURLOPT_SSL_CIPHER_LIST, 'SSLv3');
        $output = curl_exec($ch); //执行并获取HTML文档内容
        $err = curl_error($ch);
        if($err){
            return "";
            exit;
        }
        curl_close($ch); //释放curl句柄
        return $output;
    }catch (\Exception $e){
        return false;
    }
}
```
### base64图片转文件
```php
function base64_img($base64url,$bool = false)
{
    //匹配出图片的格式
    $base64url = str_replace (' ' , '+' , $base64url);
    if ( preg_match ('/^(data:\s*image\/(\w+);base64,)/' , $base64url , $result) ) {
        $type = $result[ 2 ];
        $new_file = ROOT_PATH . 'public' . DS . 'uploads/face/' . date ('Ymd' , time ()) . "/";
        if ( !file_exists ($new_file) ) {
            //检查是否有该文件夹，如果没有就创建，并给予最高权限
            mkdir ($new_file , 0700,true);
        }
        $new = md5 (time ().uuid());
        $new_file = $new_file . $new . ".{$type}";
        if ( file_put_contents ($new_file , base64_decode (str_replace ($result[ 1 ] , '' , $base64url))) ) {
            //压缩图片
            if($bool == true){
                image_png_size_add ($new_file , $new_file);
                //删除未压缩前图片
            }
            $url = http_type();
            $file_name =  "/uploads/face/" . date ('Ymd' , time ()) . "/" . $new . ".{$type}";
            return ['code'=>200,'msg'=>$file_name];
        } else {
            return ['code'=>100,'msg'=>'图片不是base64格式！'];
        }
    }
}
```
### 数组排序
```php
/**
 * 对查询结果集进行排序,支持多维数组
 * @param array $list 查询结果
 * @param string $field 排序的字段名
 * @param array $sortby 排序类型
 * asc正向排序 desc逆向排序 nat自然排序
 * @return array
 */
function list_sort($list,$field, $sortby='asc') {
    if(is_array($list)){
        $refer = $resultSet = array();
        foreach ($list as $i => $data)
            $refer[$i] = &$data[$field];
        switch ($sortby) {
            case 'asc': // 正向排序
                asort($refer);
                break;
            case 'desc':// 逆向排序
                arsort($refer);
                break;
            case 'nat': // 自然排序
                natcasesort($refer);
                break;
        }
        foreach ( $refer as $key=> $val)
            $resultSet[] = &$list[$key];
        return $resultSet;
    }
    return false;
}
```