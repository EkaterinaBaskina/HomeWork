$(function() {
	
	var page;
	var mainBase;
	
	renderPage(page);
	
	function renderPage(page) {
		var request = new XMLHttpRequest();
		request.open("GET", "https://reqres.in/api/users" + "?page=" + page);
		request.send();	
		
		request.onload = function () {
			if (this.readyState === 4 && this.status === 200) {	
				console.log(request.responseText);
				mainBase = JSON.parse(request.responseText).data;
				console.log(JSON.parse(request.responseText));
				console.log(JSON.parse(request.responseText).data);
				mainBase.forEach( function(element, index) {
					makeCard(element);
				});
				
				if(page == undefined) {
					var countLi = JSON.parse(request.responseText).total_pages;
					for(var i = 0; i < countLi; i++) {
						$(".pagination").append("<li>" + (i + 1));
					}
					$("li").on("click", function(event) {
						$(".box").empty();
						page = $(event.target)[0].innerHTML;
						console.log("start");
						renderPage(page);
					});
				}
			}
		}
	}

	

	$("button").on('click', function(event) {
    event.preventDefault();
		var request = new XMLHttpRequest();

		let first_name = $("input[name='first_name']").val();
		let last_name = $("input[name='last_name']").val();
		let avatar = $("input[name='avatar']").val();

		var param = 'first_name=' + encodeURIComponent(first_name) +
		'&last_name=' + encodeURIComponent(last_name) + 
		'&avatar=' + encodeURIComponent(avatar);

		request.open('POST', "https://reqres.in/api/users", true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.send(param);

		request.onload = function() {
			if(request.readyState == 4) {
				alert('ok post');
			}
		}

		
	});


	function makeCard (user) {

		let card = $("<div class='card'>")

		$(card)
		.append($("<img src=" + user.avatar + ">"))
		.append($("<div>" + user.first_name + "&nbsp;" + "</div>"))
		.append($("<div>" + user.last_name + "</div>"));

		$(".box").append(card);
	}

});