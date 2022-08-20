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
      scrollTop: $($.attr(this, 'href')).offset().top - 84
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