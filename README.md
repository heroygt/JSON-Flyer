JSON-Flyer
============

"Template can fly" philosophy
-----------------------------

- Template is data
- Template should have data structure
- Template can be stored in Database
- Template can be queried and computed
- Render is compute between template and data or between template and template
- Template can be render in anywhere anytime.

JSON-Flyer's philosophy
-----------------------

- Template and data should have same data structure which is JSON.
- Template item and data item are matching by the key(not exact match)
- For template, CSS Selector is key, element must has a unique CSS Selector
- For data, key is same as namespace
- HTML tag will be ignored from the template element key while rendering, so data key will only match the HTML element's class and id

JSON-Flyer.js is going to achieve
------------------------------

- JSON HTML template structure
- Render from Client side

Demo
----
Template:
	var template = {
		"#user.info" : {
			"lable.nameDes" : "",
			"input.name" : {"attrs" : "type='text'"},
			".gender" : {
				"lable.genderDes" : "",
				"input.male" : {"attrs" : "type='radio'"},
				"lable.maleDes" : "",
				"input.female" : {"attrs" : "type='radio'"},
				"lable.femaleDes" : ""
			},
			"lable.nationDes" : "",
			"select.nation" : "",
			"lable.skillDes" : "",
			"textArea.skill" : ""
		}
	};

i18n:
	var i18n_en = {
		"user.info" : {
			".nameDes" : "Name:",
			".gender" : {
				".genderDes" : "Gender:",
				".maleDes" : "Male",
				".femaleDes" : "Female",
			},
			".nationDes": "Country",
			".nation": "options => {\"USA\": \"US\", \"China\": \"CN\"}",
			".skillDes" : "Skills:"
		}
	}

Data:
	var data = 
	{
		"user.info" : {
			".name" : "Guangtao",
			".gender" : {
				".male" : true
			},
			".nation": "CN",
			".skill": "JSON-Flyer"
		}
	}

Client side code:
	<!DOCTYPE html>
	<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js" type="text/javascript"></script>
		<script src="http://localhost:3000/jsonFlyer.js" type="text/javascript"></script>
		<script type="text/javascript">
		$(function(){
			jsonFlyer = new JsonFlyer();
			var html = jsonFlyer.render(template);
			$('body').html(html);
			jsonFlyer.assign(i18n);
			jsonFlyer.assign(data);
		});
		</script>
		</head>
		<body>
		</body>
	</html>
	
Result(value part is fake here, try out in browser by yourself):
[[https://github.com/heroygt/JSON-Flyer/wiki]]

---

<div class="info" id="user">
	<lable class="nameDes">Name:</lable>
	<input type="text" class="name" value="Guangtao">
	<div class="gender">
		<lable class="genderDes">Gender:</lable>
		<input type="radio" class="male" checked="true">
		<lable class="maleDes">Male</lable>
		<input type="radio" class="female">
		<lable class="femaleDes">Female</lable>
	</div>
	<lable class="nationDes">Country</lable>
	<select class="nation">
		<option value="US">USA</option>
		<option value="CN" selected="true">China</option>
	</select>
	<lable class="skillDes">Skills:</lable>
	<textarea class="skill">JSON-Flyer</textarea>
</div>