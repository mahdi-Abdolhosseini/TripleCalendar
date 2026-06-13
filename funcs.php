<?php
function isJalaliLeap($year){   
    $kab = (((($year + 12) % 33) % 4) == 1) ? 1 : 0;
    return   $kab;
}
function isMiladiLeap($year){
    $leap = date('L', mktime(0, 0, 0, 1, 1, $year));
    return   $leap;
}
function isHijriLeap($year){
    return ((11 * $year + 14) % 30) < 11;
}

function convert_num($str, $mod = 'en', $mf = '٫') {
  $num_a = array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.');
  $key_a = array('۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', $mf);
  return ($mod == 'fa') ? str_replace($num_a, $key_a, $str) : str_replace($key_a, $num_a, $str);
}
function jalali_to_gregorian_lite($jy, $jm, $jd, $mod='') {
  $jy += 1595;
  $days = -355668 + (365 * $jy) + (((int)($jy / 33)) * 8) + ((int)((($jy % 33) + 3) / 4)) + $jd + (($jm < 7)? ($jm - 1) * 31 : (($jm - 7) * 30) + 186);
  $gy = 400 * ((int)($days / 146097));
  $days %= 146097;
  if ($days > 36524) {
    $gy += 100 * ((int)(--$days / 36524));
    $days %= 36524;
    if ($days >= 365) $days++;
  }
  $gy += 4 * ((int)($days / 1461));
  $days %= 1461;
  if ($days > 365) {
    $gy += (int)(($days - 1) / 365);
    $days = ($days - 1) % 365;
  }
  $gd = $days + 1;
  $sal_a = array(0, 31, (($gy % 4 == 0 and $gy % 100 != 0) or ($gy % 400 == 0))?29:28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  for ($gm = 0; $gm < 13 and $gd > $sal_a[$gm]; $gm++) $gd -= $sal_a[$gm];
  return ($mod == '')? array($gy, $gm, $gd) : $gy.$mod.$gm.$mod.$gd;
}
function isholiday ($jrows2, $mrows2, $hrows2, $jm, $jd, $gm, $gd, $hm, $hd){
    $holiday = "false";
    $events = [];
    // بررسی جلالی
    foreach ($jrows2 as $row) {
        if ($row['month'] == $jm && $row['day'] == $jd) {
            if ($row['holiday']) $holiday = "true";
            if (!empty($row['event'])) $events[] = "\"".$row['event']."\"";
        }
    }
    // بررسی میلادی
    foreach ($mrows2 as $row) {
        if ($row['month'] == $gm && $row['day'] == $gd) {
            if ($row['holiday']) $holiday = "true";
            if (!empty($row['event'])) $events[] = '"'.$row['event'].'"';
        }
    }
    // بررسی هجری
    foreach ($hrows2 as $row) {
        if ($row['month'] == $hm && $row['day'] == $hd) {
            if ($row['holiday']) $holiday = "true";
            if (!empty($row['event'])) $events[] = "\"".$row['event']."\"";
        }
    }
    return [
        'holiday' => $holiday,
        'events'  => $events ? $events : ""
    ];

}

function gregorian_to_hijri($gy, $gm, $gd){
    $jd = gregorian_to_jd($gy, $gm, $gd);
    return jd_to_hijri($jd);
}

function gregorian_to_jd($y, $m, $d){
    return intval((1461 * ($y + 4800 + intval(($m - 14) / 12))) / 4)
         + intval((367 * ($m - 2 - 12 * intval(($m - 14) / 12))) / 12)
         - intval((3 * intval(($y + 4900 + intval(($m - 14) / 12)) / 100)) / 4)
         + $d - 32075;
}

function jd_to_hijri($jd){
    $l = $jd - 1948440 + 10632;
    $n = intval(($l - 1) / 10631);
    $l = $l - 10631 * $n + 354;
    $j = (intval((10985 - $l) / 5316)) * (intval((50 * $l) / 17719))
       + (intval($l / 5670)) * (intval((43 * $l) / 15238));
    $l = $l - (intval((30 - $j) / 15)) * (intval((17719 * $j) / 50))
          - (intval($j / 16)) * (intval((15238 * $j) / 43)) + 29;

    $m = intval((24 * $l) / 709);
    $d = $l - intval((709 * $m) / 24);
    $y = 30 * $n + $j - 30;

    return [$y, $m, $d];
}
?>