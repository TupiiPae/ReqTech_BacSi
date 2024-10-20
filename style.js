// Thêm tên bác sĩ
document.getElementById('doctorName').textContent = 'Nguyễn Văn A';

// Xử lý chuyển đổi giữa các trang
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(targetId).classList.remove('hidden');
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');
    });
});


// Thêm chức năng đánh dấu lịch hẹn đã hoàn thành
document.getElementById('appointmentList').addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.style.textDecoration = e.target.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    }
});

// Hàm hiển thị giao diện dựa trên sectionId
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Thêm sự kiện cho các nút "Hủy" hoặc "Trở về"
document.querySelectorAll('.cancel-button').forEach(button => {
    button.addEventListener('click', function() {
        showSection('dashboard'); // Quay về Dashboard
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const scheduleForm = document.getElementById('work-schedule-form');
    const scheduleList = document.getElementById('schedule-list');
    const addScheduleButton = document.getElementById('add-schedule-button');
    const updateScheduleButton = document.getElementById('update-schedule-button');

    let schedules = [];
    let editIndex = null; // To track the index of the schedule being edited

    // Handle adding/updating work schedules
    scheduleForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const workDay = document.getElementById('work-day').value;
        const workDate = document.getElementById('work-date').value;
        const startTime = document.getElementById('start-time').value;
        const endTime = document.getElementById('end-time').value;

        if (!workDay || !workDate || !startTime || !endTime || startTime >= endTime) {
            alert('Vui lòng nhập đầy đủ và đúng giờ làm việc!');
            return;
        }

        // If editing, update the schedule
        if (editIndex !== null) {
            schedules[editIndex] = { workDay, workDate, startTime, endTime };
            editIndex = null; // Reset edit index after updating
            toggleUpdateButton(false); // Hide the update button
        } else {
            // Add a new schedule
            schedules.push({ workDay, workDate, startTime, endTime });
        }

        renderScheduleList();
        scheduleForm.reset();
    });

    function renderScheduleList() {
        scheduleList.innerHTML = '';

        schedules.forEach((schedule, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${schedule.workDay}</td>
                <td>${schedule.workDate}</td>
                <td>${schedule.startTime}</td>
                <td>${schedule.endTime}</td>
                <td>
                    <button class="edit-button" data-index="${index}">Cập nhật</button>
                    <button class="delete-button" data-index="${index}">Xóa</button>
                </td>
            `;

            scheduleList.appendChild(row);
        });

        // Attach event listeners for delete and edit buttons
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                schedules.splice(index, 1);
                renderScheduleList();
            });
        });

        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', (event) => {
                editIndex = event.target.dataset.index; // Set the index of the schedule to be edited
                const scheduleToEdit = schedules[editIndex];

                // Populate the form with existing schedule details
                document.getElementById('work-day').value = scheduleToEdit.workDay;
                document.getElementById('work-date').value = scheduleToEdit.workDate;
                document.getElementById('start-time').value = scheduleToEdit.startTime;
                document.getElementById('end-time').value = scheduleToEdit.endTime;

                // Show the update button and hide the add button
                toggleUpdateButton(true);
            });
        });
    }

    function toggleUpdateButton(show) {
        addScheduleButton.classList.toggle('hidden', show);
        updateScheduleButton.classList.toggle('hidden', !show);
    }
});


// Hàm hiển thị giao diện theo sectionId
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Điều hướng khi nhấn vào liên kết trên sidebar
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = e.target.getAttribute('data-target');
        showSection(target);
    });
});

// Hiển thị hồ sơ chi tiết
document.querySelectorAll('.view-profile-button').forEach(button => {
    button.addEventListener('click', function () {
        const petName = this.dataset.pet;
        const petSpecies = this.dataset.species;
        const ownerName = this.dataset.owner;
        const ownerPhone = this.dataset.phone;
        const petDisease = this.dataset.disease;

        document.getElementById('detail-pet-name').innerText = petName;
        document.getElementById('detail-pet-species').innerText = petSpecies;
        document.getElementById('detail-owner-name').innerText = ownerName;
        document.getElementById('detail-owner-phone').innerText = ownerPhone;
        document.getElementById('detail-disease').innerText = petDisease;

        showSection('patient-details');
    });
});

// Quay lại từ giao diện hồ sơ chi tiết
document.querySelector('.cancel-button').addEventListener('click', function () {
    showSection('patients');
});


