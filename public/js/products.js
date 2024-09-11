$(document).ready(function () {
    console.log("category")
    fetchDataAndPopulateTable()
    $.ajax({
        url: "http://adminportal.localhost:8040/productCategory",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            const result = data.data
            const selectElement = $('#select_P_categ');
            selectElement.empty(); // Clear existing options
            selectElement.append($('<option>', { value: '', text: 'Select Product Category' }));
            result.forEach(item => {
                selectElement.append($('<option>', { value: item.pc_id, text: item.pc_name }));
            });
        },
        error: function (error) {
            console.log("error Catch", error);
        }
    });
})

$(document).on('click', '.createCat', function () {
    var payload = {
        name: $('#pName').val(),
        type: $('#pType').val(),
        price: $('#pPrice').val(),
        pc_id: $('#select_P_categ').val()
    }
    $.ajax({
        url: "http://adminportal.localhost:8040/products-list",
        type: "POST",
        data: JSON.stringify(payload),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log('================**====================');
            $('#myModal').modal('hide');

            console.log('====================================');
            console.log("data", data);
            console.log('====================================');

        },
        error: function (error) {
            console.log('====================================');
            console.log("error Catch", error);
            console.log('====================================');

        }
    });
})

$(document).on('click', '.showercmodel', function () {
    console.log("showercmodel");
    $('#myModal').modal('show');
})

function fetchDataAndPopulateTable() {
    $.ajax({
        url: "http://adminportal.localhost:8040/products-list",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            const result = data.data
            console.log("data", data);
            const tableBody = $('.catTable tbody');
            tableBody.empty(); // Clear existing data
            result.forEach((item, index) => {
                const row = $('<tr>');
                row.append($('<td>').text(index + 1));
                row.append($('<td>').text(item.pname));
                row.append($('<td>').text(item.ptype));
                row.append($('<td>').text(item.pcost));
                row.append($('<td>').text(item.pc_name));
                const actionsCell = $('<td>');
                const editIcon = $('<i>').addClass('fas fa-edit edit-icon');
                const deleteIcon = $('<i>').addClass('fas fa-trash-alt delete-icon');
                actionsCell.append(editIcon).append(deleteIcon);
                row.append(actionsCell);
                tableBody.append(row);
            });
        },
        error: function (error) {
            console.log("error Catch", error);
        }
    });
}