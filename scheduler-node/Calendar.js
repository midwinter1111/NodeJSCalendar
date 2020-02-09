/**
 * Calendar in JavaScript
 * 
 * reffer to: http://cly7796.net/wp/javascript/create-a-calendar-with-javascript/
 */

window.onload = function() {
    // get current year and month
    var current = new Date();
    var year = current.getFullYear();
    var month = current.getMonth() + 1;
 
    // display calendar
    var wrapper = document.getElementById('calendar');
    addCalendar(wrapper, year, month);
}

function addCalendar(wrapper, year, month) {
    wrapper.textContent = null;
 
    var headData = generateCalendarHeader(wrapper, year, month);
    var bodyData = generateMonthCalendar(year, month);
 
    wrapper.appendChild(headData);
    wrapper.appendChild(bodyData);
}

function generateCalendarHeader(wrapper, year, month) {
    // get previous month and next month
    var nextMonth = new Date(year, (month - 1));
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    var prevMonth = new Date(year, (month - 1));
    prevMonth.setMonth(prevMonth.getMonth() - 1);
 
    // Header element
    var cHeader = document.createElement('div');
    cHeader.className = 'calendar-header';
 
    // add title
    var cTitle = document.createElement('div');
    cTitle.className = 'calendar-header__title';
    var cTitleText = document.createTextNode(year + '年' + month + '月');
    cTitle.appendChild(cTitleText);
    cHeader.appendChild(cTitle);
 
    // add 'previous' button
    var cPrev = document.createElement('button');
    cPrev.className = 'calendar-header__prev';
    var cPrevText = document.createTextNode('prev');
    cPrev.appendChild(cPrevText);
    cPrev.addEventListener('click', function() {
        addCalendar(wrapper, prevMonth.getFullYear(), (prevMonth.getMonth() + 1));
    }, false);
    cHeader.appendChild(cPrev);
 
    // add 'next' button
    var cNext = document.createElement('button');
    cNext.className = 'calendar-header__next';
    var cNextText = document.createTextNode('next');
    cNext.appendChild(cNextText);
    cNext.addEventListener('click', function() {
        addCalendar(wrapper, nextMonth.getFullYear(), (nextMonth.getMonth() + 1));
    }, false);
    cHeader.appendChild(cNext);
 
    return cHeader;
}

function generateMonthCalendar(year, month) {
    var weekdayData = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // get calendar data 
    var calendarData = getMonthCalendar(year, month);
 
    var i = calendarData[0]['weekday'];
    //　fill in the blank
    while(i > 0) {
        i--;
        calendarData.unshift({
            day: '',
            weekday: i
        });
    }
    var i = calendarData[calendarData.length - 1]['weekday'];
    // fill in the blank
    while(i < 6) {
        i++;
        calendarData.push({
            day: '',
            weekday: i
        });
    }
 
    // make calendar element
    var cTable = document.createElement('table');
    cTable.className = 'calendar-table';
 
    var insertData = '';
    // make week element
    insertData += '<thead>';
    insertData += '<tr>';
    for (var i = 0; i < weekdayData.length; i++) {
        insertData += '<th ';
        insertData += 'align="center"';
        insertData += '>';
        if (i % 7 == 0) {
            insertData += '<font color="red"</font>';
        } else if (i % 7 == 6) {
            insertData += '<font color="blue"</font>';
        }
        insertData += weekdayData[i];
        insertData += '</th>';
    }
    insertData += '</tr>';
    insertData += '</thead>';

    // get holiday information
    var holidayList = getHoliday(year);
    console.log(holidayList);
 
    // make day element
    insertData += '<tbody>';
    for (var i = 0; i < calendarData.length; i++) {
        if(calendarData[i]['weekday'] <= 0) {
            insertData += '<tr>';
        }
        insertData += '<td ';
        insertData += 'align="center"';
        insertData += '>';
        if (i % 7 == 0) {
            insertData += '<font color="red"</font>';
        } else if (i % 7 == 6) {
            insertData += '<font color="blue"</font>';
        } else if (checkHoliday(year, month, calendarData[i]['day'], holidayList) ) {
            insertData += '<font color="red"</font>';
        }
        insertData += calendarData[i]['day'];
        insertData += '</td>';
        if(calendarData[i]['weekday'] >= 6) {
            insertData += '</tr>';
        }
    }
    insertData += '</tbody>';
 
    cTable.innerHTML = insertData;
    return cTable;
}

function checkHoliday(year, month, day, holidayList) {
    var currentDateString = year + '/' + month + '/' + day;
    for(var i = 0; i < holidayList.length; i++) {
        if (holidayList[i].date == currentDateString) {
            return true;
        }

    }
    return false;
}

function getMonthCalendar(year, month) {
    var firstDate = new Date(year, (month - 1), 1);
    var lastDay = new Date(year, (firstDate.getMonth() + 1), 0).getDate();
    var weekday = firstDate.getDay();
 
    var calendarData = [];
    var weekdayCount = weekday;
    for (var i = 0; i < lastDay; i++) {
        calendarData[i] = {
            day: i + 1,
            weekday: weekdayCount
        }
        if(weekdayCount >= 6) {
            weekdayCount = 0;
        } else {
            weekdayCount++;
        }
    }
    return calendarData;
}

function getHoliday(year) {
    // define the holiday information
    var holidayList = [
        {
            'name': '元日',
            'date': '1/1',
            'startY': 1949,
            'endY': 9999
        },
        {
            'name': '成人の日',
            'date': '1/15',
            'startY': 1949,
            'endY': 1999
        },
        {
            'name': '成人の日',
            'date': '1/' + happyMonday(year, 1, 2),
            'startY': 2000,
            'endY': 9999
        },
        {
            'name': '建国記念の日',
            'date': '2/11',
            'startY': 1967,
            'endY': 9999
        },
        {
            'name': '春分の日',
            'date': '3/' + shunbun(year),
            'startY': 1949,
            'endY': 9999
        },
        {
            'name': '天皇誕生日',
            'date': '4/29',
            'startY': 1949,
            'endY': 1988
        },
        {
            'name': 'みどりの日',
            'date': '4/29',
            'startY': 1989,
            'endY': 2006
        },
        {
            'name': '昭和の日',
            'date': '4/29',
            'startY': 2007,
            'endY': 9999
        },
        {
            'name': '憲法記念日',
            'date': '5/3',
            'startY': 1949,
            'endY': 9999
        },
        {
            'name': 'みどりの日',
            'date': '5/4',
            'startY': 2007,
            'endY': 9999
        },
        {
            'name': 'こどもの日',
            'date': '5/5',
            'startY': 1949,
            'endY': 9999
        },
        {
            'name': '海の日',
            'date': '7/20',
            'startY': 1996,
            'endY': 2002
        },
        {
            'name': '海の日',
            'date': '7/' + happyMonday(year, 7, 3),
            'startY': 2003,
            'endY': 9999
        },
        {
            'name': '山の日',
            'date': '8/11',
            'startY': 2016,
            'endY': 9999
        },
        {
            'name': '敬老の日',
            'date': '9/15',
            'startY': 1966,
            'endY': 2002
        },
        {
            'name': '敬老の日',
            'date': '9/' + happyMonday(year, 9, 3),
            'startY': 2003,
            'endY': 9999
        },
        {
            'name': '秋分の日',
            'date': '9/' + shubun(year),
            'startY': 1948,
            'endY': 9999
        },
        {
            'name': '体育の日',
            'date': '10/10',
            'startY': 1966,
            'endY': 1999
        },
        {
            'name': '体育の日',
            'date': '10/' + happyMonday(year, 10, 2),
            'startY': 2000,
            'endY': 9999
        },
        {
            'name': '文化の日',
            'date': '11/3',
            'startY': 1948,
            'endY': 9999
        },
        {
            'name': '勤労感謝の日',
            'date': '11/23',
            'startY': 1948,
            'endY': 9999
        },
        {
            'name': '天皇誕生日',
            'date': '12/23',
            'startY': 1989,
            'endY': 9999
        }
    ];

    var currentYearHolidayList = [];
    var count = 0;
    for (var i = 0; i < holidayList.length; i++) {
        // 指定した年にその祝日があるかどうか
        if(year >= holidayList[i]['startY'] && year <= holidayList[i]['endY']) {
 
            // 祝日の追加
            currentYearHolidayList[count] = {
                'name': holidayList[i]['name'],
                'date': year + '/' + holidayList[i]['date']
            }
            count++;
 
            var dateArr = holidayList[i]['date'].split('/');
 
            // 祝日が日曜日の場合は振替休日を追加する
            var substitute = substituteDay(year, parseFloat(dateArr[0]), parseFloat(dateArr[1]), holidayList)
            if(substitute) {
                currentYearHolidayList[count] = {
                    'name': '振替休日',
                    'date': year + '/' + substitute
                }
                count++;
            }
 
            // 翌々日が祝日の場合は国民の休日を追加する
            var national = nationalHoliday(year, parseFloat(dateArr[0]), parseFloat(dateArr[1]), holidayList);
            if(national) {
                currentYearHolidayList[count] = {
                    'name': '国民の休日',
                    'date': year + '/' + national
                }
                count++;
            }
        }
    }
    return currentYearHolidayList;
}

function shunbun(year) {
    if(year < 1900 || year > 2099) return;
    switch(year % 4) {
        case 0:
            if(year <= 1956) return 21;
            if(year <= 2088) return 20;
            return 19;
        case 1:
            if(year <= 1989) return 21;
            return 20;
        case 2:
            if(year <= 2022) return 21;
            return 20;
        case 3:
            if(year <= 1923) return 22;
            if(year <= 2055) return 21;
            return 20;
    }
    return day;
}

function shubun(year) {
    if(year < 1900 || year > 2099) return;
    switch(year % 4) {
        case 0:
            if(year <= 2008) return 23;
            return 22;
        case 1:
            if(year <= 1917) return 24;
            if(year <= 2041) return 23;
            return 22;
        case 2:
            if(year <= 1946) return 24;
            if(year <= 2074) return 23;
            return 22;
        case 3:
            if(year <= 1979) return 24;
            return 23;
    }
}

function happyMonday(year, month, num) {
    // 指定した月の1日が何曜日かを調べる
    var getDay = new Date(year, month - 1, 1).getDay();
    // 日曜日か月曜日の場合
    if(getDay <= 1) {
        var day = 2 - getDay;
    // 火曜日～土曜日の場合
    } else {
        var day = 9 - getDay;
    }
    return day + (7 * (num - 1));
}

function substituteDay(year, month, day, holidayList) {
    // 1973年以降のみ
    if(year >= 1973) {
        // 指定した日の曜日を調べる
        var date = new Date(year, month - 1, day);
        var getDay = date.getDay();
        // 日曜日の場合
        if(getDay === 0) {
            var flag = false;
 
            // 翌日が祝日でないかを調べる
            while(!flag) {
                flag = true;
                date.setDate(date.getDate() + 1);
                for (var i = 0; i < holidayList.length; i++) {
                    // 翌日が祝日の場合
                    if(date.getFullYear() >= holidayList[i]['startY'] && date.getFullYear() <= holidayList[i]['endY'] && (date.getMonth() + 1 + '/' + date.getDate()) === holidayList[i]['date']) {
                        flag = false;
                    }
                }
            }
 
            return date.getMonth() + 1 + '/' + date.getDate();
        }
    }
    return false;
}

function nationalHoliday(year, month, day, holidayList) {
    // 1988年以降のみ
    if(year >= 1988) {
        // 指定した日の翌々日を取得
        var date = new Date(year, month - 1, day);
        date.setDate(date.getDate() + 2);
 
        var holidayFlag = false;
        for (var i = 0; i < holidayList.length; i++) {
            // 指定した日の翌々日が祝日かどうかを調べる
            if(date.getFullYear() >= holidayList[i]['startY'] && date.getFullYear() <= holidayList[i]['endY'] && (date.getMonth() + 1 + '/' + date.getDate()) === holidayList[i]['date']) {
                holidayFlag = true;
            }
        }
 
        // 指定した日の翌々日が祝日の場合
        if(holidayFlag) {
            // 挟まれた日が祝日かどうかを調べる
            date.setDate(date.getDate() - 1);
            holidayFlag = false;
 
            for (var i = 0; i < holidayList.length; i++) {
                // 挟まれた日が祝日の場合
                if(date.getFullYear() >= holidayList[i]['startY'] && date.getFullYear() <= holidayList[i]['endY'] && (date.getMonth() + 1 + '/' + date.getDate()) === holidayList[i]['date']) {
                    holidayFlag = true;
                }
            }
            // 挟まれた日が祝日でない場合は国民の休日
            if(!holidayFlag) {
                return date.getMonth() + 1 + '/' + date.getDate();
            }
        }
    }
    return false;
}








