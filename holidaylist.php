<?php
include('db.php');
include('funcs.php');
$type=$_GET['type'];
$query = mysqli_query($conn,"SELECT * FROM $type ORDER BY month+0,day+0 ASC");
$events = [];
while($rows=mysqli_fetch_array($query))
    $events[] = $rows;
 if($type=='miladi') 
	 $months = ["","January","February","March","April","May","June","July","August","September","October","November","December"];
 else if($type=='hijri') 
	 $months = ["","محرم","صفر","ربيع الاول","ربيع الثاني","جمادي الاول","جمادي الثاني","رجب","شعبان","رمضان","شوال","ذوالقعده","ذوالحجه"];
 else if(($type=='jalali') || ($type=='events'))
	 $months = ["","فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
 else if($type=='eventsaa') 
	 $months = ["","فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
?> 
    <div class="modalHead active-season">
		<button type="button" class="btn-close btn-sm close" onClick="handleModalClose()" data-bs-dismiss="modal" aria-label="Close"></button>
        <h2 class="text-center mt-3">لیست رویداد های تقویم</h2>
    </div>
    <div class="modalMain custom-scrollbar-container overflow-auto h-90" id="modalMain" >		
			<div class="form-container text-end w-100">
              <form class="task-form" id="task-form">
				<div class="task-input1">
                    <table class="table table-hover">
                        <tbody>
                            <?php foreach($events as $event): ?>
                            <tr id="holdy-<?= $event['id']?>" class="itm-<?= $event['id']?>" data="<?=$event['month']?>,<?=$event['day']?>">
                                <td style="width:20px;"><form class="task-form" id="task-form">
                                    <a class="delete-btn btn btn-sm btn-outline-warning fs-6" onClick="delholiday(<?= $event['id']?>,'<?= $type?>');">
                                        <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 12V17" stroke="var(--bs-form-invalid-border-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M14 12V17" stroke="var(--bs-form-invalid-border-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M4 7H20" stroke="var(--bs-form-invalid-border-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="var(--bs-form-invalid-border-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="var(--bs-form-invalid-border-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </a>
                                    </form>
                                </td>
                                <td class="w-25">
                                    <?php if ($type=='events'): ?>
                                    <span class="month-hover"  onclick="handleModal(<?=$event['month']?>,<?=$event['day']?>);"><?= convert_num($event['day'],'fa')." ".($months[intval($event['month'])])?></span>
                                    <?php else:?>
                                    <span class="" ><?= convert_num($event['day'],'fa')." ".($months[intval($event['month'])])?></span>
                                    <?php endif;?>
                                    <em class="display-none " ></em>
                                </td>
                                <td class="td_task2">
                                    <?php if($type!='events') echo '<span class="event-day">' . $event['event'] . '</span>'; 
                                        else echo '<span class="event-day " >' . $event['title'] . '</span>';
									?>                                    
                                    <em class="display-none"></em>
                                </td>
                                <input type="hidden" value="" data="" />
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
				</div>
             </form>
			</div>
	</div>

