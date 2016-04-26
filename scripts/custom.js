// Bookmark close on clicking outside the bookmark sidebar
$(document).on('click', function(e) {
  var $body = $('body');
  if($body.hasClass('open')) {
    $body.removeClass('open');
  }
});

// prevent sidebar from closing while clicking on sidebar
$('.btn-bookmark').on('click', function(e) {
  e.stopPropagation();
  document.body.className = 'open';
});

// On button Click - Checking Input value
$("#searchBtn").on('click', function() {
  var inputValue = $("#inputVal").val();
  // console.log(val);

  if ((inputValue) === '') {
    $(".keyword").html("<p>Please enter any word</p>");
    $(".result-list").empty();

  } else {
    searchWord(inputValue);
  }
});

$(document).on('keyup', function(e) {
  if(e.keyCode == '13'){
    //alert('You pressed a "enter" key in textbox');  

    var inputValue = $("#inputVal").val();
    // console.log(val);

    if ((inputValue) === '') {
      $(".keyword").html("<p>Please enter any word</p>");
      $(".result-list").empty();

    } else {
      searchWord(inputValue);
    }
  }
});


$('.bookmark').on('click', '.bookmark-tag', function(e) {
  e.stopPropagation();
  $(".keyword").empty();
  $(".result-list").empty();
  var tagValue = $(this).text();
  $('#bookmarkBtn').remove();
  searchWord(tagValue);
  $('body').removeClass('open');
});


// Search Word Function
function searchWord(keyword) {

  $.ajax({
    url: 'https://mashape-community-urban-dictionary.p.mashape.com/define?term=' + keyword,
    headers: {
      'X-Mashape-Key': 'VrZBZyMZUWmshpR4iecrjq6XQCmnp1Oar7QjsnbknMXfI5U2IS',
      'Accept': 'application/json'
    },
    method: 'GET',
    dataType: 'json',
    success: function(data) {

      // getting value when no result match
      var noResultVal = data.result_type;
      if (noResultVal === "no_results") {
        $(".keyword").html("No result found");
        $("#bookmarkBtn").css('display', 'none');
      } else {
        $("#bookmarkBtn").css('display', 'block');
        $(".keyword").html(keyword);
      }
      $(".result-list").empty();

      // Printing list of definition from different authors
      for (i = 0; i < data.list.length; i++) {
        $(".result-list").append('<p>' + data.list[i].definition + '</p>');
      }
    }
  });
}

// on click of bookmark button
$("#bookmarkBtn").on('click', function() {
  // var word = $(this).prev().text();
  var word = $("#inputVal").val(); 
  if ((word).length > 0 ){
    $(".bookmark__list").append('<li class="bookmark-tag">' + word + '</li>');
    $('input[type="search"]').val('');
  }
});