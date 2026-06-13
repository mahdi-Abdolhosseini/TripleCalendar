<?php
include('db.php');
?>
    <div class="modalHead active-season">
		<button type="button" class="btn-close btn-sm close" onClick="handleModalClose()" data-bs-dismiss="modal" aria-label="Close"></button>
        <h2 class="text-center mt-3">ثبت رویداد های تقویمی</h2>
    </div>
    <div class="modalMain" id="modalMain">		
		<div class="form-container text-end">
			<form class="task-form d-block" id="task-form">
				<div class="task-input1">
					<label for="task-text">توضیحات</label>
					<textarea  class="task-input txtarea"  id="task-text" name="event" placeholder="توضیحات رویداد مورد نظر ....." ></textarea><br/>
					<div>
						<label for="task-repeat">تقویم</label>
						<select id="task-repeat" class="task-input m-2" name="type">
							<option class="" value="jalali">شمسی</option>
							<option class="" value="hijri">قمری</option>
							<option class="" value="miladi">میلادی</option>
						</select>
						<label for="off">تعطیل</label>
						<input type="checkbox" name="off" id="off" class="task-checkbox m-2">
					</div>
                    <hr>
 					<label for="task-month">ماه</label>
                    <input type="number"  min="1" max="12" pattern="[1-12]" class="task-input m-2" name="month" id="task-month" placeholder="شماره ماه رویداد"><br/>
					<label for="task-day">روز</label>
                    <input type="number" min="1" max="31" pattern="[1-31]" class="task-input m-2" name="day" id="task-day" placeholder="روز رخداد"><br/>
				</div>
            </form>
		</div>
	</div>
        <div class="modal-footer ">
            <button type="button" class="btn btn-primary " onclick="addholiday();">ذخیره</button>
            <button type="button" class="btn btn-outline-secondary " onclick="handleModalClose()">لغو</button>
        </div>


