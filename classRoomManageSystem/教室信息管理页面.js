const div = document.querySelector('div');
const table = document.querySelector('.main');
const MAINtr = document.querySelectorAll('.main tr');
const course  = document.querySelectorAll('.main .course input');
const personNum = document.querySelectorAll('.main .num');
const checkBox = document.querySelectorAll('.main input[type="checkbox"]');
const text = document.querySelectorAll('.main input[type="text"]');
const edit = document.querySelectorAll('.main .edit');

const search = document.querySelector('.search');
const startSearch = document.querySelector('.startSearch');
const resultTable = document.querySelector('.searchResult table');
const searchResult = document.querySelector('.searchResult');
const close =  document.querySelector('.searchResult button');
const add  = document.querySelector('.add');
const addPanel = document.querySelector('.addPanel');
const addInfo  = document.querySelectorAll('.addPanel input');
const confirm = document.querySelector('.addPanel .confirm');
const cancel = document.querySelector('.addPanel .cancel');
const one =document.querySelector('.one');
function update() { 
    // 先移除所有checkbox的旧事件
    const oldCheckboxes = document.querySelectorAll('table input[type="checkbox"]');
    oldCheckboxes.forEach(checkbox => {
        checkbox.replaceWith(checkbox.cloneNode(true)); // 通过克隆解除旧事件
    });

    const course  = document.querySelectorAll('.course input');
    const personNum = document.querySelectorAll('table .num');
    const checkBox = document.querySelectorAll('table input[type="checkbox"]');
    const text = document.querySelectorAll('table input[type="text"]');
    const edit = document.querySelectorAll('.edit');
    for (let i = 0; i < checkBox.length; i++) {
    if(course[i].value!= "自习") {
        checkBox[i].disabled = true;
        checkBox[i].style.cursor = 'not-allowed';
    } else{
        checkBox[i].style.cursor = 'pointer';
    }
    checkBox[i].addEventListener('click', function () {
        if (this.checked) {
            setTimeout(function () {
                    personNum[i].textContent=+personNum[i].textContent+1;
                }, 1000);
            }else{
                personNum[i].textContent=+personNum[i].textContent-1;
            }
            
        })
    }

    for(let i=0;i<text.length;i++){
        text[i].disabled = true;
    }
    // 处理编辑按钮
    for(let i = 0; i < edit.length; i++) {
        // 同样先移除旧事件
        edit[i].replaceWith(edit[i].cloneNode(true));
        const newEditBtn = document.querySelectorAll('.edit')[i];
        
        newEditBtn.addEventListener('click', () => {
            for(let j = i * 3; j < (i + 1) * 3; j++) {
                if(j < text.length) {
                    text[j].disabled = !text[j].disabled;
                }
            }            
            newEditBtn.textContent = newEditBtn.textContent === '编辑' ? '完成' : '编辑';
        });
    }
}
update();

add.addEventListener('click', function () {
    addPanel.classList.toggle('active');
});

confirm.addEventListener('click', function () {
    addPanel.classList.toggle('active');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML += `
        <tr>
            <td>${tbody.rows.length}</td>
            <td><input type="text" value="${addInfo[0].value}" disabled></td>
            <td><input type="text" value="${addInfo[1].value}" disabled></td>
            <td class="course"><input type="text" value="${addInfo[2].value}" disabled></td>
            <td class="num">${addInfo[3].value}</td>
            <td>
                <input type="checkbox">
                    <svg width="40" height="40">
                    <circle fill="none" stroke="#68E534" stroke-width="2" cx="20" cy="20" r="19" class="circle" stroke-linecap="round" transform="rotate(-90 20.0 20.0) "/>
                    <polyline fill="none" stroke="#68E534" stroke-width="2.4" points="8.8,21.4 17.3,28.4 30.4,13.8" stroke-linecap="round" stroke-linejoin="round" class="tick" />
                    </svg>
            </td>
            <td><button class="long edit">编辑</button></td>
        </tr>
    `;
    update();
    MAINtr = document.querySelectorAll('.main tr'); // 重新获取所有行   
    for(let i = 0; i < addInfo.length; i++){
        addInfo[i].value = '';
    }
});
cancel.addEventListener('click', function () {
    addPanel.classList.toggle('active');
});

search.addEventListener('input', () => { 
    startSearch.addEventListener('mouseenter', () => { 
        search.classList.add('active'); 
    });

    startSearch.addEventListener('click', () => { 
        searchResult.classList.add('active');
        performSearch();
    });

    search.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            searchResult.classList.add('active');
            performSearch();
        }
    });

    // 封装搜索逻辑为单独函数
    function performSearch() {
        resultTable.innerHTML = `
            <tr>
                <th>序号</th>
                <th>教学楼</th>
                <th>教室名称</th>
                <th>课程</th>
                <th>教室当前人数</th>
                <th>申请自习</th>
                <th>操作</th>                  
            </tr>
        `;
        
        if(search.value.trim() === "") {
            resultTable.innerHTML="无搜索结果";
            return;
        }

        // 重新获取所有行，确保包含新增元素
        const currentRows = document.querySelectorAll('.main tr');
        
        currentRows.forEach((row, index) => {
            if(index === 0) return; // 跳过表头
            
            const hasMatch = Array.from(row.children).some(child => {
                const input = child.querySelector('input');
                if (input) {
                    return input.value.trim().includes(search.value.trim());
                }
                return child.textContent.trim().includes(search.value.trim());
            });
            
            if(hasMatch){
                const clonedRow = row.cloneNode(true);
                resultTable.appendChild(clonedRow);
                
                // 双向同步所有可编辑元素
                clonedRow.querySelectorAll('input').forEach((input, idx) => {
                    input.addEventListener('change', () => {
                        const originalInput = row.querySelectorAll('input')[idx];
                        if(originalInput) originalInput.value = input.value;
                    });
                });
            
                // 同步编辑按钮状态
                const clonedEditBtn = clonedRow.querySelector('.edit');
                const originalEditBtn = row.querySelector('.edit');
                clonedEditBtn.addEventListener('click', () => {
                    // console.log(originalEditBtn.textContent);
                    // console.log(clonedEditBtn.textContent+'<br>');
                    // originalEditBtn.click = clonedEditBtn.click;
                    clonedEditBtn.textContent = clonedEditBtn.textContent === '编辑' ? '完成' : '编辑';
                    clonedEditBtn.textContent = originalEditBtn.textContent;
                    update(); // 更新状态
                });
                // 同步checkbox点击事件
                const clonedCheckbox = clonedRow.querySelector('input[type="checkbox"]');
                const originalCheckbox = row.querySelector('table input[type="checkbox"]');
                const clonedPersonNum = clonedRow.querySelector('table .num');
                const originalPersonNum = row.querySelector('.num');
                
                clonedCheckbox.addEventListener('click', function() {
                    // 触发原checkbox的点击事件
                    originalCheckbox.click();
                    // console.log(originalPersonNum.textContent);
                    if(originalCheckbox.checked) {
                        setTimeout(() => {
                            clonedPersonNum.textContent = originalPersonNum.textContent;
                            // console.log("已增加"+originalPersonNum.textContent);
                        }, 1000);
                    }else{
                        clonedPersonNum.textContent = +originalPersonNum.textContent;
                    }           
                });
            }
        });
    }
});
close.addEventListener('click', () => { 
    search.classList.remove('active');
    search.value = '';
    setTimeout(() => {
        searchResult.classList.toggle('active'); 
    }, 50);
});