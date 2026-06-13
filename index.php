<?php

// ini_set('display_errors', 0);
// header('Content-Type: application/json; charset=utf-8');
// header('Access-Control-Allow-Origin','*');
// header('Access-Control-Allow-Headers : http://dc.dns110.ir/date');

include('db.php');
include('jdf.php');
include('funcs.php');
$now = date('Y-m-d'); // or $now = time(); as well
$notifs=[];


// $cnt=0;$cnt2=0;$cnt3=0;

if (isset($_GET['year']))	$jyear = $_GET['year'];
	else	$jyear = intval(jdate('Y','','','','en'));
/* main function */
include('buildCalendar.php');
$calendarItems = buildCalendar($jyear);
/*
Array ['calendarObject']
Array ['mNames']
Array ['mDays']
Array ['f_days']
*/
$calendar = $calendarItems['calendarObject'];//رویدادها و روزها
$f_days = $calendarItems['fActiveDays'];//اندیس روز یکم هر ماه(disabled = false)

$events_q = mysqli_query($conn,"SELECT * FROM events");
while ($events_r=mysqli_fetch_array($events_q))
  $events[]=$events_r;

if(isset($events)){
	foreach($events as $key) {
		$firstActiveDay = $f_days[$key['month']];
		$m = $key['month']-1;
		$d = $key['day'] + $firstActiveDay - 1;
		$key['id'] = $key['id'] * 2 ;
		$calendar[$m][$d][6][] = ($key['title'].":".$key['text'].":".($key['id']).":".$key['rep'].":".$key['is_fixed']);
						$your_date = strtotime($key['is_global']);
		$now_date = strtotime($now);
		$datediff = ($your_date  - $now_date);
		$datediff_day=round($datediff / (60 * 60 * 24));
		$ddd=explode('-',$now);
		if ($key['is_fixed'] == 1){
			switch ($key['rep']){
				case '0':
				$key['is_fixed'] = 'رویداد روزانه';
				$notifs[]=$key;
				break;
				case '1':
				$a = gregorian_to_jalali($ddd[0],$ddd[1],$ddd[2],'');
				if (($key['day'] - $a[2] <= 2) AND ($key['day'] - $a[2] >= 0 )){
					$key['is_fixed'] = ' ماهانه. '.convert_num($key['day'] - $a[2] ,'fa').' روز تا ';
					$notifs[]=$key;
				break;
				}
				case '2':
				if (($datediff_day <= 2) AND ($datediff_day >=0)){
					$key['is_fixed'] = ' سالانه. '.convert_num($datediff_day,'fa').' روز تا ';
					$notifs[]=$key;
				break;
				}
			}
		}

	}
}
?>
<!DOCTYPE html>
<html data-bs-theme="light" lang="fa" >
<head>
  <meta charset="UTF-8">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
  <title>COM110</title>
    <link rel="stylesheet" href="static/css/lib/bs.min.css">
    <!-- <link rel="stylesheet" href="static/css/lib/lineicons.css"> -->
    <link rel="stylesheet" href="static/css/lib/bar.css">
    <link rel="stylesheet" href="static/css/main.css">
</head>
<body id="mainbody">
<!-- ========== header start ========== -->
	<header class="header mb-2 d-nonek">
	 <div class="container-fluid">
	  <div class="row">
		<div class="col-lg-1 col-md-1 col-1"><a class="today_btn active-season" href="index.php">امروز</a></div>
		<div class="col-lg-9 col-xl-9 col-md-9 col-8 text-center">
		  <div id="yearselector"class="custom-scrollbar-container" style=""></div>
		</div>
		  <div class="col-lg-2 col-md-2 col-3">
		   <div class="header-right">
			<!-- notification start -->
			<div class="notification-box d-md-flex">
			  <button class="dropdown-toggle" type="button" id="notification" data-bs-toggle="dropdown"
				aria-expanded="false">
				<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
				  <path
					d="M11 20.1667C9.88317 20.1667 8.88718 19.63 8.23901 18.7917H13.761C13.113 19.63 12.1169 20.1667 11 20.1667Z"
					fill="" />
				  <path
					d="M10.1157 2.74999C10.1157 2.24374 10.5117 1.83333 11 1.83333C11.4883 1.83333 11.8842 2.24374 11.8842 2.74999V2.82604C14.3932 3.26245 16.3051 5.52474 16.3051 8.24999V14.287C16.3051 14.5301 16.3982 14.7633 16.564 14.9352L18.2029 16.6342C18.4814 16.9229 18.2842 17.4167 17.8903 17.4167H4.10961C3.71574 17.4167 3.5185 16.9229 3.797 16.6342L5.43589 14.9352C5.6017 14.7633 5.69485 14.5301 5.69485 14.287V8.24999C5.69485 5.52474 7.60672 3.26245 10.1157 2.82604V2.74999Z"
					fill="" />
				</svg>
				<?php if(count($notifs)>0) echo '<span class="reddot"></span>';?>
			  </button>
			  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="notification" id="ntf_u" >
			  <?php
				if(count($notifs)>0){
				  foreach($notifs as $ind => $notif) {
					  echo '<li class="notif">
						  <a href="#0">
							<div class="image" >
							  <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none"onclick="handleIgnore('.$notif['id'].','.$notif['month'].','.$notif['day'].',this)" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" fill="var(--bs-link-color)" fill-opacity=".16" stroke="var(--bs-link-color)" stroke-width="1.5" stroke-miterlimit="10"/>
								<path d="m9.172 15.828 5.656-5.656M14.829 15.828l-5.657-5.656M18 3l3 3M3 6l3-3" stroke="var(--bs-link-color)" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
							  </svg>
							</div>
							<div class="content text-end" onclick="handleModal('.$notif['month'].','.$notif['day'].');">
							  <h6>
								'.$notif['title'].'
								<span class="text-regular">
								  عنوان
								</span>
							  </h6>
							  <p>
								'.$notif['text'].'
							  </p>
							  <span>'.convert_num($jyear,'fa').'-'.convert_num($notif['month'],'fa').'-'.convert_num($notif['day'],'fa').'</span>
							  <span> '.$notif['is_fixed'].' </span>
							</div>
						  </a>
						</li>';
				  }
				} else echo '<li><h6 class="content text-end">لیست خالی است</h6></li>';
			  ?>
			  </ul>
			</div>
			<!-- notification end -->
			<!-- message(settings) start -->
			<div class="header-message-box d-md-flex ms-1 ">
			  <button class="dropdown-toggle" type="button" id="message" data-bs-toggle="dropdown"
				aria-expanded="false">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				  <path d="M3 5H7M21 5H11M3 12H15M21 12H19M3 19H5M21 19H9" stroke="black" stroke-width="2" stroke-linecap="round"/>
				  <circle cx="9" cy="5" r="2" stroke="black" stroke-width="2" stroke-linecap="round"/>
				  <circle cx="17" cy="12" r="2" stroke="black" stroke-width="2" stroke-linecap="round"/>
				  <circle cx="7" cy="19" r="2" stroke="black" stroke-width="2" stroke-linecap="round"/>
				</svg>
				<span></span>
			  </button>
			  <ul class="dropdown-menu dropdown-menu-end text-end" aria-labelledby="message" >
				<li>
				  <div class="form-check form-switch mb-3">
					<input class="form-check-input" type="checkbox" id="light_mode">
					<label class="form-check-label" for="settings-switch-1">حالت  تاریک</label>
				  </div>
				</li>
				<li><a class="form-control" href="javascript:void(0)" onclick="holidayform();"> افزودن مناسبت رسمی</a></li>
				<li><a class="" href="javascript:void(0)" onclick="holidaylist('jalali');">مناسبات شمسی</a></li>
				<li><a class="" href="javascript:void(0)" onclick="holidaylist('miladi');">مناسبات میلادی</a></li>
				<li><a class="" href="javascript:void(0)" onclick="holidaylist('hijri');">مناسبات قمری</a></li>
				<li><a class="" href="javascript:void(0)" onclick="holidaylist('events');">مناسبات شخصی</a></li>
			  </ul>
			</div>
			<!-- message end -->
		  </div><!-- header-right -->
		</div><!-- col2 -->
	  </div><!-- row-->
	 </div><!--fluid -->
	</header>
<!-- ========== header end ========== -->
<!-- ========== toast start ========== -->
	<div id="toast-container"></div>
<!-- ========== toast end ========== -->
<!-- ========== main content start ========== -->
	<div class="overflow-auto ">
	  <div class="calendar-wrapper">
		  <div class="calendar-base mb-2">
			  <div class="year-wrapper"></div>
			  <div class="months">
				  <span class="month-hover month-letter month-letter-1" data-num="1">فروردین</span>
				  <span class="month-hover month-letter month-letter-2" data-num="2">اردیبهشت</span>
				  <span class="month-hover month-letter month-letter-3" data-num="3">خرداد</span>
				  <span class="month-hover month-letter month-letter-4" data-num="4">تیر</span>
				  <span class="month-hover month-letter month-letter-5" data-num="5">مرداد</span>
				  <span class="month-hover month-letter month-letter-6" data-num="6">شهریور</span>
				  <span class="month-hover month-letter month-letter-7" data-num="7">مهر</span>
				  <span class="month-hover month-letter month-letter-8" data-num="8">آبان</span>
				  <span class="month-hover month-letter month-letter-9" data-num="9">آذر</span>
				  <span class="month-hover month-letter month-letter-10" data-num="10">دی</span>
				  <span class="month-hover month-letter month-letter-11" data-num="11">بهمن</span>
				  <span class="month-hover month-letter month-letter-12" data-num="12">اسفند</span>
			  </div>
			  <hr class="month-line" />
			  <div class="days w-100">
				  <ul class="weeks d-flex w-100 justify-content-center p-0">
					  <li>شنبه</li>
					  <li>یکشنبه</li>
					  <li>دوشنبه</li>
					  <li>سه شنبه</li>
					  <li>چهارشنبه</li>
					  <li>پنجشنبه</li>
					  <li>جمعه</li>
					  <div class="clearfix"></div>
				  </ul>
                  <ul class="weeks2 d-flex w-100 justify-content-center p-0 ">
                      <li>ش</li>
                      <li>ی</li>
                      <li>د</li>
                      <li>س</li>
                      <li>چ</li>
                      <li>پ</li>
                      <li>ج</li>
                      <div class="clearfix"></div>
                  </ul>

			  </div>
			  <div class="num-dates"></div>
		  </div>
		  <div class="calendar-left active-season  mb-2">
			  <div class="num-date">X</div>
			  <div class="day">X</div>
		  </div>
	  </div>
	</div>
  <div class="clearfix"></div>
<!-- ========== main content end ========== -->
<!-- ========== main modal strt ========== -->
	<!-- modal backdrop -->
	<div class="" id="main"></div>
	<!-- modal backdrop -->
	<!-- modal main part-->
	<div class="modal p-0" id="modal">
	</div>
<!-- ========== main modal end ========== -->

<script>
  //نام ماه های مصادف با ماه شمسی
  var metanames = <?php echo json_encode($calendarItems['mNames'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); ?>;
  //شماره ماه هر روز میلادی-هجری
  var mDays = <?php echo json_encode($calendarItems['mDays'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); ?>;
  let notifs= <?php echo json_encode($notifs);?>;
  var jyear= <?php echo $jyear;?>;
  var calendarObject= <?php echo json_encode($calendar);?>;
  const domain  = "<?=$domain?>";
  let svg_new = `<svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 12H16" stroke="var(--bs-primary-text-emphasis)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 16V8" stroke="var(--bs-primary-text-emphasis)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="var(--bs-primary-text-emphasis)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  let svg_confirm = `<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="var(--bs-success-text-emphasis)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.75 12L10.58 14.83L16.25 9.17004" stroke="var(--bs-success-text-emphasis)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  let svg_cancel = `<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.16998 14.83L14.83 9.17004" stroke="var(--bs-danger-text-emphasis)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.83 14.83L9.16998 9.17004" stroke="var(--bs-danger-text-emphasis)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="var(--bs-danger-text-emphasis)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  let svg_detail = `<svg fill="var(--bs-form-invalid-border-color)" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M4,7.5 C4,7.77614237 3.77614237,8 3.5,8 C3.22385763,8 3,7.77614237 3,7.5 L3,5.5 C3,4.11928813 4.11928813,3 5.5,3 L7.5,3 C7.77614237,3 8,3.22385763 8,3.5 C8,3.77614237 7.77614237,4 7.5,4 L5.5,4 C4.67157288,4 4,4.67157288 4,5.5 L4,7.5 Z M16.5,4 C16.2238576,4 16,3.77614237 16,3.5 C16,3.22385763 16.2238576,3 16.5,3 L18.5,3 C19.8807119,3 21,4.11928813 21,5.5 L21,7.5 C21,7.77614237 20.7761424,8 20.5,8 C20.2238576,8 20,7.77614237 20,7.5 L20,5.5 C20,4.67157288 19.3284271,4 18.5,4 L16.5,4 Z M20,16.5 C20,16.2238576 20.2238576,16 20.5,16 C20.7761424,16 21,16.2238576 21,16.5 L21,18.5 C21,19.8807119 19.8807119,21 18.5,21 L16.5,21 C16.2238576,21 16,20.7761424 16,20.5 C16,20.2238576 16.2238576,20 16.5,20 L18.5,20 C19.3284271,20 20,19.3284271 20,18.5 L20,16.5 Z M7.5,20 C7.77614237,20 8,20.2238576 8,20.5 C8,20.7761424 7.77614237,21 7.5,21 L5.5,21 C4.11928813,21 3,19.8807119 3,18.5 L3,16.5 C3,16.2238576 3.22385763,16 3.5,16 C3.77614237,16 4,16.2238576 4,16.5 L4,18.5 C4,19.3284271 4.67157288,20 5.5,20 L7.5,20 Z"/>
  </svg>`;
  let svg_delete = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12V17" stroke="var(--bs-form-invalid-border-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 12V17" stroke="var(--bs-form-invalid-border-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 7H20" stroke="var(--bs-form-invalid-border-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="var(--bs-form-invalid-border-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="var(--bs-form-invalid-border-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  let svg_edit = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="var(--bs-form-invalid-border-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="var(--bs-form-invalid-border-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  let svg_menu = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="bi" fill="currentColor" viewBox="0 0 16 16">
  					<path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path>
			</svg>`;
</script>
<script src="static/js/app.js"></script>
<script src="static/js/lib/bootstrap.bundle.min.js"></script>
<script>
window.addEventListener("load", () => {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
showToast();
});
</script>
</body>

</html>


