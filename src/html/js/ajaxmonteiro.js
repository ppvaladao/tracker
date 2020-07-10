// Ajax.

$(document).ready(function() { // This show and hide category manage button and disable and active them	
	$('#categoryStatus').live('click',function(e){
		var thiis = $(this);
		var serviceID = thiis.next('.ServiceId').val();
		var manageLink = thiis.parent().next().children();
		
		$.ajax({
			url: 'ajax.php',
			type: 'POST',
			data: {
				acao:"manageCategories",
				catID:serviceID
			},
			dataType: "json",
			success: function(data) {
				if(data.status == "success") {
					if(data.action == "hide") {
						thiis.html('Enable');
						manageLink.hide();
					} else {
						thiis.html('Disable');
						manageLink.show();
					}
				}
			}
		});
		e.preventDefault();
	});
});

$(document).ready(function() {
	$('#addP').click(function(){
		//vars
		var newPoints = $('input[name=addPoints]').val();
		var accountPoints = $('input[name=accountPoints]').val();
		
		$.ajax({
			url: 'ajax.php',
			type: 'POST',
			data: {
				acao:"playerPoints",
				points:newPoints,
				accName:accountPoints
			},
			dataType: "json",
			success: function(data) {
				if(data.status == "success") {
					alert("you added " + newPoints + " points to the player successfully.");
					$('input[name=addPoints]').val('');
				}
			}
		});
		e.preventDefault();
	});
});

$(document).ready(function() { // This show and hide category manage button and disable and active them	
	$('#paymentStatus').live('click',function(e){
		var thiis = $(this);
		var paymentID = thiis.next('.PaymentId').val();
		
		$.ajax({
			url: 'ajax.php',
			type: 'POST',
			data: {
				acao:"managePayments",
				payID:paymentID
			},
			dataType: "json",
			success: function(data) {
				if(data.status == "success") {
					if(data.action == "hide") {
						thiis.html('Enable');
					} else {
						thiis.html('Disable');
					}
				}
			}
		});
		e.preventDefault();
	});
});

///Mounts And Outfits add
$(document).ready(function() {
	
	$('#mountSubmit').click(function(e){ //AddMounts
		var mountInfo = $('select[name=selectMount]').val();
		var mountCosts = $('input[name=mountPrice]').val();
		var proceder = true;
		
		if(mountInfo == "" || mountCosts == "") {
			$('.mountStatusError').slideDown(500).html('All fields are required.');
			$('.mountStatusError').delay(3000);
			$('.mountStatusError').slideUp(500);
			proceder = false;
		}
		
		if(proceder) {
			$.ajax({
				url: 'ajax.php',
				type: 'POST',
				data: {
					acao:"addMounts",
					mountInfo:mountInfo,
					mountCost:mountCosts
				},
				dataType:"json",
				success: function(data) {
					$('.mountStatusSuccess').slideDown().html(data.msg);
					$('.mountStatusSuccess').delay(3000);
					$('.mountStatusSuccess').slideUp();
					$('select[name=selectMount]').val('');
					$('input[name=mountPrice]').de.val('');
					
				}
			});
		}
		
		e.preventDefault();
	});
	
	$('#delMount').live('submit',function(e){ //Delete mounts
		var offerId = $(this).find('.delMountId').val();
		var del = confirm('Do you really want delete this mount ?');
		if(del) {
			$.ajax({
				url: 'ajax.php',
				type: 'POST',
				data: {acao:"delMount",offerId:offerId},
				dataType: "json",
				success: function(data) {
					if(data.status == "success") {
						location.reload();
					}
				}
			});
		}else{
			e.preventDefault();
		}
	});
	
	//Outfit Submit
	$('#outfitSubmit').click(function(e){
		var outfitInfo = $('select[name=selectOutfit]').val();
		var outfitPrice = $('input[name=outfitPrice]').val();
		
		if (outfitInfo == "" || outfitPrice == "") {
			alert('Fill out all fields!');
			return false;
		}
		
		$.ajax({
			url: 'ajax.php',
			type: 'POST',
			data: {
				acao:"addOutfits",
				outfitName:outfitInfo,
				outfitPrice:outfitPrice
			},
			dataType: "json",
			success: function(data) {
				if (data.status == "success"){
					$('.msgStatusSuccess').slideDown(500).html(data.msg);
					$('.msgStatusSuccess').delay(3000);
					$('.msgStatusSuccess').slideUp(500);
				}
			}
		});
		e.preventDefault();
	});
	
	$('#delOutfit').live('submit',function(e){ //Delete mounts
		var offerId = $(this).find('.delOutfitId').val();
		var del = confirm('Do you really want delete this outfit ?');
		if(del) {
			$.ajax({
				url: 'ajax.php',
				type: 'POST',
				data: {acao:"delOutfit",offerId:offerId},
				dataType: "json",
				success: function(data) {
					if(data.status == "success") {
						location.reload();
					}
				}
			});
		}else{
			e.preventDefault();
		}
	});
	
});

$(document).ready(function() {
	$('#itemSubmit').click(function(){
		//Variables to send ajax
		var itemID = $('input[name=itemID]').val();
		var itemName = $("input[name=itemName]").val();
		var itemDesc = $('input[name=itemDesc]').val();
		var itemAmount = $('input[name=itemAmount]').val();
		var itemPrice = $('input[name=itemPrice]').val();
		
		if (itemID == "" || itemName == "" || itemAmount == "" || itemPrice == "") {
			alert('Fill out all fields!');
			return false;
		}
		$.ajax({
			url: 'ajax.php',
			type: 'POST',
			data: {
				acao:"addItems",
				itemId:itemID,
				itemName:itemName,
				itemDesc:itemDesc,
				itemAmount:itemAmount,
				itemPrice:itemPrice
			},
			dataType: "json",
			success: function(data) {
				if (data.status == "success"){
					$('.msgStatusSuccess').slideDown(500).html(data.msg);
					$('.msgStatusSuccess').delay(3000);
					$('.msgStatusSuccess').slideUp(500);
				}
			}
		});
		
	});
	
	$('#delItem').live('submit',function(e){ //Delete items
		var offerId = $(this).find('.delItemId').val();
		var del = confirm('Do you really want delete this item ?');
		if(del) {
			$.ajax({
				url: 'ajax.php',
				type: 'POST',
				data: {acao:"delItem",offerId:offerId},
				dataType: "json",
				success: function(data) {
					if(data.status == "success") {
						location.reload();
					}
				}
			});
		}else{
			e.preventDefault();
		}
	});
	
});
//Items vip
$(document).ready(function() {
	$('#vipitemSubmit').click(function(){
		//Variables to send ajax
		var itemID = $('input[name=vipitemID]').val();
		var itemName = $("input[name=vipitemName]").val();
		var itemDesc = $('input[name=vipitemDesc]').val();
		var itemAmount = $('input[name=vipitemAmount]').val();
		var itemPrice = $('input[name=vipitemPrice]').val();
		
		if (itemID == "" || itemName == "" || itemAmount == "" || itemPrice == "") {
			alert('Fill out all fields!');
			return false;
		}
		$.ajax({
			url: 'ajax.php',
			type: 'POST',
			data: {
				acao:"addItemsVip",
				itemId:itemID,
				itemName:itemName,
				itemDesc:itemDesc,
				itemAmount:itemAmount,
				itemPrice:itemPrice
			},
			dataType: "json",
			success: function(data) {
				if (data.status == "success"){
					$('.msgStatusSuccess').slideDown(500).html(data.msg);
					$('.msgStatusSuccess').delay(3000);
					$('.msgStatusSuccess').slideUp(500);
				}
			}
		});
		
	});
	
	$('#delItem').live('submit',function(e){ //Delete items
		var offerId = $(this).find('.delItemId').val();
		var del = confirm('Do you really want delete this item ?');
		if(del) {
			$.ajax({
				url: 'ajax.php',
				type: 'POST',
				data: {acao:"delItem",offerId:offerId},
				dataType: "json",
				success: function(data) {
					if(data.status == "success") {
						location.reload();
					}
				}
			});
		}else{
			e.preventDefault();
		}
	});
	
});

//Tokens
$(document).ready(function() {
	$('#TokenItemSubmit').click(function(){
		//Variables to send ajax
		var itemID = $('input[name=TokenItemID]').val();
		var itemName = $("input[name=TokenItemName]").val();
		var itemDesc = $('input[name=TokenItemDesc]').val();
		var itemAmount = $('input[name=TokenItemAmount]').val();
		var itemPrice = $('input[name=TokenItemPrice]').val();
		
		if (itemID == "" || itemName == "" || itemAmount == "" || itemPrice == "") {
			alert('Fill out all fields!');
			return false;
		}
		$.ajax({
			url: 'ajax.php',
			type: 'POST',
			data: {
				acao:"addItemsTokens",
				itemId:itemID,
				itemName:itemName,
				itemDesc:itemDesc,
				itemAmount:itemAmount,
				itemPrice:itemPrice
			},
			dataType: "json",
			success: function(data) {
				if (data.status == "success"){
					$('.msgStatusSuccess').slideDown(500).html(data.msg);
					$('.msgStatusSuccess').delay(3000);
					$('.msgStatusSuccess').slideUp(500);
				}
			}
		});
		
	});
	
	$('#delItem').live('submit',function(e){ //Delete items
		var offerId = $(this).find('.delItemId').val();
		var del = confirm('Do you really want delete this item ?');
		if(del) {
			$.ajax({
				url: 'ajax.php',
				type: 'POST',
				data: {acao:"delItem",offerId:offerId},
				dataType: "json",
				success: function(data) {
					if(data.status == "success") {
						location.reload();
					}
				}
			});
		}else{
			e.preventDefault();
		}
	});
	
});

//Extra Services
$(document).ready(function() {
	$('#extraStatus').live('click',function(e){
		
		var thiis = $(this);
		var offerId = $(this).parent().parent().find('input[name=offerID]').val();
		var extraValue = $(this).parent().parent().find('input[name=extraValue]');
		var extraUpdate = $(this).parent().parent().find('input[name=extraUpdate]');
		var setStatus = $(this).parent().parent().find('.settingStatus');
		
		$.ajax({
			url: 'ajax.php',
			type: 'POST',
			data: {
				acao:"extraServiceStatus",
				offerID:offerId
			},
			dataType: "json",
			success: function(data) {
				if (data.status) {
					if (data.action == "hide") {
						thiis.html('Enable');
						extraValue.attr('disabled','disabled');
						extraUpdate.attr('disabled','disabled');
						setStatus.html('<font style="color:red;">Disabled</font>');
					}else{
						thiis.html('Disable');
						extraValue.removeAttr('disabled');
						extraUpdate.removeAttr('disabled');
						setStatus.html('<font style="color:green;">Enabled</font>');
					}
				}
			}
		});
		e.preventDefault();
	});
	
	$('#extraUpdate').live('click',function(){
		var thiis = $(this);
		var valOffer = thiis.parent().find('input[name=offerID]').val();
		var newPrice = thiis.parent().find('input[name=extraValue]').val();
		
		$.ajax({
			url: 'ajax.php',
			type: 'POST',
			data: {
				acao:"extraUpdatePrice",
				offerId:valOffer,
				pointsChange:newPrice
			},
			dataType: "json",
			success: function(data) {
				if(data.status) {
					$('.msgStatus').slideDown(500).html(data.msg);
					$('.msgStatus').delay(3000);
					$('.msgStatus').slideUp(500);
					
				}
			}
		});
	});
	
});

//Add and delete tickers ;)
$(document).ready(function() {
	$('#insertTicker').click(function(event){
		//vars
		var tickerText = $('input[name=tickerText]').val();
		var tickerIcon = $('select[name=tickerIcon]').val();
		
		if (tickerText == "" || tickerIcon == "") {
			alert('All fields are required!');
			return false;
		}
		$.ajax({
			url: 'ajax.php',
			type: 'POST',
			data: {
				acao:"addTicker",
				ticker:tickerText,
				icon:tickerIcon
			},
			dataType:"json",
			success: function(data) {
				if (data.status == "success") {
					location.reload();
				}
			}
		});
		event.preventDefault();
	});
	
	$('#delTicker').live('click',function(e){
		//var
		var tickerID = $(this).parent().find('input[name=tickerID]').val();
		var del = confirm('Do you really want delete this ticker ?');
		if (del) {
			$.ajax({
				url: 'ajax.php',
				type: 'POST',
				data: {
					acao:"delTicker",
					tickerID:tickerID
				},
				dataType:"json",
				success: function(data) {
					if (data.status == "success") {
						location.reload();
					}
				}
			});
		}
		e.preventDefault();
	});
});

//adding points package
$(document).ready(function() {
	$('#daysSubmit').click(function(){
		//vars
		var daysAmount = $('input[name=daysAmount]').val();
		var daysPrice = $('input[name=daysPrice]').val();
		var daysDesc = $('input[name=daysDesc]').val();
		
		if (daysAmount == "" || daysPrice == "") {
			alert('Days amount and days price are required!');
			return false;
		}
		$.ajax({
			url: 'ajax.php',
			type: 'POST',
			data: {
				acao:"addDays",
				daysAmount:daysAmount,
				daysPrice:daysPrice,
				daysDesc:daysDesc
			},
			dataType: "json",
			success: function(data) {
				if(data.status) {
					$('.msgStatusSuccess').slideDown(500).html(data.msg);
					$('.msgStatusSuccess').delay(3000);
					$('.msgStatusSuccess').slideUp(500);					
				}
			}
		});
	});
	
	$('#delDay').live('click',function(e){
		//var
		var daysID = $(this).parent().find('input[name=delDayId]').val();
		var del = confirm('Do you really want delete this days package ?');
		if (del) {
			$.ajax({
				url: 'ajax.php',
				type: 'POST',
				data: {
					acao:"delDays",
					daysID:daysID
				},
				dataType:"json",
				success: function(data) {
					if (data.status == "success") {
						location.reload();
					}
				}
			});
		}
		e.preventDefault();
	});
});

function refreshPage() {
	location.reload();
}

$(document).ready(function(e) {
	$('#addVideo').click(function(e){
		
		var proceder = true;
		var titleVideo = $('input[name=videoTitle]').val();
		var codeVideo = $('input[name=videoCode]').val();
		var catVideo = $('select[name=videoCategory]').val();
		var player = $('select[name=videoPlayer]').val();
		
		if(titleVideo == "" || codeVideo == "" || catVideo == "" || player == "") {
			$('.msgStatusError').html("You need to fill all fields.").slideDown(500);
			$('.msgStatusError').delay(2000);
			$('.msgStatusError').slideUp(500);
			proceder = false;
		}
		
		if(proceder) {
			$.ajax({
				url: 'ajax.php',
				type: 'POST',
				data: {
					acao:"addVideo",
					title:titleVideo,
					code:codeVideo,
					cat:catVideo,
					player:player
				},
				dataType:"json",
				success: function(data) {
					if(data.status == "success"){
						$('.msgStatusSuccess').html(data.msg).slideDown(500);
						$('.msgStatusSuccess').delay(2000);
						$('.msgStatusSuccess').slideUp(500);
					} else {
						$('.msgStatusError').html(data.msg).slideDown(500);
						$('.msgStatusError').delay(2000);
						$('.msgStatusError').slideUp(500);
					}
				}
			});
		}
		
		e.preventDefault();
	});
});

$(document).ready(function(e) {
	$('#confirmVideo').live('submit',function(e){ //Delete items
	
		var videoID = $(this).find('input[name=videoID]').val();
		
		var app = confirm('Do you really want to aprove this video ?');
		
		if(app) {
			$.ajax({
				url: 'ajax.php',
				type: 'POST',
				data: {acao:"confirmVideo",id:videoID},
				dataType: "json",
				success: function(data) {
					if(data.status == "success") {
						location.reload();
					}
				}
			});
		}else{
			e.preventDefault();
		}
	});
	
	$('#rejectVideo').live('submit',function(e){ //Delete items
	
		var videoID = $(this).find('input[name=videoID]').val();
		
		var rej = confirm('Do you really want to reject this video ?');
		
		if(rej) {
			$.ajax({
				url: 'ajax.php',
				type: 'POST',
				data: {acao:"rejectVideo",id:videoID},
				dataType: "json",
				success: function(data) {
					if(data.status == "success") {
						location.reload();
					}
				}
			});
		}else{
			e.preventDefault();
		}
	});
	
	$('#removeVideo').live('submit',function(e){ //Delete items
	
		var videoID = $(this).find('input[name=videoID]').val();
		
		var rem = confirm('Do you really want to remove this video from server ?');
		
		if(rem) {
			$.ajax({
				url: 'ajax.php',
				type: 'POST',
				data: {acao:"removeVideo",id:videoID},
				dataType: "json",
				success: function(data) {
					if(data.status == "success") {
						location.reload();
					}
				}
			});
		}else{
			e.preventDefault();
		}
	});
});

$(document).ready(function(e) {
	$('#cancelServiceButton').click(function(s){
		var serviceID = $('#cancelServiceID').val();
		$.ajax({
			url: 'ajax.php',
			type: 'POST',
			data: {acao:"cancelServiceAjax",id:serviceID},
			dataType: "json",
			success: function(data) {
				if(data.status == "success") {
					$('#cancelServiceAjax').hide();
					$('#serviceCancelledAjax').show();
				} else {
					alert("Um erro ocorreu, contate o administrador do site.");
				}
			}
		});
		s.preventDefault();
	});
});

