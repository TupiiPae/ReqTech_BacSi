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

// Display customer details modal
function showCustomerDetails(id) {
    console.log("Opening customer details for ID:", id);
    
    const modal = document.getElementById("customer-details-modal");
    const customer = customersData[id];
    
    if (!customer) {
        console.error("Không tìm thấy thông tin khách hàng với ID:", id);
        return;
    }

    // Update customer information
    document.getElementById("customer-name").textContent = customer.name;
    document.getElementById("customer-phone").textContent = customer.phone;
    document.getElementById("customer-address").textContent = customer.address;

    // Update booking history
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

    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('show');
}

// Close the customer details modal
function closeCusModal() {
    const modal = document.getElementById("customer-details-modal");
    modal.classList.remove('show');
    modal.classList.add('hidden');
}

// Delete booking function
function deleteBooking(bookingId) {
    console.log("Deleting booking ID:", bookingId);
    const bookingRow = document.querySelector(`button[onclick="deleteBooking(${bookingId})"]`).closest("tr");
    if (bookingRow) {
        bookingRow.remove();
    }
}

// Add event listener for profile view buttons
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
// Confirmation Actions
let currentPetName = '';

// Show confirmation modal
function showConfirmModal(petName) {
    currentPetName = petName;
    document.getElementById('confirmPetName').textContent = petName;
    document.getElementById('confirmModal').style.display = 'block';
}

// Show rejection modal
function showRejectModal(petName) {
    currentPetName = petName;
    document.getElementById('rejectPetName').textContent = petName;
    document.getElementById('rejectModal').style.display = 'block';
}

// Close specific modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Confirm appointment function
function confirmAppointment() {
    alert(`Đã xác nhận lịch hẹn cho ${currentPetName}`);
    closeModal('confirmModal');
}

// Reject appointment function
function rejectAppointment() {
    alert(`Đã từ chối lịch hẹn cho ${currentPetName}`);
    closeModal('rejectModal');
}

//------------------------------------------------------------------------------------------------------------------------------------//
// JavaScript for Veterinary Medical Records Interface

// Show medical record details modal
function showMedicalDetails(recordId) {
    const recordData = {
        1: {
            ownerName: "Nguyễn Văn A",
            petName: "Mimi",
            petSpecies: "Mèo",
            ownerPhone: "0123456789",
            examDate: "24/10/2024",
            symptoms: "Ngứa, đỏ, rụng lông",
            diagnosis: "Viêm da cấp tính",
            status: "Đang điều trị"
        },
        2: {
            ownerName: "Trần Thị B",
            petName: "Lulu",
            petSpecies: "Chó",
            ownerPhone: "0987654321",
            examDate: "23/10/2024",
            symptoms: "Sốt, mệt mỏi, chán ăn",
            diagnosis: "Hoàn thành",
            status: "Hoàn thành"
        }
    };

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

        document.getElementById("medical-details-modal").style.display = "block";
    }
}

// Close medical record details modal
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
    const updatedDiagnosis = document.getElementById("edit-diagnosis").value;
    const updatedSymptoms = document.getElementById("edit-symptoms").value;
    const updatedStatus = document.getElementById("edit-status").value;

    document.getElementById("symptoms").textContent = updatedSymptoms;
    document.getElementById("diagnosis").textContent = updatedDiagnosis;
    document.getElementById("status").textContent = updatedStatus;

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

// Function to show the new medical record modal
function showCreateMedicalRecordForm() {
    const modal = document.getElementById('new-medical-record-modal');
    modal.style.display = 'block';
}

// Function to close the new medical record modal
function closeNewMedicalRecordModal() {
    const modal = document.getElementById('new-medical-record-modal');
    modal.style.display = 'none';
}

// Function to handle form submission
document.getElementById('new-medical-record-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const ownerName = document.getElementById('owner-name').value;
    const petName = document.getElementById('pet-name').value;
    const petSpecies = document.getElementById('pet-species').value;
    const ownerPhone = document.getElementById('owner-phone').value;
    const examDate = document.getElementById('exam-date').value;
    const reExamDate = document.getElementById('re-exam').value;
    const symptoms = document.getElementById('symptoms').value;
    const diagnosis = document.getElementById('diagnosis').value;
    const status = document.getElementById('status').value;

    // Create a new medical record object (You can send this to the server or handle it as needed)
    const newMedicalRecord = {
        ownerName,
        petName,
        petSpecies,
        ownerPhone,
        examDate,
        reExamDate,
        symptoms,
        diagnosis,
        status
    };

    console.log('New Medical Record:', newMedicalRecord); // For demonstration, log to the console

    // Optionally, you could send this data to a server via AJAX or Fetch API

    // Close the modal after saving
    closeNewMedicalRecordModal();
});

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('new-medical-record-modal');
    if (event.target === modal) {
        closeNewMedicalRecordModal();
    }
};

//------------------------------------------------------------------------------------------------------------------------------------//