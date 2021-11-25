let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    console.log("Called Event");
    employeePayrollList = getDateFromLocalStorage();
    document.querySelector('.emp-count').textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem("edit-emp");

})

const createInnerHtml = () => {
    console.log("Loading inner html");
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th>" +
        "<th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
    for (let empPayrollData of employeePayrollList) {
        innerHtml = `${innerHtml}
            <tr>
            <td><img class="profile" alt="" src ="${empPayrollData._profilePic}"></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDepartmentHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${strigifyDate(empPayrollData._startDate)}</td>
            <td>
                <img id ="${empPayrollData._id}" src="E:\EmployeeUI\assests\delete-black-18dp.svgs" alt="Delete" onClick=remove(this)>
                <img id ="${empPayrollData._id}" src="assests\create-black-18dp.svg" alt="Edit" onClick=update(this)>
            </td>
        </tr>`
        ;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const getDepartmentHtml = (data) => {
    let deptHtml = '';
    for (let dept of data) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`;
    }
    return deptHtml;
}

const getDateFromLocalStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const remove = (data) => {

    let employeeData = employeePayrollList.find(empData => empData._id == data.id);
    if (!employeeData) {
        return;
    }
    const index = employeePayrollList.map(empData => empData._id).indexOf(employeeData._id);
    employeePayrollList.splice(index, 1);
    localStorage.setItem('EmployeePayrollList', JSON.stringify(employeePayrollList));
    document.querySelector('.emp-count').textContent = employeePayrollList.length;
    createInnerHtml();
}

const update = (data) => {
    let employeeData = employeePayrollList.find(empData => empData._id == data.id);
    if (!employeeData) {
        return;
    }
    localStorage.setItem('edit-emp', JSON.stringify(employeeData));
    window.location.replace(site_properties.add_employee_page);
}