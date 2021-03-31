$(document).ready(function () {
	let mySelector = $(".mySelector");

	let textContent = $("#textContent");
	let converter = document.getElementById("textConverter");

	var node = document.getElementById("my-node");

	textContent.on("keyup", function () {
		let content = textContent.val();

		if (content == "") return;

		// console.log(content);

		// converter.html(content);

		if ($(".contentDiv").length > 0) {
			$(".contentDiv").html(content);
		} else {
			console.log(content);

			let contentDiv = document.createElement("DIV");
			contentDiv.classList.add("contentDiv");
			contentDiv.innerHTML = content;
			$("#textConverter").append(contentDiv);
		}
	});

	selectors(converter);

	$(".btn-convert").on("click", function () {
		convertImg(converter);
	});
});

function selectors() {
	let paddingSelector = $("#selector1");
	let fontSelector = $("#selector2");
	let letterSpSelector = $("#selector3");
	let marginTop = $("#selector4");
	let marginRight = $("#selector5");

	let selectorsArray = [
		paddingSelector,
		fontSelector,
		letterSpSelector,
		marginTop,
		marginRight,
	];
	let selectorsValue = [];

	selectorsArray.forEach((element, index) => {
		element.on("keyup", function () {
			let nameData = element.data("name");
			let value = element.val();
			selectorsValue[index] = value;
			console.log("arrayValue", selectorsValue);

			if (selectorsValue[index] != "" && index == 0) {
				$(".contentDiv").css({
					padding: value + "rem",
				});
			} else if (selectorsValue[index] != "" && index == 1) {
				$(".contentDiv").css({
					"font-size": value + "rem",
				});
			} else if (selectorsValue[index] != "" && index == 2) {
				$(".contentDiv").css({
					"letter-spacing": value + "rem",
				});
			} else if (selectorsValue[index] != "" && index == 3) {
				$(".contentDiv").css({
					"margin-top": value + "rem",
				});
			} else if (selectorsValue[index] != "" && index == 4) {
				$(".contentDiv").css({
					"margin-right": value + "rem",
				});
			}
		});
	});
}

function convertImg(converter) {
	$("#textConverter").css({
		zoom: 1,
	});
	domtoimage
		.toPng(converter)
		.then(function (dataUrl) {
			var img = new Image();
			img.src = dataUrl;
			img.classList.add("generateImg");

			$(".generateImg").remove();

			$(".imgHere").append(img);

			$("#textConverter").css({
				zoom: 0.3,
			});
		})
		.catch(function (error) {
			console.error("oops, something went wrong!", error);
		});
}
