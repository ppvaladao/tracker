var accountHttp;

function checkAccount()
{
	if(document.getElementById("accountname").value=="")
	{
		document.getElementById("accountname_indicator").style.backgroundImage = "url(account/nok.gif)";
		return;
	}
	if(document.getElementById("accountname").value.length < 6 || document.getElementById("accountname").value.length > 10 ) {
		document.getElementById("accountname_indicator").style.backgroundImage = "url(account/nok.gif)";
		return;
	} else {
	accountHttp = new XMLHttpRequest();
	if (accountHttp==null)
	{
		return;
	}
	var account = document.getElementById("accountname").value;
	var url="?subtopic=ajax_check_account&account=" + account + "&uid="+Math.random();
	accountHttp.onreadystatechange=AccountStateChanged;
	accountHttp.open("GET",url,true);
	accountHttp.send(null);
	}
}

function AccountStateChanged() 
{ 
	if (accountHttp.readyState==4)
	{
		if (accountHttp.responseText.includes("ok")) {
			document.getElementById("accountname_indicator").style.backgroundImage = "url(account/ok.gif)";
		} else {
			document.getElementById("accountname_indicator").style.backgroundImage = "url(account/nok.gif)";
		}
	}
}

var emailHttp;


function checkEmail()
{
	if(document.getElementById("email").value=="")
	{
		document.getElementById("email_indicator").style.backgroundImage = "url(account/nok.gif)";
		return;
	}
	emailHttp = new XMLHttpRequest();
	if (emailHttp==null)
	{
		return;
	}
	var email = document.getElementById("email").value;
	var url="?subtopic=ajax_check_email&email=" + email + "&uid="+Math.random();
	emailHttp.onreadystatechange=EmailStateChanged;
	emailHttp.open("GET",url,true);
	emailHttp.send(null);
} 

function EmailStateChanged() 
{
	if (emailHttp.readyState==4)
	{
		if (emailHttp.responseText.includes("ok")) {
			document.getElementById("email_indicator").style.backgroundImage = "url(account/ok.gif)";
		} else {
			document.getElementById("email_indicator").style.backgroundImage = "url(account/nok.gif)";
		}
	}
}

function checkPassword1()
{
	if(document.getElementById("password1").value=="")
	{
		document.getElementById("password1_indicator").style.backgroundImage = "url(account/nok.gif)";
		return;
	}
	password1Http = new XMLHttpRequest();
	if (password1Http==null)
	{
		return;
	}
	var password1 = document.getElementById("password1").value;
	var url="?subtopic=ajax_check_password&password=" + password1 + "&uid="+Math.random();
	password1Http.onreadystatechange=PasswordStateChanged;
	password1Http.open("GET",url,true);
	password1Http.send(null);
} 

function PasswordStateChanged() 
{
	if (password1Http.readyState==4)
	{
		if (password1Http.responseText.includes("ok")) {
			document.getElementById("password1_indicator").style.backgroundImage = "url(account/ok.gif)";
		} else {
			document.getElementById("password1_indicator").style.backgroundImage = "url(account/nok.gif)";
		}
	}
}

function checkPassword2() {
	if(document.getElementById("password1").value == document.getElementById("password2").value) {
		document.getElementById("password2_indicator").style.backgroundImage = "url(account/ok.gif)";
	}
	else {
		document.getElementById("password2_indicator").style.backgroundImage = "url(account/nok.gif)";
	}
	
}


