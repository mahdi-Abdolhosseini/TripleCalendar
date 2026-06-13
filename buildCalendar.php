<?php
/******************** main code ********************/
function buildCalendar($jyear) {
	
	include('db.php');
	include_once('jdf.php');
	
    $M_months = ["","January","February","March","April","May","June","July","August","September","October","November","December"];
    $H_months = ["","محرم","صفر","ربيع الاول","ربيع الثاني","جمادي الاول","جمادي الثاني","رجب","شعبان","رمضان","شوال","ذوالقعده","ذوالحجه"];
    $mapped2 = [];
	$temp_m =[];
    //اولین روز سال شمسی به میلادی
    $F_JtoG = jalali_to_gregorian($jyear, 1, 1);
    $query = mysqli_query($conn,"SELECT * FROM hijri_months WHERE jalali_year = $jyear");
    while ($first_hday_r = mysqli_fetch_array($query))
        $first_hday[] = $first_hday_r;

    /*درصورتی که معادل قمری اولین روز سال شمسی مورد نظر در دیتابیس ذخیره شده باشد
      از فرمول زیر استفاده میکنیم،در غیر اینصورت از تابع تبدیل میلادی به قمری استفاده میشود */
      /*
      jalali_year سال شمسی مورد نظر
      year سال قمری معادل
      months ["07-14",30,29,....,29] ایتم اول معادل قمری روز شروع سال شمسی و سایر 12 آیتم تعداد روزهای آن سال قمری
      */
    if (isset($first_hday)) {
        if ($first_hday != null) {
            $tt = json_decode($first_hday[0]['months']);
            $tmp = explode('-',$tt[0]);
            $F_GtoH[0] = $first_hday[0]['year'];
            $F_GtoH[1] = $tmp[0];
            $F_GtoH[2] = $tmp[1];
        }
    }else{$F_GtoH = gregorian_to_hijri($F_JtoG[0],$F_JtoG[1],$F_JtoG[2]);}

    //آخرین روز سال شمسی به میلادی
    $L_JToGr = isJalaliLeap($jyear)
            ? jalali_to_gregorian($jyear,12,30)
            : jalali_to_gregorian($jyear,12,29);
    // نقطه شروع در date1 
    $m1 = 1;//ماه جلالی
    $d1 = 1;//روزجلابی
    // نقطه شروع در date2
    $m2 = intval($F_JtoG[1]);//ماه میلادی
    $d2 = intval($F_JtoG[2]);//روز میلادی
    // قطه شروع در date3
    // echo intval($F_GtoH[2]);
    $m3 = intval($F_GtoH[1]);//ماه هجری
    $d3 = intval($F_GtoH[2]);//روز هجری
    // حرکت در سال قمری.سال قمری ماه ها متفاوت است
    //  برای هر سال در دیتابیس یک فیلد داریم.
    //  هر سال شمسی اصولا مصادف با دو سال قمری و دو سال میلادی است
    $hyear = 0;
    $myear = 0;
    $Current_Myear = $F_JtoG[0];//سال میلادی
    $Current_Hyear = $F_GtoH[0];//سال هجری
    //نام ماه های میلادی 0
	$Month_Names[0] = ['1' => "", '2' => "", '3' => "", '4' => "", '5' => "", '6' => "", '7' => "", '8' => "", '9' => "", '10' => "", '11' => "", '12' => ""];
	//نام ماه های قمری 1
    $Month_Names[1] = ['1' => "", '2' => "", '3' => "", '4' => "", '5' => "", '6' => "", '7' => "", '8' => "", '9' => "", '10' => "", '11' => "", '12' => ""];
    
    $jalalidays = isJalaliLeap($jyear)
        ? [1, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30]
        : [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    $miladidays[0] = isMiladiLeap($F_JtoG[0])
        ? [1, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        : [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    $miladidays[1] = isMiladiLeap($F_JtoG[0] + 1)
        ? [1, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        : [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    /* 
    1- تعداد ماه های سال قمری و سال قمری + 1 در جدول موجود است
    1- تعداد ماه های سال قمری در جدول است ولی سال قمری + 1 در جدول موجود نیست
    1- هیچ اطلاعاتی درمورد سال مورد نظر نیست
    */
    $query = mysqli_query($conn,"SELECT * FROM hijri_months WHERE year BETWEEN $F_GtoH[0] AND $F_GtoH[0] + 1 ORDER BY year");
    while ($hijridays_r=mysqli_fetch_array($query))
        $hijridays[]=$hijridays_r;
    
	if ( isset($hijridays) ) {
		($hijridays != null) ? $t = count($hijridays) : $t = 0;
	}else{ $t = 0;}
    if ($t > 0){
        if ($t == 1){
            //هر سال شمسی میان 2 سال قمری است.
            $hijridays[0] = json_decode($hijridays[0]['months']);
            $hijridays[1] = isHijriLeap($F_GtoH[0] + 1)
                            ? [1, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30]
                            : [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
        }
        if ($t == 2){
            $hijridays[0] = json_decode($hijridays[0]['months']);
            $hijridays[1] = json_decode($hijridays[1]['months']);
        }
    }else{
            $hijridays[0] = isHijriLeap($F_GtoH[0])
                            ? [1, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30]
                            : [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
            $hijridays[1] = isHijriLeap($F_GtoH[0] + 1)
                            ? [1, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30]
                            : [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    }
	$index = 0;//nth day of week
    $query1 = mysqli_query($conn,"SELECT * FROM jalali");
    while ($jrows_r = mysqli_fetch_array($query1))
        $jrows[]=$jrows_r;
    $query2 = mysqli_query($conn,"SELECT * FROM miladi");
    while ($mrows_r=mysqli_fetch_array($query2))
        $mrows[]=$mrows_r;
    $query3 = mysqli_query($conn,"SELECT * FROM hijri");
    while ($hrows_r=mysqli_fetch_array($query3))
        $hrows[]=$hrows_r;

    while (true) {
		/////////////////////////start new codes////////////////////////
        $activeDay = "false";
        if($d1==1){
            /*
            برای نمایش جدول در حالت هفت روزه که ممکن است روز اول ماه شنبه نباشد
            اگر روز اول ماه بعد از شنبه بود باید از شنبه تا روزاول ماه را با روزهای ماه قبل پر کرد
            به عنوان روزهای غیرفعال و کمرنگ
            */
            $ts = jmktime(0, 0, 0, $m1, $d1, $jyear);
			$wday=jdate('w', $ts,0,'Asia/Tehran','en');//روزهای غیرفعال قبل از یکم در جدول هفت روزه
            $mapped2['fActiveDays'][$m1] = 0;
		  	if($wday > 0){
                $mapped2['fActiveDays'][$m1] = $wday;                
                $activeDay = "true";
				$mm1=$m1;$dd1=$d1;
				$mm2=$m2;$dd2=$d2;
			    $mm3=$m3;$dd3=$d3;
                $mmyear=$myear;$hhyear=$hyear;
		        for($i=0;$i <= $wday-1;$i++){
                    $dd1--;$dd2--;$dd3--;
				 	if ($dd1 < 1) {
						$mm1--;
						$ts2 = jmktime(0, 0, 0, 2, 1,$jyear-1);
						$k=jdate('L', $ts2,0,'Asia/Tehran','en');
						if ($mm1 < 1) {
							$mm1 = 12;
							(isJalaliLeap($jyear-1) == 1) ? $dd1 = 30 : $dd1 = 29;
						} else {
							$dd1 = $jalalidays[$mm1];
						}
					}
				 	if ($dd2 < 1) {
						$mm2--;
						if ($mm2 < 1) {
							$mm2 = 12;
                            $mmyear = 0;
						}
						$dd2 = $miladidays[$mmyear][$mm2];
						// اگر از انتهای سال date2 رد شد، برگرد اول سال (یا می‌تونی break کنی)
					}
					if ($dd3 < 1) {
						$mm3--;
						if ($mm3 < 1) {
							$mm3 = 12;
                            $hhyear = 0;
						}else{
							$dd3 = $hijridays[$hhyear][$mm3];
						}
						// اگر از انتهای سال date3 رد شد، برگرد اول سال (یا می‌تونی break کنی)
					}
                    $Rows= isholiday($jrows,$mrows,$hrows,$mm1,$dd1,$mm2,$dd2,$mm3,$dd3);
                    //$holiday = $Rows['holiday'] ?? "false";
                    if (!isset($Rows['holiday'])) {$holiday = false;}
                        else{$holiday = $Rows['holiday'];}
                    // if ($index == 6) $holiday = "true";
				  	$temp_m[$i] = "[\"" . tr_num($dd1,'fa') . "\"," . "\"" . $dd2. "\"," . "\"" . tr_num($dd3,'fa') . "\",".$holiday.",".json_encode($Rows['events']).",".$activeDay.",[]]";
                    $index = ($index + 1) % 7; /*  */
                }
		  	}
		}
	    if(count($temp_m) > 0) {
			for ($i = ($wday - 1);$i >= 0;$i--){
				$mapped2[$m1][] = $temp_m[$i];
			}
			$temp_m = [];
		}
		/////////////////////////end new codes/////////////////////////
        // اگر از انتهای سال شمسی رد شدیم، تموم
        if ($m1 > 12) {
            break;
        }
        if ($d1==1) {
            // $Month_Names[0][$m1] .=  $Current_Myear;
            $Month_Names[0][$m1] .=  $M_months[$m2] . " " . $Current_Myear;
            $Month_Names[1][$m1] .=  $H_months[$m3] . " " . tr_num($Current_Hyear,'fa');
        }
        if ($d2 > $miladidays[$myear][$m2]) {
            $m2++;
            $d2 = 1;
            if ($m2 > 12) {
                $m2 = 1;
                $myear = 1;
                $Current_Myear++;
            }
        }
        if ($d3 > $hijridays[$hyear][$m3]) {
            $m3++;
            $d3 = 1;
            if ($m3 > 12) {
                $m3 = 1;
                $hyear = 1;
                $Current_Hyear++;
            }
        }
        $Rows = isholiday($jrows,$mrows,$hrows,$m1,$d1,$m2,$d2,$m3,$d3);
        if (!isset($Rows['holiday'])) {$holiday = false;}
            else{$holiday = $Rows['holiday'];}
        if ($index == 6) $holiday = "true";
        // اینجا نگاشت رو انجام می‌دیم:
		$mapped2[$m1][] = "[\"" .tr_num($d1,'fa') . "\"," . "\"" . $d2. "\"," . "\"" . tr_num($d3,'fa') . "\"," . $holiday."," . json_encode($Rows['events']) . ",false,[]]";
        /*برای اینکه اندیس ها از 1 شروع شود اندیس 0 را مساوی '' قرار میدهیم
        1 april 2026 / 1 محرم 1447 / 1 فروردین 1405
        */
        $mDays[$m1]['miladi'][0] = '';
        $mDays[$m1]['hijri'][0] = '';
        $mDays[$m1]['miladi'][] = $m2 . "-" . $d2 . "-" . $Current_Myear ;
        $mDays[$m1]['hijri'][] = $m3 . "-" . $d3 . "-" . $Current_Hyear;

        $d1++;
        $d2++;
        $d3++;
        if ($d1 > $jalalidays[$m1]) {
            $Month_Names[0][$m1] .=  " - " . $M_months[$m2] . " " . $Current_Myear;
            $Month_Names[1][$m1] .=  " - " . $H_months[$m3] . " " . tr_num($Current_Hyear,'fa');
        /******************** start new codes *******************/
             /*
            برای نمایش جدول در حالت هفت روزه که ممکن است روز آخر ماه جمعه نباشد
            اگر روز آخر ماه قبل از جمعه بود باید از روز آخر ماه تا جمعه را با روزهای ماه بعد پر کرد
            به عنوان روزهای غیرفعال و کمرنگ
            */
            $ts = jmktime(0, 0, 0, $m1 , $jalalidays[$m1], $jyear);
            $wday2 = jdate('w',$ts,0,'Asia/Tehran','en');
            if($wday2 < 6){
                $activeDay = "true";
                $mm1 = $m1;$dd1 = $d1;
                $mm2 = $m2;$dd2 = $d2;
                $mm3 = $m3;$dd3 = $d3;
                $mmyear = $myear;$hhyear = $hyear;
                for($i = $wday2+1;$i <= 6;$i++) {
                    if ($dd1 > $jalalidays[$mm1]) {
                        $mm1++;
                        if ($mm1 > 12) {
                            $mm1 = 1;
                        }
                        $dd1 = 1;
                    }
                    if ($dd2 > $miladidays[$mmyear][$mm2]) {
                        $mm2++;
                        if ($mm2 > 12 ) {
                            $mm2 = 1;
                            $mmyear = 1;
                        }
                        $dd2 = 1;
                    }
                    if ($dd3 > $hijridays[$hhyear][$mm3]) {
                        $mm3++;
                        if ($mm3 > 12) {
                            $mm3 = 1;
                            $hhyear = 1;
                        }
                        $dd3 = 1;//$hijridays[$hyear][$mm3];
                    }						
                    $Rows= isholiday($jrows,$mrows,$hrows,$mm1,$dd1,$mm2,$dd2,$mm3,$dd3);
                    //$holiday = $Rows['holiday'] ?? "false";
                    if (!isset($Rows['holiday'])) {$holiday = false;}
                        else{$holiday = $Rows['holiday'];}
                    if ($index + 1 == 6) $holiday = "true";
					$temp_m[$i] ='["' .tr_num($dd1,'fa') . '",' . '"' . $dd2 . '",' . '"' . tr_num($dd3,'fa') . '",' . $holiday . ',' . json_encode( $Rows['events']) . ',' . $activeDay . ',[]]';
                    $dd1++;$dd2++;$dd3++;
                    $index = ($index + 1) % 7;
                }
            }
            if(count($temp_m)>0) {
                for ($i = $wday2+1;$i <= 6;$i++){
                    $mapped2[$m1][] = $temp_m[$i];
                }
                $temp_m = [];
            }
			/////////////////////////end new codes/////////////////////////
            $m1++;//main
            $d1 = 1;
        }
        $index = ($index + 1) % 7;//روز چندم هفته
    }    //while
    for ($i = 1;$i <= 12;$i++){
        $mNames[] = $Month_Names[0][$i] . " | " . $Month_Names[1][$i];
    }
    for($j = 0;$j <= 11;$j++)
        foreach($mapped2[$j+1] as $m1)
            $calendarObject[$j][] = json_decode($m1);
    
    // $mNames = $Month_Name;
    //$mDays = $Month_Names[3];
    $fActiveDays = $mapped2['fActiveDays'];//first day on each month that is not disbled mearn 1/month/jyear

    unset($Month_Names, $mapped2, $M_months, $H_months, $jalalidays, $miladidays, $hijridays);

    return compact('calendarObject','mNames','mDays','fActiveDays');

}


?>






