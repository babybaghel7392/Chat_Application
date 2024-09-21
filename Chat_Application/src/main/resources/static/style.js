var clinet=null

function sendmessage()
{
	let jsonob=
	{
		name:localStorage.getItem("name"),
		content:$("#message-value").val()
	}
	clinet.send("/app/message",{},JSOn.stringify(jsonob));
}



function connect()
{
	let socket= new SockJS("/server")
	clinet=socket.over(socket)
	clinet.connect({},function(frame)
	{
		console.log("conneted:"+frame)
		$("#name-form").addclass('d-none')
		$("#chat-form").removeclass('d-none')
	})
	
	// subscribe
	clinet.subsribe("/top/return-to",function(response)
	{
		showMessage(JSON.parse(response.body))
	})
	
}
function showMessage(message)
{
	$("msg-container-table").prepend('<tr><td><b>${message.name}:</b> ${message.content}</td></tr>')
}


$(document).ready((e)=>
	{
		$("#login").click(()=>	
			{
				let name=$("#name-value").val()
				localStorage.setItem("name",name)
				$("#name-title").html(`welcome`,<b>${name}</b>)
				connect();
			})
			
		$("#send").click(()=>
		{
		sendmessage()	
		})
		
		$("#logout").click(()=>
		{
			localStorage.removeItem("name")
			clinet.disconnect()
			
			$("#name-form").removeclass('d-none')
					$("#chat-form").addclass('d-none')
		})
		

	})