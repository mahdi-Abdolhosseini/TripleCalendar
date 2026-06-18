String.prototype.getBaseConversionNumber = getBaseConversionNumber
String.prototype.CvnFromTo = CvnFromTo;
String.prototype.convertDigits = convertDigits;

const domain  = "";
		 let a=[];
		 let trigAdd=false;		 
let trigEdit=false;		 
let trigDel=false;		 
let trigDellAll=false;	
let loader = `<div class="lds-dual-ring"></div>`;
let cnt=0;
let cnt2=0;
var today = Date.now();
const todayFa = {
	"day": getDateFormat(today, {
		"day": "2-digit"
	}),
	"month": getDateFormat(today, {
		"month": "numeric"
	}),
	"monthTitle": getDateFormat(today, {
		"month": "long"
	}),
	"year": getDateFormat(today, {
		"year": "numeric"
	}),
	"dayWeek": getDateFormat(today, {
		"weekday": "long"
	}),
}

//console.log(todayFa);
// index month to label
const monthLabel = [
	"فروردین",
	"اردیبهشت",
	"خرداد",
	"تیر",
	"مرداد",
	"شهریور",
	"مهر",
	"آبان",
	"آذر",
	"دی",
	"بهمن",
	"اسفند",
];
const metaYear = {
    year: todayFa['year'].convertDigits("fa"),
    metaYear: [
        "March - April 2025 | رمضان - شوال - ١٤٤٦",
        "April - May 2025 | شوال - ذوالقعده - ١٤٤٦",
        "May - June 2025 | ذوالقعده - ذوالحجه - ١٤٤٦",
        "June - July 2025 | ذوالحجه - محرم - ١٤٤٦",
        "July - August 2025 | محرم - صفر - ١٤٤٧",
        "August - September 2025 | صفر - ربيع الاول - ١٤٤٧",
        "September - October 2025 | ربيع الاول - ربيع الثاني - ١٤٤٧",
        "October - November 2025 | جمادي الاولي - ١٤٤٧",
        "November - December 2025 | جمادي الثانيه - ١٤٤٧",
        "December 2025 - January 2026 | رجب - ١٤٤٧",
        "January - February 2026 | شعبان - رمضان - ١٤٤٧",
        "February - March 2026 | رمضان - ١٤٤٧",
    ]
}
const headDOM = document.getElementsByTagName("head")[0];

const parentDateDOM = document.getElementsByClassName('num-dates')[0];
const parentMetaYearDOM = document.getElementsByClassName('year-wrapper')[0];
const parentEventsDOM = document.getElementsByClassName('calendar-left')[0];

const todayDateDOM = document.getElementsByClassName("num-date")[0];
const todayDayDOM = document.getElementsByClassName("day")[0];

// set Property
todayDateDOM.textContent = todayFa['day'].convertDigits("fa");
todayDayDOM.textContent = todayFa['dayWeek'].convertDigits("fa");
//click out of modal
window.onclick=function(e){
const main = document.getElementById('main');
const modal = document.getElementById('modal');
const light_m = document.getElementById('light_mode');
	if(main===e.target){
		modal.classList.remove('is-open');
		main.classList.remove('modal-is-open');
	}
	else if (e.target ===light_m){
		if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
				document.documentElement.setAttribute('data-bs-theme','light')
			}
			else {
				document.documentElement.setAttribute('data-bs-theme','dark')
			}
		}
	}
// event listener
const monthLetter = document.getElementsByClassName("month-letter");
for (const element of monthLetter) {
	element.onclick = function (e) {
		const thisElement = e.target;
		if (thisElement.classList.contains("active-season-cr")) return;
		
		const monthDataNumber = thisElement.getAttribute("data-num");
		activeMonthElement('dynamic-element', `dynamic-element-${monthDataNumber}`, 'active-element');
		activeMonthElement('month-letter', `month-letter-${monthDataNumber}`, 'active-season-cr');
	}
}

let season = getSeasonByMonNum(todayFa.month);
let cssSeason = getCssBySeason(season);

let styleCustom = document.getElementById("style-cln");

if (!styleCustom)
	headDOM.innerHTML += `<style id="style-cln">${cssSeason}</style>`;
else {
	styleCustom.innerHTML = cssSeason;
}

let monthCounter = 1;
for (const month of calendarObject) {
	cnt=0;

	const dateList = [];
	let liCounter = 0;
	let UlCounter = 1;
	let oneStarted = false;
	let tmpMetaYear = metaYear.metaYear[monthCounter - 1];
	tmpMetaYear = tmpMetaYear.split(" | ");

	parentMetaYearDOM.innerHTML += generateTemplateHTML("metaYear", {
		index: monthCounter,
		year: metaYear.year,
		arabic: tmpMetaYear[1],
		miladi: tmpMetaYear[0],
	});
	for (const day of month) {
		  cnt++;
		const currentMonth = monthLabel[monthCounter-1];
	
		
		if (day[5])
			oneStarted = false;
		else {
			oneStarted = true;
			dateList.push(day[0]);
		}
		var ulCurrentClass = `wk-${monthCounter}-${UlCounter}`;

		if (liCounter == 7) {
			document.getElementsByClassName(ulCurrentClass)[0].innerHTML += "<div class=\"clearfix\"></div>";
			liCounter = 0;
			UlCounter++;
		}

		ulCurrentClass = `wk-${monthCounter}-${UlCounter}`;

		var ulCurrent = document.getElementsByClassName(ulCurrentClass)[0];

		if (!ulCurrent) {
			var htmlUL = '';
			htmlUL += `<ul class="week ${ulCurrentClass} month-${monthCounter} dynamic-element dynamic-element-${monthCounter}"></ul>`;
			parentDateDOM.innerHTML += htmlUL;
			ulCurrent = document.getElementsByClassName(ulCurrentClass)[0];
		}
		let liClass = "day-element ";
		let liClick = "";
		//let liId = "";
		if (!oneStarted)
			liClass += "disable-one ";
		else if (oneStarted)
			liClass += `date-${monthCounter}-${day[0].convertDigits("en")} `;
		// console.log(day[3]);
		if (day[3] === true)
			liClass += "holiday ";
	bdg='';////////////////////////////////////
	if ( day[6].length >0) //{
		bdg = `<small class="bdgs"></small>`;
		// liClass += "bdg ";
		// 	// liId = `${monthCounter}-${day[0].convertDigits("en")}`;
		// 	liClick = `onclick= "handleModal('${monthCounter},${day[0].convertDigits("en")}');"`;
		// }else {
		//  liId = `${monthCounter}-${day[0].convertDigits("en")}`;
		liClick = `onclick= "handleModal(${monthCounter},${day[0].convertDigits("en")});"`;
		// }
	////////////////////////////////////
	////////////////////////////////////
	ulCurrent.innerHTML += generateTemplateHTML('date', {
			class: liClass,
			bdg : bdg,
			jalali: day[0].toString().convertDigits("fa"),
			click: liClick,
			miladi: day[1],
			ghamari: day[2].toString().convertDigits("ar"),
		});

		const eventClass = `event-list-${monthCounter}`;
		let eventDOM = document.getElementsByClassName(eventClass)[0];
		if (!eventDOM) {
			parentEventsDOM.innerHTML += `<ul class="events-list event-list-${monthCounter} dynamic-element dynamic-element-${monthCounter}"></ul>`;
			eventDOM = document.getElementsByClassName(eventClass)[0];
		}
		for (const dayElement of day[4]) {
			const indexBracket = dayElement.indexOf("[");
			const eventdate = (0 <= indexBracket) ? dayElement.substring(indexBracket) : "";
			
			const eventTitle = dayElement.replace(eventdate, "");
			const startedDate = dateList[dateList.length - 1];
			
			if (oneStarted) {
				eventDOM.innerHTML += generateTemplateHTML('events', {
					day: `${startedDate} ${currentMonth}`.convertDigits("fa"),
					eventTitle: eventTitle,
					date: eventdate,
				});
			}
		}

		liCounter++;

	}

	monthCounter++;
}

activeMonthElement('dynamic-element', `dynamic-element-${todayFa.month}`, 'active-element');
activeMonthElement('month-letter', `month-letter-${todayFa.month}`, 'active-season-cr');
activeMonthElement('day-element', `date-${todayFa.month}-${parseInt(todayFa.day)}`, 'active-season');
function getSeasonByMonNum(numMonth) {
	const monthSeason = [
		"spring",
		"summer",
		"fall",
		"winter",
	];

	let season = "";

	if (numMonth <= 3) {
		season = monthSeason[0];
	} else if (3 < numMonth && numMonth <= 6) {
		season = monthSeason[1];
	} else if (6 < numMonth && numMonth <= 9) {
		season = monthSeason[2];
	} else if (9 < numMonth && numMonth <= 12) {
		season = monthSeason[3];
	}

	return season;
}

function getCssBySeason(season) {
	const cssObjects = cssProperty[season];
	let cssString = "";
	for (const cssObject of cssObjects) {
		let template = `${cssObject['selector']}{\n`;
		for (const property of cssObject['property']) {
			template += `${property}\n`;
		}
		template += "}\n\n"
		cssString += template;
	}

	return cssString;
}

function getDateFormat(uDate, option) {
	let date = new Intl.DateTimeFormat('fa-IR', option).format(uDate);
	date = date.convertDigits("en");
	return date;
}

function activeMonthElement(allCls, whichCls, activeCls) {
	const dynamicElement = document.getElementsByClassName(allCls);
	for (const element of dynamicElement) {
		if (element.classList.contains(activeCls))
			element.classList.remove(activeCls);
		else if (element.classList.contains(whichCls))
			element.classList.add(activeCls);
	}
}

function generateTemplateHTML(type, data) {
	let htmlTemplate = '';
	//cnt++;
	// if (String(data.class).includes('bdg')) bdg=`<small id="b-${data.id}"></small><small class="b_s"></small></li>`;
	// console.log(bdg);
	
	if ( String(data.class).includes('disable') ) 
		data.click = '';
	if (type == "date")
		htmlTemplate = `<li class="${data.class}"`+ data.click+ `index="${cnt}"><span id="jalali">${data.jalali}</span><small id="miladi">${data.miladi}</small><small id="ghamari">${data.ghamari}</small>${data.bdg}`;
	else if (type == "metaYear") {
		htmlTemplate = `<div class="year yr-${data.index} dynamic-element dynamic-element-${monthCounter}">${data.year}</div> <div class="year-meta myr-${data.index} dynamic-element dynamic-element-${monthCounter}">${data.arabic}<br>${data.miladi}</div>`;
		// htmlTemplate = `<div class="year yr-${data.index} dynamic-element dynamic-element-${monthCounter}">${data.year}</div> <div class="year-meta myr-${data.index} dynamic-element dynamic-element-${monthCounter}">${data.arabic}<br>${data.miladi}</div>`;
	} else if (type == "events") {
		htmlTemplate = `<li><span class="event-day">${data.day} </span><div class="event-title">${data.eventTitle}</div><span class="event-date-type"> ${data.date}</span></li>`;
	}
	return htmlTemplate;
}
///////////////////////////////////////////////
//////////////////////////////////////////////
function newEvent(e) {
	document.getElementById('modalfoot').classList.remove('display-none');
	//console.log(e);
	e.classList.add('display-none');
}

function resetForm() {
	document.getElementById('modalfoot').classList.add('display-none');
	document.getElementById('task-form').reset();
	document.getElementById('task-isfixed').checked=false ;
	document.getElementById('task-title').value = '';
	document.getElementById('task-text').value = '';
	document.getElementById('task-isfixed').checked = false;
	document.getElementById('task-repeat').selectedIndex = 2;
	document.getElementsByClassName('newevent')[0].classList.remove('display-none');

}

function handleModal(m,d) {
  const main = document.getElementById('main');
  const modal = document.getElementById('modal');
  months=Number(m);
  days=Number(d);
  modal.classList.add('is-open'); 
  main.classList.add('modal-is-open');
  m= document.getElementsByClassName('active-season-cr');
  let liClassE='';
  let html = '';
  html +=`<div class="modalHead active-season">
  			<button class="close" onClick="handleModalClose()">X</button>
			<span class="monthHeader">${String(days).convertDigits('fa')}  ${m[0].innerText} ${String(metaYear.year).convertDigits('fa')}</span>
		  <div class="footer ">
            <button class="clear-all text-white" onclick="handleDelAll(${months},${days});">حذف همه</button>
            <div style="margin: auto;"> شما <span class="task-count">${liClassE.length}</span> رویداد برای امروز ثبت کرده اید</div>
          </div>
		  </div>`;	
 html +=`<div class="modalMain" id="modalMain">
		</div>`;
 html +=`<button type="button" class="add-btn newevent text-white " onclick="newEvent(this);">${svg_new}</button>
		<div class="modalFoot active-season display-none" id="modalfoot" >
			<div class="form-container">
              <form class="task-form" id="task-form" >
				<div class="task-input1">
					<input type="text" class="task-input" name="1"  id="task-title" placeholder="عنوان رویداد مورد نظر ....." />
					<span>تکرار</span>
					<select id="task-repeat" class="task-input" name="2">
						<option class="" value="0">روزانه</option>
						<option class="" value="1">ماهانه</option>
						<option class="" value="2">سالانه</option>
					</select>
					<!-- <span >یادآوری</span>
					<select id="task-notif" class="task-input" name="3" >
						<option class="" value="1">روزانه</option>
						<option class="" value="2">ماهانه</option>
						<option class="" value="3">سالانه</option>
					</select> !-->
					<span >هشدار</span><input type="checkbox" id="task-isfixed" class="task-checkbox">
				</div>
			  <div class="task-input1">
				<textarea  class="task-input txtarea"  id="task-text" name="4" placeholder="توضیحات رویداد مورد نظر ....." /></textarea>		  
			  </div>
 			  <button type="button" class="add-btn addevent text-white" onclick="handleAdd(${months},${days},'n');">${svg_confirm}</button>
 			  <button type="button" class="cancel-btn text-white " onclick="resetForm();">${svg_cancel}</button>
             </form>
        	</div>
		</div>
		`;
  modal.innerHTML=html;
	openEmptyModal(months);
	dayindex=document.getElementsByClassName(`date-${months}-${days}`)[0].getAttribute('index');
	liClassE=calendarObject[months-1][dayindex-1][6];
		document.getElementById('tasksItems').innerHTML = 
								handleTaskLists(liClassE,months,days);
}

function handleTaskLists(data,months,days) {
	let html=``;
	let x=``;
	  for (j=0; j <= data.length-1; j++) {
		//console.log(data[j]);
		let lst = data[j].split(':');
		// x=crypto.randomUUID();
		x=lst[2];
		html +=`<tr id="itm-${x}" class="itm-${x}" >
					<td class="td_task"><form class="task-form" id="task-form">
						<a class="delete-btn" onClick="handleDelete(${months},${days},'${x}');">${svg_delete}</a>
						<a class="delete-btn" onClick="handleEdit(${months},${days},'${x}');">${svg_edit}</a>
						<a class="delete-btn" onClick="showText('${x}')">${svg_detail}</a>
						</form>
					</td>
					<td class="td_task2"><li ><span class="event-day" >${lst[0]}</span><em class="display-none " >${lst[1]}</em></li></td>
					 <input type="hidden" value=${lst[3]} data="${lst[4]}" />
				</tr>`;
		document.getElementsByClassName('task-count')[0].innerText++
	}
 return html;
}

function handleModalClose() {
  const modal = document.getElementById('modal');
  const main = document.getElementById('main');
  modal.classList.remove('is-open');
  main.classList.remove('modal-is-open');
  modal.innerHTML='';
}

function openEmptyModal (months) {
const modalMain = document.getElementById("modalMain");
const tUl = document.createElement('ul');
    	// tUl.setAttribute('data-id', task.id);
const tTable = document.createElement('table');
const tTbody = document.createElement('tbody');
// const tTr = document.createElement('tr');
// const tTd = document.createElement('td');
// const tForm = document.createElement('form');
// const tA = document.createElement('a');
// const tA2 = document.createElement('a');
// const tTd2 = document.createElement('td');
// const tSpan = document.createElement('span');
// const tLi = document.createElement('li');
//let dates=dts.split(',');

	tUl.classList.add(`events-list`,`event-list-${months}`,`dynamic-element`,`dynamic-element-${months}`,`active-element`);
	tTbody.setAttribute('id', 'tasksItems');
	// tForm.classList.add('task-form');
	// 	tForm.setAttribute('id','task-form');
	// 	tA.classList.add('delete-btn');
	// 		tA.setAttribute('onclick',`handleDelete('${dates,1}')`);
	// 		tA.textContent="×";
	// 	tA2.classList.add('delete-btn');
	// 		tA2.setAttribute('onclick',`handleEdit('${dates}')`);
	// 		tA2.textContent="×";

	// 	tForm.appendChild(tA);
	// 	tForm.appendChild(tA2);
	// tTd.classList.add('td_task');
	// tTd2.classList.add('td_task2');
	// tTd.appendChild(tForm);
	// tSpan.classList.add('event-day');
	// tSpan.textContent='sssssss';
	// tLi.appendChild(tSpan);
	// tTd2.appendChild(tLi);
	// tTr.appendChild(tTd);
	// tTr.appendChild(tTd2);
	
	// tTbody.appendChild(tTr);
	tTable.appendChild(tTbody);
	tUl.appendChild(tTable);

// console.log(aa.length);
modalMain.appendChild(tUl);
}

function handleAdd(mm,dd,type) {
	const modal = document.getElementById('tasksItems');
	const title = document.getElementById('task-title');
	const text = document.getElementById('task-text');
	const fixed = document.getElementById('task-isfixed');
	const repeat = document.getElementById('task-repeat');
	//const notif = document.getElementById('task-notif');
	// const inpt3 = document.getElementById('task-input');
	const counter = document.getElementsByClassName('task-count');
	months=mm;
	days=dd;
	const dayindex = document.getElementsByClassName(`date-${months}-${days}`)[0].getAttribute('index');
	let elcounter = document.getElementsByClassName(`date-${months}-${days}`)[0].children.length;
	let html = ``;
	//console.log(elcounter);
	//console.log('1 : ',calendarObject[months-1][dayindex-1][6]);
	if (type === 'n') {
		if((title.value!='') && (trigAdd!=true)){
			trigAdd=true;
			document.getElementsByClassName('addevent')[0].innerText = '' ;
			document.getElementsByClassName('addevent')[0].insertAdjacentHTML ( 'beforeend',loader);
			document.getElementsByClassName('addevent')[0].disabled = true;
			cnt=counter[0].innerText + 1;
			const payload = {
			month : months,
			day : days,
			title : String(title.value),
			text : String(text.value),
			fixed : fixed.checked,
			repeat : repeat.value,
			};
			fetch(`${domain}addevents.php`, {
				method : 'POST',
				headers : {"Content-Type" : "application/json"},
				body : JSON.stringify(payload)
			})
			.then(res =>{if (!res.ok) throw new Error('خطای سمت سرور');return res.json();})
			.then(data =>{
				document.getElementById('modalfoot').classList.add('display-none');
				document.getElementsByClassName('newevent')[0].classList.remove('display-none');
				calendarObject[months-1][dayindex-1][6].unshift(`${payload.title}:${payload.text}:${data.id}:${repeat.value}:${fixed.checked}`);
				html = handleTaskLists(Array (`${payload.title}:${payload.text}:${data.id}`), months,days);
				modal.insertAdjacentHTML ( 'afterbegin',html);
				console.log(data);
				console.log(calendarObject[months-1][dayindex-1]);
				if (elcounter <= 3)
					document.getElementsByClassName(`date-${months}-${days}`)[0].insertAdjacentHTML ( 'beforeend','<small class="bdgs"></small>');
				resetForm();
				trigAdd=false;
				document.getElementsByClassName('addevent')[0].innerHTML=`${svg_confirm}`;
				document.getElementsByClassName('addevent')[0].disabled = false;
			})
			.catch(err => {
				alert('خطا');
				document.getElementsByClassName('addevent')[0].innerHTML=`${svg_confirm}`;
				document.getElementsByClassName('addevent')[0].disabled = false;
				console.error ( "خطا", err );
				trigAdd=false;})
		}

	}else {
		if((title.value!='') && (trigEdit!=true)){
			if (window.confirm('آیااز تغییر مطمئن هستید؟') == true) {
			trigEdit = true;
			//cnt=counter[0].innerText + 1;
			document.getElementsByClassName('addevent')[0].innerText = '' ;
			document.getElementsByClassName('addevent')[0].insertAdjacentHTML ( 'beforeend',loader);
			document.getElementsByClassName('addevent')[0].disabled = true;
			const payload = {
				month : months,
				day : days,
				title : String(title.value),
				text : String(text.value),
				fixed : fixed.checked,
				repeat : repeat.value,
				//notif : notif.value,
				id : type
				};
			fetch(`${domain}changeevents.php`, {
				method : 'POST',
				headers : {"Content-Type" : "application/json"},
				body : JSON.stringify(payload)
			})
			.then(res =>{if (!res.ok) throw new Error('nooooooooooooo');return res.text();})
			.then(data =>{
				document.getElementById('modalfoot').classList.add('display-none');
				document.getElementsByClassName('newevent')[0].classList.remove('display-none');
				fix = document.getElementById(`itm-${type}`).querySelector('input');

				spanEle = document.getElementById(`itm-${payload.id}`).querySelector('span');
				emEle = document.getElementById(`itm-${payload.id}`).querySelector('em');

				spanEle.innerText = String(title.value);
				emEle.innerText = String(text.value);

				//console.log('0 : ',dayindex);
				//console.log('1 : ',calendarObject[months-1][dayindex-1][6]);
				var i=0;
				len=calendarObject[months-1][dayindex-1][6].length;
				for(i=0; i< len; i++) {
					//console.log('ele : ',repeat.value);
					temp=calendarObject[months-1][dayindex-1][6][i].split(':');
					//console.log(i,'-',temp);
					if (temp[2]==type) {
						temp[0] = String(title.value) ;
						temp[1] = String(text.value);
						//temp[2] = type;
						temp[3] = repeat.value;
						temp[4] = Number(fixed.checked);
						ii=i;
						i=len;
						//element = `${temp[0]}:${temp[1]}:${temp[2]}:${temp[3]}:${temp[4]}` ;

					}
			}
			//console.log(i,'-',temp);
			calendarObject[months-1][dayindex-1][6][ii] = `${temp[0]}:${temp[1]}:${temp[2]}:${temp[3]}:${temp[4]}`;
			fix.value = temp[3];
			fix.setAttribute('data',temp[4]);
			//console.log(calendarObject[months-1][dayindex-1][6][i]);

			//document.getElementById('task-form').reset();
			//title.value = '';
			//document.getElementById('task-isfixed').checked=false ;
			//repeat.value = 3; // 
			//notif.value = 3;
			//text.value = '';
			resetForm();
			trigEdit = false;
			//cnt=counter[0].innerText + 1;
			document.getElementsByClassName('addevent')[0].innerText = `${svg_confirm}` ;
			document.getElementsByClassName('addevent')[0].disabled = false;

				})
				.catch(err =>{
					alert('خطا');
					document.getElementsByClassName('addevent')[0].innerText = `${svg_confirm}`;
					document.getElementsByClassName('addevent')[0].disabled = false;
					trigEdit = false;
					console.error ( "خطا", err );})
			}
		}
	}
return 0;
}

function handleEdit(months,days,id) {
	document.getElementById('modalfoot').classList.remove('display-none');
	element = document.getElementById(`itm-${id}`).querySelector('span');
	detail = document.getElementById(`itm-${id}`).querySelector('em');
	fix = document.getElementById(`itm-${id}`).querySelector('input');
	//rep = document.getElementById(`itm-${id}`).querySelector('select');
		//editEvent = prompt(element.innerText);
	//const modal = document.getElementById('tasksItems');
	 title = document.getElementById('task-title');
	 text = document.getElementById('task-text');
	 fixed = document.getElementById('task-isfixed');
	 repeat = document.getElementById('task-repeat');
	//const notif = document.getElementById('task-notif');
	//const identifire= document.getElementById('identifire');
	//m=element.innerText.split(':');
	title.value = element.innerText;
	//console.log(element.innerText);
	//repeat[Number(fix.value)].selected=true ; // 
	//notif.value = 3;
	text.value = detail.innerText;
	(fix.getAttribute('data') === '0') ? fixed.checked = false : fixed.checked= true ;
	console.log(fix.value);
	repeat.selectedIndex= fix.value;
	//identifire.value=id;
	btn= document.getElementsByClassName('addevent');
	btn[0].setAttribute('onclick','handleAdd('+months+','+days+','+id+')');
	
const dayindex = document.getElementsByClassName(`date-${months}-${days}`)[0].getAttribute('index');
console.log(calendarObject[months-1][dayindex-1][6]);
}

function handleDelete(months,days,id) {
	if(window.confirm('آیا از حذف مطمئن هستید؟')==true) {
		let title= document.getElementById(`itm-${id}`).querySelector(`span`).innerText;
		let detail= document.getElementById(`itm-${id}`).querySelector(`em`).innerText;
		let dayindex=document.getElementsByClassName(`date-${months}-${days}`)[0].getAttribute('index');
		// console.log(dayindex);
		// console.log(calendarObject[months-1][dayindex-1][6]);
		let el = document.getElementsByClassName(`itm-${id}`);
		// console.log(calendarObject[months-1][dayindex-1][6].length);
		//let i=0;
		// let j=0;
		// let indy=0;
		//m=selctd.split(':');
		//console.log(title);
		const payload = {
			id :id
		};
		fetch(`${domain}delevents.php`, {
			method : 'POST',
			headers: [
				["Content-Type", "application/json"],
				["Content-Type", "text/plain"]
			],
			credentials: "include",
			body : JSON.stringify(payload)
		})
		.then(res => res.text())
		.then(data => {
			if (data == 'ok'){
				let i=0;
				temp=calendarObject[months-1][dayindex-1][6];
				//console.log(temp.length);
				for(let i=0;i < temp.length;i++){
					//console.log('6 : ',calendarObject[months-1][dayindex-1][6][i]);
					//console.log(`m : ${title}:${detail}:${id}`);
					t=calendarObject[months-1][dayindex-1][6][i].split(':');
					if ( `${t[0]}:${t[1]}:${t[2]}`=== `${title}:${detail}:${id}`) {
						console.log(calendarObject[months-1][dayindex-1][6][i]);
						calendarObject[months-1][dayindex-1][6].splice(i,1);
						//console.log('SDA');
						//break two loops
						//break;
						i = temp.length;
					}
				}
				el[0].remove();
				if (calendarObject[months-1][dayindex-1][6].length < 1)
					document.getElementsByClassName(`date-${months}-${days}`)[0].children[3].remove();
				document.getElementsByClassName('task-count')[0].innerText--;
			} else alret(data);
		})
		.catch(err => console.error ( "خطا", err ));

	}
}

function handleDelAll(mnth,days) {
	if(window.confirm('آیا از حذف مطمئن هستید؟')==true) {
		const modal = document.getElementById('tasksItems');
		modal.innerHTML='';
		calendarObject.splice(mnth-1,1);
		payload = {
		month : mnth,
		day : days
		};
		fetch(`${domain}deleteevents.php`, {
			method : 'POST',
			headers : {"Content-Type" : "application/json"},
			body : JSON.stringify(payload)
		})
		.then(res => res.text())
		.then(data => {	console.log('ok'); 	})
		.catch(err => console.error ( "خطا", err ))
			document.getElementsByClassName('task-count')[0].innerText =0;
			document.getElementsByClassName(`date-${mnth}-${days}`)[0].children[3].remove();
	}
}

function handleIgnore(id,months,days,event) {
	const notif_ul=document.getElementById('ntf_u');
	// console.log(event);
	// console.log(event.parentElement);
	// console.log(event.parentNode.parentNode);
	// console.log(event.parentNode.parentNode.parentNode);
	// console.log(notif_ul);
	if(window.confirm('هشدار رویداد مورد نظر حذف شود؟')==true) {
		let dayindex=document.getElementsByClassName(`date-${months}-${days}`)[0].getAttribute('index');
		const payload = {
			id :id
		};
		fetch(`${domain}ignore.php`, {
			method : 'POST',
			headers: [
				["Content-Type", "application/json"],
				["Content-Type", "text/plain"]
			],
			credentials: "include",
			body : JSON.stringify(payload)
		})
		.then(res => res.text())
		.then(data => {
			if (data=="ok"){
				//modal = document.getElementById('modal');
				if (document.getElementById('modal').classList.contains('is-open'))
					handleModalClose();
				let i=0;
				temp=calendarObject[months-1][dayindex-1][6];
				for(let i=0;i < temp.length;i++){
					t = calendarObject[months-1][dayindex-1][6][i].split(':');
					if ( `${t[2]}` === `${id}`) {
						t[4]="0";
						console.log('SDA');
						calendarObject[months-1][dayindex-1][6][i]=`${t[0]}:${t[1]}:${t[2]}:${t[3]}:${t[4]}`;
						i = temp.length;
					}
				}
				//svg.a.div.li
				event.parentNode.parentNode.parentNode.remove();
				if(notif_ul.getElementsByTagName("li").length < 1){
					notif_ul.innerHTML +='<li><h6 class="content text-end">لیست خالی است</h6></li>';
					document.getElementsByClassName("reddot")[0].remove();
				}
				// window.location.href = window.location.href;
				// window.location.reload();
			}
			console.log(data);
		})
		.catch(err => console.error ( "خطا", err ));

	}
}

//show event description
function showText(id){
	var tbdy = document.getElementById('tasksItems');
	var arr = tbdy.getElementsByTagName('em');
	x = document.getElementById(`itm-${id}`).querySelector('em');
	if (x.classList.contains ('display-none')){
		for( i=0; i < arr.length; i++) {
			if (arr[i].classList.contains ('display-none')) {
				//arr[i].style.display='none';
				//arr[i].classList.remove('display-none');
				}else {
					arr[i].classList.add('display-none');
				}
		}
		x.classList.remove('display-none');
	}else{
		x.classList.add('display-none');
	}
	//xx = x.getElementsByTagName('em');
	//console.log(x);
}

function call_add(uri,body){
	
}
function convertDigits(to) {
	let str = this;
	const toCvn = (this.getBaseConversionNumber(to))[to];
	const allDigits = this.getBaseConversionNumber("all");

	delete allDigits[to];

	const Objkeys = Object.keys(allDigits);
	for (var i = 0; i < Objkeys.length; i++) {
		const currentKey = Objkeys[i];
		const fromCvn = allDigits[currentKey];
		str = this.CvnFromTo(fromCvn, toCvn, str)
	}
	return str;
}

function CvnFromTo(fromDigits, toDigits, str) {
	var str = str == undefined ? this : str;
	for (var i = 0; i < toDigits.length; i++) {
		const currentFromDigit = fromDigits[i];
		const currentToDigit = toDigits[i];
		const regex = new RegExp(currentFromDigit, 'g');
		str = str.replace(regex, currentToDigit);
	}
	return str;
}

function getBaseConversionNumber(label) {
	const faDigits = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
	const enDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	const arDigits = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'];

	var whichDigit = {};

	switch (label) {
		case 'fa':
			whichDigit[label] = faDigits;
			break;
		case 'en':
			whichDigit[label] = enDigits;
			break;
		case 'ar':
			whichDigit[label] = arDigits;
			break;
		case 'all':
			whichDigit = {
				"fa": faDigits,
				"en": enDigits,
				"ar": arDigits
			};
			break;
		default:
			whichDigit = [];
	}

	return whichDigit;
}

window.onkeyup = function(e){
	const keyName = e.code;
	let action = null;
	
	if(keyName == "ArrowLeft"){
		action = "DECREASE";
	}else if(keyName == "ArrowRight"){
		action = "INCREASE";
	}else{
		return;
	}
	
	const activeMonthDOM = document.getElementsByClassName("active-season-cr")[0];
	const numberMonth = activeMonthDOM.getAttribute("data-num");
	
	let numberMonthFinal = 0;
	
	if(action == "INCREASE"){
		numberMonthFinal = parseInt(numberMonth) + 1;
	}else if(action == "DECREASE"){
		numberMonthFinal = parseInt(numberMonth) - 1;	
	}
	
	if(numberMonthFinal == 13){
		numberMonthFinal = 1;
	}
	if(numberMonthFinal == 0 ){
		numberMonthFinal = 12;
	}
	
	const newMonthDOM = document.getElementsByClassName("month-letter")[(numberMonthFinal-1)];
	
	const eventClick = new Event("click");
	
	newMonthDOM.dispatchEvent(eventClick);
}
