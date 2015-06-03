
$(document).ready(function () {
    $('#button').click(function(){
            var data = {
                first_name: $("#first_name").val(),
                last_name : $("#last_name").val(),
                student_number : $("#student_number").val(),
                mobile : $("#mobile").val(),
                email : $("#email").val(),
                codeforces_username : $("#codeforces_username").val(),
                "g-recaptcha-response" : $("[name='g-recaptcha-response']").val()
            };
            $.ajax(
                {
                    url: '/sign_up',
                    type: "POST",
                    data: data,
                    success: function (data) {
                        if (data.sign_up && !data.exists) {
                            toastr.info('اطلاعات شما با موفقیت ثبت شد و پس از تایید به لیست اضافه میشود.');
                            setTimeout(function () {
                                window.location.replace("/");
                            }, 3010);
                        } else if (data.exists) {
                            toastr.error('کاربر مورد نظر شما قبلا ثبت شده است');
                        } else {
                            toastr.error(' معتبر نیست، لطفا تمام فیلد ها را با دقت پر کنید.');
                        }
                    },
                    error: function () {
                        toastr.error('خطا در برقراری ارتباط با سرور');
                    }
                });
    });

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "positionClass": "toast-bottom-left",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
});
