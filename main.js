import $ from 'jquery';
import "./styles/index.scss"

function handleSidebar(){
  const sidebar = $(".sidebar")
  if(sidebar.hasClass('hidden')){
    sidebar.removeClass('hidden')
  }
  else{
    sidebar.addClass('hidden')
  }
}

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();
  handleSidebar()
  $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
  }, 600);
});

$('.hamburger').on('click', handleSidebar)

$('.option').on('click', function(){
  if($(this).hasClass("active")) {
    this.classList.remove("active")
  }
  else{
    this.classList.add("active")
  }
})

$('#submit').on('click', contactUsToday)

async function contactUsToday() {

  let name = $('#name').val()
  let phone = $('#phone').val()
  let email = $('#email').val()
  let details = $('#project-content').val()

  if(!email.trim()) return

  let postURL = `https://firestore.googleapis.com/v1/projects/devapes-in/databases/(default)/documents/clients?key=${import.meta.env.VITE_API_KEY}&documentId=${email}`;
  let options = {
    method:'POST',
    body: JSON.stringify({
      fields: {
        name: { stringValue: name },
        phone: { stringValue: phone },
        email: { stringValue: email },
        details: { stringValue: details },
      }
    }),
    contentType: "application/json",
    muteHttpExceptions:true
  }

  let res = await fetch(postURL,options)
  if(res.ok) {
    alert("We will get back to you ASAP !")
    $('#name').val("")
    $('#phone').val("")
    $('#email').val("")
    $('#project-content').val("")
  }
  else {
    alert("Something went wrong. Please reach out to us : contact@devapes.in")
  }
}

