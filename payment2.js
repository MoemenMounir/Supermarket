const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_wrn2f4s', 'template_wv8a6zh', this)
    .then(function() {
        alert('تم ارسال الرسالة بنجاح!');
        form.reset();
    }, function(error) {
        alert('في خطأ، حاول تاني: ' + JSON.stringify(error));
    });
});

document.getElementById("cash").value = "نقد";
document.getElementById("vodafone").value = "فودافون كاش";

document.getElementById("vodafoneFile").value = "حدث خطأ في ارسال الصورة";

function goToPage2() {
    window.location.href = "index.html";
}
