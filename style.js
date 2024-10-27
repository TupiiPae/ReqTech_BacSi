//------------------------------------------------------------------------------------------------------------------------------------//
// Thêm tên bác sĩ
document.getElementById('doctorName').textContent = 'TupiiPae';

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

// Hàm hiển thị giao diện dựa trên sectionId
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}


//------------------------------------------------------------------------------------------------------------------------------------//
// Thêm chức năng đánh dấu lịch hẹn đã hoàn thành
document.getElementById('appointmentList').addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.style.textDecoration = e.target.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    }
});


//------------------------------------------------------------------------------------------------------------------------------------//
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

//------------------------------------------------------------------------------------------------------------------------------------//
const customersData = {
    1: {
        name: "Nguyễn Văn A",
        phone: "0123456789",
        address: "343/18A Tô Hiến Thành",
        bookings: [
            {
                id: 1,
                date: "24/10/2023",
                time: "10:00 AM",
                service: "Khám sức khỏe tổng quát"
            },
            {
                id: 2,
                date: "23/10/2023",
                time: "2:00 PM",
                service: "Tiêm phòng"
            }
        ]
    },
    2: {
        name: "Trần Thị B",
        phone: "0987654321",
        address: "339/6E Sư Vạn Hạnh",
        bookings: [
            {
                id: 3,
                date: "22/10/2023",
                time: "11:00 AM",
                service: "Tư vấn dinh dưỡng"
            }
        ]
    }
};

// Hiển thị modal chi tiết khách hàng
function showCustomerDetails(id) {
    console.log("Opening customer details for ID:", id);
    
    const modal = document.getElementById("customer-details-modal");
    const customer = customersData[id];
    
    if (!customer) {
        console.error("Không tìm thấy thông tin khách hàng với ID:", id);
        return;
    }

    // Cập nhật thông tin khách hàng
    document.getElementById("customer-name").textContent = customer.name;
    document.getElementById("customer-phone").textContent = customer.phone;
    document.getElementById("customer-address").textContent = customer.address;

    // Cập nhật lịch sử đặt lịch
    const bookingHistory = document.getElementById("booking-history");
    bookingHistory.innerHTML = customer.bookings.map(booking => `
        <tr>
            <td>${booking.date}</td>
            <td>${booking.time}</td>
            <td>${booking.service}</td>
            <td>
                <button class="action-button delete-booking-btn" 
                        onclick="deleteBooking(${booking.id})">Xóa</button>
            </td>
        </tr>
    `).join('');

    // Hiển thị modal
    modal.classList.remove('hidden');
    modal.classList.add('show');
}

// Đóng modal
function closeModal() {
    const modal = document.getElementById("customer-details-modal");
    modal.classList.remove('show');
    modal.classList.add('hidden');
}

// Xóa lịch đặt
function deleteBooking(bookingId) {
    console.log("Deleting booking ID:", bookingId);
    const bookingRow = document.querySelector(`button[onclick="deleteBooking(${bookingId})"]`).closest("tr");
    if (bookingRow) {
        bookingRow.remove();
    }
}

// Đóng modal khi click ngoài modal
document.querySelector(".closee").onclick = function () {
    document.getElementById("customer-details-modal").style.display = "none";
};

// Thêm event listener cho các nút xem hồ sơ
document.addEventListener('DOMContentLoaded', function() {
    const viewButtons = document.querySelectorAll('.view-prof-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-customer-id');
            if (id) {
                showCustomerDetails(parseInt(id));
            }
        });
    });
});


//------------------------------------------------------------------------------------------------------------------------------------//
// Thao tác xác nhận 
let currentPetName = '';
function showConfirmModal(petName) {
    currentPetName = petName;
    document.getElementById('confirmPetName').textContent = petName;
    document.getElementById('confirmModal').style.display = 'block';
}
function showRejectModal(petName) {
    currentPetName = petName;
    document.getElementById('rejectPetName').textContent = petName;
    document.getElementById('rejectModal').style.display = 'block';
}
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
function confirmAppointment() {
    // Thực hiện logic xác nhận lịch hẹn ở đây
    alert(`Đã xác nhận lịch hẹn cho ${currentPetName}`);
    closeModal('confirmModal');
}
function rejectAppointment() {
    // Thực hiện logic từ chối lịch hẹn ở đây
    alert(`Đã từ chối lịch hẹn cho ${currentPetName}`);
    closeModal('rejectModal');
}
// Đóng modal khi click bên ngoài
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}


//------------------------------------------------------------------------------------------------------------------------------------//
// JavaScript for Veterinary Medical Records Interface

// Show medical record details modal
function showMedicalDetails(recordId) {
    // Retrieve record data based on recordId (you can replace this with a dynamic call to fetch data)
    const recordData = {
        1: {
            ownerName: "Nguyễn Văn A",
            petName: "Mimi",
            petSpecies: "Mèo",
            ownerPhone: "0123456789",
            examDate: "24/10/2023",
            symptoms: "Ngứa, đỏ, rụng lông",
            diagnosis: "Viêm da cấp tính",
            status: "Đang điều trị"
        },
        2: {
            ownerName: "Trần Thị B",
            petName: "Lulu",
            petSpecies: "Chó",
            ownerPhone: "0987654321",
            examDate: "23/10/2023",
            symptoms: "Sốt, mệt mỏi, chán ăn",
            diagnosis: "Hoàn thành",
            status: "Hoàn thành"
        }
    };

    // Populate modal with data
    const record = recordData[recordId];
    if (record) {
        document.getElementById("owner-name").textContent = record.ownerName;
        document.getElementById("pet-name").textContent = record.petName;
        document.getElementById("pet-species").textContent = record.petSpecies;
        document.getElementById("owner-phone").textContent = record.ownerPhone;
        document.getElementById("exam-date").textContent = record.examDate;
        document.getElementById("symptoms").textContent = record.symptoms;
        document.getElementById("diagnosis").textContent = record.diagnosis;
        document.getElementById("status").textContent = record.status;

        // Update form fields with the data
        document.getElementById("edit-symptoms").value = record.symptoms;
        document.getElementById("edit-diagnosis").value = record.diagnosis;
        document.getElementById("edit-status").value = record.status;

        // Show the modal
        document.getElementById("medical-details-modal").style.display = "block";
    }
}

// Close modal
document.querySelector(".close").onclick = function () {
    document.getElementById("medical-details-modal").style.display = "none";
};

// Toggle to edit mode
document.querySelector(".update-btn").onclick = function () {
    document.querySelector(".view-mode").classList.add("hidden");
    document.querySelector(".edit-mode").classList.remove("hidden");
};

// Save updated record
document.querySelector(".save-btn").onclick = function () {
    // Get updated values from form fields
    const updatedDiagnosis = document.getElementById("edit-diagnosis").value;
    const updatedSymptoms = document.getElementById("edit-symptoms").value;
    const updatedStatus = document.getElementById("edit-status").value;

    // Update display in view mode
    document.getElementById("symptoms").textContent = updatedSymptoms;
    document.getElementById("diagnosis").textContent = updatedDiagnosis;
    document.getElementById("status").textContent = updatedStatus;

    // Switch back to view mode
    document.querySelector(".edit-mode").classList.add("hidden");
    document.querySelector(".view-mode").classList.remove("hidden");

    alert("Hồ sơ bệnh án đã được cập nhật!");
};

// Cancel editing and return to view mode
document.querySelector(".cancel-btn").onclick = function () {
    document.querySelector(".edit-mode").classList.add("hidden");
    document.querySelector(".view-mode").classList.remove("hidden");
};

// Delete record
document.querySelector(".delete-btn").onclick = function () {
    const confirmation = confirm("Bạn có chắc chắn muốn xóa hồ sơ bệnh án?");
    if (confirmation) {
        alert("Đã xóa hồ sơ bệnh án.");
        document.getElementById("medical-details-modal").style.display = "none";
    }
};

//------------------------------------------------------------------------------------------------------------------------------------//